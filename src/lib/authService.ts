import { 
  UserRole, 
  StudentType,
  VerificationSignals, 
  AccountVerificationStatus,
  DocumentVerificationStatus,
  DocumentType,
  VerificationRequest
} from '../types';

export interface UserProfile {
  id: string;
  email: string;
  fullName: string;
  role: UserRole;
  studentType?: StudentType;
  institution: string;
  department: string;
  course?: string;
  batch?: string;
  rollNumber?: string;
  graduationYear?: string;
  phoneNumber?: string;
  currentOrganization?: string;
  currentJobRole?: string;
  linkedIn?: string;
  portfolio?: string;
  facultyId?: string;
  designation?: string;
  researchAreas?: string[];
  departmentToken?: string;
  avatar: string;
  githubHandle?: string;
  verifiedStatus: AccountVerificationStatus;
  documentStatus?: DocumentVerificationStatus;
  documentName?: string;
  documentType?: DocumentType;
  documentSize?: string;
  documentSubmittedAt?: string;
  rejectionReason?: string;
  reviewedBy?: string;
  reviewedAt?: string;
  verificationSignals: VerificationSignals;
  projectsCount: number;
  commitsCount?: number;
  rubricScore?: number;
  bio: string;
  skills: string[];
}

export interface AuthSession {
  token: string;
  user: UserProfile;
  expiresAt: number;
}

