import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, 
  ShieldCheck, 
  CheckCircle2, 
  GitFork, 
  Star, 
  ExternalLink, 
  GraduationCap, 
  Layers, 
  Award,
  Users,
  GitBranch,
  GitCommit,
  GitPullRequest,
  Heart,
  Bookmark,
  FileCheck2,
  Calendar,
  Building2,
  Terminal,
  MessageSquare,
  FileText,
  Clock,
  Send,
  Sparkles,
  BarChart2,
  Code
} from 'lucide-react';
import { ProjectItem, ProjectFeedback, UserRole } from '../../types';
import { ProjectStatusBadge } from '../common/ProjectStatusBadge';
import { ProjectActivityTimeline } from '../timeline/ProjectActivityTimeline';
import { getProjectActivities } from '../../lib/activityService';
import { isProjectSaved, toggleSaveProject } from '../../lib/bookmarkService';
import { getFeedbacksForProject, submitProjectFeedbackFrontend } from '../../lib/feedbackService';
import { recordProjectView } from '../../lib/recentlyViewedService';

interface ProjectDashboardModalProps {
  project: ProjectItem | null;
  onClose: () => void;
  onOpenPassport: (project: ProjectItem) => void;
  onOpenCollaborate: (project: ProjectItem) => void;
  currentUserRole?: UserRole;
  currentUserId?: string;
  currentUserName?: string;
  currentUserAvatar?: string;
}

export type ProjectDashboardTab = 
  | 'overview' 
  | 'team' 
  | 'progress' 
  | 'github' 
  | 'reviews' 
  | 'feedback' 
  | 'documents' 
  | 'activity';

