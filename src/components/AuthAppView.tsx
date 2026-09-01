import React, { useState } from 'react';
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
  Eye
} from 'lucide-react';
import { ProjectItem, ProjectDomain } from '../types';
import { SAMPLE_PROJECTS, DOMAINS_LIST, SAMPLE_PEERS, SAMPLE_MENTORS, AI_SKILLS_POOL } from '../data/mockData';

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
  
  // Faculty review simulation state
  const [reviewingProject, setReviewingProject] = useState<ProjectItem | null>(null);
  const [rubricScores, setRubricScores] = useState({
    novelty: 9.5,
    technicalRigor: 9.2,
    documentation: 9.0,
    continuityPotential: 9.8
  });
  const [reviewFeedback, setReviewFeedback] = useState('Excellent work on the distributed architecture. Ready for next-batch continuation.');
  const [verifiedList, setVerifiedList] = useState<string[]>(['proj-1', 'proj-2', 'proj-3']);
  const [approvalToast, setApprovalToast] = useState<string | null>(null);

  // Filter projects for discovery tab
  const filteredProjects = SAMPLE_PROJECTS.filter((p) => {
    const matchSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.techStack.some(t => t.toLowerCase().includes(searchQuery.toLowerCase())) ||
      p.institution.toLowerCase().includes(searchQuery.toLowerCase());
    const matchDomain = selectedDomain === 'All' || p.domain === selectedDomain;
    return matchSearch && matchDomain;
  });

  // Role nav tabs configuration
  const roleTabs: Record<UserRole, { id: string; label: string; icon: any }[]> = {
    STUDENT: [
      { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
      { id: 'discover', label: 'Discover Projects', icon: Compass },
      { id: 'my-projects', label: 'My Projects', icon: FolderPlusIcon },
      { id: 'ai-matches', label: 'AI Matches', icon: Sparkles },
      { id: 'mentors', label: 'Mentors', icon: GraduationCap },
      { id: 'collaboration', label: 'Collaboration', icon: Users },
      { id: 'passport', label: 'Project Passport', icon: FileCheck2 },
      { id: 'lineage', label: 'Project Lineage', icon: GitBranch },
      { id: 'proof-of-work', label: 'Proof of Work', icon: Award },
      { id: 'notifications', label: 'Notifications', icon: Bell },
      { id: 'profile', label: 'Profile', icon: UserCheck }
    ],
    FACULTY: [
      { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
      { id: 'projects', label: 'Projects', icon: BookOpen },
      { id: 'verification-queue', label: 'Verification Queue', icon: ShieldCheck },
      { id: 'students', label: 'Students', icon: Users },
      { id: 'mentorship', label: 'Mentorship', icon: GraduationCap },
      { id: 'reviews', label: 'Reviews', icon: FileCheck2 },
      { id: 'notifications', label: 'Notifications', icon: Bell }
    ],
    HOD: [
      { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
      { id: 'dept-projects', label: 'Department Projects', icon: BookOpen },
      { id: 'verification', label: 'Verification', icon: ShieldCheck },
      { id: 'faculty', label: 'Faculty', icon: GraduationCap },
      { id: 'students', label: 'Students', icon: Users },
      { id: 'analytics', label: 'Analytics', icon: BarChart3 },
      { id: 'reports', label: 'Reports', icon: FileSpreadsheet },
      { id: 'approvals', label: 'Approvals', icon: Award }
    ],
    ADMIN: [
      { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
      { id: 'users', label: 'Users', icon: Users },
      { id: 'institutions', label: 'Institutions', icon: Building2 },
      { id: 'projects', label: 'Projects', icon: BookOpen },
      { id: 'verification', label: 'Verification', icon: ShieldCheck },
      { id: 'analytics', label: 'Analytics', icon: BarChart3 },
      { id: 'reports', label: 'Reports', icon: FileSpreadsheet },
      { id: 'audit-logs', label: 'Audit Logs', icon: Clock },
      { id: 'settings', label: 'Settings', icon: Settings }
    ]
  };

  const handleRoleChange = (newRole: UserRole) => {
    setActiveRole(newRole);
    setActiveTab('dashboard');
  };

  const handleSignVerification = (projectId: string) => {
    if (!verifiedList.includes(projectId)) {
      setVerifiedList([...verifiedList, projectId]);
    }
    setApprovalToast('Cryptographic Faculty Signature and Rubric Scores Published to Ledger!');
    setReviewingProject(null);
    setTimeout(() => setApprovalToast(null), 3500);
  };

  function FolderPlusIcon(props: any) {
    return <Layers className="w-4 h-4" {...props} />;
  }

  return (
    <div className="min-h-screen bg-[#040714] text-slate-100 flex flex-col font-body">
      {/* Top Application Bar */}
      <header className="sticky top-0 z-40 bg-[#060a1c]/90 backdrop-blur-xl border-b border-white/10 px-4 sm:px-6 py-3">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          {/* Brand & Role Tag */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-bold text-sm shadow-inner">
              <Layers className="w-4 h-4" />
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center sm:gap-2">
              <span className="font-semibold tracking-wider text-base text-white">
                PROJECT<span className="text-indigo-400">VERSE</span>
              </span>
              <span className="text-[10px] font-mono-code px-2 py-0.5 rounded-full bg-indigo-500/20 border border-indigo-400/30 text-indigo-300 w-fit">
                {activeRole} WORKSPACE
              </span>
            </div>
          </div>

          {/* Center Role Switcher (for testing/multi-role capabilities) */}
          <div className="hidden md:flex items-center gap-1 p-1 rounded-xl bg-black/40 border border-white/10 text-xs font-mono-code">
            {(['STUDENT', 'FACULTY', 'HOD', 'ADMIN'] as UserRole[]).map((r) => (
              <button
                key={r}
                onClick={() => handleRoleChange(r)}
                className={`px-3 py-1 rounded-lg transition-all cursor-pointer ${
                  activeRole === r
                    ? 'bg-indigo-600 text-white font-bold shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {r}
              </button>
            ))}
          </div>

          {/* Right Action Tools */}
          <div className="flex items-center gap-2.5">
            <button
              onClick={onOpenBuildProject}
              className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-sm transition-all cursor-pointer"
            >
              <PlusCircle className="w-3.5 h-3.5" />
              <span>Submit Project</span>
            </button>

            <button
              onClick={onLogout}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg liquid-glass text-slate-300 hover:text-white text-xs font-medium border-white/10 hover:border-white/20 transition-all cursor-pointer"
              title="Exit workspace to public site"
            >
              <LogOut className="w-3.5 h-3.5 text-slate-400" />
              <span className="hidden sm:inline">Exit to Public Site</span>
            </button>
          </div>
        </div>
      </header>

      {/* Role Switcher for Mobile */}
      <div className="md:hidden flex items-center justify-around bg-black/40 border-b border-white/10 p-2 text-xs font-mono-code overflow-x-auto">
        {(['STUDENT', 'FACULTY', 'HOD', 'ADMIN'] as UserRole[]).map((r) => (
          <button
            key={r}
            onClick={() => handleRoleChange(r)}
            className={`px-2.5 py-1 rounded-lg shrink-0 ${
              activeRole === r
                ? 'bg-indigo-600 text-white font-bold'
                : 'text-slate-400'
            }`}
          >
            {r}
          </button>
        ))}
      </div>

      {/* Workspace Main Body (Sidebar + Content) */}
      <div className="flex-1 max-w-7xl w-full mx-auto flex flex-col md:flex-row">
        {/* Navigation Sidebar */}
        <aside className="w-full md:w-64 border-b md:border-b-0 md:border-r border-white/10 p-4 shrink-0 bg-[#05091a]/40">
          <div className="text-[11px] font-mono-code text-slate-400 uppercase mb-2 px-3">
            {activeRole} Modules
          </div>
          <nav className="flex md:flex-col gap-1 overflow-x-auto md:overflow-visible pb-2 md:pb-0">
            {roleTabs[activeRole].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2.5 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all shrink-0 cursor-pointer ${
                    isActive
                      ? 'bg-indigo-600/30 border border-indigo-400/40 text-white font-semibold'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-white/5 border border-transparent'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-indigo-400' : 'text-slate-400'}`} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </nav>
        </aside>

        {/* Workspace Canvas Area */}
        <main className="flex-1 p-4 sm:p-8 overflow-y-auto">
          {/* Toast Notification if any */}
          {approvalToast && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 p-4 rounded-xl bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 text-xs sm:text-sm flex items-center gap-2"
            >
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>{approvalToast}</span>
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
                  <div className="liquid-glass-elevated rounded-2xl p-6 sm:p-8 border border-white/15">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div>
                        <span className="text-xs font-mono-code text-indigo-400 uppercase">
                          Academic Cohort 2025–2026
                        </span>
                        <h1 className="font-display text-2xl sm:text-3xl text-white mt-1">
                          Welcome, Devansh Kulkarni
                        </h1>
                        <p className="text-xs sm:text-sm text-slate-300 mt-1">
                          IIT Bombay • Dept of Computer Science & Robotics Lab
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={onOpenProofOfWork}
                          className="px-4 py-2 rounded-xl liquid-glass text-xs font-medium text-indigo-200 border-indigo-400/30 hover:bg-white/10 flex items-center gap-1.5 cursor-pointer"
                        >
                          <Award className="w-3.5 h-3.5 text-indigo-400" />
                          <span>View Proof-of-Work</span>
                        </button>
                        <button
                          onClick={onOpenBuildProject}
                          className="px-4 py-2 rounded-xl bg-white text-slate-950 text-xs font-semibold hover:bg-slate-100 flex items-center gap-1.5 cursor-pointer"
                        >
                          <PlusCircle className="w-3.5 h-3.5" />
                          <span>New Project</span>
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Summary Metric Counters */}
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="liquid-glass rounded-xl p-4 border border-white/10">
                      <span className="text-[11px] font-mono-code text-slate-400 uppercase">Active Capstones</span>
                      <p className="text-2xl font-bold text-white mt-1">2</p>
                      <span className="text-[10px] text-emerald-400">1 Verified • 1 Active</span>
                    </div>
                    <div className="liquid-glass rounded-xl p-4 border border-white/10">
                      <span className="text-[11px] font-mono-code text-slate-400 uppercase">Verified Commits</span>
                      <p className="text-2xl font-bold text-white mt-1">384</p>
                      <span className="text-[10px] text-indigo-300">Synchronized via GitHub CI</span>
                    </div>
                    <div className="liquid-glass rounded-xl p-4 border border-white/10">
                      <span className="text-[11px] font-mono-code text-slate-400 uppercase">Lineage Generations</span>
                      <p className="text-2xl font-bold text-white mt-1">3 Batches</p>
                      <span className="text-[10px] text-slate-400">Inherited from '24 cohort</span>
                    </div>
                    <div className="liquid-glass rounded-xl p-4 border border-white/10">
                      <span className="text-[11px] font-mono-code text-slate-400 uppercase">Academic Rubric Score</span>
                      <p className="text-2xl font-bold text-white mt-1">9.6 / 10</p>
                      <span className="text-[10px] text-emerald-400">Signed by Dr. Siddharth Anand</span>
                    </div>
                  </div>

                  {/* Active Project Highlight */}
                  <div className="liquid-glass rounded-2xl p-6 border border-white/10">
                    <div className="flex items-center justify-between mb-4">
                      <h2 className="text-base font-semibold text-white">Current Active Repository</h2>
                      <button
                        onClick={() => onOpenProjectDetail(SAMPLE_PROJECTS[0])}
                        className="text-xs text-indigo-400 hover:text-indigo-300 font-medium flex items-center gap-1 cursor-pointer"
                      >
                        Inspect Passport & Lineage <ArrowRight className="w-3 h-3" />
                      </button>
                    </div>

                    <div className="p-4 rounded-xl bg-black/40 border border-white/10">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                        <div>
                          <span className="text-[11px] font-mono-code text-emerald-400">PV-2025-IITB-CS089 • VERIFIED</span>
                          <h3 className="text-base font-semibold text-white">{SAMPLE_PROJECTS[0].title}</h3>
                          <p className="text-xs text-slate-400 mt-0.5">{SAMPLE_PROJECTS[0].tagline}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-slate-300 font-mono-code">840 Commits</span>
                          <span className="text-slate-600">•</span>
                          <span className="text-xs text-slate-300 font-mono-code">6 Contributors</span>
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
                    <h2 className="font-display text-2xl text-white">Discover Academic Projects</h2>
                    <p className="text-xs text-slate-400">Search verified repositories, previous batch capstones, and cross-college projects.</p>
                  </div>

                  {/* Search and Domain Filters */}
                  <div className="flex flex-col sm:flex-row gap-3">
                    <div className="relative flex-1">
                      <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        placeholder="Search by title, technology (e.g. PyTorch, Rust, ROS 2), or university..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-black/50 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-indigo-400 text-xs"
                      />
                    </div>
                    <select
                      value={selectedDomain}
                      onChange={(e) => setSelectedDomain(e.target.value as ProjectDomain)}
                      className="px-3 py-2.5 rounded-xl bg-black/50 border border-white/10 text-slate-200 text-xs focus:outline-none focus:border-indigo-400"
                    >
                      {DOMAINS_LIST.map((d) => (
                        <option key={d} value={d} className="bg-slate-900 text-white">
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
                        className="liquid-glass rounded-xl p-5 border border-white/10 hover:border-indigo-400/40 transition-all flex flex-col justify-between"
                      >
                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-[10px] font-mono-code text-indigo-300 uppercase">
                              {proj.domain}
                            </span>
                            <span className="text-[10px] font-mono-code px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-400/20">
                              {proj.status}
                            </span>
                          </div>
                          <h3 className="text-base font-semibold text-white mb-1">{proj.title}</h3>
                          <p className="text-xs text-slate-400 mb-3 line-clamp-2">{proj.description}</p>
                          <div className="flex flex-wrap gap-1.5 mb-4">
                            {proj.techStack.map((tech) => (
                              <span key={tech} className="text-[10px] font-mono-code px-2 py-0.5 rounded bg-white/5 text-slate-300">
                                {tech}
                              </span>
                            ))}
                          </div>
                        </div>

                        <div className="pt-3 border-t border-white/10 flex items-center justify-between">
                          <span className="text-[11px] text-slate-400">{proj.institution}</span>
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => onOpenJoinProject(proj)}
                              className="px-2.5 py-1 rounded-lg liquid-glass text-indigo-300 text-xs hover:bg-white/10 cursor-pointer"
                            >
                              Join
                            </button>
                            <button
                              onClick={() => onOpenProjectDetail(proj)}
                              className="px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs cursor-pointer"
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
                      <h2 className="font-display text-2xl text-white">My Academic Projects</h2>
                      <p className="text-xs text-slate-400">Repositories you are currently leading or contributing to.</p>
                    </div>
                    <button
                      onClick={onOpenBuildProject}
                      className="px-3.5 py-2 rounded-xl bg-white text-slate-950 text-xs font-semibold hover:bg-slate-100 flex items-center gap-1.5 cursor-pointer"
                    >
                      <PlusCircle className="w-3.5 h-3.5" />
                      <span>Register Capstone</span>
                    </button>
                  </div>

                  <div className="space-y-4">
                    {SAMPLE_PROJECTS.slice(0, 2).map((p) => (
                      <div key={p.id} className="liquid-glass rounded-2xl p-6 border border-white/10">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
                          <div>
                            <span className="text-[10px] font-mono-code text-indigo-400 uppercase">{p.passportId}</span>
                            <h3 className="text-lg font-semibold text-white">{p.title}</h3>
                            <p className="text-xs text-slate-400">{p.tagline}</p>
                          </div>
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => onOpenProjectDetail(p)}
                              className="px-3 py-1.5 rounded-lg liquid-glass text-xs text-slate-200 hover:text-white cursor-pointer"
                            >
                              View Lineage Tree
                            </button>
                            <button
                              onClick={() => onOpenProjectDetail(p)}
                              className="px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-xs text-white cursor-pointer"
                            >
                              Passport
                            </button>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs font-mono-code text-slate-400 pt-3 border-t border-white/10">
                          <div>GitHub Stars: <span className="text-white">{p.githubStars}</span></div>
                          <div>Commits: <span className="text-white">{p.githubCommits}</span></div>
                          <div>Batches: <span className="text-white">{p.lineageBatchesCount}</span></div>
                          <div>Status: <span className="text-emerald-400">{p.status}</span></div>
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
                    <h2 className="font-display text-2xl text-white">AI Skill-Gap & Peer Matching</h2>
                    <p className="text-xs text-slate-400">Intelligent recommendations for cross-college capstone collaborators and mentors.</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Recommended Peers */}
                    <div className="space-y-3">
                      <h3 className="text-sm font-semibold text-white font-mono-code uppercase">Recommended Teammates</h3>
                      {SAMPLE_PEERS.map((peer, i) => (
                        <div key={i} className="liquid-glass rounded-xl p-4 border border-white/10 flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <img src={peer.avatar} alt={peer.name} className="w-10 h-10 rounded-full object-cover border border-white/20" />
                            <div>
                              <h4 className="text-sm font-semibold text-white">{peer.name}</h4>
                              <p className="text-xs text-slate-400">{peer.institution} • {peer.role}</p>
                              <div className="flex gap-1 mt-1">
                                {peer.skills.slice(0, 3).map(s => (
                                  <span key={s} className="text-[9px] font-mono-code px-1.5 py-0.5 rounded bg-white/5 text-indigo-300">{s}</span>
                                ))}
                              </div>
                            </div>
                          </div>
                          <div className="text-right">
                            <span className="text-xs font-bold text-emerald-400 font-mono-code">{peer.matchScore}% Match</span>
                            <button
                              onClick={() => {
                                setApprovalToast(`Invitation proposal sent to ${peer.name}!`);
                                setTimeout(() => setApprovalToast(null), 3000);
                              }}
                              className="block mt-1 text-[11px] px-2.5 py-1 rounded bg-indigo-600 hover:bg-indigo-500 text-white cursor-pointer"
                            >
                              Invite
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Recommended Mentors */}
                    <div className="space-y-3">
                      <h3 className="text-sm font-semibold text-white font-mono-code uppercase">Faculty & Industry Guides</h3>
                      {SAMPLE_MENTORS.map((m, i) => (
                        <div key={i} className="liquid-glass rounded-xl p-4 border border-white/10 flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <img src={m.avatar} alt={m.name} className="w-10 h-10 rounded-full object-cover border border-white/20" />
                            <div>
                              <h4 className="text-sm font-semibold text-white">{m.name}</h4>
                              <p className="text-xs text-slate-400">{m.title} • {m.institution}</p>
                              <span className="text-[10px] text-emerald-400 font-mono-code">{m.verifiedProjectsCount} Verified Projects Advised</span>
                            </div>
                          </div>
                          <div className="text-right">
                            <span className="text-xs font-bold text-indigo-400 font-mono-code">{m.matchScore}% Synergy</span>
                            <button
                              onClick={() => {
                                setApprovalToast(`Mentorship guidance requested from ${m.name}!`);
                                setTimeout(() => setApprovalToast(null), 3000);
                              }}
                              className="block mt-1 text-[11px] px-2.5 py-1 rounded liquid-glass text-slate-200 hover:text-white cursor-pointer"
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

              {/* Mentors, Collaboration, Passport, Lineage, Proof-of-work, Notifications, Profile sub-tabs */}
              {activeTab === 'mentors' && (
                <div className="space-y-4">
                  <h2 className="font-display text-2xl text-white">Institutional Mentors Directory</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {SAMPLE_MENTORS.map((m, idx) => (
                      <div key={idx} className="liquid-glass rounded-xl p-5 border border-white/10 flex items-start gap-4">
                        <img src={m.avatar} alt={m.name} className="w-12 h-12 rounded-xl object-cover" />
                        <div>
                          <h3 className="text-base font-semibold text-white">{m.name}</h3>
                          <p className="text-xs text-slate-300">{m.title}</p>
                          <p className="text-xs text-indigo-400 mt-1">{m.institution}</p>
                          <div className="flex flex-wrap gap-1 mt-2">
                            {m.domains.map(d => (
                              <span key={d} className="text-[10px] px-2 py-0.5 rounded bg-white/5 text-slate-300">{d}</span>
                            ))}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'collaboration' && (
                <div className="space-y-4">
                  <h2 className="font-display text-2xl text-white">Cross-Institution Team Collaborations</h2>
                  <div className="liquid-glass rounded-2xl p-6 border border-white/10 space-y-4">
                    <p className="text-xs text-slate-300">You have 2 pending team invitations for the 2026 Batch Roadmap.</p>
                    <div className="p-4 rounded-xl bg-black/40 border border-white/10 flex items-center justify-between">
                      <div>
                        <h4 className="text-sm font-semibold text-white">AegisShield: Post-Quantum TLS 1.3 Hardware Accelerator</h4>
                        <p className="text-xs text-slate-400">IIT Delhi & IIT Madras • Looking for VLSI Synthesis Leads</p>
                      </div>
                      <button
                        onClick={() => onOpenJoinProject(SAMPLE_PROJECTS[2] || SAMPLE_PROJECTS[0])}
                        className="px-3 py-1.5 rounded-lg bg-indigo-600 text-xs text-white cursor-pointer"
                      >
                        Review Proposal
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'passport' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="font-display text-2xl text-white">Project Passport Inspector</h2>
                      <p className="text-xs text-slate-400">Cryptographically signed academic passports with GitHub activity and faculty verification.</p>
                    </div>
                    <button
                      onClick={() => onOpenProjectDetail(SAMPLE_PROJECTS[0])}
                      className="px-4 py-2 rounded-xl bg-white text-slate-950 text-xs font-semibold cursor-pointer"
                    >
                      Open Full Screen Passport
                    </button>
                  </div>
                  <div className="liquid-glass rounded-2xl p-6 border border-white/10">
                    <div className="flex items-center justify-between pb-4 border-b border-white/10 text-xs font-mono-code">
                      <span>PASSPORT_ID: {SAMPLE_PROJECTS[0].passportId}</span>
                      <span className="text-emerald-400">STATUS: VERIFIED</span>
                    </div>
                    <div className="py-4 space-y-2">
                      <h3 className="text-lg font-semibold text-white">{SAMPLE_PROJECTS[0].title}</h3>
                      <p className="text-xs text-slate-300">{SAMPLE_PROJECTS[0].description}</p>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'lineage' && (
                <div className="space-y-4">
                  <h2 className="font-display text-2xl text-white">Multi-Batch Project Lineage</h2>
                  <p className="text-xs text-slate-400">Track chronological evolution, predecessor foundations, and upcoming roadmaps.</p>
                  <div className="space-y-3">
                    {SAMPLE_PROJECTS[0].lineage.map((batch, idx) => (
                      <div key={idx} className="liquid-glass rounded-xl p-4 border border-white/10">
                        <div className="flex items-center justify-between text-xs font-mono-code mb-1">
                          <span className="text-indigo-400">{batch.batchName}</span>
                          <span className={batch.activeStatus === 'Current' ? 'text-emerald-400' : 'text-slate-400'}>{batch.activeStatus}</span>
                        </div>
                        <p className="text-xs text-slate-300">{batch.summary}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'proof-of-work' && (
                <div className="space-y-4">
                  <h2 className="font-display text-2xl text-white">Verified Proof-of-Work</h2>
                  <p className="text-xs text-slate-300">Your tamper-proof portfolio backed by institutional endorsements and git commits.</p>
                  <div className="liquid-glass rounded-2xl p-6 border border-white/10 text-center space-y-4">
                    <Award className="w-12 h-12 text-indigo-400 mx-auto" />
                    <h3 className="text-lg font-semibold text-white">Devansh Kulkarni • IIT Bombay</h3>
                    <p className="text-xs text-slate-400 max-w-md mx-auto">384 Verified Commits • Sub-millisecond SLAM & Drone Guidance • Faculty Endorsed</p>
                    <button
                      onClick={onOpenProofOfWork}
                      className="px-6 py-2.5 rounded-full bg-white text-slate-950 text-xs font-semibold hover:bg-slate-100 cursor-pointer"
                    >
                      Export Verifiable Certificate
                    </button>
                  </div>
                </div>
              )}

              {activeTab === 'notifications' && (
                <div className="space-y-3">
                  <h2 className="font-display text-2xl text-white">Notifications</h2>
                  <div className="liquid-glass rounded-xl p-4 border border-white/10 flex items-center justify-between text-xs">
                    <div>
                      <p className="font-semibold text-white">Faculty Review Completed</p>
                      <p className="text-slate-400">Dr. Siddharth Anand signed your ROS 2 swarm milestone (9.6/10).</p>
                    </div>
                    <span className="text-[10px] text-slate-500 font-mono-code">2 hours ago</span>
                  </div>
                  <div className="liquid-glass rounded-xl p-4 border border-white/10 flex items-center justify-between text-xs">
                    <div>
                      <p className="font-semibold text-white">Teammate Proposal</p>
                      <p className="text-slate-400">Aarohi Sen from IIIT Hyderabad joined the Spiking Neural Net module.</p>
                    </div>
                    <span className="text-[10px] text-slate-500 font-mono-code">1 day ago</span>
                  </div>
                </div>
              )}

              {activeTab === 'profile' && (
                <div className="space-y-4">
                  <h2 className="font-display text-2xl text-white">Student Academic Profile</h2>
                  <div className="liquid-glass rounded-2xl p-6 border border-white/10 space-y-4">
                    <div className="flex items-center gap-4">
                      <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80" alt="Devansh" className="w-16 h-16 rounded-full object-cover border border-indigo-400" />
                      <div>
                        <h3 className="text-lg font-semibold text-white">Devansh Kulkarni</h3>
                        <p className="text-xs text-slate-400">B.Tech Computer Science '25 • IIT Bombay</p>
                        <p className="text-xs text-indigo-400 font-mono-code mt-0.5">GitHub: devanshk-slam • Verified Identity</p>
                      </div>
                    </div>
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
                  <div className="liquid-glass-elevated rounded-2xl p-6 sm:p-8 border border-white/15">
                    <span className="text-xs font-mono-code text-indigo-400 uppercase">Faculty Portal</span>
                    <h1 className="font-display text-2xl sm:text-3xl text-white mt-1">
                      Welcome, Dr. Siddharth Anand
                    </h1>
                    <p className="text-xs sm:text-sm text-slate-300 mt-1">
                      Professor & Head of Aerial Robotics Lab • IIT Bombay
                    </p>
                  </div>

                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="liquid-glass rounded-xl p-4 border border-white/10">
                      <span className="text-[11px] font-mono-code text-slate-400 uppercase">Queue for Review</span>
                      <p className="text-2xl font-bold text-amber-400 mt-1">1 Pending</p>
                      <span className="text-[10px] text-slate-400">Needs rubric scoring</span>
                    </div>
                    <div className="liquid-glass rounded-xl p-4 border border-white/10">
                      <span className="text-[11px] font-mono-code text-slate-400 uppercase">Advised Projects</span>
                      <p className="text-2xl font-bold text-white mt-1">14</p>
                      <span className="text-[10px] text-emerald-400">Across 3 academic years</span>
                    </div>
                    <div className="liquid-glass rounded-xl p-4 border border-white/10">
                      <span className="text-[11px] font-mono-code text-slate-400 uppercase">Verified Passports</span>
                      <p className="text-2xl font-bold text-white mt-1">12 Issued</p>
                      <span className="text-[10px] text-indigo-300">Cryptographically Signed</span>
                    </div>
                    <div className="liquid-glass rounded-xl p-4 border border-white/10">
                      <span className="text-[11px] font-mono-code text-slate-400 uppercase">Continuation Rate</span>
                      <p className="text-2xl font-bold text-emerald-400 mt-1">85%</p>
                      <span className="text-[10px] text-slate-400">Inherited by next batch</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Verification Queue Tab */}
              {(activeTab === 'verification-queue' || activeTab === 'dashboard') && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="font-display text-xl sm:text-2xl text-white">Academic Verification Queue</h2>
                      <p className="text-xs text-slate-400">Evaluate capstone deliverables and assign cryptographic validation seals.</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    {SAMPLE_PROJECTS.map((p) => {
                      const isVerified = verifiedList.includes(p.id);
                      return (
                        <div key={p.id} className="liquid-glass rounded-xl p-5 border border-white/10">
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                            <div>
                              <div className="flex items-center gap-2">
                                <span className="text-[10px] font-mono-code text-indigo-400">{p.passportId}</span>
                                <span className={`text-[10px] font-mono-code px-2 py-0.5 rounded-full ${
                                  isVerified ? 'bg-emerald-500/15 text-emerald-300' : 'bg-amber-500/15 text-amber-300'
                                }`}>
                                  {isVerified ? 'VERIFIED' : 'PENDING REVIEW'}
                                </span>
                              </div>
                              <h3 className="text-base font-semibold text-white mt-1">{p.title}</h3>
                              <p className="text-xs text-slate-400">{p.institution} • Leads: {p.contributors.map(c => c.name).join(', ')}</p>
                            </div>

                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => onOpenProjectDetail(p)}
                                className="px-3 py-1.5 rounded-lg liquid-glass text-xs text-slate-200 hover:text-white cursor-pointer"
                              >
                                View Repo Telemetry
                              </button>
                              <button
                                onClick={() => setReviewingProject(p)}
                                className="px-3.5 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-xs font-semibold text-white cursor-pointer"
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
                  <h2 className="font-display text-2xl text-white">Advised Capstone Projects</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {SAMPLE_PROJECTS.map(p => (
                      <div key={p.id} className="liquid-glass rounded-xl p-4 border border-white/10">
                        <h3 className="text-base font-semibold text-white">{p.title}</h3>
                        <p className="text-xs text-slate-400 mt-1">{p.tagline}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'students' && (
                <div className="space-y-4">
                  <h2 className="font-display text-2xl text-white">Advised Students & Researchers</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {SAMPLE_PROJECTS[0].contributors.map((c, i) => (
                      <div key={i} className="liquid-glass rounded-xl p-4 border border-white/10 text-center">
                        <img src={c.avatar} alt={c.name} className="w-12 h-12 rounded-full mx-auto object-cover mb-2" />
                        <h4 className="text-sm font-semibold text-white">{c.name}</h4>
                        <p className="text-xs text-slate-400">{c.role}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'mentorship' && (
                <div className="space-y-4">
                  <h2 className="font-display text-2xl text-white">Mentorship Inquiries</h2>
                  <div className="liquid-glass rounded-xl p-5 border border-white/10">
                    <p className="text-xs text-slate-300">You have 3 incoming mentorship requests from inter-university capstone teams seeking SLAM and ROS 2 guidance.</p>
                  </div>
                </div>
              )}

              {activeTab === 'reviews' && (
                <div className="space-y-4">
                  <h2 className="font-display text-2xl text-white">Past Evaluation Archive</h2>
                  <div className="liquid-glass rounded-xl p-5 border border-white/10">
                    <p className="text-xs text-slate-300">14 Cryptographically signed reviews published to the ProjectVerse Ledger.</p>
                  </div>
                </div>
              )}

              {activeTab === 'notifications' && (
                <div className="space-y-3">
                  <h2 className="font-display text-2xl text-white">Faculty Notifications</h2>
                  <div className="liquid-glass rounded-xl p-4 border border-white/10 text-xs">
                    <p className="text-white font-semibold">New Capstone Milestone Submitted</p>
                    <p className="text-slate-400">AeroSync submitted ROS 2 Humble migration for final verification.</p>
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
              <div className="liquid-glass-elevated rounded-2xl p-6 sm:p-8 border border-white/15">
                <span className="text-xs font-mono-code text-indigo-400 uppercase">Head of Department Portal</span>
                <h1 className="font-display text-2xl sm:text-3xl text-white mt-1">
                  Department of Computer Science & Engineering
                </h1>
                <p className="text-xs sm:text-sm text-slate-300 mt-1">
                  Academic Accreditation & Capstone Governance Dashboard
                </p>
              </div>

              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="liquid-glass rounded-xl p-4 border border-white/10">
                  <span className="text-[11px] font-mono-code text-slate-400 uppercase">Total Projects</span>
                  <p className="text-2xl font-bold text-white mt-1">48</p>
                  <span className="text-[10px] text-slate-400">Current Academic Year</span>
                </div>
                <div className="liquid-glass rounded-xl p-4 border border-white/10">
                  <span className="text-[11px] font-mono-code text-slate-400 uppercase">HOD Sign-Offs</span>
                  <p className="text-2xl font-bold text-emerald-400 mt-1">42 / 48</p>
                  <span className="text-[10px] text-emerald-400">87% Approved</span>
                </div>
                <div className="liquid-glass rounded-xl p-4 border border-white/10">
                  <span className="text-[11px] font-mono-code text-slate-400 uppercase">Duplication Prevented</span>
                  <p className="text-2xl font-bold text-indigo-300 mt-1">32 Cases</p>
                  <span className="text-[10px] text-indigo-300">Continuous inheritance</span>
                </div>
                <div className="liquid-glass rounded-xl p-4 border border-white/10">
                  <span className="text-[11px] font-mono-code text-slate-400 uppercase">Accreditation Score</span>
                  <p className="text-2xl font-bold text-white mt-1">A++ Tier</p>
                  <span className="text-[10px] text-slate-400">NAAC / ABET Compliant</span>
                </div>
              </div>

              {/* Department Projects List */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-white">Department Capstone Registry</h3>
                <div className="space-y-3">
                  {SAMPLE_PROJECTS.map((p) => (
                    <div key={p.id} className="liquid-glass rounded-xl p-4 border border-white/10 flex items-center justify-between">
                      <div>
                        <span className="text-[10px] font-mono-code text-indigo-400">{p.passportId}</span>
                        <h4 className="text-sm font-semibold text-white">{p.title}</h4>
                        <p className="text-xs text-slate-400">Faculty Guide: {p.passport.facultyReviewer.name} • Score: {p.passport.facultyReviewer.score}/10</p>
                      </div>
                      <button
                        onClick={() => {
                          setApprovalToast(`Official HOD Institutional Seal granted to ${p.passportId}!`);
                          setTimeout(() => setApprovalToast(null), 3000);
                        }}
                        className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-xs font-semibold text-white cursor-pointer"
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
              <div className="liquid-glass-elevated rounded-2xl p-6 sm:p-8 border border-white/15">
                <span className="text-xs font-mono-code text-indigo-400 uppercase">Network Administration</span>
                <h1 className="font-display text-2xl sm:text-3xl text-white mt-1">
                  ProjectVerse National Node Ledger
                </h1>
                <p className="text-xs sm:text-sm text-slate-300 mt-1">
                  Cross-institutional governance, consensus nodes, and security telemetry
                </p>
              </div>

              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="liquid-glass rounded-xl p-4 border border-white/10">
                  <span className="text-[11px] font-mono-code text-slate-400 uppercase">Registered Universities</span>
                  <p className="text-2xl font-bold text-white mt-1">128</p>
                  <span className="text-[10px] text-emerald-400">Federated SAML SSO</span>
                </div>
                <div className="liquid-glass rounded-xl p-4 border border-white/10">
                  <span className="text-[11px] font-mono-code text-slate-400 uppercase">Total Passports</span>
                  <p className="text-2xl font-bold text-white mt-1">4,920</p>
                  <span className="text-[10px] text-indigo-300">On-Chain Hashes</span>
                </div>
                <div className="liquid-glass rounded-xl p-4 border border-white/10">
                  <span className="text-[11px] font-mono-code text-slate-400 uppercase">Network Health</span>
                  <p className="text-2xl font-bold text-emerald-400 mt-1">99.99%</p>
                  <span className="text-[10px] text-slate-400">Zero cryptographic faults</span>
                </div>
                <div className="liquid-glass rounded-xl p-4 border border-white/10">
                  <span className="text-[11px] font-mono-code text-slate-400 uppercase">Cross-College PRs</span>
                  <p className="text-2xl font-bold text-white mt-1">1,840</p>
                  <span className="text-[10px] text-indigo-300">Inter-campus collaboration</span>
                </div>
              </div>

              {/* System Audit Logs */}
              <div className="liquid-glass rounded-2xl p-6 border border-white/10 font-mono-code text-xs">
                <h3 className="text-sm font-semibold text-white mb-4">Live Immutable Audit Stream</h3>
                <div className="space-y-2 text-slate-400">
                  <p><span className="text-emerald-400">[05:02:11]</span> HOD_VALIDATION_EVENT: PV-2025-IITB-CS089 sealed by Dean Academic Office.</p>
                  <p><span className="text-indigo-400">[04:58:30]</span> GIT_SYNC_TELEMETRY: Merged PR #116 in repo projectverse-academic/aerosync.</p>
                  <p><span className="text-slate-300">[04:45:12]</span> AI_MATCH_ENGINE: Skill gap match generated between IIT Delhi & IIT Madras for PQC Hardware.</p>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Faculty Evaluation Rubric Modal */}
      {reviewingProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="liquid-glass-elevated rounded-3xl p-6 sm:p-8 max-w-lg w-full border border-white/20 bg-[#070c1e]"
          >
            <h3 className="font-display text-2xl text-white mb-1">Faculty Rubric Evaluation</h3>
            <p className="text-xs text-slate-400 mb-4">{reviewingProject.title}</p>

            <div className="space-y-3 text-xs mb-6">
              <div>
                <div className="flex justify-between text-slate-300 mb-1">
                  <span>Technical Rigor & Code Architecture</span>
                  <span className="font-mono-code text-indigo-400">{rubricScores.technicalRigor}/10</span>
                </div>
                <input
                  type="range"
                  min="5"
                  max="10"
                  step="0.1"
                  value={rubricScores.technicalRigor}
                  onChange={(e) => setRubricScores({ ...rubricScores, technicalRigor: parseFloat(e.target.value) })}
                  className="w-full accent-indigo-500"
                />
              </div>

              <div>
                <div className="flex justify-between text-slate-300 mb-1">
                  <span>Novelty & Innovation</span>
                  <span className="font-mono-code text-indigo-400">{rubricScores.novelty}/10</span>
                </div>
                <input
                  type="range"
                  min="5"
                  max="10"
                  step="0.1"
                  value={rubricScores.novelty}
                  onChange={(e) => setRubricScores({ ...rubricScores, novelty: parseFloat(e.target.value) })}
                  className="w-full accent-indigo-500"
                />
              </div>

              <div>
                <div className="flex justify-between text-slate-300 mb-1">
                  <span>Documentation & Reproduction Potential</span>
                  <span className="font-mono-code text-indigo-400">{rubricScores.documentation}/10</span>
                </div>
                <input
                  type="range"
                  min="5"
                  max="10"
                  step="0.1"
                  value={rubricScores.documentation}
                  onChange={(e) => setRubricScores({ ...rubricScores, documentation: parseFloat(e.target.value) })}
                  className="w-full accent-indigo-500"
                />
              </div>

              <div>
                <div className="flex justify-between text-slate-300 mb-1">
                  <span>Continuity & Next-Batch Readiness</span>
                  <span className="font-mono-code text-indigo-400">{rubricScores.continuityPotential}/10</span>
                </div>
                <input
                  type="range"
                  min="5"
                  max="10"
                  step="0.1"
                  value={rubricScores.continuityPotential}
                  onChange={(e) => setRubricScores({ ...rubricScores, continuityPotential: parseFloat(e.target.value) })}
                  className="w-full accent-indigo-500"
                />
              </div>

              <div>
                <label className="block text-slate-300 mb-1">Qualitative Endorsement</label>
                <textarea
                  rows={2}
                  value={reviewFeedback}
                  onChange={(e) => setReviewFeedback(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-black/50 border border-white/10 text-white text-xs"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-3">
              <button
                onClick={() => setReviewingProject(null)}
                className="px-4 py-2 rounded-xl liquid-glass text-xs text-slate-400 hover:text-white cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={() => handleSignVerification(reviewingProject.id)}
                className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-xs font-semibold text-white flex items-center gap-1.5 cursor-pointer"
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
