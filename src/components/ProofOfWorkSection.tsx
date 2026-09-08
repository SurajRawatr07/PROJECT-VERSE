import React from 'react';
import { motion } from 'motion/react';
import { 
  FileText, 
  GitCommit, 
  UserCheck, 
  Landmark, 
  CheckCircle2, 
  Plus, 
  ArrowDown 
} from 'lucide-react';

interface VerificationPillar {
  id: string;
  title: string;
  desc: string;
  icon: React.ComponentType<{ className?: string; size?: number }>;
  isGithub?: boolean;
}

const PILLARS: VerificationPillar[] = [
  {
    id: 'github',
    title: 'GitHub Activity',
    desc: 'Commits, pull requests & code frequency',
    icon: GitCommit,
    isGithub: true,
  },
  {
    id: 'docs',
    title: 'Documentation',
    desc: 'Architecture specs & project synopsis',
    icon: FileText,
  },
  {
    id: 'contrib',
    title: 'Contributions',
    desc: 'Attributed roles & student modules',
    icon: GitCommit,
  },
  {
    id: 'faculty',
    title: 'Faculty Review',
    desc: 'Academic appraisal & rubric scoring',
    icon: UserCheck,
  },
  {
    id: 'institution',
    title: 'Institution Validation',
    desc: 'Department sign-off & batch archive',
    icon: Landmark,
  },
];

export const ProofOfWorkSection: React.FC = () => {
  return (
    <section 
      id="proof-of-work" 
      className="relative w-full py-18 sm:py-24 px-4 sm:px-6 bg-white border-t border-black/[0.06] select-none"
    >
      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-black/[0.04] text-[11px] font-['Manrope',sans-serif] font-semibold uppercase tracking-widest text-[#333333] mb-3">
            VERIFIED PROOF OF WORK
          </div>
          <h2 className="font-['Manrope',sans-serif] font-bold text-[28px] sm:text-[34px] md:text-[42px] text-[#111111] tracking-tight leading-tight">
            Show What Was Actually Built.
          </h2>
          <p className="mt-2.5 text-[15px] sm:text-[16px] text-[#555555] font-sans">
            A transparent chain combining automated repository activity with authoritative academic oversight.
          </p>
        </div>

        {/* ========================================================================= */}
        {/* VERIFICATION CHAIN: 5 Real UI Cards + Plus Signs + Pure Black Arrow */}
        {/* ========================================================================= */}
        <div className="flex flex-col items-center">
          {/* Horizontal / Wrapped Grid of 5 Cards with '+' signs */}
          <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-3.5 w-full">
            {PILLARS.map((pillar, idx) => {
              const Icon = pillar.icon;
              return (
                <motion.div
                  key={pillar.id}
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-20px' }}
                  transition={{ duration: 0.35, delay: idx * 0.07 }}
                  className="p-4 rounded-2xl bg-[#FAFAF8] border border-black/[0.08] shadow-[0_1px_3px_rgba(0,0,0,0.02)] flex flex-col justify-between"
                >
                  <div>
                    <div className="w-9 h-9 rounded-xl bg-white border border-black/[0.07] flex items-center justify-center text-[#111111] mb-3 shadow-2xs">
                      {pillar.isGithub ? (
                        <svg className="w-4.5 h-4.5 fill-current" viewBox="0 0 24 24">
                          <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                        </svg>
                      ) : (
                        <Icon size={18} />
                      )}
                    </div>
                    <h3 className="text-[14px] font-bold text-[#111111] font-['Manrope',sans-serif] tracking-tight mb-1">
                      {pillar.title}
                    </h3>
                    <p className="text-[12px] text-[#666666] leading-snug font-sans">
                      {pillar.desc}
                    </p>
                  </div>

                  <div className="mt-3 pt-2 border-t border-black/[0.05] flex items-center justify-between text-[10px] font-mono text-[#888888]">
                    <span>INPUT 0{idx + 1}</span>
                    <span className="text-black font-bold">✓</span>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Pure-Black Downward Arrow SVG Connector (1.4px) */}
          <div className="my-6 flex flex-col items-center">
            <svg width="2" height="42" className="overflow-visible">
              <defs>
                <marker
                  id="pow-down-arrow"
                  viewBox="0 0 6 6"
                  refX="3"
                  refY="5"
                  markerWidth="4"
                  markerHeight="4"
                  orient="auto"
                >
                  <path d="M 0 1 L 3 5 L 6 1 Z" fill="#000000" />
                </marker>
              </defs>
              <line
                x1="1"
                y1="0"
                x2="1"
                y2="34"
                stroke="#000000"
                strokeWidth="1.4"
                strokeLinecap="round"
                markerEnd="url(#pow-down-arrow)"
              />
            </svg>
          </div>

          {/* Result Card: VERIFIED PROJECT with restrained cyan/blue verification accent */}
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="w-full max-w-md p-5 sm:p-6 rounded-2xl bg-white border-2 border-black shadow-[0_4px_20px_rgba(0,0,0,0.06)] flex items-center justify-between gap-4 relative overflow-hidden"
          >
            {/* Subtle restrained cyan-blue top accent border */}
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#00F0FF] via-[#2563EB] to-[#8B5CF6]" />

            <div className="flex items-center gap-3.5">
              <div className="w-11 h-11 rounded-xl bg-[#111111] text-white flex items-center justify-center relative">
                <CheckCircle2 size={22} className="text-[#00F0FF]" />
              </div>
              <div>
                <span className="text-[10px] font-['Manrope',sans-serif] uppercase tracking-wider text-[#666666] font-semibold block">
                  AUTHENTICATED OUTCOME
                </span>
                <span className="text-[17px] sm:text-[18px] font-bold text-[#111111] font-['Manrope',sans-serif] tracking-tight">
                  VERIFIED PROJECT
                </span>
              </div>
            </div>

            <span className="px-2.5 py-1 rounded-full bg-white border border-[#2563EB]/40 text-[11px] font-['Manrope',sans-serif] font-bold text-[#2563EB] shadow-2xs">
              PASSED ✓
            </span>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ProofOfWorkSection;
