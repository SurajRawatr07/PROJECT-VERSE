import React from 'react';
import { motion } from 'motion/react';
import { 
  FileText, 
  GitCommit, 
  UserCheck, 
  Landmark, 
  ShieldCheck, 
  CheckCircle2,
  Plus,
  Equal
} from 'lucide-react';

interface ChainItem {
  title: string;
  sub: string;
  icon: React.ReactNode;
}

const CHAIN_ITEMS: ChainItem[] = [
  {
    title: 'GitHub Activity',
    sub: 'Commits & PRs',
    icon: (
      <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
      </svg>
    ),
  },
  {
    title: 'Documentation',
    sub: 'Architecture docs',
    icon: <FileText size={20} />,
  },
  {
    title: 'Contributions',
    sub: 'Author lines',
    icon: <GitCommit size={20} />,
  },
  {
    title: 'Faculty Review',
    sub: 'Academic rubric',
    icon: <UserCheck size={20} />,
  },
  {
    title: 'Institution Validation',
    sub: 'Accredited record',
    icon: <Landmark size={20} />,
  },
];

export const ProofOfWorkSection: React.FC = () => {
  return (
    <section 
      id="proof-of-work" 
      className="relative w-full py-20 sm:py-28 px-4 sm:px-6 bg-white border-t border-black/[0.06] select-none"
    >
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14 sm:mb-20">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/[0.04] text-[11px] font-mono uppercase tracking-widest text-[#4A4A4A] mb-3">
            Academic Validation Chain
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#111111] font-normal tracking-[-0.01em] leading-tight">
            Show What Was Actually Built.
          </h2>
          <p className="mt-3 text-[14.5px] sm:text-[15.5px] text-[#666666] font-sans">
            Replace self-proclaimed resumes with verifiable technical evidence and faculty review.
          </p>
        </div>

        {/* ========================================================================= */}
        {/* VERIFICATION CHAIN EQUATION */}
        {/* GitHub + Docs + Contributions + Faculty + Institution = VERIFIED PROJECT */}
        {/* ========================================================================= */}
        <div className="flex flex-col lg:flex-row items-center justify-center gap-3 sm:gap-4 max-w-5xl mx-auto">
          {CHAIN_ITEMS.map((item, idx) => (
            <React.Fragment key={item.title}>
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                whileHover={{ y: -3 }}
                className="w-full sm:w-44 p-4 sm:p-5 rounded-2xl bg-[#FAFAF8] border border-black/[0.08] shadow-[0_2px_8px_rgba(0,0,0,0.02)] flex flex-col items-center text-center group"
              >
                <div className="w-10 h-10 rounded-xl bg-white border border-black/[0.08] flex items-center justify-center text-[#111111] group-hover:bg-[#111111] group-hover:text-white transition-colors duration-200 mb-2.5">
                  {item.icon}
                </div>
                <div className="text-[13px] font-semibold text-[#111111] font-sans leading-tight">
                  {item.title}
                </div>
                <div className="text-[10.5px] text-[#777777] font-sans mt-0.5">
                  {item.sub}
                </div>
              </motion.div>

              {/* Plus Sign (between items) */}
              <div className="hidden lg:flex items-center justify-center text-black/25">
                <Plus size={16} />
              </div>
            </React.Fragment>
          ))}

          {/* Equal Sign */}
          <div className="hidden lg:flex items-center justify-center text-black/25">
            <Equal size={20} />
          </div>

          {/* = VERIFIED PROJECT CARD */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: 0.45 }}
            whileHover={{ scale: 1.03 }}
            className="w-full sm:w-52 p-4 sm:p-5 rounded-2xl bg-emerald-50/70 border border-emerald-300/80 shadow-[0_4px_16px_rgba(16,185,129,0.08)] flex flex-col items-center text-center group"
          >
            <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center shadow-xs mb-2.5">
              <ShieldCheck size={22} />
            </div>
            <div className="text-[13.5px] font-bold text-emerald-950 font-sans leading-tight">
              VERIFIED PROJECT
            </div>
            <div className="text-[10.5px] text-emerald-700 font-mono mt-0.5">
              Proof-of-Work
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ProofOfWorkSection;
