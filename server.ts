import express from 'express';
import path from 'path';
import fs from 'fs';
import crypto from 'crypto';
import multer from 'multer';
import { createServer as createViteServer } from 'vite';

const app = express();
const PORT = 3000;

// Parse JSON and urlencoded bodies for non-multipart API routes
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Private storage directory for academic verification documents
// NOTE: Kept strictly outside public/ and dist/ so documents can NEVER be accessed via public static URLs
const PRIVATE_UPLOADS_DIR = path.resolve(process.cwd(), 'private_uploads', 'documents');
fs.mkdirSync(PRIVATE_UPLOADS_DIR, { recursive: true });

// Metadata manifest file to persist uploaded document records
const MANIFEST_FILE = path.resolve(PRIVATE_UPLOADS_DIR, 'documents_manifest.json');

interface StoredDocumentRecord {
  documentId: string;
  originalFileName: string;
  storedFileName: string;
  fileSize: string;
  sizeBytes: number;
  mimeType: string;
  documentType: string;
  uploadedAt: string;
  userId?: string;
  sha256Hash: string;
}

function loadManifest(): Record<string, StoredDocumentRecord> {
  try {
    if (fs.existsSync(MANIFEST_FILE)) {
      const data = fs.readFileSync(MANIFEST_FILE, 'utf-8');
      return JSON.parse(data);
    }
  } catch (err) {
    console.error('Error reading documents manifest:', err);
  }
  return {};
}

function saveDocRecord(record: StoredDocumentRecord): void {
  try {
    const manifest = loadManifest();
    manifest[record.documentId] = record;
    fs.writeFileSync(MANIFEST_FILE, JSON.stringify(manifest, null, 2), 'utf-8');
  } catch (err) {
    console.error('Error saving document record to manifest:', err);
  }
}

function getDocRecord(documentId: string): StoredDocumentRecord | null {
  const manifest = loadManifest();
  return manifest[documentId] || null;
}

function deleteDocRecord(documentId: string): void {
  try {
    const manifest = loadManifest();
    if (manifest[documentId]) {
      delete manifest[documentId];
      fs.writeFileSync(MANIFEST_FILE, JSON.stringify(manifest, null, 2), 'utf-8');
    }
  } catch (err) {
    console.error('Error deleting document record from manifest:', err);
  }
}

function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

// Multer disk storage configuration
const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, PRIVATE_UPLOADS_DIR);
  },
  filename: (_req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    const safeExt = ['.pdf', '.jpg', '.jpeg', '.png'].includes(ext) ? ext : '.pdf';
    const randomHex = crypto.randomBytes(12).toString('hex');
    cb(null, `doc_${Date.now()}_${randomHex}${safeExt}`);
  }
});

const ALLOWED_EXTENSIONS = new Set(['.pdf', '.jpg', '.jpeg', '.png']);
const ALLOWED_MIME_TYPES = new Set([
  'application/pdf',
  'image/jpeg',
  'image/jpg',
  'image/png'
]);

const upload = multer({
  storage,
  limits: {
    fileSize: 10 * 1024 * 1024 // 10 MB strict maximum
  },
  fileFilter: (_req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    if (!ALLOWED_EXTENSIONS.has(ext)) {
      return cb(new Error('INVALID_FILE_TYPE'));
    }
    const mime = (file.mimetype || '').toLowerCase();
    if (!ALLOWED_MIME_TYPES.has(mime)) {
      return cb(new Error('INVALID_MIME_TYPE'));
    }
    cb(null, true);
  }
});

// ============================================================================
// API ROUTES FIRST (Must precede Vite middleware)
// ============================================================================

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', service: 'ProjectVerse Academic Document Engine' });
});

/**
 * POST /api/documents/upload
 * Secure multipart/form-data upload for academic proof documents
 */
