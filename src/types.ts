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
