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
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-[#040714]/85 backdrop-blur-xl"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative z-10 w-full max-w-3xl liquid-glass-elevated rounded-3xl p-6 sm:p-9 border border-white/20 shadow-2xl bg-[#080d1e]/95 text-slate-100"
        >
          <button
            onClick={onClose}
            className="absolute top-5 right-5 w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center text-slate-400 hover:text-white transition-all cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>

          {/* Certificate Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 mb-6 border-b border-white/10 gap-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-slate-900 border border-indigo-400/40 flex items-center justify-center text-emerald-400">
                <Award className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[10px] font-mono-code uppercase tracking-widest text-indigo-300">
                  OFFICIAL PROOF OF WORK TRANSCRIPT
                </span>
                <h3 className="text-xl font-bold text-white font-body">
                  Devansh Kulkarni
                </h3>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs font-mono-code text-emerald-400 bg-emerald-500/15 border border-emerald-500/30 px-3 py-1 rounded-full flex items-center gap-1 font-semibold">
                <CheckCircle2 className="w-3.5 h-3.5" />
                VERIFIED CREDENTIAL
              </span>
            </div>
          </div>

          {/* Student Info Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6 p-4 rounded-xl bg-black/40 border border-white/10 font-mono-code text-xs">
            <div>
              <span className="text-[10px] text-slate-500 block uppercase">Institution</span>
              <span className="text-slate-200 font-semibold block mt-0.5">IIT Bombay</span>
            </div>
            <div>
              <span className="text-[10px] text-slate-500 block uppercase">Degree & Batch</span>
              <span className="text-slate-200 font-semibold block mt-0.5">B.Tech CSE '25</span>
            </div>
            <div>
              <span className="text-[10px] text-slate-500 block uppercase">Total Commits</span>
              <span className="text-emerald-400 font-semibold block mt-0.5">384 Commits</span>
            </div>
            <div>
              <span className="text-[10px] text-slate-500 block uppercase">Faculty Score</span>
              <span className="text-indigo-300 font-semibold block mt-0.5">9.6 / 10.0</span>
            </div>
          </div>

          {/* Verified Projects List */}
          <div className="space-y-4 mb-6">
            <h4 className="text-xs font-mono-code uppercase tracking-wider text-slate-400">
              Verified Academic Projects & Contributions:
            </h4>

            <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-sm font-bold text-white block">AeroSync Swarm Guidance (Batch '24 & '25)</span>
                  <span className="text-xs text-indigo-300 font-mono-code">Role: Team Lead & Perception Architect</span>
                </div>
                <span className="text-xs font-mono-code text-slate-400">PV-2025-IITB-CS089</span>
              </div>

              <div className="space-y-1.5 text-xs text-slate-300">
                <p className="flex items-start gap-1.5">
                  <span className="text-indigo-400 font-bold">•</span>
                  <span>Ported neuromorphic event camera visual odometry pipeline to ROS 2 Humble.</span>
                </p>
                <p className="flex items-start gap-1.5">
                  <span className="text-indigo-400 font-bold">•</span>
                  <span>Led cross-institution collaboration with IIIT Hyderabad and BITS Pilani testbeds.</span>
                </p>
              </div>

              <div className="pt-2 border-t border-white/5 flex items-center justify-between text-[11px] text-slate-400 font-mono-code">
                <span>Faculty Signoff: Dr. Siddharth Anand</span>
                <span className="text-emerald-400">Cryptographically Sealed</span>
              </div>
            </div>
          </div>

          {/* Transcript Footer */}
          <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400 font-mono-code">
            <div className="flex items-center gap-1.5 text-slate-400">
              <Lock className="w-3.5 h-3.5 text-emerald-400" />
              <span>Attestation Hash: 0x8f2d1e90bca41398c8f0412891f7a08b98172901</span>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={onClose}
                className="px-4 py-2 rounded-full liquid-glass text-xs font-semibold text-slate-300 hover:text-white"
              >
                Close
              </button>
              <button
                onClick={() => {}}
                className="px-4 py-2 rounded-full bg-white text-slate-950 font-semibold text-xs flex items-center gap-1.5 shadow-sm hover:bg-slate-200"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Export Official PDF</span>
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
