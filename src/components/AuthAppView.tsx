import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Layers,
  Search,
  PlusCircle,
  ShieldCheck,
  Award,
  GitBranch,
  Sparkles,
  Users,
  GraduationCap,
  Building2,
  FileCheck2,
  CheckCircle2,
  ExternalLink,
  ChevronRight,
  LogOut,
  Bell,
  Settings,
  Filter,
  BarChart3,
  BookOpen,
  Send,
  Sliders,
  Compass,
  ArrowRight,
  UserCheck,
  FileSpreadsheet,
  Cpu,
  Clock,
  Briefcase,
  UserPlus,
  RefreshCw,
  Eye,
  Lock,
  FolderGit2,
  Check,
  AlertTriangle,
  Github,
  Mail,
  FileText,
  UploadCloud,
  X,
  AlertCircle,
  MessageSquare
} from 'lucide-react';
import { ProjectItem, ProjectDomain, DocumentType, ProjectFeedback, StudentNotification } from '../types';
import { SAMPLE_PROJECTS, DOMAINS_LIST, SAMPLE_PEERS, SAMPLE_MENTORS } from '../data/mockData';
import { ProjectVerseBrand } from './ProjectVerseBrand';
import { getCurrentSession, resolveProfileWithPrivacy, UserProfile, submitVerificationDocument } from '../lib/authService';
import { uploadAcademicDocument } from '../lib/documentService';
import { StudentVerificationManager } from './verification/StudentVerificationManager';
import { DocumentUploadDropzone } from './verification/DocumentUploadDropzone';
import {
  submitProjectFeedback,
  getProjectFeedbacks,
  getStudentNotifications,
  markNotificationAsRead,
  syncSessionWithBackend
} from '../lib/feedbackService';

export type UserRole = 'STUDENT' | 'FACULTY' | 'HOD' | 'ADMIN';

export const FALLBACK_PROFILES: Record<UserRole, UserProfile> = {
  STUDENT: {
    id: 'usr-student-01',
    email: 'suraj@gehu.ac.in',
    fullName: 'Suraj Rawat',
    role: 'STUDENT',
    institution: 'Graphic Era Hill University',
    department: 'Dept of Computer Science & Engineering',
    batch: "B.Tech '26",
    rollNumber: 'GEHU/2022/CS/089',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    githubHandle: 'surajrawat-dev',
    verifiedStatus: 'Verified',
    verificationSignals: {
      emailVerified: true,
      institutionalDomain: true,
      idProofVerified: true,
      nodeApproval: true
    },
    projectsCount: 2,
    commitsCount: 384,
    rubricScore: 9.6,
    bio: 'Undergraduate researcher specializing in edge AI, distributed systems, and verifiable academic project architectures.',
    skills: ['React', 'TypeScript', 'Node.js', 'PyTorch', 'ROS 2', 'PostgreSQL']
  },
  FACULTY: {
    id: 'usr-faculty-01',
    email: 'anil.sharma@gehu.ac.in',
    fullName: 'Dr. Anil Sharma',
    role: 'FACULTY',
    institution: 'Graphic Era Hill University',
    department: 'Dept of Computer Science & Engineering',
    facultyId: 'EMP-GEHU-FAC-409',
    designation: 'Associate Professor & Senior Research Advisor',
    researchAreas: ['Artificial Intelligence', 'Edge Computing', 'Computer Vision'],
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    verifiedStatus: 'Verified',
    verificationSignals: {
      emailVerified: true,
      institutionalDomain: true,
      idProofVerified: true,
      nodeApproval: true
    },
    projectsCount: 14,
    rubricScore: 9.8,
    bio: 'Associate Professor & Senior Research Advisor in Artificial Intelligence, Edge Computing, and Computer Vision.',
    skills: ['AI/ML', 'Computer Vision', 'Edge Systems', 'Academic Peer Review']
  },
  HOD: {
    id: 'usr-hod-01',
    email: 'rajesh.kumar@gehu.ac.in',
    fullName: 'Dr. Rajesh Kumar',
    role: 'HOD',
    institution: 'Graphic Era Hill University',
    department: 'Dept of Computer Science & Engineering',
    facultyId: 'HOD-CSE-001',
    designation: 'Professor & Head of Department',
    departmentToken: 'GEHU-HOD-CSE-2025',
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80',
    verifiedStatus: 'Verified',
    verificationSignals: {
      emailVerified: true,
      institutionalDomain: true,
      idProofVerified: true,
      nodeApproval: true
    },
    projectsCount: 48,
    bio: 'Head of Department, Computer Science & Engineering. Overseeing capstone governance, institutional accreditation, and NAAC/ABET compliance.',
    skills: ['Curriculum Design', 'Academic Governance', 'Accreditation', 'Capstone Verification']
  },
  ADMIN: {
    id: 'usr-admin-01',
    email: 'admin@gehu.ac.in',
    fullName: 'Admin User',
    role: 'ADMIN',
    institution: 'Graphic Era Hill University',
    department: 'Institutional Academic Office',
    facultyId: 'ROOT-ADMIN-01',
    designation: 'Lead Ledger Administrator',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    verifiedStatus: 'Verified',
    verificationSignals: {
      emailVerified: true,
      institutionalDomain: true,
      idProofVerified: true,
      nodeApproval: true
    },
    projectsCount: 128,
    bio: 'System Administrator for ProjectVerse Federated Ledger, SAML SSO, and node verification.',
    skills: ['Network Administration', 'Ledger Governance', 'SAML SSO', 'Node Consensus']
  }
};

interface AuthAppViewProps {
  initialRole: UserRole;
  onLogout: () => void;
  onOpenProjectDetail: (project: ProjectItem) => void;
  onOpenBuildProject: () => void;
  onOpenJoinProject: (project: ProjectItem) => void;
  onOpenProofOfWork: () => void;
}

