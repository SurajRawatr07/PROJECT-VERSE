import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, 
  ShieldCheck, 
  CheckCircle2, 
  ExternalLink, 
  Building2, 
  FileCheck2, 
  Share2, 
  GitFork, 
  Check, 
  ArrowDown, 
  Users 
} from 'lucide-react';
import { ProjectItem } from '../../types';

interface ProjectPassportModalProps {
  project: ProjectItem | null;
  onClose: () => void;
  onContinueProject?: (project: ProjectItem) => void;
}

export const ProjectPassportModal: React.FC<ProjectPassportModalProps> = ({
  project,
  onClose,
  onContinueProject
}) => {
  const [showLineage, setShowLineage] = useState(false);
  const [copied, setCopied] = useState(false);

  if (!project) return null;

  const passport = project.passport;

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const lineageNodes = [
    {
      batch: `Batch ${project.academicYear || '2024'}`,
      phase: 'Original Base',
      added: 'Foundation architecture, core data models, and baseline validation.',
      status: 'Verified & Archived'
    },
    {
      batch: 'Batch 2025',
      phase: 'Feature Expansion',
      added: 'Distributed pipeline, performance telemetry, and web dashboard.',
      status: 'Verified & Active'
    },
    {
      batch: 'Batch 2026',
      phase: 'Performance & Scale',
      added: 'Production deployment, edge optimizations, and institutional handover.',
      status: 'Open for Continuity'
    }
  ];

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto font-serif">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm"
        />

        {/* Structured Identity Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.97, y: 14 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.97, y: 14 }}
          transition={{ duration: 0.2 }}
          className="relative z-10 w-full max-w-2xl max-h-[92vh] overflow-y-auto bg-[#FFFFFF] rounded-3xl border border-black/15 shadow-2xl p-6 sm:p-8 text-[#111111]"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-5 right-5 w-8 h-8 rounded-full bg-[#F5F5F3] hover:bg-[#ECECE9] border border-black/8 flex items-center justify-center text-[#4A4A4A] hover:text-[#111111] transition-all cursor-pointer"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>

          {/* Official Passport Top Header */}
          <div className="border-b border-black/10 pb-5 mb-5">
            <div className="flex flex-wrap items-center justify-between gap-2 mb-2.5">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F5F5F3] border border-black/8 text-[12px] text-[#111111] font-bold uppercase tracking-wider">
                <FileCheck2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>Project Passport</span>
              </div>

              <div className="flex items-center gap-1.5 text-xs">
                <span className="text-[#737373]">Unique ID:</span>
                <span className="px-2 py-0.5 rounded-md bg-[#111111] text-white text-[11px] font-bold tracking-wider">
                  {passport.passportId || project.passportId || 'PV-2025-001'}
                </span>
              </div>
            </div>

            {/* Project Name */}
            <h2 className="text-[24px] sm:text-[28px] font-bold text-[#111111] leading-tight">
              {project.title}
            </h2>

            {/* Short Description */}
            <p className="text-[14px] text-[#4A4A4A] mt-2 leading-relaxed">
              {project.tagline || project.description}
            </p>
          </div>

          {/* Identity Matrix Fields */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 mb-6">
            {/* Batch & Academic Year */}
            <div className="p-3.5 rounded-xl bg-[#FBFBFA] border border-black/8">
              <span className="text-[11px] font-bold text-[#737373] uppercase tracking-wider block">
                Batch & Academic Year
              </span>
              <span className="text-[14px] font-bold text-[#111111] mt-0.5 block">
                Batch {project.academicYear || '2025–2026'}
              </span>
            </div>

            {/* Institution */}
            <div className="p-3.5 rounded-xl bg-[#FBFBFA] border border-black/8">
              <span className="text-[11px] font-bold text-[#737373] uppercase tracking-wider block">
                Institution
              </span>
              <span className="text-[14px] font-bold text-[#111111] mt-0.5 block truncate">
                {project.institution}
              </span>
            </div>

            {/* Domain & Category */}
            <div className="p-3.5 rounded-xl bg-[#FBFBFA] border border-black/8">
              <span className="text-[11px] font-bold text-[#737373] uppercase tracking-wider block">
                Domain & Category
              </span>
              <span className="text-[14px] font-bold text-[#111111] mt-0.5 block">
                {project.domain}
              </span>
            </div>

            {/* Verification Status */}
            <div className="p-3.5 rounded-xl bg-emerald-50/70 border border-emerald-200">
              <span className="text-[11px] font-bold text-emerald-800 uppercase tracking-wider block">
                Verification Status
              </span>
              <span className="text-[14px] font-bold text-emerald-950 mt-0.5 inline-flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                Verified by Faculty & Institution
              </span>
            </div>

            {/* GitHub Repository */}
            <div className="p-3.5 rounded-xl bg-[#FBFBFA] border border-black/8 sm:col-span-2 flex items-center justify-between">
              <div>
                <span className="text-[11px] font-bold text-[#737373] uppercase tracking-wider block">
                  GitHub Repository
                </span>
                <span className="text-[13.5px] text-[#111111] mt-0.5 block truncate">
                  {passport.githubRepo || 'github.com/projectverse/core-repo'}
                </span>
              </div>
              <a
                href={passport.githubRepo || '#'}
                target="_blank"
                rel="noreferrer"
                className="px-3 py-1.5 rounded-lg bg-[#111111] text-white text-xs font-medium inline-flex items-center gap-1 hover:bg-black transition-colors"
              >
                <span>Open Repo</span>
                <ExternalLink className="w-3 h-3 text-white" />
              </a>
            </div>

            {/* Continuity Status */}
            <div className="p-3.5 rounded-xl bg-[#F5F5F3] border border-black/8 sm:col-span-2 flex items-center justify-between">
              <div>
                <span className="text-[11px] font-bold text-[#737373] uppercase tracking-wider block">
                  Continuity Status
                </span>
                <span className="text-[14px] font-bold text-[#111111] mt-0.5 block">
                  Open for Next Batch Continuation
                </span>
                <span className="text-xs text-[#737373] block mt-0.5">
                  Incoming students can build upon this validated baseline.
                </span>
              </div>
              <span className="px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 text-[11px] font-bold">
                CONTINUITY READY
              </span>
            </div>
          </div>

          {/* Contributors */}
          <div className="mb-6">
            <h4 className="text-xs font-bold text-[#737373] uppercase tracking-wider mb-2">
              Verified Contributors ({project.contributors?.length || 0})
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {project.contributors?.map(c => (
                <div key={c.name} className="flex items-center gap-2.5 p-2.5 rounded-xl bg-[#FBFBFA] border border-black/6">
                  <img src={c.avatar} alt={c.name} className="w-7 h-7 rounded-full object-cover border border-black/10" />
                  <div className="min-w-0">
                    <p className="text-xs font-bold text-[#111111] truncate">{c.name}</p>
                    <p className="text-[11px] text-[#737373] truncate">{c.role} • {c.institution}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Embedded Lineage Accordion/Section if Toggled */}
          {showLineage && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="p-5 bg-[#FBFBFA] rounded-2xl border border-black/8 mb-6 space-y-4"
            >
              <div className="flex items-center justify-between pb-2 border-b border-black/6">
                <span className="text-xs font-bold uppercase tracking-wider text-[#111111]">
                  Cross-Batch Timeline
                </span>
                <button
                  onClick={() => setShowLineage(false)}
                  className="text-xs text-[#737373] hover:text-[#111111]"
                >
                  Hide
                </button>
              </div>

              <div className="space-y-3">
                {lineageNodes.map((node, idx) => (
                  <div key={node.batch} className="p-3 bg-white rounded-xl border border-black/6">
                    <div className="flex items-center justify-between text-xs mb-1">
                      <span className="font-bold text-[#111111]">{node.batch}</span>
                      <span className="text-[#737373]">{node.phase}</span>
                    </div>
                    <p className="text-xs text-[#4A4A4A]">{node.added}</p>
                    <span className="text-[10.5px] text-emerald-700 font-medium block mt-1">
                      ✓ {node.status}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Action Buttons: Export/Share • View Lineage • Continue This Project */}
          <div className="pt-4 border-t border-black/10 flex flex-wrap items-center justify-between gap-2.5">
            <div className="flex items-center gap-2">
              <button
                onClick={handleShare}
                className="px-4 py-2 rounded-xl bg-[#F7F7F5] hover:bg-[#ECECE9] border border-black/8 text-xs font-medium text-[#111111] inline-flex items-center gap-1.5 cursor-pointer transition-colors"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Share2 className="w-3.5 h-3.5 text-[#111111]" />}
                <span>{copied ? 'Link Copied' : 'Export / Share'}</span>
              </button>

              <button
                onClick={() => setShowLineage(!showLineage)}
                className="px-4 py-2 rounded-xl bg-[#F7F7F5] hover:bg-[#ECECE9] border border-black/8 text-xs font-medium text-[#111111] inline-flex items-center gap-1.5 cursor-pointer transition-colors"
              >
                <GitFork className="w-3.5 h-3.5 text-[#111111]" />
                <span>{showLineage ? 'Hide Lineage' : 'View Lineage'}</span>
              </button>
            </div>

            <button
              onClick={() => {
                if (onContinueProject) onContinueProject(project);
                onClose();
              }}
              className="btn-primary-black px-5 py-2 rounded-xl text-xs font-medium inline-flex items-center gap-1.5 cursor-pointer shadow-xs"
            >
              <span>Continue This Project</span>
              <GitFork className="w-3.5 h-3.5 text-white" />
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default ProjectPassportModal;
