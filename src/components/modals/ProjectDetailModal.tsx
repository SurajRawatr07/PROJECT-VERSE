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
  GitFork,
  Code,
  Award
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
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/45 backdrop-blur-sm"
        />

        {/* Modal Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 16 }}
          transition={{ duration: 0.25 }}
          className="relative z-10 w-full max-w-4xl max-h-[92vh] overflow-y-auto bg-white rounded-3xl p-6 sm:p-10 border border-black/10 shadow-2xl text-[#111111]"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-5 right-5 w-8 h-8 rounded-full bg-[#F5F5F3] hover:bg-[#ECECE9] border border-black/8 flex items-center justify-center text-[#4A4A4A] hover:text-[#111111] transition-all cursor-pointer"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>

          {/* Modal Header */}
          <div className="pr-10 pb-6 border-b border-black/8">
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="text-xs font-mono-code px-2.5 py-0.5 rounded-full bg-[#111111] text-white font-semibold">
                {passport.passportId}
              </span>
              <span className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
                <CheckCircle2 className="w-3 h-3" />
                {passport.status}
              </span>
              <span className="text-xs font-mono-code text-[#737373]">
                {project.institution}
              </span>
            </div>

            <h2 className="font-display text-2xl sm:text-3xl text-[#111111] font-normal leading-tight">
              {project.title}
            </h2>
            <p className="text-xs sm:text-sm text-[#4A4A4A] font-body mt-2 leading-relaxed">
              {project.description}
            </p>
          </div>

          {/* Tab Navigation */}
          <div className="flex items-center gap-2 py-4 border-b border-black/8 overflow-x-auto no-scrollbar">
            <button
              onClick={() => setActiveTab('passport')}
              className={`px-4 py-1.5 rounded-full text-xs font-medium font-mono-code transition-all cursor-pointer ${
                activeTab === 'passport'
                  ? 'bg-[#111111] text-white shadow-xs'
                  : 'text-[#4A4A4A] hover:text-[#111111] bg-[#F5F5F3]'
              }`}
            >
              Project Passport
            </button>
            <button
              onClick={() => setActiveTab('lineage')}
              className={`px-4 py-1.5 rounded-full text-xs font-medium font-mono-code transition-all cursor-pointer ${
                activeTab === 'lineage'
                  ? 'bg-[#111111] text-white shadow-xs'
                  : 'text-[#4A4A4A] hover:text-[#111111] bg-[#F5F5F3]'
              }`}
            >
              Batch Lineage ({project.lineage.length})
            </button>
            <button
              onClick={() => setActiveTab('contributors')}
              className={`px-4 py-1.5 rounded-full text-xs font-medium font-mono-code transition-all cursor-pointer ${
                activeTab === 'contributors'
                  ? 'bg-[#111111] text-white shadow-xs'
                  : 'text-[#4A4A4A] hover:text-[#111111] bg-[#F5F5F3]'
              }`}
            >
              Contributors ({project.contributors.length})
            </button>
            <button
              onClick={() => setActiveTab('rubric')}
              className={`px-4 py-1.5 rounded-full text-xs font-medium font-mono-code transition-all cursor-pointer ${
                activeTab === 'rubric'
                  ? 'bg-[#111111] text-white shadow-xs'
                  : 'text-[#4A4A4A] hover:text-[#111111] bg-[#F5F5F3]'
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
                  <div className="p-3.5 rounded-2xl bg-[#FBFBFA] border border-black/8 font-mono-code text-center">
                    <span className="text-xl font-bold text-[#111111] block">{passport.totalCommits}</span>
                    <span className="text-[11px] text-[#737373]">Total Commits</span>
                  </div>
                  <div className="p-3.5 rounded-2xl bg-[#FBFBFA] border border-black/8 font-mono-code text-center">
                    <span className="text-xl font-bold text-[#111111] block">{passport.mergedPRs}</span>
                    <span className="text-[11px] text-[#737373]">Merged PRs</span>
                  </div>
                  <div className="p-3.5 rounded-2xl bg-[#FBFBFA] border border-black/8 font-mono-code text-center">
                    <span className="text-xl font-bold text-emerald-700 block">{passport.codeHealthScore}%</span>
                    <span className="text-[11px] text-[#737373]">Code Health</span>
                  </div>
                  <div className="p-3.5 rounded-2xl bg-[#FBFBFA] border border-black/8 font-mono-code text-center">
                    <span className="text-xl font-bold text-[#111111] block">{passport.testCoverage}%</span>
                    <span className="text-[11px] text-[#737373]">Test Coverage</span>
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-[#FBFBFA] border border-black/8 space-y-3 font-body">
                  <h4 className="text-sm font-semibold text-[#111111]">Repository & Governance</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono-code text-[#4A4A4A]">
                    <div>GitHub: <span className="text-[#111111] font-semibold">{passport.githubRepo}</span></div>
                    <div>License: <span className="text-[#111111] font-semibold">{passport.license}</span></div>
                    <div>Academic Year: <span className="text-[#111111] font-semibold">{passport.academicYear}</span></div>
                    <div>QR Seal Hash: <span className="text-[#737373] truncate block">{passport.qrHash}</span></div>
                  </div>
                </div>

                <div>
                  <h4 className="text-xs font-mono-code uppercase font-semibold text-[#737373] mb-2">Verified Technology Stack</h4>
                  <div className="flex flex-wrap gap-2">
                    {project.techStack.map((tech) => (
                      <span key={tech} className="text-xs font-mono-code px-3 py-1 rounded-xl bg-[#F7F7F5] border border-black/8 text-[#111111]">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'lineage' && (
              <div className="space-y-4">
                <p className="text-xs text-[#4A4A4A]">
                  Every ProjectVerse repository records previous cohorts to prevent project abandonment and duplicate code generation.
                </p>
                <div className="space-y-3">
                  {project.lineage.map((batch, index) => (
                    <div key={index} className="p-5 rounded-2xl bg-[#FBFBFA] border border-black/8">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                        <div>
                          <span className="text-xs font-mono-code text-[#737373] uppercase">{batch.year}</span>
                          <h4 className="text-base font-semibold text-[#111111]">{batch.batchName}</h4>
                          <p className="text-xs text-[#737373]">{batch.institution} • Leads: {batch.leadContributors.join(', ')}</p>
                        </div>
                        <span className={`text-xs font-mono-code px-3 py-1 rounded-full self-start font-medium ${
                          batch.activeStatus === 'Current'
                            ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                            : 'bg-[#F0F0EE] text-[#4A4A4A]'
                        }`}>
                          {batch.activeStatus}
                        </span>
                      </div>
                      <p className="text-xs text-[#4A4A4A] mt-2 mb-3">{batch.summary}</p>
                      <div className="flex flex-wrap gap-2 text-xs font-mono-code text-[#737373]">
                        <span>Commits: {batch.commits}</span>
                        <span>•</span>
                        <span>PRs: {batch.pullRequests}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'contributors' && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {project.contributors.map((c, i) => (
                    <div key={i} className="p-4 rounded-2xl bg-[#FBFBFA] border border-black/8 flex items-center gap-3">
                      <img src={c.avatar} alt={c.name} className="w-12 h-12 rounded-full object-cover border border-black/10" />
                      <div>
                        <h4 className="text-sm font-semibold text-[#111111]">{c.name}</h4>
                        <p className="text-xs text-[#4A4A4A]">{c.role}</p>
                        <p className="text-[11px] text-[#737373] font-mono-code">{c.institution} • {c.batch}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'rubric' && (
              <div className="space-y-4">
                <div className="p-5 rounded-2xl bg-[#FBFBFA] border border-black/8 space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-semibold text-[#111111]">Evaluator: {passport.facultyReviewer.name}</h4>
                      <p className="text-xs text-[#4A4A4A]">{passport.facultyReviewer.designation} • {passport.facultyReviewer.institution}</p>
                    </div>
                    <span className="text-lg font-bold text-emerald-700 font-mono-code">
                      {passport.facultyReviewer.score} / 10
                    </span>
                  </div>
                  <p className="text-xs text-[#4A4A4A] italic">"{passport.facultyReviewer.reviewText}"</p>
                  <div className="pt-2 text-[11px] font-mono-code text-[#737373] border-t border-black/8">
                    Verified Signature Hash: {passport.facultyReviewer.signatureHash}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Modal Footer Actions */}
          <div className="pt-6 border-t border-black/8 flex items-center justify-between">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-[#F5F5F3] hover:bg-[#EBEBE8] text-xs font-medium text-[#4A4A4A] cursor-pointer"
            >
              Close
            </button>
            <button
              onClick={() => {
                onClose();
                onJoinClick(project);
              }}
              className="btn-primary-black px-5 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 cursor-pointer shadow-xs"
            >
              <Users className="w-3.5 h-3.5" />
              <span>Join Next Batch Roadmap</span>
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
