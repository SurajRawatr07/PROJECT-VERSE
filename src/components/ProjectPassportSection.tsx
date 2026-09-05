import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ShieldCheck, 
  QrCode, 
  GitBranch, 
  GitPullRequest, 
  GitCommit, 
  Award, 
  CheckCircle2, 
  FileCode, 
  GraduationCap, 
  ExternalLink,
  Lock,
  Layers,
  Sparkles,
  ChevronRight
} from 'lucide-react';
import { SAMPLE_PROJECTS } from '../data/mockData';
import { ProjectPassportData } from '../types';

export const ProjectPassportSection: React.FC = () => {
  const [selectedProjectIndex, setSelectedProjectIndex] = useState(0);
  const currentProject = SAMPLE_PROJECTS[selectedProjectIndex];
  const passport = currentProject.passport;

  return (
    <section id="passport" className="relative w-full py-24 sm:py-32 px-4 sm:px-6 bg-[#040714] border-t border-white/5 overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[600px] h-[300px] sm:h-[600px] bg-indigo-600/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full liquid-glass text-xs font-mono-code text-indigo-300 mb-3">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>CORE INNOVATION • DUAL EVIDENCE PASSPORT</span>
            </div>
            <h2 className="font-display text-3xl sm:text-5xl md:text-6xl text-white font-normal leading-[1.1]">
              Every Project Gets an Identity.
            </h2>
            <p className="text-slate-400 font-body text-sm sm:text-base mt-4 leading-relaxed">
              Project Passport brings technical evidence and academic validation into one structured, tamper-proof project record that persists beyond graduation.
            </p>
          </div>

          {/* Project Switcher Tabs */}
          <div className="flex flex-wrap gap-2">
            {SAMPLE_PROJECTS.slice(0, 3).map((p, idx) => (
              <button
                key={p.id}
                id={`passport-switch-${p.id}`}
                onClick={() => setSelectedProjectIndex(idx)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-mono-code transition-all cursor-pointer ${
                  selectedProjectIndex === idx
                    ? 'bg-indigo-500 text-white shadow-lg shadow-indigo-500/20'
                    : 'liquid-glass text-slate-400 hover:text-white border-white/10'
                }`}
              >
                {p.title.split(':')[0]}
              </button>
            ))}
          </div>
        </div>

        {/* Passport Card Presentation */}
        <motion.div
          key={passport.passportId}
          initial={{ opacity: 0, scale: 0.98, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="liquid-glass-elevated rounded-3xl p-6 sm:p-10 border border-white/15 shadow-2xl relative overflow-hidden"
        >
          {/* Top Bar: Passport Header & Cryptographic ID */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 mb-8 border-b border-white/10 gap-4">
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-slate-900 border border-indigo-400/40 flex items-center justify-center text-white shadow-inner">
                <ShieldCheck className="w-6 h-6 text-emerald-400" />
              </div>
              <div>
                <div className="text-[10px] font-mono-code uppercase tracking-widest text-indigo-300">
                  OFFICIAL ACADEMIC REPOSITORY RECORD
                </div>
                <div className="text-lg sm:text-xl font-bold font-mono-code text-white tracking-wider">
                  {passport.passportId}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-body">
                <CheckCircle2 className="w-3.5 h-3.5" />
                VERIFIED ACADEMIC PASSPORT
              </span>
              <span className="text-[11px] font-mono-code text-slate-400 hidden lg:inline">
                HASH: {passport.qrHash.slice(0, 10)}...
              </span>
            </div>
          </div>

          {/* Core Info Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-8">
            {/* Left Col: Project Details */}
            <div className="lg:col-span-7 space-y-6">
              <div>
                <h3 className="font-display text-2xl sm:text-3xl text-white font-normal leading-snug">
                  {passport.projectName}
                </h3>
                <p className="text-slate-300 text-sm sm:text-base font-body mt-2 leading-relaxed">
                  {passport.tagline}
                </p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-2">
                <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                  <span className="text-[10px] font-mono-code text-slate-400 block uppercase">Institution</span>
                  <span className="text-xs font-medium text-white block mt-1 truncate">{passport.institution}</span>
                </div>
                <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                  <span className="text-[10px] font-mono-code text-slate-400 block uppercase">Academic Cycle</span>
                  <span className="text-xs font-medium text-white block mt-1">{passport.academicYear}</span>
                </div>
                <div className="p-3 rounded-xl bg-white/5 border border-white/10 col-span-2 sm:col-span-1">
                  <span className="text-[10px] font-mono-code text-slate-400 block uppercase">Batch Lineage</span>
                  <span className="text-xs font-medium text-indigo-300 block mt-1">{passport.currentBatch}</span>
                </div>
              </div>

              {/* Tech Stack Pills */}
              <div>
                <span className="text-[11px] font-mono-code text-slate-400 block uppercase mb-2">Verified Technology Stack</span>
                <div className="flex flex-wrap gap-1.5">
                  {passport.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="text-xs font-mono-code px-2.5 py-1 rounded-lg bg-indigo-950/40 text-indigo-200 border border-indigo-500/30"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Col: Dual Telemetry Matrix */}
            <div className="lg:col-span-5 flex flex-col gap-4">
              {/* Technical Evidence Card */}
              <div className="p-5 rounded-2xl bg-black/40 border border-white/10 space-y-3 font-mono-code text-xs">
                <div className="flex items-center justify-between text-slate-400 border-b border-white/10 pb-2">
                  <span className="flex items-center gap-1.5 text-white font-medium">
                    <GitBranch className="w-4 h-4 text-indigo-400" />
                    Technical Evidence
                  </span>
                  <span className="text-emerald-400">CI Tests Passing</span>
                </div>
                <div className="grid grid-cols-3 gap-2 text-center pt-1">
                  <div className="p-2 rounded-lg bg-white/5">
                    <span className="text-base font-bold text-white block">{passport.totalCommits}</span>
                    <span className="text-[10px] text-slate-400">Commits</span>
                  </div>
                  <div className="p-2 rounded-lg bg-white/5">
                    <span className="text-base font-bold text-white block">{passport.mergedPRs}</span>
                    <span className="text-[10px] text-slate-400">Merged PRs</span>
                  </div>
                  <div className="p-2 rounded-lg bg-white/5">
                    <span className="text-base font-bold text-emerald-400 block">{passport.codeHealthScore}%</span>
                    <span className="text-[10px] text-slate-400">Health Score</span>
                  </div>
                </div>
                <div className="text-[11px] text-slate-400 flex items-center justify-between pt-1">
                  <span className="truncate">Repo: {passport.githubRepo}</span>
                  <span className="text-indigo-400 shrink-0">Branch: main</span>
                </div>
              </div>

              {/* Academic Review Rubric */}
              <div className="p-5 rounded-2xl bg-indigo-950/20 border border-indigo-500/20 space-y-3">
                <div className="flex items-center justify-between text-slate-300 border-b border-white/10 pb-2">
                  <span className="flex items-center gap-1.5 text-white text-xs font-medium">
                    <GraduationCap className="w-4 h-4 text-indigo-400" />
                    Faculty Review & Scoring
                  </span>
                  <span className="text-xs font-mono-code text-indigo-300 font-bold">
                    Score: {passport.facultyReviewer.score}/10
                  </span>
                </div>

                <p className="text-xs text-slate-300 italic font-body leading-relaxed">
                  "{passport.facultyReviewer.reviewText}"
                </p>

                <div className="pt-2 flex items-center justify-between text-[11px] text-slate-400 font-mono-code">
                  <span className="truncate">{passport.facultyReviewer.name}</span>
                  <span className="text-emerald-400 shrink-0 font-medium">Verified Signature</span>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Security Footer */}
          <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400 font-mono-code">
            <div className="flex items-center gap-2">
              <Lock className="w-3.5 h-3.5 text-emerald-400" />
              <span>Institutional Validation: {passport.institutionalValidationCode}</span>
            </div>
            <div className="text-slate-500 text-[11px]">
              Permanent Archive • Linked to National Academic Repositories
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