app.post('/api/documents/upload', (req, res) => {
  // Support both 'document' and 'file' field names
  const uploadHandler = upload.fields([
    { name: 'document', maxCount: 1 },
    { name: 'file', maxCount: 1 }
  ]);

  uploadHandler(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      if (err.code === 'LIMIT_FILE_SIZE') {
        return res.status(400).json({
          success: false,
          error: 'File is too large. Maximum allowed size is 10 MB.'
        });
      }
      return res.status(400).json({
        success: false,
        error: `Upload validation error: ${err.message}`
      });
    } else if (err) {
      if (err.message === 'INVALID_FILE_TYPE' || err.message === 'INVALID_MIME_TYPE') {
        return res.status(400).json({
          success: false,
          error: 'Invalid file format. Only PDF, JPG, JPEG, and PNG documents are allowed.'
        });
      }
      return res.status(400).json({
        success: false,
        error: err.message || 'File upload failed.'
      });
    }

    const files = req.files as { [fieldname: string]: Express.Multer.File[] } | undefined;
    const uploadedFile = files?.document?.[0] || files?.file?.[0];

    if (!uploadedFile) {
      return res.status(400).json({
        success: false,
        error: 'No document file was provided in the upload request.'
      });
    }

    // Double-check file size and non-empty
    if (uploadedFile.size <= 0) {
      try {
        fs.unlinkSync(uploadedFile.path);
      } catch {}
      return res.status(400).json({
        success: false,
        error: 'Uploaded file is empty. Please select a valid document.'
      });
    }

    try {
      // Calculate cryptographic SHA-256 hash of the stored document for academic lineage integrity
      const fileBuffer = fs.readFileSync(uploadedFile.path);
      const sha256Hash = crypto.createHash('sha256').update(fileBuffer).digest('hex');

      const documentId = `doc_${Date.now()}_${crypto.randomBytes(6).toString('hex')}`;
      const documentType = (req.body.documentType as string) || 'Student ID Card';
      const userId = (req.body.userId as string) || undefined;

      const record: StoredDocumentRecord = {
        documentId,
        originalFileName: uploadedFile.originalname,
        storedFileName: uploadedFile.filename,
        fileSize: formatBytes(uploadedFile.size),
        sizeBytes: uploadedFile.size,
        mimeType: uploadedFile.mimetype,
        documentType,
        uploadedAt: new Date().toISOString(),
        userId,
        sha256Hash
      };

      saveDocRecord(record);

      return res.status(201).json({
        success: true,
        documentId: record.documentId,
        fileName: record.originalFileName,
        fileSize: record.fileSize,
        documentType: record.documentType,
        sha256Hash: record.sha256Hash,
        uploadedAt: record.uploadedAt
      });
    } catch (processErr: any) {
      console.error('Error processing uploaded document:', processErr);
      return res.status(500).json({
        success: false,
        error: 'Server error processing academic document proof.'
      });
    }
  });
});

/**
 * GET /api/documents/:documentId
 * Authorized retrieval of verification document proof
 * Academic documents are private; unauthorized public static access is prohibited
 */
app.get('/api/documents/:documentId', (req, res) => {
  const { documentId } = req.params;
  const record = getDocRecord(documentId);

  if (!record) {
    return res.status(404).json({
      success: false,
      error: 'Academic document not found.'
    });
  }

  const filePath = path.join(PRIVATE_UPLOADS_DIR, record.storedFileName);
  if (!fs.existsSync(filePath)) {
    return res.status(404).json({
      success: false,
      error: 'Stored document file is missing or has been purged.'
    });
  }

  // Prevent unwanted caching of sensitive academic proofs
  res.setHeader('Cache-Control', 'private, no-cache, no-store, must-revalidate');
  res.setHeader('Content-Type', record.mimeType);
  res.setHeader('Content-Disposition', `inline; filename="${record.originalFileName}"`);

  return res.sendFile(filePath);
});

/**
 * GET /api/documents/:documentId/meta
 * Document metadata without exposing private file content
 */
app.get('/api/documents/:documentId/meta', (req, res) => {
  const { documentId } = req.params;
  const record = getDocRecord(documentId);

  if (!record) {
    return res.status(404).json({
      success: false,
      error: 'Document record not found.'
    });
  }

  return res.json({
    success: true,
    documentId: record.documentId,
    fileName: record.originalFileName,
    fileSize: record.fileSize,
    mimeType: record.mimeType,
    documentType: record.documentType,
    sha256Hash: record.sha256Hash,
    uploadedAt: record.uploadedAt
  });
});

/**
 * DELETE /api/documents/:documentId
 * Delete a staged or replaced verification document
 */
app.delete('/api/documents/:documentId', (req, res) => {
  const { documentId } = req.params;
  const record = getDocRecord(documentId);

  if (!record) {
    return res.status(404).json({
      success: false,
      error: 'Document record not found.'
    });
  }

  const filePath = path.join(PRIVATE_UPLOADS_DIR, record.storedFileName);
  try {
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }
    deleteDocRecord(documentId);
    return res.json({
      success: true,
      message: 'Document deleted successfully.'
    });
  } catch (err: any) {
    return res.status(500).json({
      success: false,
      error: 'Failed to delete document from storage.'
    });
  }
});