export const AuthAppView: React.FC<AuthAppViewProps> = ({
  initialRole,
  onLogout,
  onOpenProjectDetail,
  onOpenBuildProject,
  onOpenJoinProject,
  onOpenProofOfWork
}) => {
  const [activeRole, setActiveRole] = useState<UserRole>(initialRole);
  const [activeTab, setActiveTab] = useState<string>('dashboard');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDomain, setSelectedDomain] = useState<ProjectDomain>('All');
  
  // Current authenticated profile
  const [currentProfile, setCurrentProfile] = useState<UserProfile | null>(null);

  // Faculty review simulation state
  const [reviewingProject, setReviewingProject] = useState<ProjectItem | null>(null);
  const [reviewModalTab, setReviewModalTab] = useState<'rubric' | 'feedback'>('rubric');
  const [facultyFeedbackText, setFacultyFeedbackText] = useState('');
  const [isSubmittingFeedback, setIsSubmittingFeedback] = useState(false);
  const [feedbackError, setFeedbackError] = useState<string | null>(null);
  const [feedbackSuccess, setFeedbackSuccess] = useState<string | null>(null);
  const [projectFeedbacks, setProjectFeedbacks] = useState<ProjectFeedback[]>([]);

  // Notifications state
  const [notifications, setNotifications] = useState<StudentNotification[]>([]);
  const [isLoadingNotifications, setIsLoadingNotifications] = useState(false);
  const [viewingFeedbackDetail, setViewingFeedbackDetail] = useState<{
    notif: StudentNotification;
    project?: ProjectItem;
    feedbackMessage: string;
    facultyName: string;
  } | null>(null);

  const [rubricScores, setRubricScores] = useState({
    novelty: 9.5,
    technicalRigor: 9.4,
    documentation: 9.2,
    continuityPotential: 9.8
  });
  const [reviewFeedback, setReviewFeedback] = useState('Outstanding edge computing architecture and modular ROS 2 implementation. Validated for next-batch continuation.');
  const [verifiedList, setVerifiedList] = useState<string[]>(['proj-1', 'proj-2', 'proj-3']);
  const [approvalToast, setApprovalToast] = useState<string | null>(null);

  // Sync active role and profile data on load
  useEffect(() => {
    const session = getCurrentSession();
    if (session) {
      const resolved = resolveProfileWithPrivacy(session.token, 'me');
      if (resolved.success && resolved.profile) {
        setCurrentProfile(resolved.profile);
        setActiveRole(resolved.profile.role);
        return;
      }
    }

    setCurrentProfile(FALLBACK_PROFILES[initialRole]);
    setActiveRole(initialRole);
  }, [initialRole]);

  // Filter projects for discovery tab
  const filteredProjects = SAMPLE_PROJECTS.filter((p) => {
    const matchSearch =
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.techStack.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase())) ||
      p.institution.toLowerCase().includes(searchQuery.toLowerCase());
    const matchDomain = selectedDomain === 'All' || p.domain === selectedDomain;
    return matchSearch && matchDomain;
  });

  // Document upload modal state for Student
  const [isDocUploadModalOpen, setIsDocUploadModalOpen] = useState(false);
  const [pendingUploadDoc, setPendingUploadDoc] = useState<{ 
    documentType: DocumentType; 
    fileName: string; 
    fileSize: string; 
    rawFile?: File; 
  } | null>(null);
  const [isSubmittingDoc, setIsSubmittingDoc] = useState(false);
  const [docUploadError, setDocUploadError] = useState<string | null>(null);

  // Role navigation tabs configuration
  const roleTabs: Record<UserRole, { id: string; label: string; icon: any }[]> = {
    STUDENT: [
      { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
      { id: 'discover', label: 'Discover Projects', icon: Compass },
      { id: 'my-projects', label: 'My Projects', icon: FolderGit2 },
      { id: 'ai-matches', label: 'AI Matches', icon: Sparkles },
      { id: 'mentors', label: 'Mentors', icon: GraduationCap },
      { id: 'collaboration', label: 'Collaboration', icon: Users },
      { id: 'passport', label: 'Project Passport', icon: FileCheck2 },
      { id: 'lineage', label: 'Project Lineage', icon: GitBranch },
      { id: 'proof-of-work', label: 'Proof of Work', icon: Award },
      { id: 'profile', label: 'Profile', icon: UserCheck },
      { id: 'notifications', label: 'Notifications', icon: Bell }
    ],
    FACULTY: [
      { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
      { id: 'student-verifications', label: 'Student Verifications', icon: UserCheck },
      { id: 'verification-queue', label: 'Capstone Queue', icon: FileCheck2 },
      { id: 'projects', label: 'Advised Projects', icon: FolderGit2 },
      { id: 'students', label: 'Advised Students', icon: Users },
      { id: 'mentorship', label: 'Mentorship Inquiries', icon: Sparkles },
      { id: 'reviews', label: 'Past Evaluations', icon: ShieldCheck },
      { id: 'profile', label: 'Profile', icon: UserCheck },
      { id: 'notifications', label: 'Notifications', icon: Bell }
    ],
    HOD: [
      { id: 'dashboard', label: 'Executive Dashboard', icon: BarChart3 },
      { id: 'student-verifications', label: 'Student Identity Queue', icon: UserCheck },
      { id: 'registry', label: 'Capstone Registry', icon: FileSpreadsheet },
      { id: 'governance', label: 'Institutional Sign-Off', icon: ShieldCheck },
      { id: 'accreditation', label: 'NAAC / ABET Metrics', icon: Award },
      { id: 'faculty-status', label: 'Faculty Guides', icon: BookOpen },
      { id: 'profile', label: 'Profile', icon: UserCheck },
      { id: 'notifications', label: 'Notifications', icon: Bell }
    ],
    ADMIN: [
      { id: 'dashboard', label: 'Network Overview', icon: Cpu },
      { id: 'student-verifications', label: 'Student ID Verifications', icon: UserCheck },
      { id: 'universities', label: 'Registered Universities', icon: Building2 },
      { id: 'audit-stream', label: 'Immutable Audit Stream', icon: Clock },
      { id: 'access-control', label: 'RBAC Access Control', icon: Lock },
      { id: 'profile', label: 'Profile', icon: UserCheck },
      { id: 'notifications', label: 'System Telemetry', icon: Bell }
    ]
  };

  const currentTabs = roleTabs[activeRole] || roleTabs.STUDENT;

  const handleSignVerification = (projectId: string) => {
    if (!verifiedList.includes(projectId)) {
      setVerifiedList([...verifiedList, projectId]);
    }
    setReviewingProject(null);
    setApprovalToast(`Academic Verification and Cryptographic Passport Seal published for ${projectId}!`);
    setTimeout(() => setApprovalToast(null), 4000);
  };

  const handleSwitchRole = (r: UserRole) => {
    setActiveRole(r);
    setActiveTab('dashboard');
    const profile = FALLBACK_PROFILES[r];
    if (profile) {
      setCurrentProfile(profile);
      const token = r === 'FACULTY' ? 'pv_token_faculty_anil' : r === 'STUDENT' ? 'pv_token_student_suraj' : `pv_sess_${r.toLowerCase()}_01`;
      const newSession = {
        token,
        user: profile,
        expiresAt: Date.now() + 1000 * 60 * 60 * 24
      };
      try {
        localStorage.setItem('pv_auth_session_v2', JSON.stringify(newSession));
      } catch {
        // ignore storage errors
      }
      syncSessionWithBackend();
    }
  };

  const loadNotifications = async () => {
    setIsLoadingNotifications(true);
    try {
      const res = await getStudentNotifications();
      if (res.success && res.notifications) {
        setNotifications(res.notifications);
      }
    } catch {
      // ignore network errors
    } finally {
      setIsLoadingNotifications(false);
    }
  };

  useEffect(() => {
    loadNotifications();
  }, [activeRole, activeTab]);

  useEffect(() => {
    if (reviewingProject) {
      getProjectFeedbacks(reviewingProject.id).then((res) => {
        if (res.success && res.feedbacks) {
          setProjectFeedbacks(res.feedbacks);
        }
      });
      setFacultyFeedbackText('');
      setFeedbackError(null);
      setFeedbackSuccess(null);
    }
  }, [reviewingProject]);

  const handleSubmitFeedback = async () => {
    if (!reviewingProject) return;

    const trimmed = facultyFeedbackText.trim();
    if (!trimmed) {
      setFeedbackError('Feedback message cannot be empty.');
      return;
    }

    if (trimmed.length > 2000) {
      setFeedbackError('Feedback message cannot exceed 2000 characters.');
      return;
    }

    setIsSubmittingFeedback(true);
    setFeedbackError(null);
    setFeedbackSuccess(null);

    const res = await submitProjectFeedback(reviewingProject.id, trimmed);
    setIsSubmittingFeedback(false);

    if (!res.success) {
      setFeedbackError(res.error || 'Failed to submit feedback. Please check authorization and try again.');
      return;
    }

    setFeedbackSuccess('Feedback submitted successfully and student notified.');
    setFacultyFeedbackText('');
    if (res.feedback) {
      setProjectFeedbacks((prev) => [res.feedback!, ...prev]);
    }
    setApprovalToast(`Feedback submitted for ${reviewingProject.title}`);
    setTimeout(() => setApprovalToast(null), 4000);
    loadNotifications();
  };

  const handleViewFeedback = async (notif: StudentNotification) => {
    if (!notif.read) {
      await markNotificationAsRead(notif.id);
      setNotifications((prev) =>
        prev.map((n) => (n.id === notif.id ? { ...n, read: true } : n))
      );
    }

    const matchedProject = SAMPLE_PROJECTS.find((p) => p.id === notif.projectId) || SAMPLE_PROJECTS[0];

    setViewingFeedbackDetail({
      notif: { ...notif, read: true },
      project: matchedProject,
      feedbackMessage: notif.feedbackMessage || notif.message,
      facultyName: notif.facultyName || 'Dr. Anil Sharma'
    });
  };

  const formatTimeAgo = (dateStr: string) => {
    try {
      const date = new Date(dateStr);
      const diffSec = Math.floor((Date.now() - date.getTime()) / 1000);
      if (diffSec < 60) return 'just now';
      if (diffSec < 3600) return `${Math.floor(diffSec / 60)}m ago`;
      if (diffSec < 86400) return `${Math.floor(diffSec / 3600)}h ago`;
      return `${Math.floor(diffSec / 86400)}d ago`;
    } catch {
      return dateStr;
    }
  };

  const handleStudentDocumentSubmit = async () => {
    if (!pendingUploadDoc) return;
    setIsSubmittingDoc(true);
    setDocUploadError(null);

    const session = getCurrentSession();
    let storedDocId: string | undefined = undefined;

    // Real multipart/form-data upload
    if (pendingUploadDoc.rawFile) {
      try {
        const formData = new FormData();
        formData.append('document', pendingUploadDoc.rawFile);
        formData.append('documentType', pendingUploadDoc.documentType);
        if (session?.user?.id) {
          formData.append('userId', session.user.id);
        }

        const uploadRes = await uploadAcademicDocument(formData, session?.token);
        if (!uploadRes.success) {
          setIsSubmittingDoc(false);
          setDocUploadError(uploadRes.error || 'Failed to upload document proof. Please check file and retry.');
          return;
        }

        storedDocId = uploadRes.documentId;
      } catch (err: any) {
        setIsSubmittingDoc(false);
        setDocUploadError(err?.message || 'Network error uploading document proof. Please check your connection.');
        return;
      }
    }

    if (session) {
      const res = submitVerificationDocument(session.user.id, {
        documentType: pendingUploadDoc.documentType,
        documentFileName: pendingUploadDoc.fileName,
        documentFileSize: pendingUploadDoc.fileSize,
        documentId: storedDocId
      });
      if (res.success && res.updatedProfile) {
        setCurrentProfile(res.updatedProfile);
      }
    } else if (currentProfile) {
      setCurrentProfile({
        ...currentProfile,
        verifiedStatus: 'Pending',
        documentStatus: 'PENDING_REVIEW',
        documentType: pendingUploadDoc.documentType,
        documentName: pendingUploadDoc.fileName,
        documentSize: pendingUploadDoc.fileSize,
        documentId: storedDocId,
        documentSubmittedAt: 'Just now'
      });
    }

    setIsSubmittingDoc(false);
    setIsDocUploadModalOpen(false);
    setPendingUploadDoc(null);
    setDocUploadError(null);
    setApprovalToast('Academic document submitted to faculty and institutional review queue.');
    setTimeout(() => setApprovalToast(null), 4000);
  };

  return (
    <div className="min-h-screen bg-[#FFFFFF] text-[#111111] flex flex-col font-body">
      {/* Top Workspace Bar */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-black/8 px-4 sm:px-8 py-3.5 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <ProjectVerseBrand
            theme="light"
            logoSize={26}
            textSizeClassName="text-[20px] sm:text-[22px]"
            interactive={true}
          />

          <div className="hidden md:flex items-center gap-2 pl-4 border-l border-black/10">
            <span className="text-[11px] font-mono-code text-[#737373] uppercase font-medium">
              Active Portal:
            </span>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#111111] text-white">
              {activeRole}
            </span>
            <span className="text-xs text-[#737373]">•</span>
            <span className="text-xs text-[#4A4A4A] font-medium truncate max-w-[200px]">
              {currentProfile?.institution || 'Graphic Era Hill University'}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {/* Quick Role Switcher for Testing / Demonstration */}
          <div className="hidden lg:flex items-center gap-1 bg-[#F7F7F5] p-1 rounded-xl border border-black/8 text-xs font-mono-code">
            {(['STUDENT', 'FACULTY', 'HOD', 'ADMIN'] as UserRole[]).map((r) => (
              <button
                key={r}
                id={`workspace-role-switch-${r.toLowerCase()}`}
                onClick={() => {
                  handleSwitchRole(r);
                }}
                className={`px-2.5 py-1 rounded-lg transition-all cursor-pointer ${
                  activeRole === r
                    ? 'bg-[#111111] text-white font-medium shadow-xs'
                    : 'text-[#4A4A4A] hover:text-[#111111]'
                }`}
              >
                {r}
              </button>
            ))}
          </div>

          {/* User Profile Mini Badge */}
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#F7F7F5] border border-black/8">
            <img
              src={currentProfile?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'}
              alt={currentProfile?.fullName || 'User'}
              className="w-6 h-6 rounded-full object-cover border border-black/10"
            />
            <span className="text-xs font-medium text-[#111111] hidden sm:inline">
              {currentProfile?.fullName || 'Suraj Rawat'}
            </span>
          </div>

          {/* Logout Button */}
          <button
            id="workspace-logout-btn"
            onClick={onLogout}
            className="px-3 py-1.5 rounded-xl bg-[#F7F7F5] hover:bg-[#EBEBE8] border border-black/8 text-[#111111] text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer"
            title="Sign Out"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Sign Out</span>
          </button>
        </div>
      </header>

      {/* Main Workspace Grid: Sidebar + Canvas */}
      <div className="flex-1 flex flex-col md:flex-row">
        {/* Left Navigation Sidebar */}
        <aside className="w-full md:w-64 bg-[#FBFBFA] border-b md:border-b-0 md:border-r border-black/8 p-3 sm:p-4 shrink-0">
          <div className="mb-3 px-3 py-2 rounded-xl bg-white border border-black/8 flex items-center justify-between">
            <div>
              <p className="text-[10px] font-mono-code text-[#737373] uppercase">Identity Role</p>
              <p className="text-xs font-semibold text-[#111111]">{activeRole} Workspace</p>
            </div>
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          </div>

          <nav className="flex md:flex-col gap-1 overflow-x-auto md:overflow-x-visible pb-2 md:pb-0">
            {currentTabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  id={`nav-tab-${tab.id}`}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all shrink-0 cursor-pointer ${
                    isActive
                      ? 'bg-[#111111] text-white shadow-xs font-semibold'
                      : 'text-[#4A4A4A] hover:text-[#111111] hover:bg-[#F0F0EE] border border-transparent'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-[#737373]'}`} />
                  <span className="whitespace-nowrap">{tab.label}</span>
                  {tab.id === 'notifications' && notifications.filter((n) => !n.read).length > 0 && (
                    <span className={`ml-auto text-[10px] font-mono-code px-1.5 py-0.2 rounded-full font-semibold ${
                      isActive ? 'bg-white text-black' : 'bg-amber-100 text-amber-900'
                    }`}>
                      {notifications.filter((n) => !n.read).length}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </aside>

        {/* Workspace Canvas Area */}
        <main className="flex-1 p-4 sm:p-8 overflow-y-auto bg-white">
          {/* Toast Notification if any */}
          {approvalToast && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs sm:text-sm flex items-center gap-2.5 shadow-xs"
            >
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span className="font-medium">{approvalToast}</span>
            </motion.div>
          )}

          {/* ========================================================================= */}
          {/* STUDENT ROLE VIEWS */}
          {/* ========================================================================= */}
          {activeRole === 'STUDENT' && (
            <div>
              {activeTab === 'dashboard' && (
                <div className="space-y-6">
                  {/* Faculty Feedback Notification Alert Banner */}
                  {notifications.some((n) => n.type === 'FACULTY_FEEDBACK' && !n.read) && (
                    <div className="bg-amber-50 border border-amber-200/90 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-xs">
                      <div className="flex items-start sm:items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-amber-100 flex items-center justify-center text-amber-800 shrink-0">
                          <Bell className="w-5 h-5" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="text-sm font-semibold text-amber-950">New Faculty Feedback</h4>
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-amber-200 text-amber-900">
                              Action Recommended
                            </span>
                          </div>
                          <p className="text-xs text-amber-800 mt-0.5">
                            Your faculty has added feedback to your project.
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 self-end sm:self-auto shrink-0">
                        <button
                          id="student-banner-view-feedback-btn"
                          onClick={() => {
                            const unreadNotif = notifications.find((n) => n.type === 'FACULTY_FEEDBACK' && !n.read);
                            if (unreadNotif) {
                              handleViewFeedback(unreadNotif);
                            } else {
                              setActiveTab('notifications');
                            }
                          }}
                          className="btn-primary-black px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 cursor-pointer shadow-xs"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          <span>View Feedback</span>
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Top Welcome Banner */}
                  <div className="bg-[#FBFBFA] rounded-2xl p-6 sm:p-8 border border-black/8">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div>
                        <span className="text-[11px] font-mono-code text-[#737373] uppercase tracking-wider font-semibold">
                          Academic Cohort 2025–2026 • Graphic Era Hill University Node
                        </span>
                        <h1 className="font-display text-2xl sm:text-3xl text-[#111111] mt-1 font-normal">
                          Welcome, Suraj Rawat
                        </h1>
                        <p className="text-xs sm:text-sm text-[#4A4A4A] mt-1">
                          Graphic Era Hill University • Dept of Computer Science & Engineering
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={onOpenProofOfWork}
                          className="px-3.5 py-2 rounded-xl bg-white hover:bg-[#F5F5F3] border border-black/10 text-xs font-medium text-[#111111] flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs"
                        >
                          <Award className="w-3.5 h-3.5 text-[#111111]" />
                          <span>View Proof-of-Work</span>
                        </button>
                        <button
                          onClick={onOpenBuildProject}
                          className="btn-primary-black px-4 py-2 rounded-xl text-xs font-medium flex items-center gap-1.5 cursor-pointer shadow-xs"
                        >
                          <PlusCircle className="w-3.5 h-3.5" />
                          <span>New Capstone</span>
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Summary Metric Counters */}
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="bg-[#FBFBFA] rounded-2xl p-4 border border-black/8">
                      <span className="text-[11px] font-mono-code text-[#737373] uppercase font-medium">Active Capstones</span>
                      <p className="text-2xl font-bold text-[#111111] mt-1">2</p>
                      <span className="text-[11px] text-emerald-700 font-medium">1 Verified • 1 Active</span>
                    </div>
                    <div className="bg-[#FBFBFA] rounded-2xl p-4 border border-black/8">
                      <span className="text-[11px] font-mono-code text-[#737373] uppercase font-medium">Verified Commits</span>
                      <p className="text-2xl font-bold text-[#111111] mt-1">384</p>
                      <span className="text-[11px] text-[#4A4A4A]">Synchronized via GitHub CI</span>
                    </div>
                    <div className="bg-[#FBFBFA] rounded-2xl p-4 border border-black/8">
                      <span className="text-[11px] font-mono-code text-[#737373] uppercase font-medium">Lineage Generations</span>
                      <p className="text-2xl font-bold text-[#111111] mt-1">3 Batches</p>
                      <span className="text-[11px] text-[#737373]">Inherited from '24 cohort</span>
                    </div>
                    <div className="bg-[#FBFBFA] rounded-2xl p-4 border border-black/8">
                      <span className="text-[11px] font-mono-code text-[#737373] uppercase font-medium">Academic Rubric Score</span>
                      <p className="text-2xl font-bold text-[#111111] mt-1">9.6 / 10</p>
                      <span className="text-[11px] text-emerald-700 font-medium">Signed by Dr. Anil Sharma</span>
                    </div>
                  </div>

                  {/* Active Project Highlight */}
                  <div className="bg-white rounded-2xl p-6 border border-black/8 shadow-xs">
                    <div className="flex items-center justify-between mb-4">
                      <h2 className="text-base font-semibold text-[#111111]">Current Active Capstone</h2>
                      <button
                        onClick={() => onOpenProjectDetail(SAMPLE_PROJECTS[0])}
                        className="text-xs text-[#111111] hover:underline font-semibold flex items-center gap-1 cursor-pointer"
                      >
                        Inspect Passport & Lineage <ArrowRight className="w-3 h-3" />
                      </button>
                    </div>

                    <div className="p-4 rounded-xl bg-[#FBFBFA] border border-black/8">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-[11px] font-mono-code text-emerald-700 font-semibold">
                              PV-2025-GEHU-CS089 • VERIFIED
                            </span>
                            <span className="text-[10px] px-2 py-0.5 rounded bg-black/5 text-[#4A4A4A]">Batch '25 – '26</span>
                          </div>
                          <h3 className="text-base font-semibold text-[#111111] mt-1">{SAMPLE_PROJECTS[0].title}</h3>
                          <p className="text-xs text-[#4A4A4A] mt-0.5">{SAMPLE_PROJECTS[0].tagline}</p>
                        </div>
                        <div className="flex items-center gap-3 text-xs text-[#4A4A4A] font-mono-code shrink-0">
                          <span>840 Commits</span>
                          <span>•</span>
                          <span>6 Contributors</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Discover Projects Tab */}
              {activeTab === 'discover' && (
                <div className="space-y-6">
                  <div>
                    <h2 className="font-display text-2xl text-[#111111] font-normal">Discover Academic Projects</h2>
                    <p className="text-xs text-[#4A4A4A]">Search verified repositories, predecessor foundations, and cross-college projects.</p>
                  </div>

                  {/* Search and Domain Filters */}
                  <div className="flex flex-col sm:flex-row gap-3">
                    <div className="relative flex-1">
                      <Search className="w-4 h-4 text-[#737373] absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        placeholder="Search by title, technology (e.g. PyTorch, Rust, ROS 2), or university..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#F7F7F5] border border-black/10 text-[#111111] placeholder-[#737373] focus:outline-none focus:border-[#111111] focus:bg-white text-xs transition-colors"
                      />
                    </div>
                    <select
                      value={selectedDomain}
                      onChange={(e) => setSelectedDomain(e.target.value as ProjectDomain)}
                      className="px-3 py-2.5 rounded-xl bg-[#F7F7F5] border border-black/10 text-[#111111] text-xs focus:outline-none focus:border-[#111111] transition-colors"
                    >
                      {DOMAINS_LIST.map((d) => (
                        <option key={d} value={d} className="bg-white text-[#111111]">
                          {d}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Project Cards Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {filteredProjects.map((proj) => (
                      <div
                        key={proj.id}
                        className="bg-white rounded-2xl p-5 border border-black/8 hover:border-black/20 transition-all flex flex-col justify-between shadow-xs"
                      >
                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-[10px] font-mono-code text-[#737373] uppercase font-semibold">
                              {proj.domain}
                            </span>
                            <span className="text-[10px] font-mono-code px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 font-medium">
                              {proj.status}
                            </span>
                          </div>
                          <h3 className="text-base font-semibold text-[#111111] mb-1">{proj.title}</h3>
                          <p className="text-xs text-[#4A4A4A] mb-3 line-clamp-2">{proj.description}</p>
                          <div className="flex flex-wrap gap-1.5 mb-4">
                            {proj.techStack.map((tech) => (
                              <span key={tech} className="text-[10px] font-mono-code px-2 py-0.5 rounded bg-[#F7F7F5] border border-black/5 text-[#4A4A4A]">
                                {tech}
                              </span>
                            ))}
                          </div>
                        </div>

                        <div className="pt-3 border-t border-black/8 flex items-center justify-between">
                          <span className="text-[11px] text-[#737373]">{proj.institution}</span>
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => onOpenJoinProject(proj)}
                              className="px-2.5 py-1 rounded-lg bg-[#F7F7F5] hover:bg-[#EBEBE8] text-[#111111] text-xs font-medium border border-black/8 cursor-pointer"
                            >
                              Join
                            </button>
                            <button
                              onClick={() => onOpenProjectDetail(proj)}
                              className="px-2.5 py-1 rounded-lg bg-[#111111] text-white hover:bg-black text-xs font-medium cursor-pointer"
                            >
                              Details
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* My Projects */}
              {activeTab === 'my-projects' && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="font-display text-2xl text-[#111111] font-normal">My Academic Projects</h2>
                      <p className="text-xs text-[#4A4A4A]">Repositories you are currently leading or contributing to at Graphic Era Hill University.</p>
                    </div>
                    <button
                      onClick={onOpenBuildProject}
                      className="btn-primary-black px-3.5 py-2 rounded-xl text-xs font-medium flex items-center gap-1.5 cursor-pointer shadow-xs"
                    >
                      <PlusCircle className="w-3.5 h-3.5" />
                      <span>Register Capstone</span>
                    </button>
                  </div>

                  <div className="space-y-4">
                    {SAMPLE_PROJECTS.slice(0, 2).map((p) => (
                      <div key={p.id} className="bg-white rounded-2xl p-6 border border-black/8 shadow-xs">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
                          <div>
                            <span className="text-[10px] font-mono-code text-[#737373] uppercase font-semibold">{p.passportId}</span>
                            <h3 className="text-lg font-semibold text-[#111111]">{p.title}</h3>
                            <p className="text-xs text-[#4A4A4A]">{p.tagline}</p>
                          </div>
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => onOpenProjectDetail(p)}
                              className="px-3 py-1.5 rounded-xl bg-[#F7F7F5] hover:bg-[#EBEBE8] border border-black/8 text-xs text-[#111111] font-medium cursor-pointer"
                            >
                              View Lineage Tree
                            </button>
                            <button
                              onClick={() => onOpenProjectDetail(p)}
                              className="px-3 py-1.5 rounded-xl bg-[#111111] text-white hover:bg-black text-xs font-medium cursor-pointer"
                            >
                              Passport
                            </button>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs font-mono-code text-[#737373] pt-3 border-t border-black/8">
                          <div>GitHub Stars: <span className="text-[#111111] font-semibold">{p.githubStars}</span></div>
                          <div>Commits: <span className="text-[#111111] font-semibold">{p.githubCommits}</span></div>
                          <div>Batches: <span className="text-[#111111] font-semibold">{p.lineageBatchesCount}</span></div>
                          <div>Status: <span className="text-emerald-700 font-semibold">{p.status}</span></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* AI Matches Tab */}
              {activeTab === 'ai-matches' && (
                <div className="space-y-6">
                  <div>
                    <h2 className="font-display text-2xl text-[#111111] font-normal">AI Skill-Gap & Peer Matching</h2>
                    <p className="text-xs text-[#4A4A4A]">Intelligent recommendations for cross-college capstone collaborators and academic mentors.</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Recommended Peers */}
                    <div className="space-y-3">
                      <h3 className="text-xs font-mono-code uppercase font-semibold text-[#737373]">Recommended Teammates</h3>
                      {SAMPLE_PEERS.map((peer, i) => (
                        <div key={i} className="bg-white rounded-2xl p-4 border border-black/8 flex items-center justify-between shadow-xs">
                          <div className="flex items-center gap-3">
                            <img src={peer.avatar} alt={peer.name} className="w-10 h-10 rounded-full object-cover border border-black/10" />
                            <div>
                              <h4 className="text-sm font-semibold text-[#111111]">{peer.name}</h4>
                              <p className="text-xs text-[#737373]">{peer.institution} • {peer.role}</p>
                              <div className="flex gap-1 mt-1">
                                {peer.skills.slice(0, 3).map((s) => (
                                  <span key={s} className="text-[9px] font-mono-code px-1.5 py-0.5 rounded bg-[#F7F7F5] text-[#4A4A4A]">{s}</span>
                                ))}
                              </div>
                            </div>
                          </div>
                          <div className="text-right">
                            <span className="text-xs font-bold text-emerald-700 font-mono-code">{peer.matchScore}% Match</span>
                            <button
                              onClick={() => {
                                setApprovalToast(`Invitation proposal sent to ${peer.name}!`);
                                setTimeout(() => setApprovalToast(null), 3000);
                              }}
                              className="block mt-1 text-[11px] px-2.5 py-1 rounded-lg bg-[#111111] text-white hover:bg-black font-medium cursor-pointer"
                            >
                              Invite
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Recommended Mentors */}
                    <div className="space-y-3">
                      <h3 className="text-xs font-mono-code uppercase font-semibold text-[#737373]">Faculty & Industry Guides</h3>
                      {SAMPLE_MENTORS.map((m, i) => (
                        <div key={i} className="bg-white rounded-2xl p-4 border border-black/8 flex items-center justify-between shadow-xs">
                          <div className="flex items-center gap-3">
                            <img src={m.avatar} alt={m.name} className="w-10 h-10 rounded-full object-cover border border-black/10" />
                            <div>
                              <h4 className="text-sm font-semibold text-[#111111]">{m.name}</h4>
                              <p className="text-xs text-[#737373]">{m.title} • {m.institution}</p>
                              <span className="text-[10px] text-emerald-700 font-mono-code font-medium">{m.verifiedProjectsCount} Verified Projects Advised</span>
                            </div>
                          </div>
                          <div className="text-right">
                            <span className="text-xs font-bold text-[#111111] font-mono-code">{m.matchScore}% Synergy</span>
                            <button
                              onClick={() => {
                                setApprovalToast(`Mentorship guidance requested from ${m.name}!`);
                                setTimeout(() => setApprovalToast(null), 3000);
                              }}
                              className="block mt-1 text-[11px] px-2.5 py-1 rounded-lg bg-[#F7F7F5] hover:bg-[#EBEBE8] border border-black/10 text-[#111111] font-medium cursor-pointer"
                            >
                              Request
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Mentors Directory */}
              {activeTab === 'mentors' && (
                <div className="space-y-4">
                  <h2 className="font-display text-2xl text-[#111111] font-normal">Institutional Mentors Directory</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {SAMPLE_MENTORS.map((m, idx) => (
                      <div key={idx} className="bg-white rounded-2xl p-5 border border-black/8 flex items-start gap-4 shadow-xs">
                        <img src={m.avatar} alt={m.name} className="w-12 h-12 rounded-xl object-cover border border-black/10" />
                        <div>
                          <h3 className="text-base font-semibold text-[#111111]">{m.name}</h3>
                          <p className="text-xs text-[#4A4A4A]">{m.title}</p>
                          <p className="text-xs text-[#737373] font-mono-code mt-0.5">{m.institution}</p>
                          <div className="flex flex-wrap gap-1 mt-2">
                            {m.domains.map((d) => (
                              <span key={d} className="text-[10px] px-2 py-0.5 rounded bg-[#F7F7F5] border border-black/5 text-[#4A4A4A]">
                                {d}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Collaboration */}
              {activeTab === 'collaboration' && (
                <div className="space-y-4">
                  <h2 className="font-display text-2xl text-[#111111] font-normal">Cross-Institution Team Collaborations</h2>
                  <div className="bg-white rounded-2xl p-6 border border-black/8 space-y-4 shadow-xs">
                    <p className="text-xs text-[#4A4A4A]">You have 2 pending team invitations for the 2026 Batch Roadmap.</p>
                    <div className="p-4 rounded-xl bg-[#FBFBFA] border border-black/8 flex items-center justify-between">
                      <div>
                        <h4 className="text-sm font-semibold text-[#111111]">AegisShield: Post-Quantum TLS 1.3 Hardware Accelerator</h4>
                        <p className="text-xs text-[#737373]">Graphic Era Hill University & IIT Delhi • Looking for VLSI Synthesis Leads</p>
                      </div>
                      <button
                        onClick={() => onOpenJoinProject(SAMPLE_PROJECTS[2] || SAMPLE_PROJECTS[0])}
                        className="px-3 py-1.5 rounded-xl bg-[#111111] text-white hover:bg-black text-xs font-medium cursor-pointer"
                      >
                        Review Proposal
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Project Passport Tab */}
              {activeTab === 'passport' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="font-display text-2xl text-[#111111] font-normal">Project Passport Inspector</h2>
                      <p className="text-xs text-[#4A4A4A]">Cryptographically signed academic passports with GitHub activity and faculty verification.</p>
                    </div>
                    <button
                      onClick={() => onOpenProjectDetail(SAMPLE_PROJECTS[0])}
                      className="px-4 py-2 rounded-xl bg-[#111111] text-white text-xs font-semibold cursor-pointer"
                    >
                      Open Full Screen Passport
                    </button>
                  </div>
                  <div className="bg-white rounded-2xl p-6 border border-black/8 shadow-xs">
                    <div className="flex items-center justify-between pb-4 border-b border-black/8 text-xs font-mono-code">
                      <span>PASSPORT_ID: {SAMPLE_PROJECTS[0].passportId}</span>
                      <span className="text-emerald-700 font-semibold">STATUS: VERIFIED</span>
                    </div>
                    <div className="py-4 space-y-2">
                      <h3 className="text-lg font-semibold text-[#111111]">{SAMPLE_PROJECTS[0].title}</h3>
                      <p className="text-xs text-[#4A4A4A]">{SAMPLE_PROJECTS[0].description}</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Project Lineage Tab */}
              {activeTab === 'lineage' && (
                <div className="space-y-4">
                  <h2 className="font-display text-2xl text-[#111111] font-normal">Multi-Batch Project Lineage</h2>
                  <p className="text-xs text-[#4A4A4A]">Track chronological evolution, predecessor foundations, and upcoming roadmaps.</p>
                  <div className="space-y-3">
                    {SAMPLE_PROJECTS[0].lineage.map((batch, idx) => (
                      <div key={idx} className="bg-white rounded-2xl p-4 border border-black/8 shadow-xs">
                        <div className="flex items-center justify-between text-xs font-mono-code mb-1">
                          <span className="text-[#111111] font-semibold">{batch.batchName}</span>
                          <span className={batch.activeStatus === 'Current' ? 'text-emerald-700 font-semibold' : 'text-[#737373]'}>
                            {batch.activeStatus}
                          </span>
                        </div>
                        <p className="text-xs text-[#4A4A4A]">{batch.summary}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Proof-of-Work Tab */}
              {activeTab === 'proof-of-work' && (
                <div className="space-y-4">
                  <h2 className="font-display text-2xl text-[#111111] font-normal">Verified Proof-of-Work</h2>
                  <p className="text-xs text-[#4A4A4A]">Your tamper-proof portfolio backed by institutional endorsements and git commits.</p>
                  <div className="bg-white rounded-2xl p-8 border border-black/8 text-center space-y-4 shadow-xs">
                    <Award className="w-12 h-12 text-[#111111] mx-auto" />
                    <h3 className="text-lg font-semibold text-[#111111]">Suraj Rawat • Graphic Era Hill University</h3>
                    <p className="text-xs text-[#4A4A4A] max-w-md mx-auto">
                      384 Verified Commits • Sub-millisecond SLAM & Drone Guidance • Faculty Endorsed by Dr. Anil Sharma
                    </p>
                    <button
                      onClick={onOpenProofOfWork}
                      className="btn-primary-black px-6 py-2.5 rounded-full text-xs font-medium cursor-pointer shadow-xs"
                    >
                      Export Verifiable Certificate
                    </button>
                  </div>
                </div>
              )}

              {/* Student Profile Tab (Access-Controlled) */}
              {activeTab === 'profile' && (
                <div className="space-y-6">
                  <div>
                    <h2 className="font-display text-2xl text-[#111111] font-normal">Academic Student Profile</h2>
                    <p className="text-xs text-[#4A4A4A]">Authenticated institutional profile and tamper-proof academic credentials.</p>
                  </div>

                  {/* Profile Privacy Notice */}
                  <div className="p-4 rounded-2xl bg-[#F7F7F5] border border-black/8 flex items-start gap-3 text-xs">
                    <Lock className="w-4 h-4 text-[#111111] shrink-0 mt-0.5" />
                    <div>
                      <span className="font-semibold text-[#111111]">Profile Privacy & Access Control Active</span>
                      <p className="text-[#4A4A4A] mt-0.5">
                        This profile is protected under ProjectVerse RBAC. Only authorized institutional reviewers and verified peers may view your portfolio details. Sensitive credentials remain cryptographically masked.
                      </p>
                    </div>
                  </div>

                  {/* Verification Status Alerts */}
                  {currentProfile?.verifiedStatus === 'Pending' && (
                    <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div className="flex items-start gap-2.5">
                        <Clock className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                        <div>
                          <h4 className="font-semibold text-amber-950">Verification Review in Progress</h4>
                          <p className="text-amber-800/90 mt-0.5">
                            Your academic credentials and document proofs are in the faculty review queue. You can continue building projects in sandbox mode while verification completes.
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={() => setIsDocUploadModalOpen(true)}
                        className="px-3.5 py-1.5 rounded-xl bg-amber-800 hover:bg-amber-900 text-white font-medium text-xs self-start sm:self-auto shrink-0 cursor-pointer shadow-xs"
                      >
                        Update Document Proof
                      </button>
                    </div>
                  )}

                  {currentProfile?.verifiedStatus === 'Rejected' && (
                    <div className="p-4 rounded-2xl bg-red-50 border border-red-200 text-red-900 text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div className="flex items-start gap-2.5">
                        <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                        <div>
                          <h4 className="font-semibold text-red-950">Verification Action Required</h4>
                          <p className="text-red-800/90 mt-0.5">
                            {currentProfile?.rejectionReason 
                              ? `Document Review Note: "${currentProfile.rejectionReason}"`
                              : 'Your identity document could not be validated against university records. Please upload a clearer copy.'}
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={() => setIsDocUploadModalOpen(true)}
                        className="px-3.5 py-1.5 rounded-xl bg-red-700 hover:bg-red-800 text-white font-medium text-xs self-start sm:self-auto shrink-0 cursor-pointer shadow-xs"
                      >
                        Re-upload Valid Document
                      </button>
                    </div>
                  )}

                  {/* Main Profile Card */}
                  <div className="bg-white rounded-2xl p-6 sm:p-8 border border-black/8 shadow-xs space-y-6">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 pb-6 border-b border-black/8">
                      <img
                        src={currentProfile?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'}
                        alt={currentProfile?.fullName || 'Suraj Rawat'}
                        className="w-20 h-20 rounded-2xl object-cover border border-black/10"
                      />
                      <div className="flex-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <h3 className="text-xl font-bold text-[#111111]">{currentProfile?.fullName || 'Suraj Rawat'}</h3>
                          <span className={`text-[11px] font-mono-code px-2 py-0.5 rounded-full font-medium ${
                            currentProfile?.verifiedStatus === 'Verified'
                              ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                              : currentProfile?.verifiedStatus === 'Rejected'
                              ? 'bg-red-50 text-red-800 border border-red-200'
                              : 'bg-amber-50 text-amber-800 border border-amber-200'
                          }`}>
                            {currentProfile?.verifiedStatus || 'Verified'} Identity
                          </span>
                          <span className="text-[10px] font-mono-code px-2 py-0.5 rounded-md bg-black/5 text-[#111111] font-semibold">
                            ROLE: {currentProfile?.role || 'STUDENT'}
                          </span>
                          {currentProfile?.studentType && (
                            <span className="text-[10px] font-mono-code px-2 py-0.5 rounded-md bg-[#111111] text-white font-semibold">
                              {currentProfile.studentType === 'ALUMNI' ? 'ALUMNI / PASS-OUT' : 'CURRENT STUDENT'}
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-[#4A4A4A] mt-0.5">
                          {currentProfile?.institution || 'Graphic Era Hill University'} • {currentProfile?.department || 'Dept of Computer Science & Engineering'}
                        </p>
                        
                        {/* Badges / metadata */}
                        <div className="flex flex-wrap items-center gap-2 text-xs text-[#737373] font-mono-code mt-2">
                          {currentProfile?.rollNumber && (
                            <span className="bg-[#F5F5F3] px-2 py-0.5 rounded border border-black/5">Roll: {currentProfile.rollNumber}</span>
                          )}
                          {currentProfile?.batch && (
                            <span className="bg-[#F5F5F3] px-2 py-0.5 rounded border border-black/5">Cohort: {currentProfile.batch}</span>
                          )}
                          {currentProfile?.graduationYear && (
                            <span className="bg-[#F5F5F3] px-2 py-0.5 rounded border border-black/5">Graduated: {currentProfile.graduationYear}</span>
                          )}
                          {currentProfile?.currentOrganization && (
                            <span className="bg-[#F5F5F3] px-2 py-0.5 rounded border border-black/5">Org: {currentProfile.currentOrganization}</span>
                          )}
                          {currentProfile?.currentJobRole && (
                            <span className="bg-[#F5F5F3] px-2 py-0.5 rounded border border-black/5">Role: {currentProfile.currentJobRole}</span>
                          )}
                          {currentProfile?.email && (
                            <span className="bg-[#F5F5F3] px-2 py-0.5 rounded border border-black/5">{currentProfile.email}</span>
                          )}
                        </div>
                      </div>

                      {/* Upload Document CTA button */}
                      <button
                        onClick={() => setIsDocUploadModalOpen(true)}
                        className="px-3.5 py-2 rounded-xl bg-[#F7F7F5] hover:bg-[#EBEBE8] border border-black/10 text-xs font-medium text-[#111111] flex items-center gap-1.5 transition-colors cursor-pointer shrink-0"
                      >
                        <UploadCloud className="w-3.5 h-3.5" />
                        <span>Academic Proof</span>
                      </button>
                    </div>

                    {/* Multi-Signal Verification Pipeline Status */}
                    <div className="bg-[#FAFAFA] rounded-xl p-4 border border-black/6">
                      <span className="text-[10.5px] font-mono-code uppercase font-semibold text-[#737373] block mb-2.5">
                        Multi-Signal Identity Verification Architecture
                      </span>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                        <div className="bg-white p-2.5 rounded-lg border border-black/5 flex items-center gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                          <div className="text-[11px] leading-tight">
                            <span className="font-semibold text-[#111111] block">Email Verified</span>
                            <span className="text-[10px] text-[#737373]">OTP Confirmed ✓</span>
                          </div>
                        </div>
                        <div className="bg-white p-2.5 rounded-lg border border-black/5 flex items-center gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                          <div className="text-[11px] leading-tight">
                            <span className="font-semibold text-[#111111] block">Edu Domain</span>
                            <span className="text-[10px] text-[#737373]">.ac.in / .edu node</span>
                          </div>
                        </div>
                        <div className="bg-white p-2.5 rounded-lg border border-black/5 flex items-center gap-2">
                          {currentProfile?.documentStatus === 'VERIFIED' ? (
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                          ) : currentProfile?.documentStatus === 'REJECTED' ? (
                            <AlertCircle className="w-3.5 h-3.5 text-red-600 shrink-0" />
                          ) : currentProfile?.documentStatus === 'PENDING_REVIEW' || currentProfile?.documentName ? (
                            <Clock className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                          ) : (
                            <div className="w-3.5 h-3.5 rounded-full border border-dashed border-[#737373]" />
                          )}
                          <div className="text-[11px] leading-tight">
                            <span className="font-semibold text-[#111111] block">ID Document</span>
                            <span className="text-[10px] text-[#737373]">
                              {currentProfile?.documentStatus === 'VERIFIED'
                                ? 'Hash Verified ✓'
                                : currentProfile?.documentStatus === 'REJECTED'
                                ? 'Action Required'
                                : currentProfile?.documentStatus === 'PENDING_REVIEW' || currentProfile?.documentName
                                ? 'In Review ⏳'
                                : 'Pending Upload'}
                            </span>
                          </div>
                        </div>
                        <div className="bg-white p-2.5 rounded-lg border border-black/5 flex items-center gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                          <div className="text-[11px] leading-tight">
                            <span className="font-semibold text-[#111111] block">Ledger Node</span>
                            <span className="text-[10px] text-[#737373]">Consensus sealed</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Bio & Skills */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="text-xs font-mono-code uppercase font-semibold text-[#737373] mb-2">Research Focus</h4>
                        <p className="text-xs text-[#4A4A4A] leading-relaxed">
                          {currentProfile?.bio || 'Undergraduate researcher focusing on autonomous systems, edge AI, and verifiable academic project architectures.'}
                        </p>
                      </div>

                      <div>
                        <h4 className="text-xs font-mono-code uppercase font-semibold text-[#737373] mb-2">Verified Skillsets</h4>
                        <div className="flex flex-wrap gap-1.5">
                          {(currentProfile?.skills || ['React', 'TypeScript', 'Node.js', 'PyTorch', 'ROS 2', 'PostgreSQL']).map((skill) => (
                            <span key={skill} className="text-xs font-mono-code px-2.5 py-1 rounded-lg bg-[#F7F7F5] border border-black/8 text-[#111111]">
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Academic Evidence Stats */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-6 border-t border-black/8">
                      <div className="p-3.5 rounded-xl bg-[#FBFBFA] border border-black/8">
                        <span className="text-[10.5px] font-mono-code text-[#737373] uppercase">Verified Capstones</span>
                        <p className="text-lg font-bold text-[#111111] mt-0.5">{currentProfile?.projectsCount || 2}</p>
                      </div>
                      <div className="p-3.5 rounded-xl bg-[#FBFBFA] border border-black/8">
                        <span className="text-[10.5px] font-mono-code text-[#737373] uppercase">GitHub Commits</span>
                        <p className="text-lg font-bold text-[#111111] mt-0.5">{currentProfile?.commitsCount || 384}</p>
                      </div>
                      <div className="p-3.5 rounded-xl bg-[#FBFBFA] border border-black/8 col-span-2 sm:col-span-1">
                        <span className="text-[10.5px] font-mono-code text-[#737373] uppercase">Rubric Score</span>
                        <p className="text-lg font-bold text-emerald-700 mt-0.5">{currentProfile?.rubricScore || 9.6} / 10</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Notifications Tab */}
              {activeTab === 'notifications' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="font-display text-2xl text-[#111111] font-normal">Notifications</h2>
                      <p className="text-xs text-[#4A4A4A]">Real-time academic alerts, faculty reviews, and collaborative invitations.</p>
                    </div>
                    <button
                      onClick={() => loadNotifications()}
                      className="px-3 py-1.5 rounded-xl bg-[#F5F5F3] hover:bg-[#EBEBE8] text-xs text-[#4A4A4A] font-medium flex items-center gap-1.5 cursor-pointer border border-black/8 transition-colors"
                    >
                      <RefreshCw className={`w-3.5 h-3.5 ${isLoadingNotifications ? 'animate-spin' : ''}`} />
                      <span>Refresh</span>
                    </button>
                  </div>

                  {isLoadingNotifications ? (
                    <div className="p-8 text-center bg-white rounded-2xl border border-black/8">
                      <div className="w-6 h-6 border-2 border-black border-t-transparent rounded-full animate-spin mx-auto mb-2" />
                      <p className="text-xs text-[#737373]">Loading notifications...</p>
                    </div>
                  ) : notifications.length === 0 ? (
                    <div className="bg-white rounded-2xl p-8 border border-black/8 text-center">
                      <Bell className="w-8 h-8 text-[#737373] mx-auto mb-2 opacity-50" />
                      <p className="text-xs text-[#4A4A4A]">No notifications at this time.</p>
                    </div>
                  ) : (
                    <div className="space-y-2.5">
                      {notifications.map((notif) => (
                        <div
                          key={notif.id}
                          id={`notification-item-${notif.id}`}
                          className={`rounded-2xl p-4 border transition-all text-xs shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                            !notif.read
                              ? 'bg-amber-50/75 border-amber-200/90'
                              : 'bg-white border-black/8'
                          }`}
                        >
                          <div className="flex items-start gap-3">
                            <div
                              className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                                !notif.read ? 'bg-amber-100 text-amber-800' : 'bg-[#F5F5F3] text-[#737373]'
                              }`}
                            >
                              <Bell className="w-4 h-4" />
                            </div>
                            <div>
                              <div className="flex items-center gap-2">
                                <p className="font-semibold text-[#111111]">{notif.title}</p>
                                {!notif.read && (
                                  <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-amber-200 text-amber-900 font-mono-code">
                                    New
                                  </span>
                                )}
                              </div>
                              <p className="text-[#4A4A4A] mt-0.5">{notif.message}</p>
                              {notif.projectTitle && (
                                <p className="text-[11px] text-[#737373] mt-0.5">
                                  Project: <span className="font-medium text-[#111111]">{notif.projectTitle}</span>
                                </p>
                              )}
                            </div>
                          </div>

                          <div className="flex items-center gap-3 self-end sm:self-center shrink-0">
                            <span className="text-[10px] text-[#737373] font-mono-code whitespace-nowrap">
                              {formatTimeAgo(notif.createdAt)}
                            </span>
                            {notif.type === 'FACULTY_FEEDBACK' && (
                              <button
                                id={`view-feedback-btn-${notif.id}`}
                                onClick={() => handleViewFeedback(notif)}
                                className="px-3.5 py-1.5 rounded-xl bg-[#111111] hover:bg-black text-white text-xs font-semibold flex items-center gap-1.5 cursor-pointer shadow-xs shrink-0"
                              >
                                <Eye className="w-3.5 h-3.5" />
                                <span>View Feedback</span>
                              </button>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {/* ========================================================================= */}
          {/* FACULTY ROLE VIEWS */}
          {/* ========================================================================= */}
          {activeRole === 'FACULTY' && (
            <div className="space-y-6">
              {activeTab === 'dashboard' && (
                <div className="space-y-6">
                  <div className="bg-[#FBFBFA] rounded-2xl p-6 sm:p-8 border border-black/8">
                    <span className="text-[11px] font-mono-code text-[#737373] uppercase font-semibold">Faculty Portal</span>
                    <h1 className="font-display text-2xl sm:text-3xl text-[#111111] mt-1 font-normal">
                      Welcome, Dr. Anil Sharma
                    </h1>
                    <p className="text-xs sm:text-sm text-[#4A4A4A] mt-1">
                      Associate Professor & Research Advisor • Graphic Era Hill University
                    </p>
                  </div>

                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="bg-[#FBFBFA] rounded-2xl p-4 border border-black/8">
                      <span className="text-[11px] font-mono-code text-[#737373] uppercase font-medium">Queue for Review</span>
                      <p className="text-2xl font-bold text-amber-700 mt-1">1 Pending</p>
                      <span className="text-[11px] text-[#737373]">Needs rubric scoring</span>
                    </div>
                    <div className="bg-[#FBFBFA] rounded-2xl p-4 border border-black/8">
                      <span className="text-[11px] font-mono-code text-[#737373] uppercase font-medium">Advised Projects</span>
                      <p className="text-2xl font-bold text-[#111111] mt-1">14</p>
                      <span className="text-[11px] text-emerald-700 font-medium">Across 3 academic years</span>
                    </div>
                    <div className="bg-[#FBFBFA] rounded-2xl p-4 border border-black/8">
                      <span className="text-[11px] font-mono-code text-[#737373] uppercase font-medium">Verified Passports</span>
                      <p className="text-2xl font-bold text-[#111111] mt-1">12 Issued</p>
                      <span className="text-[11px] text-[#4A4A4A]">Cryptographically Signed</span>
                    </div>
                    <div className="bg-[#FBFBFA] rounded-2xl p-4 border border-black/8">
                      <span className="text-[11px] font-mono-code text-[#737373] uppercase font-medium">Continuation Rate</span>
                      <p className="text-2xl font-bold text-emerald-700 mt-1">85%</p>
                      <span className="text-[11px] text-[#737373]">Inherited by next batch</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Student Identity Verification Management Tab for Faculty */}
              {activeTab === 'student-verifications' && (
                <div className="space-y-4">
                  <StudentVerificationManager reviewerRole="FACULTY" />
                </div>
              )}

              {/* Verification Queue Tab */}
              {(activeTab === 'verification-queue' || activeTab === 'dashboard') && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="font-display text-xl sm:text-2xl text-[#111111] font-normal">Academic Verification Queue</h2>
                      <p className="text-xs text-[#4A4A4A]">Evaluate capstone deliverables and assign cryptographic validation seals.</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    {SAMPLE_PROJECTS.map((p) => {
                      const isVerified = verifiedList.includes(p.id);
                      return (
                        <div key={p.id} className="bg-white rounded-2xl p-5 border border-black/8 shadow-xs">
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                            <div>
                              <div className="flex items-center gap-2">
                                <span className="text-[10px] font-mono-code text-[#737373] uppercase font-semibold">{p.passportId}</span>
                                <span className={`text-[10px] font-mono-code px-2 py-0.5 rounded-full font-medium ${
                                  isVerified ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' : 'bg-amber-50 text-amber-800 border border-amber-200'
                                }`}>
                                  {isVerified ? 'VERIFIED' : 'PENDING REVIEW'}
                                </span>
                              </div>
                              <h3 className="text-base font-semibold text-[#111111] mt-1">{p.title}</h3>
                              <p className="text-xs text-[#4A4A4A]">{p.institution} • Leads: {p.contributors.map(c => c.name).join(', ')}</p>
                            </div>

                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => onOpenProjectDetail(p)}
                                className="px-3 py-1.5 rounded-xl bg-[#F7F7F5] hover:bg-[#EBEBE8] border border-black/8 text-xs text-[#111111] font-medium cursor-pointer"
                              >
                                View Repo Telemetry
                              </button>
                              <button
                                id={`open-feedback-btn-${p.id}`}
                                onClick={() => {
                                  setReviewingProject(p);
                                  setReviewModalTab('feedback');
                                }}
                                className="px-3 py-1.5 rounded-xl bg-white hover:bg-[#F5F5F3] border border-black/10 text-xs text-[#111111] font-medium flex items-center gap-1.5 cursor-pointer shadow-xs"
                              >
                                <MessageSquare className="w-3.5 h-3.5 text-[#111111]" />
                                <span>Feedback</span>
                              </button>
                              <button
                                id={`open-rubric-btn-${p.id}`}
                                onClick={() => {
                                  setReviewingProject(p);
                                  setReviewModalTab('rubric');
                                }}
                                className="px-3.5 py-1.5 rounded-xl bg-[#111111] hover:bg-black text-xs font-semibold text-white cursor-pointer shadow-xs"
                              >
                                Evaluate Rubric
                              </button>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Other faculty tabs */}
              {activeTab === 'projects' && (
                <div className="space-y-4">
                  <h2 className="font-display text-2xl text-[#111111] font-normal">Advised Capstone Projects</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {SAMPLE_PROJECTS.map((p) => (
                      <div key={p.id} className="bg-white rounded-2xl p-5 border border-black/8 shadow-xs flex flex-col justify-between">
                        <div>
                          <div className="flex items-center justify-between gap-2 mb-1">
                            <span className="text-[10px] font-mono-code text-[#737373] uppercase">{p.academicYear}</span>
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200 font-mono-code">
                              ADVISED NODE
                            </span>
                          </div>
                          <h3 className="text-base font-semibold text-[#111111]">{p.title}</h3>
                          <p className="text-xs text-[#4A4A4A] mt-1 line-clamp-2">{p.tagline}</p>
                          <p className="text-[11px] text-[#737373] mt-2">
                            Leads: {p.contributors.map((c) => c.name).join(', ')}
                          </p>
                        </div>
                        <div className="flex items-center gap-2 mt-4 pt-3 border-t border-black/6">
                          <button
                            onClick={() => onOpenProjectDetail(p)}
                            className="px-3 py-1.5 rounded-xl bg-[#F7F7F5] hover:bg-[#EBEBE8] border border-black/8 text-xs text-[#111111] font-medium cursor-pointer"
                          >
                            Details
                          </button>
                          <button
                            id={`advised-feedback-btn-${p.id}`}
                            onClick={() => {
                              setReviewingProject(p);
                              setReviewModalTab('feedback');
                            }}
                            className="px-3 py-1.5 rounded-xl bg-white hover:bg-[#F5F5F3] border border-black/10 text-xs text-[#111111] font-medium flex items-center gap-1 cursor-pointer shadow-xs"
                          >
                            <MessageSquare className="w-3.5 h-3.5 text-[#111111]" />
                            <span>Feedback</span>
                          </button>
                          <button
                            id={`advised-rubric-btn-${p.id}`}
                            onClick={() => {
                              setReviewingProject(p);
                              setReviewModalTab('rubric');
                            }}
                            className="px-3.5 py-1.5 rounded-xl bg-[#111111] hover:bg-black text-xs font-semibold text-white cursor-pointer shadow-xs"
                          >
                            Review
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'students' && (
                <div className="space-y-4">
                  <h2 className="font-display text-2xl text-[#111111] font-normal">Advised Students & Researchers</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {SAMPLE_PROJECTS[0].contributors.map((c, i) => (
                      <div key={i} className="bg-white rounded-2xl p-4 border border-black/8 text-center shadow-xs">
                        <img src={c.avatar} alt={c.name} className="w-12 h-12 rounded-full mx-auto object-cover mb-2 border border-black/10" />
                        <h4 className="text-sm font-semibold text-[#111111]">{c.name}</h4>
                        <p className="text-xs text-[#737373]">{c.role}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'mentorship' && (
                <div className="space-y-4">
                  <h2 className="font-display text-2xl text-[#111111] font-normal">Mentorship Inquiries</h2>
                  <div className="bg-white rounded-2xl p-5 border border-black/8 shadow-xs">
                    <p className="text-xs text-[#4A4A4A]">You have 3 incoming mentorship requests from inter-university capstone teams seeking SLAM and ROS 2 guidance.</p>
                  </div>
                </div>
              )}

              {activeTab === 'reviews' && (
                <div className="space-y-4">
                  <h2 className="font-display text-2xl text-[#111111] font-normal">Past Evaluation Archive</h2>
                  <div className="bg-white rounded-2xl p-5 border border-black/8 shadow-xs">
                    <p className="text-xs text-[#4A4A4A]">14 Cryptographically signed reviews published to the ProjectVerse Ledger.</p>
                  </div>
                </div>
              )}

              {activeTab === 'profile' && (
                <div className="space-y-6">
                  <div>
                    <h2 className="font-display text-2xl text-[#111111] font-normal">Faculty Reviewer Profile</h2>
                    <p className="text-xs text-[#4A4A4A]">Authenticated institutional advisor & cryptographic evaluation signatory.</p>
                  </div>

                  <div className="bg-white rounded-2xl p-6 sm:p-8 border border-black/8 shadow-xs space-y-6">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 pb-6 border-b border-black/8">
                      <img
                        src={currentProfile?.avatar || 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80'}
                        alt={currentProfile?.fullName || 'Dr. Anil Sharma'}
                        className="w-20 h-20 rounded-2xl object-cover border border-black/10"
                      />
                      <div className="flex-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <h3 className="text-xl font-bold text-[#111111]">{currentProfile?.fullName || 'Dr. Anil Sharma'}</h3>
                          <span className="text-[11px] font-mono-code px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 font-medium">
                            {currentProfile?.verifiedStatus || 'Verified'} Faculty
                          </span>
                          <span className="text-[10px] font-mono-code px-2 py-0.5 rounded-md bg-black/5 text-[#111111] font-semibold">
                            ROLE: FACULTY
                          </span>
                        </div>
                        <p className="text-xs text-[#4A4A4A] mt-0.5">
                          {currentProfile?.designation || 'Associate Professor & Senior Research Advisor'} • {currentProfile?.institution || 'Graphic Era Hill University'}
                        </p>
                        <div className="flex flex-wrap items-center gap-3 text-xs text-[#737373] font-mono-code mt-1.5">
                          {currentProfile?.facultyId && (
                            <span className="bg-[#F5F5F3] px-2 py-0.5 rounded border border-black/5">Faculty ID: {currentProfile.facultyId}</span>
                          )}
                          {currentProfile?.department && (
                            <span className="bg-[#F5F5F3] px-2 py-0.5 rounded border border-black/5">{currentProfile.department}</span>
                          )}
                          {currentProfile?.email && (
                            <span className="bg-[#F5F5F3] px-2 py-0.5 rounded border border-black/5">{currentProfile.email}</span>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Multi-Signal Verification Pipeline Status */}
                    <div className="bg-[#FAFAFA] rounded-xl p-4 border border-black/6">
                      <span className="text-[10.5px] font-mono-code uppercase font-semibold text-[#737373] block mb-2.5">
                        Institutional Multi-Signal Verification Status
                      </span>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                        <div className="bg-white p-2.5 rounded-lg border border-black/5 flex items-center gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                          <div className="text-[11px] leading-tight">
                            <span className="font-semibold text-[#111111] block">Faculty Email</span>
                            <span className="text-[10px] text-[#737373]">Domain verified</span>
                          </div>
                        </div>
                        <div className="bg-white p-2.5 rounded-lg border border-black/5 flex items-center gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                          <div className="text-[11px] leading-tight">
                            <span className="font-semibold text-[#111111] block">Employee ID</span>
                            <span className="text-[10px] text-[#737373]">Payroll matched</span>
                          </div>
                        </div>
                        <div className="bg-white p-2.5 rounded-lg border border-black/5 flex items-center gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                          <div className="text-[11px] leading-tight">
                            <span className="font-semibold text-[#111111] block">Signing Key</span>
                            <span className="text-[10px] text-[#737373]">ECDSA active</span>
                          </div>
                        </div>
                        <div className="bg-white p-2.5 rounded-lg border border-black/5 flex items-center gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                          <div className="text-[11px] leading-tight">
                            <span className="font-semibold text-[#111111] block">HOD Approval</span>
                            <span className="text-[10px] text-[#737373]">Consensus sealed</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="text-xs font-mono-code uppercase font-semibold text-[#737373] mb-2">Research Specializations</h4>
                        <div className="flex flex-wrap gap-1.5">
                          {(currentProfile?.researchAreas || currentProfile?.skills || ['AI/ML', 'Edge Computing', 'Computer Vision']).map((area) => (
                            <span key={area} className="text-xs font-mono-code px-2.5 py-1 rounded-lg bg-[#F7F7F5] border border-black/8 text-[#111111]">
                              {area}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h4 className="text-xs font-mono-code uppercase font-semibold text-[#737373] mb-2">Advisory Metrics</h4>
                        <div className="grid grid-cols-2 gap-3">
                          <div className="p-3 rounded-xl bg-[#FBFBFA] border border-black/8">
                            <span className="text-[10px] font-mono-code text-[#737373] uppercase">Advised Projects</span>
                            <p className="text-lg font-bold text-[#111111] mt-0.5">{currentProfile?.projectsCount || 14}</p>
                          </div>
                          <div className="p-3 rounded-xl bg-[#FBFBFA] border border-black/8">
                            <span className="text-[10px] font-mono-code text-[#737373] uppercase">Mean Score</span>
                            <p className="text-lg font-bold text-emerald-700 mt-0.5">{currentProfile?.rubricScore || 9.8} / 10</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'notifications' && (
                <div className="space-y-3">
                  <h2 className="font-display text-2xl text-[#111111] font-normal">Faculty Notifications</h2>
                  <div className="bg-white rounded-2xl p-4 border border-black/8 text-xs shadow-xs">
                    <p className="text-[#111111] font-semibold">New Capstone Milestone Submitted</p>
                    <p className="text-[#4A4A4A]">AeroSync submitted ROS 2 Humble migration for final verification.</p>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ========================================================================= */}
          {/* HOD ROLE VIEWS */}
          {/* ========================================================================= */}
          {activeRole === 'HOD' && (
            <div className="space-y-6">
              <div className="bg-[#FBFBFA] rounded-2xl p-6 sm:p-8 border border-black/8">
                <span className="text-[11px] font-mono-code text-[#737373] uppercase font-semibold">Head of Department Portal</span>
                <h1 className="font-display text-2xl sm:text-3xl text-[#111111] mt-1 font-normal">
                  Welcome, Dr. Rajesh Kumar
                </h1>
                <p className="text-xs sm:text-sm text-[#4A4A4A] mt-1">
                  Department of Computer Science & Engineering • Graphic Era Hill University
                </p>
              </div>

              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-[#FBFBFA] rounded-2xl p-4 border border-black/8">
                  <span className="text-[11px] font-mono-code text-[#737373] uppercase font-medium">Total Capstones</span>
                  <p className="text-2xl font-bold text-[#111111] mt-1">48</p>
                  <span className="text-[11px] text-[#737373]">Current Academic Year</span>
                </div>
                <div className="bg-[#FBFBFA] rounded-2xl p-4 border border-black/8">
                  <span className="text-[11px] font-mono-code text-[#737373] uppercase font-medium">HOD Sign-Offs</span>
                  <p className="text-2xl font-bold text-emerald-700 mt-1">42 / 48</p>
                  <span className="text-[11px] text-emerald-700 font-medium">87% Approved</span>
                </div>
                <div className="bg-[#FBFBFA] rounded-2xl p-4 border border-black/8">
                  <span className="text-[11px] font-mono-code text-[#737373] uppercase font-medium">Duplication Prevented</span>
                  <p className="text-2xl font-bold text-[#111111] mt-1">32 Cases</p>
                  <span className="text-[11px] text-[#4A4A4A]">Continuous inheritance</span>
                </div>
                <div className="bg-[#FBFBFA] rounded-2xl p-4 border border-black/8">
                  <span className="text-[11px] font-mono-code text-[#737373] uppercase font-medium">Accreditation Score</span>
                  <p className="text-2xl font-bold text-[#111111] mt-1">A++ Tier</p>
                  <span className="text-[11px] text-[#737373]">NAAC / ABET Compliant</span>
                </div>
              </div>

              {/* HOD Profile Tab */}
              {activeTab === 'profile' && (
                <div className="space-y-6">
                  <div>
                    <h2 className="font-display text-2xl text-[#111111] font-normal">Head of Department Profile</h2>
                    <p className="text-xs text-[#4A4A4A]">Institutional governance authority & academic accreditation lead.</p>
                  </div>

                  <div className="bg-white rounded-2xl p-6 sm:p-8 border border-black/8 shadow-xs space-y-6">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 pb-6 border-b border-black/8">
                      <img
                        src={currentProfile?.avatar || 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80'}
                        alt={currentProfile?.fullName || 'Dr. Rajesh Kumar'}
                        className="w-20 h-20 rounded-2xl object-cover border border-black/10"
                      />
                      <div className="flex-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <h3 className="text-xl font-bold text-[#111111]">{currentProfile?.fullName || 'Dr. Rajesh Kumar'}</h3>
                          <span className="text-[11px] font-mono-code px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 font-medium">
                            {currentProfile?.verifiedStatus || 'Verified'} HOD Authority
                          </span>
                          <span className="text-[10px] font-mono-code px-2 py-0.5 rounded-md bg-black/5 text-[#111111] font-semibold">
                            ROLE: HOD
                          </span>
                        </div>
                        <p className="text-xs text-[#4A4A4A] mt-0.5">
                          {currentProfile?.designation || 'Head of Department'} • {currentProfile?.department || 'Dept of Computer Science & Engineering'}
                        </p>
                        <div className="flex flex-wrap items-center gap-3 text-xs text-[#737373] font-mono-code mt-1.5">
                          <span className="bg-[#F5F5F3] px-2 py-0.5 rounded border border-black/5">Token: {currentProfile?.departmentToken || 'GEHU-HOD-CSE-2025'}</span>
                          <span className="bg-[#F5F5F3] px-2 py-0.5 rounded border border-black/5">{currentProfile?.institution || 'Graphic Era Hill University'}</span>
                          <span className="bg-[#F5F5F3] px-2 py-0.5 rounded border border-black/5">{currentProfile?.email || 'rajesh.kumar@gehu.ac.in'}</span>
                        </div>
                      </div>
                    </div>

                    {/* Multi-Signal Verification Pipeline Status */}
                    <div className="bg-[#FAFAFA] rounded-xl p-4 border border-black/6">
                      <span className="text-[10.5px] font-mono-code uppercase font-semibold text-[#737373] block mb-2.5">
                        Departmental Governance & Multi-Signal Authority Status
                      </span>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                        <div className="bg-white p-2.5 rounded-lg border border-black/5 flex items-center gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                          <div className="text-[11px] leading-tight">
                            <span className="font-semibold text-[#111111] block">Institutional Domain</span>
                            <span className="text-[10px] text-[#737373]">.ac.in node</span>
                          </div>
                        </div>
                        <div className="bg-white p-2.5 rounded-lg border border-black/5 flex items-center gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                          <div className="text-[11px] leading-tight">
                            <span className="font-semibold text-[#111111] block">Dept Token</span>
                            <span className="text-[10px] text-[#737373]">Consensus matched</span>
                          </div>
                        </div>
                        <div className="bg-white p-2.5 rounded-lg border border-black/5 flex items-center gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                          <div className="text-[11px] leading-tight">
                            <span className="font-semibold text-[#111111] block">Accreditation Key</span>
                            <span className="text-[10px] text-[#737373]">NAAC/ABET Level</span>
                          </div>
                        </div>
                        <div className="bg-white p-2.5 rounded-lg border border-black/5 flex items-center gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                          <div className="text-[11px] leading-tight">
                            <span className="font-semibold text-[#111111] block">Ledger Root Sign</span>
                            <span className="text-[10px] text-[#737373]">Master seal active</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* HOD Student Identity Queue Tab */}
              {activeTab === 'student-verifications' && (
                <div className="space-y-4">
                  <StudentVerificationManager reviewerRole="HOD" />
                </div>
              )}

              {/* Department Projects List */}
              {activeTab !== 'profile' && activeTab !== 'student-verifications' && (
                <div className="space-y-4">
                  <h3 className="text-base font-semibold text-[#111111]">Department Capstone Registry</h3>
                  <div className="space-y-3">
                    {SAMPLE_PROJECTS.map((p) => (
                      <div key={p.id} className="bg-white rounded-2xl p-4 border border-black/8 flex items-center justify-between shadow-xs">
                        <div>
                          <span className="text-[10px] font-mono-code text-[#737373] uppercase font-semibold">{p.passportId}</span>
                          <h4 className="text-sm font-semibold text-[#111111]">{p.title}</h4>
                          <p className="text-xs text-[#737373]">Faculty Guide: {p.passport.facultyReviewer.name} • Score: {p.passport.facultyReviewer.score}/10</p>
                        </div>
                        <button
                          onClick={() => {
                            setApprovalToast(`Official Institutional Seal granted to ${p.passportId}!`);
                            setTimeout(() => setApprovalToast(null), 3000);
                          }}
                          className="px-3 py-1.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-xs font-semibold text-white cursor-pointer shadow-xs"
                        >
                          Grant Institutional Seal
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ========================================================================= */}
          {/* ADMIN ROLE VIEWS */}
          {/* ========================================================================= */}
          {activeRole === 'ADMIN' && (
            <div className="space-y-6">
              <div className="bg-[#FBFBFA] rounded-2xl p-6 sm:p-8 border border-black/8">
                <span className="text-[11px] font-mono-code text-[#737373] uppercase font-semibold">Network Administration</span>
                <h1 className="font-display text-2xl sm:text-3xl text-[#111111] mt-1 font-normal">
                  ProjectVerse National Node Ledger
                </h1>
                <p className="text-xs sm:text-sm text-[#4A4A4A] mt-1">
                  Cross-institutional governance, consensus nodes, and security telemetry • Graphic Era Hill University Anchor
                </p>
              </div>

              {activeTab === 'profile' && (
                <div className="space-y-6">
                  <div>
                    <h2 className="font-display text-2xl text-[#111111] font-normal">System Administrator Profile</h2>
                    <p className="text-xs text-[#4A4A4A]">Root administrator for federated nodes, cryptographic keys, and SAML SSO.</p>
                  </div>

                  <div className="bg-white rounded-2xl p-6 sm:p-8 border border-black/8 shadow-xs space-y-6">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 pb-6 border-b border-black/8">
                      <img
                        src={currentProfile?.avatar || 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80'}
                        alt={currentProfile?.fullName || 'Admin User'}
                        className="w-20 h-20 rounded-2xl object-cover border border-black/10"
                      />
                      <div className="flex-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <h3 className="text-xl font-bold text-[#111111]">{currentProfile?.fullName || 'Root System Admin'}</h3>
                          <span className="text-[11px] font-mono-code px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 font-medium">
                            {currentProfile?.verifiedStatus || 'Verified'} Root Authority
                          </span>
                          <span className="text-[10px] font-mono-code px-2 py-0.5 rounded-md bg-black/5 text-[#111111] font-semibold">
                            ROLE: ADMIN
                          </span>
                        </div>
                        <p className="text-xs text-[#4A4A4A] mt-0.5">
                          Lead Ledger Administrator • Institutional Academic Office • Graphic Era Hill University Anchor
                        </p>
                        <div className="flex flex-wrap items-center gap-3 text-xs text-[#737373] font-mono-code mt-1.5">
                          <span className="bg-[#F5F5F3] px-2 py-0.5 rounded border border-black/5">Root Key: ROOT-NODE-GEHU-01</span>
                          <span className="bg-[#F5F5F3] px-2 py-0.5 rounded border border-black/5">RBAC: Level 0 Master</span>
                          <span className="bg-[#F5F5F3] px-2 py-0.5 rounded border border-black/5">{currentProfile?.email || 'admin@gehu.ac.in'}</span>
                        </div>
                      </div>
                    </div>

                    {/* Multi-Signal Verification Pipeline Status */}
                    <div className="bg-[#FAFAFA] rounded-xl p-4 border border-black/6">
                      <span className="text-[10.5px] font-mono-code uppercase font-semibold text-[#737373] block mb-2.5">
                        Root Security & Node Telemetry Status
                      </span>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                        <div className="bg-white p-2.5 rounded-lg border border-black/5 flex items-center gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                          <div className="text-[11px] leading-tight">
                            <span className="font-semibold text-[#111111] block">SAML SSO</span>
                            <span className="text-[10px] text-[#737373]">128 Unis sync</span>
                          </div>
                        </div>
                        <div className="bg-white p-2.5 rounded-lg border border-black/5 flex items-center gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                          <div className="text-[11px] leading-tight">
                            <span className="font-semibold text-[#111111] block">Consensus Node</span>
                            <span className="text-[10px] text-[#737373]">0 cryptographic faults</span>
                          </div>
                        </div>
                        <div className="bg-white p-2.5 rounded-lg border border-black/5 flex items-center gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                          <div className="text-[11px] leading-tight">
                            <span className="font-semibold text-[#111111] block">Audit Pipeline</span>
                            <span className="text-[10px] text-[#737373]">Immutable stream</span>
                          </div>
                        </div>
                        <div className="bg-white p-2.5 rounded-lg border border-black/5 flex items-center gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                          <div className="text-[11px] leading-tight">
                            <span className="font-semibold text-[#111111] block">RBAC Enforcement</span>
                            <span className="text-[10px] text-[#737373]">Zero breach detected</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              {/* Admin Student ID Verifications Tab */}
              {activeTab === 'student-verifications' && (
                <div className="space-y-4">
                  <StudentVerificationManager reviewerRole="ADMIN" />
                </div>
              )}

              {activeTab !== 'profile' && activeTab !== 'student-verifications' && (
                <>
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="bg-[#FBFBFA] rounded-2xl p-4 border border-black/8">
                      <span className="text-[11px] font-mono-code text-[#737373] uppercase font-medium">Registered Universities</span>
                      <p className="text-2xl font-bold text-[#111111] mt-1">128</p>
                      <span className="text-[11px] text-emerald-700 font-medium">Federated SAML SSO</span>
                    </div>
                    <div className="bg-[#FBFBFA] rounded-2xl p-4 border border-black/8">
                      <span className="text-[11px] font-mono-code text-[#737373] uppercase font-medium">Total Passports</span>
                      <p className="text-2xl font-bold text-[#111111] mt-1">4,920</p>
                      <span className="text-[11px] text-[#4A4A4A]">On-Chain Hashes</span>
                    </div>
                    <div className="bg-[#FBFBFA] rounded-2xl p-4 border border-black/8">
                      <span className="text-[11px] font-mono-code text-[#737373] uppercase font-medium">Network Health</span>
                      <p className="text-2xl font-bold text-emerald-700 mt-1">99.99%</p>
                      <span className="text-[11px] text-[#737373]">Zero cryptographic faults</span>
                    </div>
                    <div className="bg-[#FBFBFA] rounded-2xl p-4 border border-black/8">
                      <span className="text-[11px] font-mono-code text-[#737373] uppercase font-medium">Cross-College PRs</span>
                      <p className="text-2xl font-bold text-[#111111] mt-1">1,840</p>
                      <span className="text-[11px] text-[#4A4A4A]">Inter-campus collaboration</span>
                    </div>
                  </div>

                  {/* System Audit Logs */}
                  <div className="bg-white rounded-2xl p-6 border border-black/8 font-mono-code text-xs shadow-xs">
                    <h3 className="text-sm font-semibold text-[#111111] mb-4">Live Immutable Audit Stream</h3>
                    <div className="space-y-2 text-[#4A4A4A]">
                      <p><span className="text-emerald-700 font-semibold">[05:02:11]</span> HOD_VALIDATION_EVENT: PV-2025-GEHU-CS089 sealed by Dean Academic Office.</p>
                      <p><span className="text-[#111111] font-semibold">[04:58:30]</span> GIT_SYNC_TELEMETRY: Merged PR #116 in repo projectverse-academic/aerosync.</p>
                      <p><span className="text-[#737373] font-semibold">[04:45:12]</span> AI_MATCH_ENGINE: Skill gap match generated between Graphic Era Hill University & IIT Delhi.</p>
                    </div>
                  </div>
                </>
              )}
            </div>
          )}
        </main>
      </div>

      {/* Student/Alumni Academic Document Proof Upload Modal */}
      {isDocUploadModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/45 backdrop-blur-sm overflow-y-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full border border-black/10 shadow-2xl text-[#111111] max-h-[90vh] overflow-y-auto"
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <FileCheck2 className="w-5 h-5 text-[#111111]" />
                <h3 className="font-display text-2xl text-[#111111] font-normal">
                  {currentProfile?.studentType === 'ALUMNI' ? 'Alumni Academic Proof' : 'Student Identity Verification'}
                </h3>
              </div>
              <button
                onClick={() => {
                  setIsDocUploadModalOpen(false);
                  setPendingUploadDoc(null);
                }}
                className="w-7 h-7 rounded-full bg-[#F5F5F3] hover:bg-[#EBEBE8] border border-black/8 flex items-center justify-center text-[#4A4A4A] cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
            
            <p className="text-xs text-[#4A4A4A] mb-4">
              Upload your valid academic proof (Student ID card, Degree Certificate, Provisional Pass Certificate, or Official Enrollment Letter). All documents remain strictly private and encrypted.
            </p>

            <DocumentUploadDropzone
              studentType={currentProfile?.studentType || 'CURRENT_STUDENT'}
              isUploading={isSubmittingDoc}
              externalError={docUploadError}
              onFileSelected={(data) => {
                setDocUploadError(null);
                setPendingUploadDoc(data);
              }}
              onFileRemoved={() => {
                setPendingUploadDoc(null);
                setDocUploadError(null);
              }}
            />

            <div className="flex items-center justify-end gap-3 pt-4 border-t border-black/8 mt-4">
              <button
                type="button"
                disabled={isSubmittingDoc}
                onClick={() => {
                  setIsDocUploadModalOpen(false);
                  setPendingUploadDoc(null);
                  setDocUploadError(null);
                }}
                className="px-4 py-2 rounded-xl bg-[#F5F5F3] hover:bg-[#EBEBE8] text-xs text-[#4A4A4A] font-medium cursor-pointer disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleStudentDocumentSubmit}
                disabled={!pendingUploadDoc || isSubmittingDoc}
                className="btn-primary-black px-5 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 cursor-pointer shadow-xs disabled:opacity-50"
              >
                <UploadCloud className="w-3.5 h-3.5" />
                <span>{isSubmittingDoc ? 'Uploading...' : 'Submit for Verification'}</span>
              </button>
            </div>
          </motion.div>
        </div>
      )}

      {/* Faculty Project Review Modal (Rubric & Feedback) in Clean White Visual System */}
      {reviewingProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/45 backdrop-blur-sm overflow-y-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full border border-black/10 shadow-2xl text-[#111111] max-h-[90vh] overflow-y-auto"
          >
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-display text-2xl text-[#111111] font-normal">Faculty Project Review</h3>
              <button
                onClick={() => setReviewingProject(null)}
                className="w-7 h-7 rounded-full bg-[#F5F5F3] hover:bg-[#EBEBE8] border border-black/8 flex items-center justify-center text-[#4A4A4A] cursor-pointer"
              >
                <LogOut className="w-3.5 h-3.5" />
              </button>
            </div>
            <p className="text-xs text-[#737373] mb-4">{reviewingProject.title}</p>

            {/* Modal Navigation Tabs: Rubric vs Feedback */}
            <div className="flex items-center gap-1 bg-[#F7F7F5] p-1 rounded-xl border border-black/8 text-xs font-medium mb-5">
              <button
                type="button"
                id="review-tab-rubric-btn"
                onClick={() => setReviewModalTab('rubric')}
                className={`flex-1 py-1.5 rounded-lg transition-all text-center cursor-pointer ${
                  reviewModalTab === 'rubric'
                    ? 'bg-[#111111] text-white shadow-xs font-semibold'
                    : 'text-[#4A4A4A] hover:text-[#111111]'
                }`}
              >
                Rubric Evaluation
              </button>
              <button
                type="button"
                id="review-tab-feedback-btn"
                onClick={() => setReviewModalTab('feedback')}
                className={`flex-1 py-1.5 rounded-lg transition-all text-center cursor-pointer flex items-center justify-center gap-1.5 ${
                  reviewModalTab === 'feedback'
                    ? 'bg-[#111111] text-white shadow-xs font-semibold'
                    : 'text-[#4A4A4A] hover:text-[#111111]'
                }`}
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>Feedback</span>
                {projectFeedbacks.length > 0 && (
                  <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono-code ${
                    reviewModalTab === 'feedback' ? 'bg-white/20 text-white' : 'bg-black/8 text-[#111111]'
                  }`}>
                    {projectFeedbacks.length}
                  </span>
                )}
              </button>
            </div>

            {reviewModalTab === 'feedback' ? (
              <div className="space-y-4 mb-6">
                <div>
                  <label className="block text-xs font-semibold text-[#111111] mb-1">
                    Feedback
                  </label>
                  <p className="text-[11px] text-[#737373] mb-2">
                    Write practical improvement suggestions, corrections, and next steps for the student team.
                  </p>
                  <textarea
                    id="faculty-feedback-input"
                    rows={5}
                    maxLength={2000}
                    placeholder="Write your feedback..."
                    value={facultyFeedbackText}
                    onChange={(e) => {
                      setFacultyFeedbackText(e.target.value);
                      if (feedbackError) setFeedbackError(null);
                    }}
                    className="w-full p-3 rounded-xl bg-[#F7F7F5] border border-black/10 text-[#111111] text-xs placeholder:text-[#888888] focus:outline-none focus:border-black focus:bg-white resize-y"
                  />
                  <div className="flex items-center justify-between text-[11px] text-[#737373] mt-1">
                    <span>Constructive academic guidance</span>
                    <span className="font-mono-code">{facultyFeedbackText.length}/2000</span>
                  </div>
                </div>

                {feedbackError && (
                  <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 shrink-0" />
                    <span>{feedbackError}</span>
                  </div>
                )}

                {feedbackSuccess && (
                  <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 shrink-0" />
                    <span>{feedbackSuccess}</span>
                  </div>
                )}

                <div className="pt-2">
                  <button
                    type="button"
                    id="submit-feedback-btn"
                    onClick={handleSubmitFeedback}
                    disabled={isSubmittingFeedback || !facultyFeedbackText.trim()}
                    className="btn-primary-black w-full py-2.5 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 cursor-pointer shadow-xs disabled:opacity-50"
                  >
                    {isSubmittingFeedback ? (
                      <>
                        <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>Submitting Feedback...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-3.5 h-3.5" />
                        <span>Submit Feedback</span>
                      </>
                    )}
                  </button>
                </div>

                {projectFeedbacks.length > 0 && (
                  <div className="pt-4 border-t border-black/8 space-y-3">
                    <h4 className="text-xs font-semibold text-[#111111] flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-[#737373]" />
                      <span>Previous Feedback History ({projectFeedbacks.length})</span>
                    </h4>
                    <div className="space-y-2 max-h-44 overflow-y-auto pr-1">
                      {projectFeedbacks.map((fb) => (
                        <div
                          key={fb.id}
                          className="p-3 rounded-xl bg-[#FBFBFA] border border-black/8 text-xs space-y-1"
                        >
                          <div className="flex items-center justify-between text-[11px]">
                            <span className="font-semibold text-[#111111]">{fb.facultyName}</span>
                            <span className="text-[#737373] font-mono-code">{formatTimeAgo(fb.createdAt)}</span>
                          </div>
                          <p className="text-[#4A4A4A] whitespace-pre-wrap">{fb.message}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="space-y-4 text-xs mb-6">
                <div>
                  <div className="flex justify-between text-[#111111] mb-1 font-medium">
                    <span>Technical Rigor & Code Architecture</span>
                    <span className="font-mono-code font-bold">{rubricScores.technicalRigor}/10</span>
                  </div>
                  <input
                    type="range"
                    min="5"
                    max="10"
                    step="0.1"
                    value={rubricScores.technicalRigor}
                    onChange={(e) => setRubricScores({ ...rubricScores, technicalRigor: parseFloat(e.target.value) })}
                    className="w-full accent-black cursor-pointer"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-[#111111] mb-1 font-medium">
                    <span>Novelty & Innovation</span>
                    <span className="font-mono-code font-bold">{rubricScores.novelty}/10</span>
                  </div>
                  <input
                    type="range"
                    min="5"
                    max="10"
                    step="0.1"
                    value={rubricScores.novelty}
                    onChange={(e) => setRubricScores({ ...rubricScores, novelty: parseFloat(e.target.value) })}
                    className="w-full accent-black cursor-pointer"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-[#111111] mb-1 font-medium">
                    <span>Documentation & Reproduction Potential</span>
                    <span className="font-mono-code font-bold">{rubricScores.documentation}/10</span>
                  </div>
                  <input
                    type="range"
                    min="5"
                    max="10"
                    step="0.1"
                    value={rubricScores.documentation}
                    onChange={(e) => setRubricScores({ ...rubricScores, documentation: parseFloat(e.target.value) })}
                    className="w-full accent-black cursor-pointer"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-[#111111] mb-1 font-medium">
                    <span>Continuity & Next-Batch Readiness</span>
                    <span className="font-mono-code font-bold">{rubricScores.continuityPotential}/10</span>
                  </div>
                  <input
                    type="range"
                    min="5"
                    max="10"
                    step="0.1"
                    value={rubricScores.continuityPotential}
                    onChange={(e) => setRubricScores({ ...rubricScores, continuityPotential: parseFloat(e.target.value) })}
                    className="w-full accent-black cursor-pointer"
                  />
                </div>

                <div>
                  <label className="block text-[#111111] font-medium mb-1">Qualitative Endorsement</label>
                  <textarea
                    rows={2}
                    value={reviewFeedback}
                    onChange={(e) => setReviewFeedback(e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-[#F7F7F5] border border-black/10 text-[#111111] text-xs focus:outline-none focus:border-black focus:bg-white"
                  />
                </div>
              </div>
            )}

            <div className="flex items-center justify-end gap-3 pt-2 border-t border-black/8">
              <button
                onClick={() => setReviewingProject(null)}
                className="px-4 py-2 rounded-xl bg-[#F5F5F3] hover:bg-[#EBEBE8] text-xs text-[#4A4A4A] font-medium cursor-pointer"
              >
                Close
              </button>
              {reviewModalTab === 'rubric' && (
                <button
                  onClick={() => handleSignVerification(reviewingProject.id)}
                  className="btn-primary-black px-5 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 cursor-pointer shadow-xs"
                >
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Publish Cryptographic Signature</span>
                </button>
              )}
            </div>
          </motion.div>
        </div>
      )}

      {/* Student Viewing Feedback Detail Modal */}
      {viewingFeedbackDetail && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/45 backdrop-blur-sm overflow-y-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full border border-black/10 shadow-2xl text-[#111111] max-h-[90vh] overflow-y-auto"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-amber-100 flex items-center justify-center text-amber-800">
                  <MessageSquare className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-display text-xl text-[#111111] font-normal">Faculty Review Feedback</h3>
                  <p className="text-[11px] text-[#737373] font-mono-code">
                    {formatTimeAgo(viewingFeedbackDetail.notif.createdAt)}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setViewingFeedbackDetail(null)}
                className="w-7 h-7 rounded-full bg-[#F5F5F3] hover:bg-[#EBEBE8] border border-black/8 flex items-center justify-center text-[#4A4A4A] cursor-pointer"
              >
                <LogOut className="w-3.5 h-3.5" />
              </button>
            </div>

            {viewingFeedbackDetail.project && (
              <div className="mb-4 p-3.5 rounded-2xl bg-[#FBFBFA] border border-black/8">
                <span className="text-[10px] font-mono-code text-[#737373] uppercase tracking-wider">PROJECT</span>
                <h4 className="text-sm font-semibold text-[#111111] mt-0.5">{viewingFeedbackDetail.project.title}</h4>
                <p className="text-xs text-[#4A4A4A] mt-0.5 line-clamp-2">{viewingFeedbackDetail.project.tagline}</p>
              </div>
            )}

            <div className="space-y-3 mb-6">
              <div className="flex items-center gap-2 text-xs">
                <span className="text-[#737373]">Reviewed by:</span>
                <span className="font-semibold text-[#111111]">{viewingFeedbackDetail.facultyName}</span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200">
                  Faculty Advisor
                </span>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#111111] mb-1.5">Feedback & Actionable Next Steps</label>
                <div className="p-4 rounded-2xl bg-[#F7F7F5] border border-black/10 text-xs text-[#111111] whitespace-pre-wrap leading-relaxed">
                  {viewingFeedbackDetail.feedbackMessage}
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-3 border-t border-black/8">
              {viewingFeedbackDetail.project && (
                <button
                  onClick={() => {
                    const p = viewingFeedbackDetail.project!;
                    setViewingFeedbackDetail(null);
                    onOpenProjectDetail(p);
                  }}
                  className="px-4 py-2 rounded-xl bg-[#F5F5F3] hover:bg-[#EBEBE8] text-xs text-[#111111] font-medium cursor-pointer"
                >
                  Open Project Details
                </button>
              )}
              <button
                onClick={() => setViewingFeedbackDetail(null)}
                className="btn-primary-black px-5 py-2 rounded-xl text-xs font-semibold cursor-pointer shadow-xs"
              >
                Done
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};
