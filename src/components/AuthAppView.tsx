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
  FileText
} from 'lucide-react';
import { ProjectItem, ProjectDomain } from '../types';
import { SAMPLE_PROJECTS, DOMAINS_LIST, SAMPLE_PEERS, SAMPLE_MENTORS } from '../data/mockData';
import { ProjectVerseBrand } from './ProjectVerseBrand';
import { getCurrentSession, resolveProfileWithPrivacy, UserProfile } from '../lib/authService';

export type UserRole = 'STUDENT' | 'FACULTY' | 'HOD' | 'ADMIN';

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

    // Default fallback profile based on role if no session in storage
    const fallbackProfiles: Record<UserRole, UserProfile> = {
      STUDENT: {
        id: 'usr-student-01',
        email: 'suraj@gehu.ac.in',
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
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
        verifiedStatus: 'Verified',
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
        avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80',
        verifiedStatus: 'Verified',
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
        avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
        verifiedStatus: 'Verified',
        projectsCount: 128,
        bio: 'System Administrator for ProjectVerse Federated Ledger, SAML SSO, and node verification.',
        skills: ['Network Administration', 'Ledger Governance', 'SAML SSO', 'Node Consensus']
      }
    };

    setCurrentProfile(fallbackProfiles[initialRole]);
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
      { id: 'verification-queue', label: 'Verification Queue', icon: FileCheck2 },
      { id: 'projects', label: 'Advised Projects', icon: FolderGit2 },
      { id: 'students', label: 'Advised Students', icon: Users },
      { id: 'mentorship', label: 'Mentorship Inquiries', icon: Sparkles },
      { id: 'reviews', label: 'Past Evaluations', icon: ShieldCheck },
      { id: 'profile', label: 'Profile', icon: UserCheck },
      { id: 'notifications', label: 'Notifications', icon: Bell }
    ],
    HOD: [
      { id: 'dashboard', label: 'Executive Dashboard', icon: BarChart3 },
      { id: 'registry', label: 'Capstone Registry', icon: FileSpreadsheet },
      { id: 'governance', label: 'Institutional Sign-Off', icon: ShieldCheck },
      { id: 'accreditation', label: 'NAAC / ABET Metrics', icon: Award },
      { id: 'faculty-status', label: 'Faculty Guides', icon: BookOpen },
      { id: 'profile', label: 'Profile', icon: UserCheck },
      { id: 'notifications', label: 'Notifications', icon: Bell }
    ],
    ADMIN: [
      { id: 'dashboard', label: 'Network Overview', icon: Cpu },
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
                  setActiveRole(r);
                  setActiveTab('dashboard');
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
                          <span className="text-[11px] font-mono-code px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 font-medium">
                            {currentProfile?.verifiedStatus || 'Verified'} Identity
                          </span>
                        </div>
                        <p className="text-xs text-[#4A4A4A] mt-0.5">
                          {currentProfile?.institution || 'Graphic Era Hill University'} • {currentProfile?.department || 'Dept of Computer Science & Engineering'}
                        </p>
                        <p className="text-xs text-[#737373] font-mono-code mt-1">
                          Cohort: {currentProfile?.batch || "B.Tech '26"} • GitHub: {currentProfile?.githubHandle || 'surajrawat-dev'}
                        </p>
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
                <div className="space-y-3">
                  <h2 className="font-display text-2xl text-[#111111] font-normal">Notifications</h2>
                  <div className="bg-white rounded-2xl p-4 border border-black/8 flex items-center justify-between text-xs shadow-xs">
                    <div>
                      <p className="font-semibold text-[#111111]">Faculty Review Completed</p>
                      <p className="text-[#4A4A4A]">Dr. Anil Sharma signed your ROS 2 swarm milestone (9.6/10).</p>
                    </div>
                    <span className="text-[10px] text-[#737373] font-mono-code">2 hours ago</span>
                  </div>
                  <div className="bg-white rounded-2xl p-4 border border-black/8 flex items-center justify-between text-xs shadow-xs">
                    <div>
                      <p className="font-semibold text-[#111111]">Teammate Proposal</p>
                      <p className="text-[#4A4A4A]">Aarohi Sen from IIIT Hyderabad joined the Spiking Neural Net module.</p>
                    </div>
                    <span className="text-[10px] text-[#737373] font-mono-code">1 day ago</span>
                  </div>
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
                                onClick={() => setReviewingProject(p)}
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
                      <div key={p.id} className="bg-white rounded-2xl p-4 border border-black/8 shadow-xs">
                        <h3 className="text-base font-semibold text-[#111111]">{p.title}</h3>
                        <p className="text-xs text-[#4A4A4A] mt-1">{p.tagline}</p>
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
                <div className="space-y-4">
                  <h2 className="font-display text-2xl text-[#111111] font-normal">Faculty Profile</h2>
                  <div className="bg-white rounded-2xl p-6 border border-black/8 shadow-xs space-y-4">
                    <div className="flex items-center gap-4">
                      <img src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80" alt="Dr. Anil Sharma" className="w-16 h-16 rounded-2xl object-cover border border-black/10" />
                      <div>
                        <h3 className="text-lg font-semibold text-[#111111]">Dr. Anil Sharma</h3>
                        <p className="text-xs text-[#4A4A4A]">Associate Professor • Graphic Era Hill University</p>
                        <p className="text-xs text-[#737373] font-mono-code mt-0.5">Verified Academic Reviewer • 14 Capstones Advised</p>
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

              {/* Department Projects List */}
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
            </div>
          )}
        </main>
      </div>

      {/* Faculty Evaluation Rubric Modal in Clean White Visual System */}
      {reviewingProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/45 backdrop-blur-sm overflow-y-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full border border-black/10 shadow-2xl text-[#111111] max-h-[90vh] overflow-y-auto"
          >
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-display text-2xl text-[#111111] font-normal">Faculty Rubric Evaluation</h3>
              <button
                onClick={() => setReviewingProject(null)}
                className="w-7 h-7 rounded-full bg-[#F5F5F3] hover:bg-[#EBEBE8] border border-black/8 flex items-center justify-center text-[#4A4A4A] cursor-pointer"
              >
                <LogOut className="w-3.5 h-3.5" />
              </button>
            </div>
            <p className="text-xs text-[#737373] mb-4">{reviewingProject.title}</p>

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

            <div className="flex items-center justify-end gap-3 pt-2 border-t border-black/8">
              <button
                onClick={() => setReviewingProject(null)}
                className="px-4 py-2 rounded-xl bg-[#F5F5F3] hover:bg-[#EBEBE8] text-xs text-[#4A4A4A] font-medium cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={() => handleSignVerification(reviewingProject.id)}
                className="btn-primary-black px-5 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 cursor-pointer shadow-xs"
              >
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Publish Cryptographic Signature</span>
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};