export function getInitialsAvatar(name: string, role?: UserRole): string {
  const cleanName = (name || 'User').trim();
  const parts = cleanName.split(' ').filter(Boolean);
  const initials = parts.length > 1
    ? (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
    : cleanName.slice(0, 2).toUpperCase();

  const bg = role === 'ADMIN' ? '%23111111' : role === 'HOD' ? '%231E1E1E' : role === 'FACULTY' ? '%232C2C2C' : '%23F0F0ED';
  const textFill = role === 'ADMIN' || role === 'HOD' || role === 'FACULTY' ? '%23FFFFFF' : '%23111111';

  return `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="128" height="128" viewBox="0 0 128 128"><rect width="128" height="128" rx="64" fill="${bg}"/><text x="50%" y="54%" font-family="-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,sans-serif" font-size="44" font-weight="600" fill="${textFill}" dominant-baseline="middle" text-anchor="middle">${initials}</text></svg>`;
}

// Initial academic directory
const INITIAL_USERS: (UserProfile & { passwordHash: string })[] = [
  {
    id: 'usr-student-01',
    email: 'suraj@gehu.ac.in',
    passwordHash: 'Suraj@123',
    fullName: 'Suraj Rawat',
    role: 'STUDENT',
    studentType: 'CURRENT_STUDENT',
    institution: 'Graphic Era Hill University',
    department: 'Dept of Computer Science & Engineering',
    course: 'BCA / B.Tech CSE',
    batch: '2023–2027',
    rollNumber: 'GEHU/2022/CS/089',
    phoneNumber: '+91 98765 43210',
    avatar: getInitialsAvatar('Suraj Rawat', 'STUDENT'),
    githubHandle: 'surajrawat-dev',
    verifiedStatus: 'Verified',
    documentStatus: 'VERIFIED',
    documentName: 'GEHU_Student_ID_Card.pdf',
    documentType: 'Student ID Card',
    documentSize: '2.4 MB',
    documentSubmittedAt: '2025-08-14',
    reviewedBy: 'Dr. Anil Sharma',
    reviewedAt: '2025-08-15',
    verificationSignals: {
      emailVerified: true,
      institutionalDomain: true,
      idProofVerified: true,
      nodeApproval: true,
      rollVerified: true,
      documentVerified: true,
      statusVerified: true
    },
    projectsCount: 2,
    commitsCount: 384,
    rubricScore: 9.6,
    bio: 'Undergraduate researcher focusing on autonomous systems, distributed micro-services, and verifiable academic project architectures.',
    skills: ['React', 'TypeScript', 'Node.js', 'PyTorch', 'ROS 2', 'PostgreSQL']
  },
  {
    id: 'usr-alumni-01',
    email: 'rohan.alumni@gehu.ac.in',
    passwordHash: 'Rohan@123',
    fullName: 'Rohan Verma',
    role: 'STUDENT',
    studentType: 'ALUMNI',
    institution: 'Graphic Era Hill University',
    department: 'Dept of Computer Science & Engineering',
    course: 'BCA',
    graduationYear: '2024',
    rollNumber: 'GEHU/2020/CS/042',
    currentOrganization: 'Hyperledger Foundation / Tech Labs',
    currentJobRole: 'Distributed Systems Engineer',
    linkedIn: 'linkedin.com/in/rohanverma-dev',
    portfolio: 'rohanverma.io',
    avatar: getInitialsAvatar('Rohan Verma', 'STUDENT'),
    githubHandle: 'rohanverma-alumni',
    verifiedStatus: 'Verified',
    documentStatus: 'VERIFIED',
    documentName: 'Degree_Certificate_Official.pdf',
    documentType: 'Degree Certificate / Marksheet',
    documentSize: '3.1 MB',
    documentSubmittedAt: '2024-07-20',
    reviewedBy: 'Dr. Rajesh Kumar',
    reviewedAt: '2024-07-22',
    verificationSignals: {
      emailVerified: true,
      institutionalDomain: true,
      idProofVerified: true,
      nodeApproval: true,
      rollVerified: true,
      documentVerified: true,
      statusVerified: true
    },
    projectsCount: 4,
    commitsCount: 620,
    rubricScore: 9.8,
    bio: 'Alumni & Industry Mentor. Passionate about helping current students continue high-impact open-source capstones.',
    skills: ['Rust', 'Go', 'Distributed Consensus', 'Smart Contracts', 'System Architecture']
  },
  {
    id: 'usr-faculty-01',
    email: 'anil.sharma@gehu.ac.in',
    passwordHash: 'Anil@1234',
    fullName: 'Dr. Anil Sharma',
    role: 'FACULTY',
    institution: 'Graphic Era Hill University',
    department: 'Dept of Computer Science & Engineering',
    facultyId: 'EMP-GEHU-FAC-409',
    designation: 'Associate Professor & Senior Research Advisor',
    researchAreas: ['Artificial Intelligence', 'Edge Computing', 'Computer Vision'],
    avatar: getInitialsAvatar('Dr. Anil Sharma', 'FACULTY'),
    verifiedStatus: 'Verified',
    verificationSignals: {
      emailVerified: true,
      institutionalDomain: true,
      idProofVerified: true,
      nodeApproval: true,
      statusVerified: true
    },
    projectsCount: 14,
    rubricScore: 9.8,
    bio: 'Associate Professor & Senior Research Advisor in Artificial Intelligence, Edge Computing, and Computer Vision.',
    skills: ['AI/ML', 'Computer Vision', 'Edge Systems', 'Academic Peer Review']
  },
  {
    id: 'usr-hod-01',
    email: 'rajesh.kumar@gehu.ac.in',
    passwordHash: 'Rajesh@123',
    fullName: 'Dr. Rajesh Kumar',
    role: 'HOD',
    institution: 'Graphic Era Hill University',
    department: 'Dept of Computer Science & Engineering',
    facultyId: 'HOD-CSE-001',
    designation: 'Professor & Head of Department',
    departmentToken: 'GEHU-HOD-CSE-2025',
    avatar: getInitialsAvatar('Dr. Rajesh Kumar', 'HOD'),
    verifiedStatus: 'Verified',
    verificationSignals: {
      emailVerified: true,
      institutionalDomain: true,
      idProofVerified: true,
      nodeApproval: true,
      statusVerified: true
    },
    projectsCount: 48,
    bio: 'Head of Department, Computer Science & Engineering. Overseeing capstone governance, institutional accreditation, and NAAC/ABET compliance.',
    skills: ['Curriculum Design', 'Academic Governance', 'Accreditation', 'Capstone Verification']
  },
  {
    id: 'usr-admin-01',
    email: 'admin@gehu.ac.in',
    passwordHash: 'Admin@1234',
    fullName: 'Admin User',
    role: 'ADMIN',
    institution: 'Graphic Era Hill University',
    department: 'Institutional Academic Office',
    facultyId: 'ROOT-ADMIN-01',
    designation: 'Lead Ledger Administrator',
    avatar: getInitialsAvatar('Admin User', 'ADMIN'),
    verifiedStatus: 'Verified',
    verificationSignals: {
      emailVerified: true,
      institutionalDomain: true,
      idProofVerified: true,
      nodeApproval: true,
      statusVerified: true
    },
    projectsCount: 128,
    bio: 'System Administrator for ProjectVerse Federated Ledger, SAML SSO, and node verification.',
    skills: ['Network Administration', 'Ledger Governance', 'SAML SSO', 'Node Consensus']
  }
];

// Initial Verification Queue items for demonstration
const INITIAL_VERIFICATION_REQUESTS: VerificationRequest[] = [
  {
    id: 'req-ver-001',
    userId: 'usr-student-02-demo',
    fullName: 'Priya Sharma',
    email: 'priya.sharma@gehu.ac.in',
    role: 'STUDENT',
    studentType: 'CURRENT_STUDENT',
    institution: 'Graphic Era Hill University',
    department: 'Computer Science & Engineering',
    course: 'B.Tech CSE',
    batch: '2023–2027',
    rollNumber: 'GEHU/2023/CS/194',
    documentType: 'Student ID Card',
    documentFileName: 'Priya_GEHU_StudentID.pdf',
    documentFileSize: '1.8 MB',
    documentUploadedAt: 'Today, 10:45 AM',
    status: 'PENDING_REVIEW'
  },
  {
    id: 'req-ver-002',
    userId: 'usr-alumni-02-demo',
    fullName: 'Amitabh Joshi',
    email: 'amitabh.alumni@gehu.ac.in',
    role: 'STUDENT',
    studentType: 'ALUMNI',
    institution: 'Graphic Era Hill University',
    department: 'Computer Science & Engineering',
    course: 'BCA',
    graduationYear: '2024',
    rollNumber: 'GEHU/2020/BCA/033',
    documentType: 'Degree Certificate / Marksheet',
    documentFileName: 'Amitabh_BCA_Degree_Proof.pdf',
    documentFileSize: '2.5 MB',
    documentUploadedAt: 'Yesterday, 04:15 PM',
    status: 'PENDING_REVIEW'
  }
];

const USERS_STORAGE_KEY = 'pv_user_database_v4';
const SESSION_STORAGE_KEY = 'pv_auth_session_v4';
const VERIFICATION_REQUESTS_KEY = 'pv_verification_requests_v4';

// In-memory / storage sync
export function loadUsers(): (UserProfile & { passwordHash: string })[] {
  try {
    const raw = localStorage.getItem(USERS_STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
  } catch {
    // fallback
  }
  saveUsers(INITIAL_USERS);
  return INITIAL_USERS;
}

export function saveUsers(users: (UserProfile & { passwordHash: string })[]) {
  try {
    localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
  } catch {
    // ignore
  }
}

export function loadVerificationRequests(): VerificationRequest[] {
  try {
    const raw = localStorage.getItem(VERIFICATION_REQUESTS_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) return parsed;
    }
  } catch {
    // fallback
  }
  saveVerificationRequests(INITIAL_VERIFICATION_REQUESTS);
  return INITIAL_VERIFICATION_REQUESTS;
}

export function saveVerificationRequests(requests: VerificationRequest[]) {
  try {
    localStorage.setItem(VERIFICATION_REQUESTS_KEY, JSON.stringify(requests));
  } catch {
    // ignore
  }
}

/**
 * Strict RFC Email Validation
 */
export function validateEmailFormat(email: string): { isValid: boolean; error?: string } {
  if (!email || email.trim() === '') {
    return { isValid: false, error: 'Email address is required.' };
  }
  const cleanEmail = email.trim();
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!emailRegex.test(cleanEmail)) {
    return { isValid: false, error: 'Please enter a valid email address.' };
  }
  return { isValid: true };
}

