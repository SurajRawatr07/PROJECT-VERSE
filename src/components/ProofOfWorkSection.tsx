import React from 'react';
import { motion } from 'motion/react';
import { 
  Award, 
  CheckCircle2, 
  GitCommit, 
  GitBranch, 
  GraduationCap, 
  ShieldCheck, 
  ExternalLink, 
  ArrowRight,
  FileCheck,
  Star,
  Quote
} from 'lucide-react';

import { getInitialsAvatar } from '../lib/authService';

interface ProofOfWorkSectionProps {
  onViewProofOfWorkModal: () => void;
}

export const ProofOfWorkSection: React.FC<ProofOfWorkSectionProps> = ({
  onViewProofOfWorkModal
}) => {
  return (
    <section id="proof-of-work" className="relative w-full py-24 sm:py-32 px-4 sm:px-6 bg-[#040714] border-t border-white/5">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 sm:mb-20 gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full liquid-glass text-xs font-mono-code text-indigo-300 mb-3">
              <Award className="w-3.5 h-3.5 text-indigo-400" />
              <span>CRYPTOGRAPHIC DEVELOPER CREDENTIALS</span>
            </div>
            <h2 className="font-display text-3xl sm:text-5xl md:text-6xl text-white font-normal leading-[1.1]">
              Show What You Actually Built.
            </h2>
            <p className="text-slate-400 font-body text-sm sm:text-base mt-4 leading-relaxed">
              Replace self-proclaimed resume skills with verifiable academic code evidence, line contributions, and signed faculty assessments.
            </p>
          </div>

          {/* Core Philosophy Mantra */}
          <div className="p-4 rounded-xl liquid-glass border-indigo-400/20 max-w-sm">
            <p className="text-xs text-slate-400 font-mono-code leading-relaxed">
              Not just: <span className="text-slate-500 line-through">"I know React."</span><br />
              <strong className="text-white font-bold">
                “I built this. I contributed here. It was reviewed. It was verified.”
              </strong>
            </p>
          </div>
        </div>

        {/* Verified Student Profile Card Preview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="liquid-glass-elevated rounded-3xl p-6 sm:p-10 border border-white/15 shadow-2xl relative overflow-hidden"
        >
          {/* Top Profile Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 mb-8 border-b border-white/10 gap-4">
            <div className="flex items-center gap-4">
              <img
                src={getInitialsAvatar('Devansh Kulkarni', 'STUDENT')}
                alt="Devansh Kulkarni"
                referrerPolicy="no-referrer"
                className="w-16 h-16 rounded-2xl object-cover border-2 border-indigo-400/40 shadow-md bg-slate-900"
              />
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-xl sm:text-2xl font-bold text-white font-body">
                    Devansh Kulkarni
                  </h3>
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                    <ShieldCheck className="w-3 h-3" />
                    Verified Contributor
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-slate-300 font-mono-code mt-0.5">
                  B.Tech Computer Science '25 • IIT Bombay Autonomous Robotics Lab
                </p>
              </div>
            </div>

            <button
              id="btn-view-proof-of-work-transcript"
              onClick={onViewProofOfWorkModal}
              className="px-5 py-2.5 rounded-full bg-white text-slate-950 hover:bg-slate-100 font-medium text-xs sm:text-sm transition-all shadow-md flex items-center gap-2 self-start sm:self-auto cursor-pointer"
            >
              <span>View Full Proof of Work</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Grid of Verified Evidence */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {/* Box 1: Verified Projects */}
            <div className="p-5 rounded-2xl bg-black/40 border border-white/10 flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-mono-code uppercase tracking-wider text-slate-400 block mb-2">
                  Verified Academic Capstones
                </span>
                <h4 className="text-base font-bold text-white mb-1">AeroSync Drone Swarm</h4>
                <p className="text-xs text-slate-300 mb-3">Role: Team Lead & Perception Pipeline Architect</p>
                <div className="space-y-1 text-xs text-slate-400 font-mono-code">
                  <p>• 384 Merged Git Commits</p>
                  <p>• 14 Approved Pull Requests</p>
                  <p>• Batch '24 Alpha to '25 Beta Lead</p>
                </div>
              </div>
              <div className="mt-4 pt-3 border-t border-white/10 text-[11px] text-emerald-400 font-mono-code">
                Passed Independent Flight Audit
              </div>
            </div>

            {/* Box 2: Faculty Endorsement */}
            <div className="p-5 rounded-2xl bg-black/40 border border-white/10 flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-mono-code uppercase tracking-wider text-slate-400 block mb-2">
                  Faculty Review Score
                </span>
                <div className="flex items-baseline gap-2 mb-1">
                  <span className="text-3xl font-bold font-mono-code text-white">9.6</span>
                  <span className="text-xs text-slate-400 font-mono-code">/ 10.0</span>
                </div>
                <p className="text-xs text-slate-300 italic mb-2 leading-relaxed">
                  "Demonstrated world-class distributed system design in porting visual odometry to ROS 2 Humble."
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-white/10 text-[11px] text-indigo-300 font-mono-code">
                Signed by Dr. S. Anand (IITB CSE)
              </div>
            </div>

            {/* Box 3: Peer & Mentor Validation */}
            <div className="p-5 rounded-2xl bg-black/40 border border-white/10 flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-mono-code uppercase tracking-wider text-slate-400 block mb-2">
                  Cross-College Peer Recognition
                </span>
                <h4 className="text-base font-bold text-white mb-1">3 Partner Colleges</h4>
                <p className="text-xs text-slate-300 mb-3">IIIT Hyderabad, BITS Pilani & Stanford</p>
                <div className="space-y-1 text-xs text-slate-400 font-mono-code">
                  <p>• 100% On-Time Batch Handoff</p>
                  <p>• 12 Mentorship Sessions Delivered</p>
                  <p>• Clean Architecture Certificate</p>
                </div>
              </div>
              <div className="mt-4 pt-3 border-t border-white/10 text-[11px] text-slate-400 font-mono-code">
                Hash: 0x99a8102bc449
              </div>
            </div>
          </div>

          {/* Bottom Banner */}
          <div className="p-4 rounded-xl bg-indigo-950/30 border border-indigo-500/20 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-indigo-200">
            <span className="font-mono-code">
              Sharable with Top Tech Recruiters, Graduate Admissions & Grant Committees
            </span>
            <button
              onClick={onViewProofOfWorkModal}
              className="text-white hover:underline font-medium shrink-0 cursor-pointer"
            >
              Inspect Cryptographic Credentials →
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