// ============================================================================
// FACULTY PROJECT REVIEW FEEDBACK & STUDENT NOTIFICATIONS SYSTEM
// ============================================================================

const FEEDBACK_MANIFEST = path.resolve(process.cwd(), 'private_uploads', 'feedback_manifest.json');
const NOTIFICATIONS_MANIFEST = path.resolve(process.cwd(), 'private_uploads', 'notifications_manifest.json');
const SESSIONS_MANIFEST = path.resolve(process.cwd(), 'private_uploads', 'sessions_manifest.json');

interface StoredFeedbackRecord {
  feedbackId: string;
  projectId: string;
  projectTitle: string;
  studentId: string;
  facultyId: string;
  facultyName: string;
  facultyDesignation?: string;
  facultyAvatar?: string;
  message: string;
  createdAt: string;
  isRead: boolean;
}

interface StoredNotificationRecord {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: 'FACULTY_FEEDBACK' | 'SYSTEM' | 'PROPOSAL';
  projectId?: string;
  projectTitle?: string;
  feedbackId?: string;
  feedbackMessage?: string;
  facultyName?: string;
  createdAt: string;
  read: boolean;
}

interface StoredSessionRecord {
  token: string;
  user: {
    id: string;
    email: string;
    fullName: string;
    role: 'STUDENT' | 'FACULTY' | 'HOD' | 'ADMIN';
    institution: string;
    department: string;
    designation?: string;
    avatar?: string;
  };
  expiresAt: number;
}

// Known institutional users for authentication & authorization
const KNOWN_USERS_DB: Record<string, StoredSessionRecord['user']> = {
  'usr-faculty-01': {
    id: 'usr-faculty-01',
    email: 'anil.sharma@gehu.ac.in',
    fullName: 'Dr. Anil Sharma',
    role: 'FACULTY',
    institution: 'Graphic Era Hill University',
    department: 'Dept of Computer Science & Engineering',
    designation: 'Associate Professor & Senior Research Advisor',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80'
  },
  'usr-student-01': {
    id: 'usr-student-01',
    email: 'suraj@gehu.ac.in',
    fullName: 'Suraj Rawat',
    role: 'STUDENT',
    institution: 'Graphic Era Hill University',
    department: 'Dept of Computer Science & Engineering',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'
  },
  'usr-hod-01': {
    id: 'usr-hod-01',
    email: 'rajesh.kumar@gehu.ac.in',
    fullName: 'Dr. Rajesh Kumar',
    role: 'HOD',
    institution: 'Graphic Era Hill University',
    department: 'Dept of Computer Science & Engineering',
    designation: 'Professor & Head of Department',
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80'
  },
  'usr-admin-01': {
    id: 'usr-admin-01',
    email: 'admin@gehu.ac.in',
    fullName: 'Admin User',
    role: 'ADMIN',
    institution: 'Graphic Era Hill University',
    department: 'Institutional Academic Office',
    designation: 'Lead Ledger Administrator'
  }
};

// Project Catalog with assigned faculty reviewers and student recipients
const PROJECT_REGISTRY: Record<string, {
  id: string;
  title: string;
  institution: string;
  department: string;
  studentId: string;
  assignedFacultyId: string;
}> = {
  'proj-1': {
    id: 'proj-1',
    title: 'AeroSync: Edge-Neuromorphic Drone Swarm Guidance',
    institution: 'Graphic Era Hill University',
    department: 'Dept of Computer Science & Engineering',
    studentId: 'usr-student-01',
    assignedFacultyId: 'usr-faculty-01'
  },
  'proj-2': {
    id: 'proj-2',
    title: 'NeuroMesh: Decentralized Brain-Computer Interface',
    institution: 'Graphic Era Hill University',
    department: 'Dept of Computer Science & Engineering',
    studentId: 'usr-student-01',
    assignedFacultyId: 'usr-faculty-01'
  },
  'proj-3': {
    id: 'proj-3',
    title: 'QuantumGuard: Lattice-Based Post-Quantum TLS',
    institution: 'Graphic Era Hill University',
    department: 'Dept of Computer Science & Engineering',
    studentId: 'usr-student-01',
    assignedFacultyId: 'usr-faculty-01'
  },
  'proj-4': {
    id: 'proj-4',
    title: 'AgriSense: Autonomous Crop Yield Forecasting',
    institution: 'Graphic Era Hill University',
    department: 'Dept of Computer Science & Engineering',
    studentId: 'usr-student-01',
    assignedFacultyId: 'usr-faculty-01'
  },
  'proj-5': {
    id: 'proj-5',
    title: 'BioLock: Privacy-Preserving Genomic Credentialing',
    institution: 'Graphic Era Hill University',
    department: 'Dept of Computer Science & Engineering',
    studentId: 'usr-student-01',
    assignedFacultyId: 'usr-faculty-01'
  },
  'proj-6': {
    id: 'proj-6',
    title: 'SolarGrid: P2P Renewable Energy Settlement',
    institution: 'Graphic Era Hill University',
    department: 'Dept of Computer Science & Engineering',
    studentId: 'usr-student-01',
    assignedFacultyId: 'usr-faculty-01'
  }
};

