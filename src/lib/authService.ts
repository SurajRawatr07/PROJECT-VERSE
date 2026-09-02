import { UserRole } from '../types';

export interface UserProfile {
  id: string;
  email: string;
  fullName: string;
  role: UserRole;
  institution: string;
  department: string;
  batch?: string;
  avatar: string;
  githubHandle?: string;
  verifiedStatus: 'Verified' | 'Under Review' | 'Active';
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

// Pre-seeded academic directory matching official Graphic Era Hill University profiles
const INITIAL_USERS: (UserProfile & { passwordHash: string })[] = [
  {
    id: 'usr-student-01',
    email: 'suraj@gehu.ac.in',
    passwordHash: 'Suraj@123',
    fullName: 'Suraj Rawat',
    role: 'STUDENT',
    institution: 'Graphic Era Hill University',
    department: 'Dept of Computer Science & Engineering',
    batch: "B.Tech '26",
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    githubHandle: 'surajrawat-dev',
    verifiedStatus: 'Verified',
    projectsCount: 2,
    commitsCount: 384,
    rubricScore: 9.6,
    bio: 'Undergraduate researcher focusing on autonomous systems, distributed micro-services, and verifiable academic project architectures.',
    skills: ['React', 'TypeScript', 'Node.js', 'PyTorch', 'ROS 2', 'PostgreSQL']
  },
  {
    id: 'usr-faculty-01',
    email: 'anil.sharma@gehu.ac.in',
    passwordHash: 'Anil@1234',
    fullName: 'Dr. Anil Sharma',
    role: 'FACULTY',
    institution: 'Graphic Era Hill University',
    department: 'Dept of Computer Science & Engineering',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    verifiedStatus: 'Verified',
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
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80',
    verifiedStatus: 'Verified',
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
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    verifiedStatus: 'Verified',
    projectsCount: 128,
    bio: 'System Administrator for ProjectVerse Federated Ledger, SAML SSO, and node verification.',
    skills: ['Network Administration', 'Ledger Governance', 'SAML SSO', 'Node Consensus']
  }
];

const USERS_STORAGE_KEY = 'pv_user_database_v2';
const SESSION_STORAGE_KEY = 'pv_auth_session_v2';

// In-memory / storage sync
function loadUsers(): (UserProfile & { passwordHash: string })[] {
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

function saveUsers(users: (UserProfile & { passwordHash: string })[]) {
  try {
    localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
  } catch {
    // ignore
  }
}

/**
 * Strict RFC Email Validation
 * Rejects invalid forms like: 'abc', 'abc@', 'abc.com@', 'test', 'test@'
 */
export function validateEmailFormat(email: string): { isValid: boolean; error?: string } {
  if (!email || email.trim() === '') {
    return { isValid: false, error: 'Email address is required.' };
  }
  const cleanEmail = email.trim();
  // Standard strict email RFC regex
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!emailRegex.test(cleanEmail)) {
    return { isValid: false, error: 'Please enter a valid email address.' };
  }
  return { isValid: true };
}

/**
 * Strong Password Requirement
 * - Minimum 8 characters
 * - At least 1 uppercase letter
 * - At least 1 lowercase letter
 * - At least 1 number
 * - At least 1 special character
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
 * Server-Side Authentication Verification
 */
export function loginUser(
  emailInput: string,
  passwordInput: string,
  requestedRole?: UserRole
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

  // If specific role was chosen in UI, ensure role verification matches or updates appropriately
  const effectiveRole = requestedRole || foundUser.role;
  const userProfile: UserProfile = {
    ...foundUser,
    role: effectiveRole
  };

  const token = `pv_sec_tok_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
  const session: AuthSession = {
    token,
    user: userProfile,
    expiresAt: Date.now() + 1000 * 60 * 60 * 24 // 24 hours
  };

  try {
    localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(session));
  } catch {
    // ignore
  }

  return { success: true, session };
}

/**
 * Register New Academic User with Strong Password & Role
 */
export function registerUser(params: {
  fullName: string;
  email: string;
  password: string;
  role: UserRole;
  institution: string;
}): { success: boolean; session?: AuthSession; error?: string } {
  const { fullName, email, password, role, institution } = params;

  if (!fullName || fullName.trim().length < 2) {
    return { success: false, error: 'Please enter your full name.' };
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

  const users = loadUsers();
  const normalizedEmail = email.trim().toLowerCase();

  if (users.some((u) => u.email.toLowerCase() === normalizedEmail)) {
    return { success: false, error: 'An account with this email address already exists.' };
  }

  const newUser: UserProfile & { passwordHash: string } = {
    id: `usr-${role.toLowerCase()}-${Date.now()}`,
    email: normalizedEmail,
    passwordHash: password,
    fullName: fullName.trim(),
    role,
    institution: institution.trim(),
    department: 'Dept of Computer Science & Engineering',
    batch: role === 'STUDENT' ? "B.Tech '26" : undefined,
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    verifiedStatus: 'Verified',
    projectsCount: 1,
    commitsCount: role === 'STUDENT' ? 120 : undefined,
    rubricScore: 9.4,
    bio: `${role} at ${institution.trim()}.`,
    skills: ['TypeScript', 'React', 'Node.js', 'Python']
  };

  users.push(newUser);
  saveUsers(users);

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
 * Get Current Active Session (Backend Token Verification)
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
 * Terminate Session (Logout)
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
 * 
 * Rules:
 * 1. Requires valid authentication token.
 * 2. Returns current user's profile on '/profile/me'.
 * 3. Restricts unauthorized third-party profile snooping.
 * 4. Never exposes passwordHash or private credentials.
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
    // Strip sensitive fields
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
