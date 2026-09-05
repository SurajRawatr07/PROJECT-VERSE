import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, 
  Award, 
  ShieldCheck, 
  CheckCircle2, 
  GitBranch, 
  GitCommit, 
  GraduationCap, 
  Lock, 
  Download, 
  Share2,
  ExternalLink
} from 'lucide-react';

interface ProofOfWorkModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ProofOfWorkModal: React.FC<ProofOfWorkModalProps> = ({
  isOpen,
  onClose
}) => {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/45 backdrop-blur-sm"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 16 }}
          className="relative z-10 w-full max-w-3xl bg-white rounded-3xl p-6 sm:p-9 border border-black/10 shadow-2xl text-[#111111] max-h-[92vh] overflow-y-auto"
        >
          <button
            onClick={onClose}
            className="absolute top-5 right-5 w-8 h-8 rounded-full bg-[#F5F5F3] hover:bg-[#ECECE9] border border-black/8 flex items-center justify-center text-[#4A4A4A] hover:text-[#111111] transition-all cursor-pointer"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>

          {/* Certificate Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 mb-6 border-b border-black/8 gap-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-[#111111] text-white flex items-center justify-center">
                <Award className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[10px] font-mono-code uppercase tracking-wider text-[#737373] font-medium">
                  Official Academic Proof of Work Transcript
                </span>
                <h3 className="text-xl font-bold text-[#111111] font-body">
                  Suraj Rawat
                </h3>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs font-mono-code text-emerald-800 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full flex items-center gap-1 font-medium">
                <CheckCircle2 className="w-3.5 h-3.5" />
                VERIFIED CREDENTIAL
              </span>
            </div>
          </div>

          {/* Student Info Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6 p-4 rounded-2xl bg-[#FBFBFA] border border-black/8 font-mono-code text-xs">
            <div>
              <span className="text-[10px] text-[#737373] block uppercase">Institution</span>
              <span className="text-[#111111] font-medium block mt-0.5">Graphic Era Hill University</span>
            </div>
            <div>
              <span className="text-[10px] text-[#737373] block uppercase">Degree & Batch</span>
              <span className="text-[#111111] font-medium block mt-0.5">B.Tech CSE '26</span>
            </div>
            <div>
              <span className="text-[10px] text-[#737373] block uppercase">Total Commits</span>
              <span className="text-emerald-700 font-medium block mt-0.5">384 Commits</span>
            </div>
            <div>
              <span className="text-[10px] text-[#737373] block uppercase">Faculty Score</span>
              <span className="text-[#111111] font-medium block mt-0.5">9.6 / 10.0</span>
            </div>
          </div>

          {/* Verified Projects List */}
          <div className="space-y-4 mb-6">
            <h4 className="text-xs font-mono-code uppercase tracking-wider text-[#737373] font-bold">
              Verified Academic Projects & Contributions:
            </h4>

            <div className="p-4 rounded-2xl bg-[#FBFBFA] border border-black/8 space-y-2">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-mono-code text-[#737373]">PV-2025-GEHU-CS089</span>
                  <h5 className="text-sm font-bold text-[#111111]">AeroSync: Edge-Neuromorphic Drone Swarm Guidance</h5>
                </div>
                <span className="text-xs font-mono-code text-emerald-700 font-medium">Lead Contributor</span>
              </div>
              <p className="text-xs text-[#4A4A4A]">
                Authored sub-millisecond visual SLAM module. Verified by Dr. Anil Sharma (Graphic Era Hill University).
              </p>
              <div className="flex items-center gap-4 text-[11px] font-mono-code text-[#737373] pt-1">
                <span>124 Merged Commits</span>
                <span>•</span>
                <span>SHA-256: 4f8b9e...01c4</span>
              </div>
            </div>
          </div>

          {/* Transcript Footer */}
          <div className="pt-4 border-t border-black/8 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
            <span className="text-[#737373] font-mono-code">
              Immutable Hash: 0x8f2a9b4c7d1e8a93...
            </span>
            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  alert('Transcript exported as cryptographically verifiable PDF!');
                }}
                className="btn-primary-black px-4 py-2 rounded-xl font-medium flex items-center gap-1.5 cursor-pointer shadow-xs"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Export Verifiable PDF</span>
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