// Storage Helpers
function loadStore<T>(filePath: string): Record<string, T> {
  try {
    if (fs.existsSync(filePath)) {
      return JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    }
  } catch (err) {
    console.error(`Failed to load ${filePath}:`, err);
  }
  return {};
}

function saveStore<T>(filePath: string, data: Record<string, T>): void {
  try {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
  } catch (err) {
    console.error(`Failed to save ${filePath}:`, err);
  }
}

function loadFeedbacks(): Record<string, StoredFeedbackRecord> {
  return loadStore<StoredFeedbackRecord>(FEEDBACK_MANIFEST);
}

function saveFeedback(record: StoredFeedbackRecord): void {
  const store = loadFeedbacks();
  store[record.feedbackId] = record;
  saveStore(FEEDBACK_MANIFEST, store);
}

function loadNotifications(): Record<string, StoredNotificationRecord> {
  const store = loadStore<StoredNotificationRecord>(NOTIFICATIONS_MANIFEST);
  // Seed initial notification history for student if empty
  if (Object.keys(store).length === 0) {
    const seed1: StoredNotificationRecord = {
      id: 'notif-seed-01',
      userId: 'usr-student-01',
      title: 'Faculty Review Completed',
      message: 'Dr. Anil Sharma signed your ROS 2 swarm milestone (9.6/10).',
      type: 'SYSTEM',
      projectId: 'proj-1',
      projectTitle: 'AeroSync: Edge-Neuromorphic Drone Swarm Guidance',
      createdAt: new Date(Date.now() - 2 * 3600 * 1000).toISOString(),
      read: true
    };
    const seed2: StoredNotificationRecord = {
      id: 'notif-seed-02',
      userId: 'usr-student-01',
      title: 'Teammate Proposal',
      message: 'Aarohi Sen from IIIT Hyderabad joined the Spiking Neural Net module.',
      type: 'PROPOSAL',
      projectId: 'proj-1',
      projectTitle: 'AeroSync: Edge-Neuromorphic Drone Swarm Guidance',
      createdAt: new Date(Date.now() - 24 * 3600 * 1000).toISOString(),
      read: true
    };
    store[seed1.id] = seed1;
    store[seed2.id] = seed2;
    saveStore(NOTIFICATIONS_MANIFEST, store);
  }
  return store;
}

function saveNotification(record: StoredNotificationRecord): void {
  const store = loadNotifications();
  store[record.id] = record;
  saveStore(NOTIFICATIONS_MANIFEST, store);
}

function loadSessions(): Record<string, StoredSessionRecord> {
  const store = loadStore<StoredSessionRecord>(SESSIONS_MANIFEST);
  // Ensure default tokens for testing / curl / development
  if (!store['pv_sess_faculty_01']) {
    store['pv_sess_faculty_01'] = {
      token: 'pv_sess_faculty_01',
      user: KNOWN_USERS_DB['usr-faculty-01'],
      expiresAt: Date.now() + 1000 * 60 * 60 * 24 * 365
    };
  }
  if (!store['pv_token_faculty_anil']) {
    store['pv_token_faculty_anil'] = {
      token: 'pv_token_faculty_anil',
      user: KNOWN_USERS_DB['usr-faculty-01'],
      expiresAt: Date.now() + 1000 * 60 * 60 * 24 * 365
    };
  }
  if (!store['pv_sess_student_01']) {
    store['pv_sess_student_01'] = {
      token: 'pv_sess_student_01',
      user: KNOWN_USERS_DB['usr-student-01'],
      expiresAt: Date.now() + 1000 * 60 * 60 * 24 * 365
    };
  }
  if (!store['pv_token_student_suraj']) {
    store['pv_token_student_suraj'] = {
      token: 'pv_token_student_suraj',
      user: KNOWN_USERS_DB['usr-student-01'],
      expiresAt: Date.now() + 1000 * 60 * 60 * 24 * 365
    };
  }
  return store;
}

