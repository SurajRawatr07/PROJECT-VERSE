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