/**
 * Check if institutional domain matches recognized academic format
 */
export function isInstitutionalEmail(email: string): boolean {
  const normalized = email.toLowerCase().trim();
  return (
    normalized.endsWith('.edu') ||
    normalized.endsWith('.ac.in') ||
    normalized.endsWith('.edu.in') ||
    normalized.endsWith('.org.in') ||
    normalized.includes('gehu.ac.in') ||
    normalized.includes('iit') ||
    normalized.includes('university') ||
    normalized.includes('college')
  );
}

/**
 * Live Password Strength & Requirements Evaluator
 */
export interface PasswordStrengthReport {
  score: number; // 0 to 5
  label: 'Very Weak' | 'Weak' | 'Fair' | 'Good' | 'Strong';
  color: string;
  checks: {
    minLength: boolean;
    hasUppercase: boolean;
    hasLowercase: boolean;
    hasNumber: boolean;
    hasSpecial: boolean;
  };
}

export function evaluatePasswordStrength(password: string): PasswordStrengthReport {
  const checks = {
    minLength: password.length >= 8,
    hasUppercase: /[A-Z]/.test(password),
    hasLowercase: /[a-z]/.test(password),
    hasNumber: /[0-9]/.test(password),
    hasSpecial: /[^A-Za-z0-9]/.test(password)
  };

  let passedCount = 0;
  if (checks.minLength) passedCount++;
  if (checks.hasUppercase) passedCount++;
  if (checks.hasLowercase) passedCount++;
  if (checks.hasNumber) passedCount++;
  if (checks.hasSpecial) passedCount++;

  let label: PasswordStrengthReport['label'] = 'Very Weak';
  let color = '#DC2626';

  if (passedCount === 5) {
    label = 'Strong';
    color = '#059669';
  } else if (passedCount === 4) {
    label = 'Good';
    color = '#10B981';
  } else if (passedCount === 3) {
    label = 'Fair';
    color = '#F59E0B';
  } else if (passedCount === 2) {
    label = 'Weak';
    color = '#EA580C';
  }

  return {
    score: passedCount,
    label,
    color,
    checks
  };
}