export const ProjectDashboardModal: React.FC<ProjectDashboardModalProps> = ({
  project,
  onClose,
  onOpenPassport,
  onOpenCollaborate,
  currentUserRole = 'STUDENT',
  currentUserId = 'usr-student-01',
  currentUserName = 'Suraj Rawat',
  currentUserAvatar
}) => {
  const [activeTab, setActiveTab] = useState<ProjectDashboardTab>('overview');
  const [isSaved, setIsSaved] = useState<boolean>(false);
  const [activities, setActivities] = useState<any[]>([]);
  const [feedbacks, setFeedbacks] = useState<ProjectFeedback[]>([]);
  
  // Faculty feedback input state
  const [newFeedbackText, setNewFeedbackText] = useState('');
  const [feedbackSuccess, setFeedbackSuccess] = useState<string | null>(null);
  const [feedbackError, setFeedbackError] = useState<string | null>(null);

  useEffect(() => {
    if (project) {
      setIsSaved(isProjectSaved(project.id));
      setActivities(getProjectActivities(project.id));
      setFeedbacks(getFeedbacksForProject(project.id));
      recordProjectView(project);
    }
  }, [project]);

  if (!project) return null;

  const handleToggleSave = () => {
    const newState = toggleSaveProject(project.id);
    setIsSaved(newState);
  };

  const handleFacultySubmitFeedback = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = newFeedbackText.trim();
    if (!trimmed) {
      setFeedbackError('Feedback cannot be empty.');
      return;
    }
    if (trimmed.length > 2000) {
      setFeedbackError('Feedback cannot exceed 2000 characters.');
      return;
    }

    const res = submitProjectFeedbackFrontend({
      projectId: project.id,
      projectTitle: project.title,
      studentId: (project as any).studentId || 'usr-student-01',
      facultyId: currentUserId,
      facultyName: currentUserName,
      facultyDesignation: currentUserRole === 'FACULTY' ? 'Associate Professor & Capstone Advisor' : 'Academic Reviewer',
      facultyAvatar: currentUserAvatar,
      message: trimmed
    });

    if (res.success && res.feedback) {
      setFeedbacks([res.feedback, ...feedbacks]);
      setActivities(getProjectActivities(project.id));
      setNewFeedbackText('');
      setFeedbackSuccess('Feedback published successfully and student notified.');
      setFeedbackError(null);
      setTimeout(() => setFeedbackSuccess(null), 4000);
    } else {
      setFeedbackError(res.error || 'Failed to submit feedback.');
    }
  };

  const tabs: { id: ProjectDashboardTab; label: string; count?: number }[] = [
    { id: 'overview', label: 'Overview' },
    { id: 'team', label: 'Team', count: project.contributors.length },
    { id: 'progress', label: 'Progress' },
    { id: 'github', label: 'GitHub' },
    { id: 'reviews', label: 'Reviews' },
    { id: 'feedback', label: 'Feedback', count: feedbacks.length },
    { id: 'documents', label: 'Documents' },
    { id: 'activity', label: 'Activity', count: activities.length }
  ];

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 overflow-y-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 16 }}
          transition={{ duration: 0.2 }}
          className="relative z-10 w-full max-w-5xl max-h-[92vh] flex flex-col bg-white rounded-3xl border border-black/10 shadow-2xl text-[#111111] overflow-hidden font-serif"
        >
          {/* Header Bar */}
          <div className="p-5 sm:p-7 pb-4 border-b border-black/8 bg-[#FFFFFF] shrink-0">
            <div className="flex items-start justify-between gap-4">
              <div className="space-y-1.5 flex-1 min-w-0 pr-8">
                {/* Status Badges Header Row */}
                <div className="flex flex-wrap items-center gap-2">
                  <ProjectStatusBadge status={project.status || 'APPROVED'} size="sm" />
                  <span className="inline-flex items-center gap-1 text-[11px] px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
                    <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                    Institution Verified
                  </span>
                  <span className="text-[11px] text-[#737373]">
                    Batch {project.academicYear}
                  </span>
                </div>

                <h2 className="text-xl sm:text-2xl md:text-3xl font-serif font-bold text-[#111111] tracking-tight truncate">
                  {project.title}
                </h2>
                <p className="text-xs sm:text-sm text-[#4A4A4A] line-clamp-2">
                  {project.tagline || project.description}
                </p>
              </div>

              {/* Close Button */}
              <button
                onClick={onClose}
                className="w-8 h-8 rounded-full bg-[#F5F5F3] hover:bg-[#ECECE9] border border-black/8 flex items-center justify-center text-[#4A4A4A] hover:text-[#111111] transition-all cursor-pointer shrink-0"
                aria-label="Close"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Header Useful Actions */}
            <div className="mt-4 pt-3 border-t border-black/6 flex flex-wrap items-center justify-between gap-3">
              <div className="flex flex-wrap items-center gap-2">
                <a
                  href={project.passport?.githubRepo || 'https://github.com'}
                  target="_blank"
                  rel="noreferrer"
                  className="px-3 py-1.5 rounded-xl bg-[#111111] hover:bg-black text-white text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Code className="w-3.5 h-3.5" />
                  <span>View Repository</span>
                  <ExternalLink className="w-2.5 h-2.5 opacity-70" />
                </a>

                <button
                  onClick={() => onOpenPassport(project)}
                  className="px-3 py-1.5 rounded-xl bg-[#F7F7F5] hover:bg-[#EBEBE8] border border-black/10 text-xs font-medium text-[#111111] flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <FileCheck2 className="w-3.5 h-3.5 text-emerald-700" />
                  <span>Passport</span>
                </button>

                <button
                  onClick={() => onOpenCollaborate(project)}
                  className="px-3 py-1.5 rounded-xl bg-[#F7F7F5] hover:bg-[#EBEBE8] border border-black/10 text-xs font-medium text-[#111111] flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Users className="w-3.5 h-3.5" />
                  <span>Collaborate</span>
                </button>

                <button
                  onClick={handleToggleSave}
                  className={`px-3 py-1.5 rounded-xl border text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer ${
                    isSaved
                      ? 'bg-rose-50 text-rose-700 border-rose-200'
                      : 'bg-[#F7F7F5] hover:bg-[#EBEBE8] text-[#4A4A4A] border-black/10'
                  }`}
                >
                  <Heart className={`w-3.5 h-3.5 ${isSaved ? 'fill-rose-600 text-rose-600' : ''}`} />
                  <span>{isSaved ? '✓ Saved' : '♡ Save'}</span>
                </button>
              </div>

              <div className="text-xs font-mono-code text-[#737373] hidden md:flex items-center gap-2">
                <Building2 className="w-3.5 h-3.5" />
                <span className="truncate max-w-[240px]">{project.institution}</span>
              </div>
            </div>

            {/* Horizontal Scrollable Tabs (Mobile & Desktop) */}
            <div className="mt-4 -mb-4 flex items-center gap-1 overflow-x-auto no-scrollbar border-b border-black/8 pb-0">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-3.5 py-2.5 text-xs font-medium whitespace-nowrap transition-all border-b-2 cursor-pointer flex items-center gap-1.5 ${
                    activeTab === tab.id
                      ? 'border-[#111111] text-[#111111] font-medium'
                      : 'border-transparent text-[#737373] hover:text-[#111111]'
                  }`}
                >
                  <span>{tab.label}</span>
                  {tab.count !== undefined && tab.count > 0 && (
                    <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-[#EBEBE8] text-[#111111] font-mono-code">
                      {tab.count}
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Scrollable Tab Content Body */}
          <div className="p-5 sm:p-7 overflow-y-auto flex-1 bg-[#FAFAFA]">
            {/* TAB 1: OVERVIEW */}
            {activeTab === 'overview' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* Left info column */}
                  <div className="md:col-span-2 space-y-4">
                    <div className="p-5 bg-white rounded-2xl border border-black/8 shadow-xs">
                      <h4 className="text-xs font-mono-code uppercase tracking-wider text-[#737373] mb-2">
                        About this Project
                      </h4>
                      <p className="text-xs sm:text-sm text-[#333333] leading-relaxed">
                        {project.description}
                      </p>

                      <div className="mt-4 pt-4 border-t border-black/6">
                        <h5 className="text-[11px] font-mono-code uppercase text-[#737373] mb-2">
                          Technologies & Frameworks
                        </h5>
                        <div className="flex flex-wrap gap-1.5">
                          {project.techStack.map((tech) => (
                            <span
                              key={tech}
                              className="px-2.5 py-1 rounded-lg bg-[#F7F7F5] border border-black/8 text-xs font-mono-code text-[#111111]"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Progress Percentage & Code Stats */}
                    <div className="p-5 bg-white rounded-2xl border border-black/8 shadow-xs">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="text-xs font-mono-code uppercase tracking-wider text-[#737373]">
                          Milestone Completion
                        </h4>
                        <span className="text-xs font-mono-code font-bold text-emerald-700">
                          {project.passport.codeHealthScore || 92}% Complete
                        </span>
                      </div>
                      <div className="w-full h-2 bg-[#EBEBE8] rounded-full overflow-hidden">
                        <div
                          className="h-full bg-emerald-600 rounded-full"
                          style={{ width: `${project.passport.codeHealthScore || 92}%` }}
                        />
                      </div>
                      <div className="grid grid-cols-3 gap-3 mt-4 pt-4 border-t border-black/6 text-center">
                        <div>
                          <p className="text-lg font-mono-code font-bold text-[#111111]">
                            {project.githubCommits}
                          </p>
                          <p className="text-[10px] text-[#737373] uppercase">Commits</p>
                        </div>
                        <div>
                          <p className="text-lg font-mono-code font-bold text-[#111111]">
                            {project.passport.mergedPRs || 48}
                          </p>
                          <p className="text-[10px] text-[#737373] uppercase">Merged PRs</p>
                        </div>
                        <div>
                          <p className="text-lg font-mono-code font-bold text-emerald-600">
                            {project.passport.testCoverage || 94}%
                          </p>
                          <p className="text-[10px] text-[#737373] uppercase">Test Coverage</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Right metadata column */}
                  <div className="space-y-4">
                    <div className="p-5 bg-white rounded-2xl border border-black/8 shadow-xs space-y-3.5">
                      <h4 className="text-xs font-mono-code uppercase tracking-wider text-[#737373] border-b border-black/6 pb-2">
                        Academic Metadata
                      </h4>
                      <div>
                        <span className="text-[11px] text-[#737373] block">Institution</span>
                        <span className="text-xs font-medium text-[#111111]">{project.institution}</span>
                      </div>
                      <div>
                        <span className="text-[11px] text-[#737373] block">Department</span>
                        <span className="text-xs font-medium text-[#111111]">{project.department}</span>
                      </div>
                      <div>
                        <span className="text-[11px] text-[#737373] block">Academic Batch</span>
                        <span className="text-xs font-medium text-[#111111]">{project.academicYear}</span>
                      </div>
                      <div>
                        <span className="text-[11px] text-[#737373] block">Faculty Mentor</span>
                        <span className="text-xs font-medium text-[#111111]">
                          {project.passport.facultyReviewer?.name || 'Dr. Anil Sharma'}
                        </span>
                      </div>
                      <div>
                        <span className="text-[11px] text-[#737373] block">GitHub Repository</span>
                        <a
                          href={project.passport.githubRepo}
                          target="_blank"
                          rel="noreferrer"
                          className="text-xs text-blue-600 hover:underline font-mono-code inline-flex items-center gap-1 truncate max-w-full"
                        >
                          <span className="truncate">{project.passport.githubRepo}</span>
                          <ExternalLink className="w-3 h-3 shrink-0" />
                        </a>
                      </div>
                      <div>
                        <span className="text-[11px] text-[#737373] block">Last Activity</span>
                        <span className="text-xs font-mono-code text-[#111111]">
                          {activities[0]?.title || 'Recent Commit Synced'} ({activities[0] ? 'Recently' : '2 hours ago'})
                        </span>
                      </div>
                    </div>

                    <div className="p-4 bg-emerald-50/70 border border-emerald-200 rounded-2xl">
                      <div className="flex items-center gap-2 text-emerald-800 text-xs font-bold mb-1">
                        <ShieldCheck className="w-4 h-4 text-emerald-600" />
                        <span>Academic Heritage Verified</span>
                      </div>
                      <p className="text-[11px] text-emerald-700 leading-relaxed">
                        This work is archived with tamper-resistant Project Passport validation for peer inheritance.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 2: TEAM */}
            {activeTab === 'team' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-mono-code uppercase tracking-wider text-[#737373]">
                    Active Project Contributors ({project.contributors.length})
                  </h4>
                  <button
                    onClick={() => onOpenCollaborate(project)}
                    className="text-xs font-medium text-[#111111] hover:underline"
                  >
                    + Request to Join Team
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                  {project.contributors.map((c) => (
                    <div
                      key={c.name}
                      className="p-4 bg-white rounded-2xl border border-black/8 shadow-xs flex flex-col justify-between"
                    >
                      <div className="flex items-start gap-3 mb-3">
                        <img
                          src={c.avatar}
                          alt={c.name}
                          className="w-10 h-10 rounded-full object-cover border border-black/10"
                        />
                        <div className="min-w-0">
                          <h5 className="text-xs font-bold text-[#111111] truncate">{c.name}</h5>
                          <p className="text-[11px] text-indigo-700 font-medium truncate">{c.role}</p>
                          <p className="text-[10px] text-[#737373] truncate">{c.institution} • {c.batch}</p>
                        </div>
                      </div>

                      <div className="pt-2 border-t border-black/6 flex items-center justify-between text-[11px] font-mono-code text-[#737373]">
                        <span>{c.commitsCount || 120} commits</span>
                        {c.githubHandle && (
                          <span className="text-blue-600">@{c.githubHandle}</span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 3: PROGRESS */}
            {activeTab === 'progress' && (
              <div className="space-y-4">
                <div className="p-5 bg-white rounded-2xl border border-black/8 shadow-xs">
                  <h4 className="text-xs font-mono-code uppercase tracking-wider text-[#737373] mb-4">
                    Academic Milestone Progression
                  </h4>
                  <div className="space-y-3">
                    {[
                      { title: 'Project Proposal & Problem Definition', status: 'Completed', date: 'Sep 2025' },
                      { title: 'Literature Review & Architectural Charter', status: 'Completed', date: 'Nov 2025' },
                      { title: 'Core Node Prototyping & Benchmarks', status: 'Completed', date: 'Jan 2026' },
                      { title: 'Faculty Mid-Term Evaluation & Code Audit', status: 'Completed', date: 'Feb 2026' },
                      { title: 'Hardware-in-the-Loop Field Validation', status: 'In Progress', date: 'Target: Apr 2026' },
                      { title: 'Final Capstone Defense & Passport Seal', status: 'Pending', date: 'Target: May 2026' }
                    ].map((milestone, idx) => (
                      <div
                        key={idx}
                        className="flex items-center justify-between p-3 rounded-xl bg-[#FBFBFA] border border-black/6 text-xs"
                      >
                        <div className="flex items-center gap-2.5">
                          {milestone.status === 'Completed' ? (
                            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                          ) : milestone.status === 'In Progress' ? (
                            <div className="w-4 h-4 rounded-full border-2 border-blue-600 border-t-transparent animate-spin shrink-0" />
                          ) : (
                            <div className="w-4 h-4 rounded-full border border-neutral-300 shrink-0" />
                          )}
                          <span className="font-medium text-[#111111]">{milestone.title}</span>
                        </div>
                        <div className="flex items-center gap-2 font-mono-code text-[11px] text-[#737373]">
                          <span>{milestone.date}</span>
                          <span
                            className={`px-2 py-0.5 rounded-full text-[10px] ${
                              milestone.status === 'Completed'
                                ? 'bg-emerald-50 text-emerald-800'
                                : milestone.status === 'In Progress'
                                ? 'bg-blue-50 text-blue-800'
                                : 'bg-neutral-100 text-neutral-600'
                            }`}
                          >
                            {milestone.status}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* TAB 4: GITHUB */}
            {activeTab === 'github' && (
              <div className="space-y-4">
                <div className="p-5 bg-white rounded-2xl border border-black/8 shadow-xs space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-black/8">
                    <div>
                      <span className="text-[10px] font-mono-code uppercase text-[#737373]">
                        Repository Integration
                      </span>
                      <h4 className="text-base font-bold font-mono-code text-[#111111]">
                        {project.passport.githubRepo || 'github.com/aerosync/guidance-core'}
                      </h4>
                    </div>
                    <a
                      href={project.passport.githubRepo || '#'}
                      target="_blank"
                      rel="noreferrer"
                      className="px-3.5 py-1.5 rounded-xl bg-[#111111] text-white text-xs font-mono-code font-medium inline-flex items-center gap-1.5 self-start"
                    >
                      <span>View on GitHub</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
                    <div className="p-3 bg-[#FBFBFA] rounded-xl border border-black/6">
                      <p className="text-base font-mono-code font-bold text-[#111111]">{project.githubStars}</p>
                      <p className="text-[10px] text-[#737373] uppercase">Stars</p>
                    </div>
                    <div className="p-3 bg-[#FBFBFA] rounded-xl border border-black/6">
                      <p className="text-base font-mono-code font-bold text-[#111111]">{project.passport.forks || 82}</p>
                      <p className="text-[10px] text-[#737373] uppercase">Forks</p>
                    </div>
                    <div className="p-3 bg-[#FBFBFA] rounded-xl border border-black/6">
                      <p className="text-base font-mono-code font-bold text-[#111111]">{project.githubCommits}</p>
                      <p className="text-[10px] text-[#737373] uppercase">Commits</p>
                    </div>
                    <div className="p-3 bg-[#FBFBFA] rounded-xl border border-black/6">
                      <p className="text-base font-mono-code font-bold text-[#111111]">main</p>
                      <p className="text-[10px] text-[#737373] uppercase">Default Branch</p>
                    </div>
                  </div>

                  {/* Clone instructions */}
                  <div className="p-3 bg-[#111111] text-white rounded-xl font-mono-code text-xs flex items-center justify-between">
                    <span className="text-slate-300 truncate">
                      git clone {project.passport.githubRepo || 'https://github.com/aerosync/guidance-core.git'}
                    </span>
                    <span className="text-[10px] text-slate-400 shrink-0">Read-Only</span>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 5: REVIEWS */}
            {activeTab === 'reviews' && (
              <div className="space-y-4">
                <div className="p-5 bg-white rounded-2xl border border-black/8 shadow-xs space-y-4">
                  <div className="flex items-center justify-between border-b border-black/8 pb-3">
                    <div>
                      <span className="text-[10px] font-mono-code uppercase text-[#737373]">
                        Institutional Assessment
                      </span>
                      <h4 className="text-sm font-bold text-[#111111]">
                        Faculty Review & Evaluation Rubric
                      </h4>
                    </div>
                    <div className="text-right">
                      <span className="text-2xl font-display font-bold text-emerald-700">
                        {project.passport.facultyReviewer?.score || 9.4}
                      </span>
                      <span className="text-xs text-[#737373] font-mono-code">/ 10</span>
                    </div>
                  </div>

                  {/* Rubric scores */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {[
                      { label: 'Novelty & Academic Contribution', score: project.passport.rubricScores?.novelty || 9.5 },
                      { label: 'Technical Rigor & Code Health', score: project.passport.rubricScores?.technicalRigor || 9.6 },
                      { label: 'Documentation & Reproducibility', score: project.passport.rubricScores?.documentation || 9.2 },
                      { label: 'Continuity & Batch Inheritance Potential', score: project.passport.rubricScores?.continuityPotential || 9.4 }
                    ].map((rub, i) => (
                      <div key={i} className="p-3 rounded-xl bg-[#FBFBFA] border border-black/6">
                        <div className="flex justify-between text-xs mb-1">
                          <span className="text-[#4A4A4A]">{rub.label}</span>
                          <span className="font-mono-code font-bold text-[#111111]">{rub.score}/10</span>
                        </div>
                        <div className="w-full h-1.5 bg-[#EBEBE8] rounded-full overflow-hidden">
                          <div
                            className="h-full bg-emerald-600 rounded-full"
                            style={{ width: `${rub.score * 10}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Review Text */}
                  <div className="p-4 rounded-xl bg-[#F7F7F5] border border-black/8">
                    <p className="text-xs text-[#333333] italic leading-relaxed">
                      "{project.passport.facultyReviewer?.reviewText || 'Exceptional theoretical depth in distributed visual odometry. The algorithmic formulation handles low-contrast feature extraction with high precision.'}"
                    </p>
                    <div className="mt-3 pt-2 border-t border-black/6 flex items-center justify-between text-[11px]">
                      <span className="font-medium text-[#111111]">
                        {project.passport.facultyReviewer?.name || 'Dr. Anil Sharma'}
                      </span>
                      <span className="font-mono-code text-[#737373]">
                        Signature: {project.passport.facultyReviewer?.signatureHash?.slice(0, 16)}...
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 6: FEEDBACK */}
            {activeTab === 'feedback' && (
              <div className="space-y-4">
                {/* Faculty submission box if current user is Faculty */}
                {currentUserRole === 'FACULTY' && (
                  <form onSubmit={handleFacultySubmitFeedback} className="p-5 bg-white rounded-2xl border border-black/8 shadow-xs">
                    <h4 className="text-xs font-mono-code uppercase tracking-wider text-[#737373] mb-1">
                      Add Advisor Guidance / Correction
                    </h4>
                    <p className="text-xs text-[#4A4A4A] mb-3">
                      Write constructive notes or next steps for the student capstone team.
                    </p>

                    {feedbackSuccess && (
                      <div className="mb-3 p-2.5 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-800">
                        {feedbackSuccess}
                      </div>
                    )}
                    {feedbackError && (
                      <div className="mb-3 p-2.5 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-800">
                        {feedbackError}
                      </div>
                    )}

                    <textarea
                      rows={3}
                      value={newFeedbackText}
                      onChange={(e) => setNewFeedbackText(e.target.value)}
                      placeholder="Write your feedback..."
                      className="w-full p-3 rounded-xl bg-[#FBFBFA] border border-black/10 text-xs font-body focus:outline-none focus:border-black/30 placeholder:text-[#737373]"
                      maxLength={2000}
                    />
                    <div className="mt-2 flex items-center justify-between">
                      <span className="text-[10px] text-[#737373]">
                        {newFeedbackText.length} / 2000
                      </span>
                      <button
                        type="submit"
                        disabled={!newFeedbackText.trim()}
                        className="px-4 py-1.5 rounded-xl bg-[#111111] hover:bg-black disabled:opacity-50 text-white text-xs font-medium flex items-center gap-1.5 cursor-pointer"
                      >
                        <Send className="w-3.5 h-3.5" />
                        <span>Submit Feedback</span>
                      </button>
                    </div>
                  </form>
                )}

                {/* Feedback List */}
                <div className="space-y-3">
                  <h4 className="text-xs font-mono-code uppercase tracking-wider text-[#737373]">
                    Feedback History ({feedbacks.length})
                  </h4>

                  {feedbacks.length === 0 ? (
                    <div className="p-8 text-center bg-white rounded-2xl border border-black/8">
                      <MessageSquare className="w-8 h-8 text-[#737373] mx-auto mb-2" />
                      <p className="text-xs font-medium text-[#111111]">No Feedback Recorded Yet</p>
                      <p className="text-[11px] text-[#737373] mt-0.5">Faculty advisor guidance will appear here.</p>
                    </div>
                  ) : (
                    feedbacks.map((fb) => (
                      <div key={fb.id} className="p-4 bg-white rounded-2xl border border-black/8 shadow-xs">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            {fb.facultyAvatar ? (
                              <img src={fb.facultyAvatar} alt="Faculty" className="w-6 h-6 rounded-full object-cover border" />
                            ) : (
                              <div className="w-6 h-6 rounded-full bg-[#111111] text-white text-[10px] font-bold flex items-center justify-center">
                                {(fb.facultyName || 'F')[0]}
                              </div>
                            )}
                            <div>
                              <span className="text-xs font-bold text-[#111111]">{fb.facultyName || 'Faculty Advisor'}</span>
                              <span className="text-[10px] text-[#737373] block">{fb.facultyDesignation || 'Academic Reviewer'}</span>
                            </div>
                          </div>
                          <span className="text-[10px] font-mono-code text-[#737373]">
                            {new Date(fb.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                        <p className="text-xs text-[#333333] leading-relaxed pl-8">
                          {fb.message}
                        </p>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}

            {/* TAB 7: DOCUMENTS */}
            {activeTab === 'documents' && (
              <div className="space-y-3">
                <h4 className="text-xs font-mono-code uppercase tracking-wider text-[#737373]">
                  Academic Verification Documents
                </h4>
                {[
                  { name: 'Capstone Charter & Architecture Specification.pdf', size: '2.4 MB', date: 'Sep 2025' },
                  { name: 'Mid-Term Evaluation Rubric & Sign-off.pdf', size: '840 KB', date: 'Feb 2026' },
                  { name: 'ROS 2 Swarm Flight Test Telemetry Log.csv', size: '5.1 MB', date: 'Jan 2026' }
                ].map((doc, i) => (
                  <div key={i} className="p-3.5 bg-white rounded-xl border border-black/8 flex items-center justify-between shadow-xs">
                    <div className="flex items-center gap-3">
                      <FileText className="w-4 h-4 text-[#111111]" />
                      <div>
                        <p className="text-xs font-medium text-[#111111]">{doc.name}</p>
                        <p className="text-[10px] text-[#737373] font-mono-code">{doc.size} • Uploaded {doc.date}</p>
                      </div>
                    </div>
                    <span className="px-2.5 py-1 rounded-lg bg-[#F7F7F5] border border-black/8 text-[11px] font-mono-code text-[#111111]">
                      Verified
                    </span>
                  </div>
                ))}
              </div>
            )}

            {/* TAB 8: ACTIVITY */}
            {activeTab === 'activity' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-mono-code uppercase tracking-wider text-[#737373]">
                    Project Activity Stream
                  </h4>
                  <span className="text-[11px] font-mono-code text-[#737373]">
                    {activities.length} Events Recorded
                  </span>
                </div>
                <div className="p-4 bg-white rounded-2xl border border-black/8 shadow-xs">
                  <ProjectActivityTimeline activities={activities} />
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
