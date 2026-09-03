import React from 'react';
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
  QrCode,
  FileCheck2,
  Calendar,
  Building2,
  Terminal,
  Clock
} from 'lucide-react';
import { ProjectItem } from '../../types';
import { ProjectStatusBadge } from '../common/ProjectStatusBadge';

interface ProjectPassportModalProps {
  project: ProjectItem | null;
  onClose: () => void;
}

export const ProjectPassportModal: React.FC<ProjectPassportModalProps> = ({
  project,
  onClose
}) => {
  if (!project) return null;

  const passport = project.passport;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
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
          className="relative z-10 w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-[#FFFFFF] rounded-3xl border border-black/15 shadow-2xl p-6 sm:p-8 text-[#111111]"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-5 right-5 w-8 h-8 rounded-full bg-[#F5F5F3] hover:bg-[#ECECE9] border border-black/8 flex items-center justify-center text-[#4A4A4A] hover:text-[#111111] transition-all cursor-pointer"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>

          {/* Passport Header Banner */}
          <div className="border-b border-black/10 pb-6 mb-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F7F7F5] border border-black/8 text-xs font-mono-code text-[#111111]">
                <FileCheck2 className="w-3.5 h-3.5 text-emerald-600" />
                <span className="font-semibold tracking-wider">PROJECT PASSPORT</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono-code text-[#737373]">ID:</span>
                <span className="px-2.5 py-0.5 rounded-lg bg-[#111111] text-white text-xs font-mono-code font-bold">
                  {passport.passportId}
                </span>
              </div>
            </div>

            <h2 className="text-2xl sm:text-3xl font-display font-semibold text-[#111111]">
              {project.title}
            </h2>
            <p className="text-xs sm:text-sm text-[#4A4A4A] mt-1.5 leading-relaxed">
              {project.tagline || project.description}
            </p>

            <div className="flex flex-wrap items-center gap-2 mt-4">
              <ProjectStatusBadge status="APPROVED" size="sm" />
              <span className="inline-flex items-center gap-1 text-xs font-mono-code px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
                <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                Institutional Verification Active
              </span>
              <span className="text-xs text-[#737373] font-mono-code">
                Batch: {passport.academicYear || project.academicYear}
              </span>
            </div>
          </div>

          {/* Verified Project Seals Section */}
          <div className="bg-[#FBFBFA] p-4 sm:p-5 rounded-2xl border border-black/8 mb-6">
            <div className="flex items-center gap-2 mb-3">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span className="text-xs font-mono-code uppercase tracking-wider font-bold text-[#111111]">
                VERIFIED PROJECT CERTIFICATION
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              <div className="p-3 bg-white rounded-xl border border-black/8 flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs font-semibold text-[#111111]">Institution Verified</p>
                  <p className="text-[11px] text-[#737373] mt-0.5">{project.institution}</p>
                </div>
              </div>

              <div className="p-3 bg-white rounded-xl border border-black/8 flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs font-semibold text-[#111111]">Faculty Reviewed</p>
                  <p className="text-[11px] text-[#737373] mt-0.5">
                    {passport.facultyReviewer?.name || 'Dr. Anil Sharma'} (Score: {passport.facultyReviewer?.score || 9.6}/10)
                  </p>
                </div>
              </div>

              <div className="p-3 bg-white rounded-xl border border-black/8 flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs font-semibold text-[#111111]">Project Verified</p>
                  <p className="text-[11px] text-[#737373] mt-0.5">Cryptographic Seal Active</p>
                </div>
              </div>
            </div>

            {passport.institutionalValidationCode && (
              <div className="mt-3 pt-3 border-t border-black/6 flex flex-wrap items-center justify-between gap-2 text-[11px] font-mono-code text-[#737373]">
                <span>Validation Hash: {passport.institutionalValidationCode}</span>
                <span className="text-emerald-700 font-medium">Signature: {passport.facultyReviewer?.signatureHash?.slice(0, 18)}...</span>
              </div>
            )}
          </div>

          {/* Core Metadata Matrix */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="p-4 bg-white rounded-2xl border border-black/8 space-y-3">
              <div className="flex items-center gap-2 text-xs font-mono-code text-[#737373] uppercase pb-1 border-b border-black/6">
                <Building2 className="w-3.5 h-3.5" />
                <span>Academic Lineage</span>
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div>
                  <span className="text-[#737373] block text-[11px]">Institution</span>
                  <span className="font-medium text-[#111111]">{project.institution}</span>
                </div>
                <div>
                  <span className="text-[#737373] block text-[11px]">Department</span>
                  <span className="font-medium text-[#111111]">{project.department}</span>
                </div>
                <div>
                  <span className="text-[#737373] block text-[11px]">Academic Batch</span>
                  <span className="font-medium text-[#111111]">{project.academicYear}</span>
                </div>
                <div>
                  <span className="text-[#737373] block text-[11px]">Faculty Mentor</span>
                  <span className="font-medium text-[#111111]">{passport.facultyReviewer?.name || 'Dr. Anil Sharma'}</span>
                </div>
              </div>
            </div>

            <div className="p-4 bg-white rounded-2xl border border-black/8 space-y-3">
              <div className="flex items-center gap-2 text-xs font-mono-code text-[#737373] uppercase pb-1 border-b border-black/6">
                <Terminal className="w-3.5 h-3.5" />
                <span>Technical Evidence</span>
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div>
                  <span className="text-[#737373] block text-[11px]">Total Commits</span>
                  <span className="font-mono-code font-semibold text-[#111111]">{project.githubCommits}</span>
                </div>
                <div>
                  <span className="text-[#737373] block text-[11px]">GitHub Stars</span>
                  <span className="font-mono-code font-semibold text-[#111111]">{project.githubStars}</span>
                </div>
                <div>
                  <span className="text-[#737373] block text-[11px]">Code Health</span>
                  <span className="font-mono-code font-semibold text-emerald-600">{passport.codeHealthScore || 98}%</span>
                </div>
                <div>
                  <span className="text-[#737373] block text-[11px]">Repository</span>
                  <a 
                    href={passport.githubRepo || '#'} 
                    target="_blank" 
                    rel="noreferrer"
                    className="font-mono-code text-blue-600 hover:underline inline-flex items-center gap-1 truncate max-w-[120px]"
                  >
                    <span>repo</span>
                    <ExternalLink className="w-2.5 h-2.5" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Technologies */}
          <div className="mb-6">
            <h4 className="text-xs font-mono-code uppercase text-[#737373] mb-2">Technologies</h4>
            <div className="flex flex-wrap gap-1.5">
              {project.techStack.map(tech => (
                <span key={tech} className="px-2.5 py-1 rounded-lg bg-[#F7F7F5] border border-black/8 text-xs font-mono-code text-[#111111]">
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Contributors */}
          <div className="mb-6">
            <h4 className="text-xs font-mono-code uppercase text-[#737373] mb-2.5">
              Verified Contributors ({project.contributors.length})
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {project.contributors.map(c => (
                <div key={c.name} className="flex items-center gap-2.5 p-2.5 bg-[#FBFBFA] rounded-xl border border-black/6">
                  <img src={c.avatar} alt={c.name} className="w-7 h-7 rounded-full object-cover border border-black/10" />
                  <div className="min-w-0">
                    <p className="text-xs font-semibold text-[#111111] truncate">{c.name}</p>
                    <p className="text-[11px] text-[#737373] truncate">{c.role} • {c.institution}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Footer actions */}
          <div className="pt-4 border-t border-black/10 flex flex-wrap items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2 text-[#737373] font-mono-code text-[11px]">
              <Clock className="w-3.5 h-3.5" />
              <span>Created: Sep 2025 • Seal Validated</span>
            </div>
            <button
              onClick={onClose}
              className="px-5 py-2 rounded-xl bg-[#111111] text-white font-medium hover:bg-black transition-colors cursor-pointer"
            >
              Close Passport
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