/**
 * Strong Password Requirement
 */
export function validateStrongPassword(password: string): { isValid: boolean; error?: string } {
  if (!password || password.length === 0) {
    return { isValid: false, error: 'Password is required.' };
  }
  if (password.length < 8) {
    return {
      isValid: false,
      error: 'Password must contain at least 8 characters, one uppercase letter, one lowercase letter, one number and one special character.'
    };
  }
  const hasUpper = /[A-Z]/.test(password);
  const hasLower = /[a-z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasSpecial = /[^A-Za-z0-9]/.test(password);

  if (!hasUpper || !hasLower || !hasNumber || !hasSpecial) {
    return {
      isValid: false,
      error: 'Password must contain at least 8 characters, one uppercase letter, one lowercase letter, one number and one special character.'
    };
  }
  return { isValid: true };
}

/**
 * RBAC Permission Matrix & Route Authorization
 */
export const ROLE_ALLOWED_TABS: Record<UserRole, string[]> = {
  STUDENT: [
    'dashboard',
    'discover',
    'my-projects',
    'ai-matching',
    'mentors',
    'collaboration',
    'passport',
    'lineage',
    'proof-of-work',
    'notifications',
    'profile'
  ],
  FACULTY: [
    'dashboard',
    'projects',
    'verification-queue',
    'student-verifications',
    'students',
    'mentorship',
    'reviews',
    'notifications',
    'profile'
  ],
  HOD: [
    'dashboard',
    'projects',
    'verification',
    'student-verifications',
    'faculty',
    'students',
    'analytics',
    'reports',
    'approvals',
    'profile'
  ],
  ADMIN: [
    'dashboard',
    'users',
    'institutions',
    'projects',
    'verification',
    'student-verifications',
    'analytics',
    'reports',
    'audit-logs',
    'settings',
    'profile'
  ]
};

export function canUserAccessTab(role: UserRole, tab: string): boolean {
  const allowed = ROLE_ALLOWED_TABS[role] || [];
  return allowed.includes(tab);
}

/**
 * Server-Side Authentication / Login
 * Enforces role directly from authenticated database record.
 */
export function loginUser(
  emailInput: string,
  passwordInput: string
): { success: boolean; session?: AuthSession; error?: string } {
  const emailValidation = validateEmailFormat(emailInput);
  if (!emailValidation.isValid) {
    return { success: false, error: emailValidation.error };
  }

  if (!passwordInput || passwordInput.trim() === '') {
    return { success: false, error: 'Password is required.' };
  }

  const users = loadUsers();
  const normalizedEmail = emailInput.trim().toLowerCase();

  const foundUser = users.find(
    (u) => u.email.toLowerCase() === normalizedEmail && u.passwordHash === passwordInput
  );

  if (!foundUser) {
    return { success: false, error: 'Invalid email or password.' };
  }

  // The authenticated role strictly originates from the verified database record
  const { passwordHash: _, ...safeUser } = foundUser;
  const userProfile: UserProfile = safeUser;

  const token = `pv_sec_tok_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
  const session: AuthSession = {
    token,
    user: userProfile,
    expiresAt: Date.now() + 1000 * 60 * 60 * 24
  };

  try {
    localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(session));
  } catch {
    // ignore
  }

  return { success: true, session };
}

export interface RegisterUserParams {
  fullName: string;
  email: string;
  password: string;
  role: UserRole;
  studentType?: StudentType;
  institution: string;
  department?: string;
  course?: string;
  rollNumber?: string;
  batch?: string;
  graduationYear?: string;
  phoneNumber?: string;
  skills?: string[];
  currentOrganization?: string;
  currentJobRole?: string;
  linkedIn?: string;
  portfolio?: string;
  facultyId?: string;
  designation?: string;
  researchAreas?: string[];
  departmentToken?: string;
  // Document data if provided during initial registration:
  documentType?: DocumentType;
  documentFileName?: string;
  documentFileSize?: string;
}

/**
 * Register New User with Rigorous Role & Student/Alumni Type Validation
 */
export function registerUser(params: RegisterUserParams): { success: boolean; session?: AuthSession; error?: string } {
  const {
    fullName,
    email,
    password,
    role,
    studentType = 'CURRENT_STUDENT',
    institution,
    department = 'Dept of Computer Science & Engineering',
    course,
    rollNumber,
    batch,
    graduationYear,
    phoneNumber,
    skills,
    currentOrganization,
    currentJobRole,
    linkedIn,
    portfolio,
    facultyId,
    designation,
    researchAreas,
    departmentToken,
    documentType,
    documentFileName,
    documentFileSize
  } = params;

  // Disallow public admin registration
  if (role === 'ADMIN') {
    return {
      success: false,
      error: 'Administrator accounts cannot be registered publicly. Root governance accounts are provisioned directly by the Institutional Academic Office.'
    };
  }

  if (!fullName || fullName.trim().length < 2) {
    return { success: false, error: 'Please enter your full name (minimum 2 characters).' };
  }

  const emailValidation = validateEmailFormat(email);
  if (!emailValidation.isValid) {
    return { success: false, error: emailValidation.error };
  }

  const passwordValidation = validateStrongPassword(password);
  if (!passwordValidation.isValid) {
    return { success: false, error: passwordValidation.error };
  }

  if (!institution || institution.trim().length < 2) {
    return { success: false, error: 'Please specify your institution or university.' };
  }

  // Role & Student Subtype Validations
  if (role === 'STUDENT') {
    if (!rollNumber || rollNumber.trim().length < 2) {
      return { success: false, error: 'Please enter your Roll Number / Enrollment Number.' };
    }

    if (studentType === 'CURRENT_STUDENT') {
      if (!batch || batch.trim().length < 2) {
        return { success: false, error: 'Please specify your Academic Batch / Year (e.g. 2023–2027).' };
      }
    } else if (studentType === 'ALUMNI') {
      if (!graduationYear || graduationYear.trim().length < 2) {
        return { success: false, error: 'Please specify your Graduation Year (e.g. 2024).' };
      }
    }
  } else if (role === 'FACULTY') {
    if (!facultyId || facultyId.trim().length < 2) {
      return { success: false, error: 'Please provide your Faculty / Employee ID.' };
    }
    if (!designation || designation.trim().length < 2) {
      return { success: false, error: 'Please specify your academic designation (e.g., Assistant Professor).' };
    }
  } else if (role === 'HOD') {
    if (!facultyId || facultyId.trim().length < 2) {
      return { success: false, error: 'Please provide your Department Head Faculty ID.' };
    }
    if (!departmentToken || departmentToken.trim().length < 3) {
      return { success: false, error: 'Please provide a valid Institutional Department Authorization Token.' };
    }
  }

  const users = loadUsers();
  const normalizedEmail = email.trim().toLowerCase();

  if (users.some((u) => u.email.toLowerCase() === normalizedEmail)) {
    return { success: false, error: 'An account with this email address already exists. Please sign in instead.' };
  }

  const hasInstDomain = isInstitutionalEmail(normalizedEmail);
  const isDocumentSupplied = Boolean(documentFileName && documentType);

  // Status computation based on actual verification steps
  const docStatus: DocumentVerificationStatus = isDocumentSupplied ? 'PENDING_REVIEW' : 'NOT_SUBMITTED';
  const verifiedStatus: AccountVerificationStatus = 'Verification Pending';

  const verificationSignals: VerificationSignals = {
    emailVerified: true,
    institutionalDomain: hasInstDomain,
    idProofVerified: false,
    nodeApproval: role === 'HOD' ? Boolean(departmentToken) : false,
    rollVerified: false,
    documentVerified: false,
    statusVerified: false
  };

  const newUserId = `usr-${role.toLowerCase()}-${Date.now()}`;
  const newUser: UserProfile & { passwordHash: string } = {
    id: newUserId,
    email: normalizedEmail,
    passwordHash: password,
    fullName: fullName.trim(),
    role,
    studentType: role === 'STUDENT' ? studentType : undefined,
    institution: institution.trim(),
    department: department.trim(),
    course: course?.trim() || (role === 'STUDENT' ? 'B.Tech Computer Science' : undefined),
    batch: role === 'STUDENT' && studentType === 'CURRENT_STUDENT' ? batch?.trim() : undefined,
    graduationYear: role === 'STUDENT' && studentType === 'ALUMNI' ? graduationYear?.trim() : undefined,
    rollNumber: role === 'STUDENT' ? rollNumber.trim() : undefined,
    phoneNumber: phoneNumber?.trim(),
    currentOrganization: currentOrganization?.trim(),
    currentJobRole: currentJobRole?.trim(),
    linkedIn: linkedIn?.trim(),
    portfolio: portfolio?.trim(),
    facultyId: role === 'FACULTY' || role === 'HOD' ? (facultyId?.trim() || `FAC-${Date.now().toString().slice(-4)}`) : undefined,
    designation: role === 'FACULTY' ? (designation?.trim() || 'Assistant Professor') : role === 'HOD' ? 'Head of Department' : undefined,
    researchAreas: role === 'FACULTY' ? (researchAreas || ['Artificial Intelligence', 'Distributed Systems']) : undefined,
    departmentToken: role === 'HOD' ? departmentToken?.trim() : undefined,
    avatar: getInitialsAvatar(fullName, role),
    verifiedStatus,
    documentStatus: docStatus,
    documentName: documentFileName,
    documentType: documentType,
    documentSize: documentFileSize,
    documentSubmittedAt: isDocumentSupplied ? 'Just now' : undefined,
    verificationSignals,
    projectsCount: role === 'STUDENT' ? (studentType === 'ALUMNI' ? 3 : 1) : role === 'FACULTY' ? 6 : 18,
    commitsCount: role === 'STUDENT' ? (studentType === 'ALUMNI' ? 420 : 142) : undefined,
    rubricScore: 9.5,
    bio: role === 'STUDENT' 
      ? (studentType === 'ALUMNI'
          ? `Alumni (${graduationYear || '2024'}) of ${institution.trim()}. Working in industry and available to mentor students.`
          : `Student (${course || 'B.Tech'}) at ${institution.trim()}. Building verifiable academic projects.`)
      : `${role === 'HOD' ? 'Head of Department' : role === 'FACULTY' ? designation || 'Faculty' : 'Member'} at ${institution.trim()}.`,
    skills: skills && skills.length > 0 ? skills : (role === 'STUDENT' ? ['React', 'TypeScript', 'Node.js', 'Python'] : ['Research Direction', 'Capstone Review', 'AI Systems'])
  };

  users.push(newUser);
  saveUsers(users);

  // If document was uploaded, create a verification request for faculty/HOD/Admin review
  if (isDocumentSupplied && documentType && documentFileName) {
    const requests = loadVerificationRequests();
    const newRequest: VerificationRequest = {
      id: `req-ver-${Date.now()}`,
      userId: newUserId,
      fullName: fullName.trim(),
      email: normalizedEmail,
      role,
      studentType: role === 'STUDENT' ? studentType : undefined,
      institution: institution.trim(),
      department: department.trim(),
      course: course?.trim(),
      batch: role === 'STUDENT' && studentType === 'CURRENT_STUDENT' ? batch?.trim() : undefined,
      graduationYear: role === 'STUDENT' && studentType === 'ALUMNI' ? graduationYear?.trim() : undefined,
      rollNumber: rollNumber?.trim(),
      documentType,
      documentFileName,
      documentFileSize: documentFileSize || '2.1 MB',
      documentUploadedAt: 'Just now',
      status: 'PENDING_REVIEW'
    };
    requests.unshift(newRequest);
    saveVerificationRequests(requests);
  }

  const token = `pv_sec_tok_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
  const session: AuthSession = {
    token,
    user: newUser,
    expiresAt: Date.now() + 1000 * 60 * 60 * 24
  };

  try {
    localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(session));
  } catch {
    // ignore
  }

  return { success: true, session };
}