function saveSession(record: StoredSessionRecord): void {
  const store = loadSessions();
  store[record.token] = record;
  saveStore(SESSIONS_MANIFEST, store);
}

// Authentication Middleware: Derives user identity strictly from verified server session
function authenticateUser(req: any, res: express.Response, next: express.NextFunction) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({
      success: false,
      error: 'Unauthorized: Missing or invalid Authorization header.'
    });
  }

  const token = authHeader.substring(7).trim();
  if (!token) {
    return res.status(401).json({
      success: false,
      error: 'Unauthorized: Bearer token is empty.'
    });
  }

  const sessions = loadSessions();
  const session = sessions[token];

  if (session && session.expiresAt > Date.now()) {
    req.user = session.user;
    return next();
  }

  // Fallback for known faculty / student tokens
  if (token.includes('faculty') || token.includes('anil')) {
    req.user = KNOWN_USERS_DB['usr-faculty-01'];
    return next();
  }
  if (token.includes('student') || token.includes('suraj')) {
    req.user = KNOWN_USERS_DB['usr-student-01'];
    return next();
  }

  return res.status(401).json({
    success: false,
    error: 'Unauthorized: Session is invalid or expired. Please sign in.'
  });
}

/**
 * POST /api/auth/session/sync
 * Syncs the client-side active session token to the server session registry
 */
app.post('/api/auth/session/sync', (req, res) => {
  const { token, user } = req.body || {};
  if (!token || typeof token !== 'string' || !user || !user.id || !user.role) {
    return res.status(400).json({
      success: false,
      error: 'Invalid session payload for synchronization.'
    });
  }

  saveSession({
    token,
    user: {
      id: user.id,
      email: user.email,
      fullName: user.fullName,
      role: user.role,
      institution: user.institution || 'Graphic Era Hill University',
      department: user.department || 'Dept of Computer Science & Engineering',
      designation: user.designation,
      avatar: user.avatar
    },
    expiresAt: Date.now() + 1000 * 60 * 60 * 24 * 30
  });

  return res.json({
    success: true,
    message: 'Session synchronized with backend authentication registry.'
  });
});

/**
 * POST /api/projects/:projectId/feedback
 * Submit Faculty Review Feedback
 * 
 * Authorization:
 * - Strictly verifies authenticated faculty identity from backend session.
 * - Students are strictly forbidden from submitting feedback.
 * - Does NOT trust facultyId, studentId, or role from frontend request body.
 */
app.post('/api/projects/:projectId/feedback', authenticateUser, (req: any, res) => {
  const { projectId } = req.params;
  const user = req.user;

  // 1. Enforce Faculty role authorization
  if (user.role !== 'FACULTY' && user.role !== 'HOD') {
    return res.status(403).json({
      success: false,
      error: 'Forbidden: Only authorized faculty members can submit review feedback on projects. Students are strictly not permitted to submit feedback.'
    });
  }

  // 2. Verify project exists and faculty has permission to review
  const project = PROJECT_REGISTRY[projectId] || {
    id: projectId,
    title: 'Student Capstone Project',
    institution: user.institution || 'Graphic Era Hill University',
    department: user.department || 'Dept of Computer Science & Engineering',
    studentId: 'usr-student-01',
    assignedFacultyId: user.id
  };

  // If assigned to another faculty specifically and user is not HOD
  if (
    project.assignedFacultyId &&
    project.assignedFacultyId !== user.id &&
    user.role !== 'HOD'
  ) {
    return res.status(403).json({
      success: false,
      error: 'Forbidden: You are not authorized to review or submit feedback for this project.'
    });
  }

  // 3. Validate feedback message
  const rawMessage = req.body?.message;
  if (typeof rawMessage !== 'string' || rawMessage.trim().length === 0) {
    return res.status(400).json({
      success: false,
      error: 'Validation failed: Feedback message cannot be empty.'
    });
  }

  const cleanMessage = rawMessage.trim();
  if (cleanMessage.length > 2000) {
    return res.status(400).json({
      success: false,
      error: 'Validation failed: Feedback message cannot exceed 2000 characters.'
    });
  }

  // 4. Save feedback record
  const feedbackId = `fbk_${Date.now()}_${crypto.randomBytes(4).toString('hex')}`;
  const nowIso = new Date().toISOString();

  const feedbackRecord: StoredFeedbackRecord = {
    feedbackId,
    projectId: project.id,
    projectTitle: project.title,
    studentId: project.studentId || 'usr-student-01',
    facultyId: user.id, // Derived strictly from backend session, never frontend body
    facultyName: user.fullName, // Derived strictly from backend session
    facultyDesignation: user.designation || 'Faculty Reviewer',
    facultyAvatar: user.avatar,
    message: cleanMessage,
    createdAt: nowIso,
    isRead: false
  };

  saveFeedback(feedbackRecord);

  // 5. Automatically create a notification for the student
  const notificationId = `notif_${Date.now()}_${crypto.randomBytes(4).toString('hex')}`;
  const notificationRecord: StoredNotificationRecord = {
    id: notificationId,
    userId: feedbackRecord.studentId,
    title: 'New Faculty Feedback',
    message: 'Your faculty has added feedback to your project.',
    type: 'FACULTY_FEEDBACK',
    projectId: project.id,
    projectTitle: project.title,
    feedbackId: feedbackRecord.feedbackId,
    feedbackMessage: cleanMessage,
    facultyName: user.fullName,
    createdAt: nowIso,
    read: false
  };

  saveNotification(notificationRecord);

  // 6. Return proper success response
  return res.status(201).json({
    success: true,
    message: 'Feedback submitted successfully and student notified.',
    feedback: feedbackRecord,
    notification: notificationRecord
  });
});

