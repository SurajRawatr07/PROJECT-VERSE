import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, 
  ShieldCheck, 
  GitBranch, 
  GitCommit, 
  GitPullRequest, 
  GraduationCap, 
  Star, 
  Clock, 
  Users, 
  Lock, 
  ArrowUpRight, 
  CheckCircle2, 
  ExternalLink,
  Layers,
  FileText,
  GitFork
} from 'lucide-react';
import { ProjectItem } from '../../types';

interface ProjectDetailModalProps {
  project: ProjectItem | null;
  onClose: () => void;
  onJoinClick: (project: ProjectItem) => void;
}

export const ProjectDetailModal: React.FC<ProjectDetailModalProps> = ({
  project,
  onClose,
  onJoinClick
}) => {
  const [activeTab, setActiveTab] = useState<'passport' | 'lineage' | 'contributors' | 'rubric'>('passport');

  if (!project) return null;

  const passport = project.passport;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-[#040714]/85 backdrop-blur-xl"
        />

        {/* Modal Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.3 }}
          className="relative z-10 w-full max-w-4xl max-h-[90vh] overflow-y-auto liquid-glass-elevated rounded-3xl p-6 sm:p-10 border border-white/20 shadow-2xl bg-[#080d1e]/95 text-slate-100"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-5 right-5 w-9 h-9 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center text-slate-300 hover:text-white transition-all cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Modal Header */}
          <div className="pr-10 pb-6 border-b border-white/10">
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="text-xs font-mono-code px-2.5 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 font-semibold">
                {passport.passportId}
              </span>
              <span className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                <CheckCircle2 className="w-3 h-3" />
                {passport.status}
              </span>
              <span className="text-xs font-mono-code text-slate-400">
                {project.institution}
              </span>
            </div>

            <h2 className="font-display text-2xl sm:text-4xl text-white font-normal leading-tight">
              {project.title}
            </h2>
            <p className="text-sm sm:text-base text-slate-300 font-body mt-2 leading-relaxed">
              {project.description}
            </p>
          </div>

          {/* Tab Navigation */}
          <div className="flex items-center gap-2 py-4 border-b border-white/10 overflow-x-auto no-scrollbar">
            <button
              onClick={() => setActiveTab('passport')}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold font-mono-code transition-all cursor-pointer ${
                activeTab === 'passport'
                  ? 'bg-white text-slate-950 shadow-sm'
                  : 'text-slate-400 hover:text-white bg-white/5'
              }`}
            >
              Project Passport
            </button>
            <button
              onClick={() => setActiveTab('lineage')}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold font-mono-code transition-all cursor-pointer ${
                activeTab === 'lineage'
                  ? 'bg-white text-slate-950 shadow-sm'
                  : 'text-slate-400 hover:text-white bg-white/5'
              }`}
            >
              Batch Lineage ({project.lineage.length})
            </button>
            <button
              onClick={() => setActiveTab('contributors')}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold font-mono-code transition-all cursor-pointer ${
                activeTab === 'contributors'
                  ? 'bg-white text-slate-950 shadow-sm'
                  : 'text-slate-400 hover:text-white bg-white/5'
              }`}
            >
              Contributors ({project.contributors.length})
            </button>
            <button
              onClick={() => setActiveTab('rubric')}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold font-mono-code transition-all cursor-pointer ${
                activeTab === 'rubric'
                  ? 'bg-white text-slate-950 shadow-sm'
                  : 'text-slate-400 hover:text-white bg-white/5'
              }`}
            >
              Faculty Evaluation Rubric
            </button>
          </div>

          {/* Tab Panels */}
          <div className="py-6">
            {activeTab === 'passport' && (
              <div className="space-y-6">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div className="p-3.5 rounded-xl bg-black/40 border border-white/10 font-mono-code text-center">
                    <span className="text-xl font-bold text-white block">{passport.totalCommits}</span>
                    <span className="text-[11px] text-slate-400">Total Commits</span>
                  </div>
                  <div className="p-3.5 rounded-xl bg-black/40 border border-white/10 font-mono-code text-center">
                    <span className="text-xl font-bold text-white block">{passport.mergedPRs}</span>
                    <span className="text-[11px] text-slate-400">Merged PRs</span>
                  </div>
                  <div className="p-3.5 rounded-xl bg-black/40 border border-white/10 font-mono-code text-center">
                    <span className="text-xl font-bold text-emerald-400 block">{passport.codeHealthScore}%</span>
                    <span className="text-[11px] text-slate-400">Code Health</span>
                  </div>
                  <div className="p-3.5 rounded-xl bg-black/40 border border-white/10 font-mono-code text-center">
                    <span className="text-xl font-bold text-indigo-300 block">{passport.testCoverage}%</span>
                    <span className="text-[11px] text-slate-400">Test Coverage</span>
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-3 font-body">
                  <h4 className="text-sm font-bold text-white">Repository & Governance</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono-code text-slate-300">
                    <p><span className="text-slate-500">Repository:</span> {passport.githubRepo}</p>
                    <p><span className="text-slate-500">License:</span> {passport.license}</p>
                    <p><span className="text-slate-500">Academic Cycle:</span> {passport.academicYear}</p>
                    <p><span className="text-slate-500">Validation Token:</span> {passport.institutionalValidationCode}</p>
                  </div>
                </div>

                <div>
                  <span className="text-xs font-mono-code uppercase tracking-wider text-slate-400 block mb-2">
                    Verified Tech Stack
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {passport.techStack.map((tech) => (
                      <span key={tech} className="text-xs font-mono-code px-3 py-1 rounded-lg bg-indigo-950/50 text-indigo-200 border border-indigo-500/30">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'lineage' && (
              <div className="space-y-6">
                <p className="text-xs text-slate-400 font-mono-code">
                  Chronological multi-batch development history and roadmaps:
                </p>
                <div className="space-y-4">
                  {project.lineage.map((b, i) => (
                    <div key={i} className="p-4 rounded-xl bg-black/40 border border-white/10">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-bold text-indigo-300 font-mono-code">{b.year} — {b.batchName}</span>
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/10 text-slate-300 font-semibold">{b.activeStatus}</span>
                      </div>
                      <p className="text-xs text-slate-300 mb-3">{b.summary}</p>
                      <div className="space-y-1">
                        {b.keyMilestones.map((m, mi) => (
                          <p key={mi} className="text-xs text-slate-400 flex items-center gap-1.5">
                            <span className="text-indigo-400 font-bold">•</span>
                            {m}
                          </p>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'contributors' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {project.contributors.map((c, i) => (
                  <div key={i} className="p-4 rounded-xl bg-black/40 border border-white/10 flex items-center gap-3.5">
                    <img
                      src={c.avatar}
                      alt={c.name}
                      referrerPolicy="no-referrer"
                      className="w-12 h-12 rounded-full object-cover border border-white/20"
                    />
                    <div>
                      <h4 className="text-sm font-bold text-white">{c.name}</h4>
                      <p className="text-xs text-indigo-300 font-mono-code">{c.role}</p>
                      <p className="text-[11px] text-slate-400">{c.institution} • {c.batch}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'rubric' && (
              <div className="space-y-6">
                <div className="p-5 rounded-2xl bg-indigo-950/20 border border-indigo-500/30 space-y-4">
                  <div className="flex items-center justify-between border-b border-white/10 pb-3">
                    <div>
                      <h4 className="text-sm font-bold text-white">{passport.facultyReviewer.name}</h4>
                      <p className="text-xs text-indigo-300">{passport.facultyReviewer.designation} • {passport.facultyReviewer.institution}</p>
                    </div>
                    <span className="text-2xl font-bold font-mono-code text-emerald-400">
                      {passport.facultyReviewer.score}/10
                    </span>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-300 italic leading-relaxed">
                    "{passport.facultyReviewer.reviewText}"
                  </p>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                    <div className="p-2.5 rounded-lg bg-white/5 text-center">
                      <span className="text-sm font-bold text-white font-mono-code">{passport.rubricScores.novelty}</span>
                      <span className="text-[10px] text-slate-400 block">Novelty</span>
                    </div>
                    <div className="p-2.5 rounded-lg bg-white/5 text-center">
                      <span className="text-sm font-bold text-white font-mono-code">{passport.rubricScores.technicalRigor}</span>
                      <span className="text-[10px] text-slate-400 block">Tech Rigor</span>
                    </div>
                    <div className="p-2.5 rounded-lg bg-white/5 text-center">
                      <span className="text-sm font-bold text-white font-mono-code">{passport.rubricScores.documentation}</span>
                      <span className="text-[10px] text-slate-400 block">Documentation</span>
                    </div>
                    <div className="p-2.5 rounded-lg bg-white/5 text-center">
                      <span className="text-sm font-bold text-white font-mono-code">{passport.rubricScores.continuityPotential}</span>
                      <span className="text-[10px] text-slate-400 block">Continuity</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Modal Footer Actions */}
          <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-xs text-slate-400 font-mono-code">
              Passport Verified on {passport.facultyReviewer.verifiedAt}
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              <button
                onClick={onClose}
                className="w-full sm:w-auto px-5 py-2.5 rounded-full liquid-glass text-xs font-semibold text-slate-300 hover:text-white"
              >
                Close
              </button>
              <button
                onClick={() => {
                  onClose();
                  onJoinClick(project);
                }}
                className="w-full sm:w-auto px-6 py-2.5 rounded-full bg-white text-slate-950 hover:bg-slate-100 font-semibold text-xs transition-all shadow-md flex items-center justify-center gap-1.5"
              >
                <span>Join / Continue Project</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