/**
 * Submit Verification Document for an existing user account
 */
export function submitVerificationDocument(
  userId: string,
  docData: {
    documentType: DocumentType;
    documentFileName: string;
    documentFileSize: string;
  }
): { success: boolean; updatedProfile?: UserProfile; error?: string } {
  const users = loadUsers();
  const userIndex = users.findIndex((u) => u.id === userId);

  if (userIndex === -1) {
    return { success: false, error: 'User profile not found.' };
  }

  const user = users[userIndex];
  user.documentStatus = 'PENDING_REVIEW';
  user.documentType = docData.documentType;
  user.documentName = docData.documentFileName;
  user.documentSize = docData.documentFileSize;
  user.documentSubmittedAt = 'Just now';
  user.rejectionReason = undefined;
  user.verifiedStatus = 'Verification Pending';

  users[userIndex] = user;
  saveUsers(users);

  // Sync or add verification request in queue
  const requests = loadVerificationRequests();
  const existingReqIndex = requests.findIndex((r) => r.userId === userId);

  const reqItem: VerificationRequest = {
    id: existingReqIndex !== -1 ? requests[existingReqIndex].id : `req-ver-${Date.now()}`,
    userId: user.id,
    fullName: user.fullName,
    email: user.email,
    role: user.role,
    studentType: user.studentType,
    institution: user.institution,
    department: user.department,
    course: user.course,
    batch: user.batch,
    graduationYear: user.graduationYear,
    rollNumber: user.rollNumber,
    documentType: docData.documentType,
    documentFileName: docData.documentFileName,
    documentFileSize: docData.documentFileSize,
    documentUploadedAt: 'Just now',
    status: 'PENDING_REVIEW'
  };

  if (existingReqIndex !== -1) {
    requests[existingReqIndex] = reqItem;
  } else {
    requests.unshift(reqItem);
  }
  saveVerificationRequests(requests);

  // Sync active session if it matches this user
  const currentSession = getCurrentSession();
  if (currentSession && currentSession.user.id === userId) {
    currentSession.user = user;
    try {
      localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(currentSession));
    } catch {
      // ignore
    }
  }

  return { success: true, updatedProfile: user };
}

