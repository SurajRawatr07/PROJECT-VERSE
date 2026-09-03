export type UserRole = 'STUDENT' | 'FACULTY' | 'HOD' | 'ADMIN';

export type StudentType = 'CURRENT_STUDENT' | 'ALUMNI';

export type DocumentVerificationStatus = 'NOT_SUBMITTED' | 'PENDING_REVIEW' | 'VERIFIED' | 'REJECTED';

export type DocumentType = 
  | 'Student ID Card' 
  | 'Enrollment Letter' 
  | 'Admission / Enrollment Proof' 
  | 'Degree Certificate / Marksheet' 
  | 'Official Academic Document';

export interface VerificationSignals {
  emailVerified: boolean;
  institutionalDomain: boolean;
  idProofVerified: boolean;
  nodeApproval: boolean;
  rollVerified?: boolean;
  documentVerified?: boolean;
  statusVerified?: boolean;
}

export type AccountVerificationStatus = 'Verified' | 'Under Review' | 'Active' | 'Pending Review' | 'Verification Pending' | 'Verification Rejected';

export interface VerificationRequest {
  id: string;
  userId: string;
  fullName: string;
  email: string;
  role: UserRole;
  studentType?: StudentType;
  institution: string;
  department: string;
  course?: string;
  batch?: string;
  graduationYear?: string;
  rollNumber?: string;
  documentType: DocumentType;
  documentFileName: string;
  documentFileSize: string;
  documentUploadedAt: string;
  documentId?: string;
  status: DocumentVerificationStatus;
  rejectionReason?: string;
  reviewedBy?: string;
  reviewedAt?: string;
}

export type ProjectDomain = 
  | 'All'
  | 'Artificial Intelligence & ML'
  | 'Healthcare & Biotech'
  | 'Distributed Systems & Cloud'
  | 'Autonomous Systems & Robotics'
  | 'Clean Energy & IoT'
  | 'Cybersecurity & Cryptography';

export type VerificationStatus = 'Verified' | 'Under Review' | 'Seeking Next Batch' | 'Active Development';

export interface Contributor {
  name: string;
  role: string;
  institution: string;
  batch: string;
  avatar: string;
  githubHandle?: string;
  commitsCount?: number;
}

export interface FacultyReviewer {
  name: string;
  designation: string;
  department: string;
  institution: string;
  score: number; // e.g. 9.4/10
  reviewText: string;
  verifiedAt: string;
  signatureHash: string;
}

export interface LineageBatch {
  year: string;
  batchName: string;
  institution: string;
  leadContributors: string[];
  keyMilestones: string[];
  commits: number;
  pullRequests: number;
  activeStatus: 'Current' | 'Completed' | 'Upcoming Roadmap';
  summary: string;
}

export interface ProjectPassportData {
  passportId: string;
  qrHash: string;
  projectName: string;
  tagline: string;
  institution: string;
  department: string;
  academicYear: string;
  originalBatch: string;
  currentBatch: string;
  status: VerificationStatus;
  license: string;
  techStack: string[];
  
  // Technical Evidence
  githubRepo: string;
  totalCommits: number;
  activeContributors: number;
  mergedPRs: number;
  codeHealthScore: number; // e.g. 98%
  testCoverage: number; // e.g. 94%
  stars: number;
  forks: number;

  // Academic Evidence
  facultyReviewer: FacultyReviewer;
  institutionalValidationCode: string;
  rubricScores: {
    novelty: number; // out of 10
    technicalRigor: number; // out of 10
    documentation: number; // out of 10
    continuityPotential: number; // out of 10
  };
}

export interface ProjectItem {
  id: string;
  passportId: string;
  title: string;
  tagline: string;
  description: string;
  domain: ProjectDomain;
  techStack: string[];
  institution: string;
  department: string;
  academicYear: string;
  status: VerificationStatus;
  contributors: Contributor[];
  lineageBatchesCount: number;
  githubStars: number;
  githubCommits: number;
  openRoles: string[];
  lineage: LineageBatch[];
  passport: ProjectPassportData;
  coverGradient: string;
  featured?: boolean;
}

export interface AIMatchCandidate {
  id: string;
  title: string;
  domain: string;
  institution: string;
  matchScore: number;
  reasons: string[];
  requiredSkills: string[];
  openRole: string;
}

export interface MentorRecommendation {
  name: string;
  title: string;
  institution: string;
  domains: string[];
  verifiedProjectsCount: number;
  matchScore: number;
  avatar: string;
}

export interface PeerCandidate {
  name: string;
  institution: string;
  batch: string;
  skills: string[];
  matchScore: number;
  role: string;
  avatar: string;
}

export type ProjectLifecycleStatus = 
  | 'DRAFT' 
  | 'IN_PROGRESS' 
  | 'UNDER_REVIEW' 
  | 'CHANGES_REQUIRED' 
  | 'APPROVED' 
  | 'REJECTED' 
  | 'COMPLETED';

export type AppNotificationType = 
  | 'FACULTY_FEEDBACK' 
  | 'PROJECT_APPROVED' 
  | 'PROJECT_REJECTED' 
  | 'REVIEW_UPDATED' 
  | 'COLLABORATION_REQUEST' 
  | 'PROJECT_STATUS_UPDATE' 
  | 'TEAM_UPDATE' 
  | 'REPOSITORY_UPDATE'
  | 'SYSTEM'
  | 'PROPOSAL';

export interface ProjectFeedback {
  id: string;
  projectId: string;
  studentId: string;
  facultyId: string;
  message: string;
  createdAt: string;
  read: boolean;
  // Optional metadata for display
  feedbackId?: string;
  projectTitle?: string;
  facultyName?: string;
  facultyDesignation?: string;
  facultyAvatar?: string;
}

export interface StudentNotification {
  id: string;
  type: AppNotificationType;
  title: string;
  message: string;
  projectId?: string;
  relatedId?: string;
  createdAt: string;
  read: boolean;
  userId?: string;
  projectTitle?: string;
  feedbackId?: string;
  feedbackMessage?: string;
  facultyName?: string;
  senderName?: string;
  senderAvatar?: string;
  actionUrl?: string;
}

export type AppNotification = StudentNotification;

export type CollaborationStatus = 'PENDING' | 'ACCEPTED' | 'REJECTED';

export interface CollaborationRequest {
  id: string;
  projectId: string;
  projectTitle: string;
  studentId: string;
  studentName: string;
  studentAvatar?: string;
  studentInstitution?: string;
  roleInterest: string;
  message: string;
  status: CollaborationStatus;
  createdAt: string;
  reviewedAt?: string;
  targetOwnerId?: string;
}

export interface ProjectActivityItem {
  id: string;
  projectId: string;
  type: 'CREATED' | 'TEAM_ADDED' | 'REPO_CONNECTED' | 'FACULTY_REVIEW' | 'FEEDBACK_RECEIVED' | 'PROJECT_UPDATED' | 'STATUS_CHANGED';
  title: string;
  description: string;
  actorName?: string;
  actorRole?: string;
  actorAvatar?: string;
  createdAt: string;
  statusIndicator: 'completed' | 'in_progress' | 'pending' | 'verified';
}