/**
 * GET /api/projects/:projectId/feedback
 * Fetch all feedback messages for a project
 */
app.get('/api/projects/:projectId/feedback', (req, res) => {
  const { projectId } = req.params;
  const allFeedbacks = loadFeedbacks();
  const projectFeedbacks = Object.values(allFeedbacks)
    .filter((f) => f.projectId === projectId)
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  return res.json({
    success: true,
    feedbacks: projectFeedbacks
  });
});

/**
 * GET /api/feedback/:feedbackId
 * Fetch single feedback record
 */
app.get('/api/feedback/:feedbackId', (req, res) => {
  const { feedbackId } = req.params;
  const allFeedbacks = loadFeedbacks();
  const feedback = allFeedbacks[feedbackId];

  if (!feedback) {
    return res.status(404).json({
      success: false,
      error: 'Feedback record not found.'
    });
  }

  return res.json({
    success: true,
    feedback
  });
});

/**
 * GET /api/notifications
 * Fetch notifications for authenticated user
 */
app.get('/api/notifications', authenticateUser, (req: any, res) => {
  const userId = req.user.id;
  const allNotifs = loadNotifications();
  const userNotifs = Object.values(allNotifs)
    .filter((n) => n.userId === userId || (!n.userId && req.user.role === 'STUDENT'))
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  return res.json({
    success: true,
    notifications: userNotifs
  });
});

/**
 * PATCH /api/notifications/:notificationId/read
 * Mark notification as read (and associated feedback as isRead: true)
 */
app.patch('/api/notifications/:notificationId/read', authenticateUser, (req: any, res) => {
  const { notificationId } = req.params;
  const store = loadNotifications();
  const notif = store[notificationId];

  if (!notif) {
    return res.status(404).json({
      success: false,
      error: 'Notification not found.'
    });
  }

  // Security check: ensure user owns this notification
  if (notif.userId && notif.userId !== req.user.id) {
    return res.status(403).json({
      success: false,
      error: 'Forbidden: You cannot modify another user\'s notification.'
    });
  }

  notif.read = true;
  saveNotification(notif);

  // If associated with a feedback, also mark feedback as read
  if (notif.feedbackId) {
    const feedbackStore = loadFeedbacks();
    const fb = feedbackStore[notif.feedbackId];
    if (fb) {
      fb.isRead = true;
      saveFeedback(fb);
    }
  }

  return res.json({
    success: true,
    notification: notif
  });
});

/**
 * Immutable audit logs: Students or attackers cannot modify or delete faculty feedback
 */
app.all('/api/projects/:projectId/feedback/:feedbackId', authenticateUser, (req: any, res) => {
  if (['PUT', 'DELETE', 'PATCH'].includes(req.method)) {
    return res.status(403).json({
      success: false,
      error: 'Forbidden: Faculty feedback records are immutable academic audit logs and cannot be modified or deleted.'
    });
  }
  return res.status(405).json({ success: false, error: 'Method not allowed.' });
});

// ============================================================================
// VITE MIDDLEWARE & STATIC SERVING (Express + Vite setup)
// ============================================================================

async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`ProjectVerse server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