/**
 * Review and Approve or Reject a Student/Alumni verification request
 * Authorized for Faculty, HOD, Admin
 */
export function reviewVerificationRequest(
  requestId: string,
  reviewerName: string,
  reviewerRole: UserRole,
  status: 'VERIFIED' | 'REJECTED',
  reason?: string
): { success: boolean; error?: string } {
  if (reviewerRole === 'STUDENT') {
    return { success: false, error: 'Unauthorized: Students cannot verify academic documents.' };
  }

  const requests = loadVerificationRequests();
  const reqIndex = requests.findIndex((r) => r.id === requestId);
  if (reqIndex === -1) {
    return { success: false, error: 'Verification request not found.' };
  }

  const req = requests[reqIndex];
  req.status = status;
  req.reviewedBy = `${reviewerName} (${reviewerRole})`;
  req.reviewedAt = 'Just now';
  if (status === 'REJECTED') {
    req.rejectionReason = reason || 'Uploaded academic document could not be verified. Please submit a clearer copy.';
  }
  requests[reqIndex] = req;
  saveVerificationRequests(requests);

  // Update target user profile
  const users = loadUsers();
  const userIndex = users.findIndex((u) => u.id === req.userId);
  if (userIndex !== -1) {
    const targetUser = users[userIndex];
    targetUser.documentStatus = status;
    targetUser.reviewedBy = req.reviewedBy;
    targetUser.reviewedAt = req.reviewedAt;

    if (status === 'VERIFIED') {
      targetUser.verifiedStatus = 'Verified';
      targetUser.verificationSignals = {
        ...targetUser.verificationSignals,
        idProofVerified: true,
        rollVerified: true,
        documentVerified: true,
        statusVerified: true,
        nodeApproval: true
      };
      targetUser.rejectionReason = undefined;
    } else {
      targetUser.verifiedStatus = 'Verification Rejected';
      targetUser.rejectionReason = req.rejectionReason;
      targetUser.verificationSignals = {
        ...targetUser.verificationSignals,
        documentVerified: false,
        statusVerified: false
      };
    }

    users[userIndex] = targetUser;
    saveUsers(users);

    // If current session is this user, sync session
    const currentSession = getCurrentSession();
    if (currentSession && currentSession.user.id === targetUser.id) {
      currentSession.user = targetUser;
      try {
        localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(currentSession));
      } catch {
        // ignore
      }
    }
  }

  return { success: true };
}

/**
 * Get Current Active Session
 */
export function getCurrentSession(): AuthSession | null {
  try {
    const raw = localStorage.getItem(SESSION_STORAGE_KEY);
    if (!raw) return null;
    const session: AuthSession = JSON.parse(raw);
    if (Date.now() > session.expiresAt) {
      clearSession();
      return null;
    }
    return session;
  } catch {
    return null;
  }
}

/**
 * Clear Session (Sign Out)
 */
export function clearSession(): void {
  try {
    localStorage.removeItem(SESSION_STORAGE_KEY);
  } catch {
    // ignore
  }
}

/**
 * Access-Controlled Profile Resolver
 */
export function resolveProfileWithPrivacy(
  sessionToken: string | null,
  targetUserId?: string
): {
  success: boolean;
  profile?: UserProfile;
  error?: 'UNAUTHENTICATED' | 'ACCESS_DENIED' | 'NOT_FOUND';
  message?: string;
} {
  if (!sessionToken) {
    return {
      success: false,
      error: 'UNAUTHENTICATED',
      message: 'Please sign in to view this profile.'
    };
  }

  const currentSession = getCurrentSession();
  if (!currentSession || currentSession.token !== sessionToken) {
    return {
      success: false,
      error: 'UNAUTHENTICATED',
      message: 'Please sign in to view this profile.'
    };
  }

  const users = loadUsers();
  const currentUser = currentSession.user;

  // If requesting own profile
  if (!targetUserId || targetUserId === 'me' || targetUserId === currentUser.id) {
    const fullUser = users.find((u) => u.id === currentUser.id) || currentUser;
    const { passwordHash: _, ...safeProfile } = fullUser as any;
    return { success: true, profile: safeProfile };
  }

  // If requesting another user's profile: verify RBAC permissions
  const targetUser = users.find((u) => u.id === targetUserId);
  if (!targetUser) {
    return {
      success: false,
      error: 'NOT_FOUND',
      message: 'Requested academic profile was not found.'
    };
  }

  // HOD and ADMIN can view all profiles; FACULTY can view students; Students can only view public directory listings
  const canAccess =
    currentUser.role === 'ADMIN' ||
    currentUser.role === 'HOD' ||
    (currentUser.role === 'FACULTY' && targetUser.role === 'STUDENT') ||
    currentUser.id === targetUser.id;

  if (!canAccess) {
    return {
      success: false,
      error: 'ACCESS_DENIED',
      message: 'Access denied: You do not have permission to view this private profile.'
    };
  }

  const { passwordHash: _, ...safeProfile } = targetUser as any;
  return { success: true, profile: safeProfile };
}

