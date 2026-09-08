import React from 'react';
import { motion } from 'motion/react';
import { 
  ArrowRight, 
  Compass, 
  FolderGit2, 
  Search, 
  Users, 
  Code2, 
  ShieldCheck, 
  GitFork 
} from 'lucide-react';
import { ProjectVerseLogo } from './ProjectVerseLogo';

interface HeroProps {
  onExploreClick: () => void;
  onGetStartedClick: () => void;
}

interface FlowStep {
  id: string;
  label: string;
  sub: string;
  icon: React.ComponentType<{ className?: string; size?: number }>;
}

const FLOW_STEPS: FlowStep[] = [
  { id: 'project', label: 'PROJECT', sub: 'Academic base', icon: FolderGit2 },
  { id: 'discover', label: 'DISCOVER', sub: 'Cross-campus', icon: Search },
  { id: 'collaborate', label: 'COLLABORATE', sub: 'Inter-team', icon: Users },
  { id: 'build', label: 'BUILD', sub: 'Continuous git', icon: Code2 },
  { id: 'verify', label: 'VERIFY', sub: 'Faculty review', icon: ShieldCheck },
  { id: 'continue', label: 'CONTINUE', sub: 'Next batch', icon: GitFork },
];

export const Hero: React.FC<HeroProps> = ({
  onExploreClick,
  onGetStartedClick,
}) => {
  return (
    <section 
      id="home" 
      className="relative w-full min-h-[92vh] flex flex-col items-center justify-center bg-white pt-28 sm:pt-36 pb-20 sm:pb-24 px-4 sm:px-6 overflow-hidden select-none"
    >
      {/* Very subtle architectural grid background */}
      <div 
        className="absolute inset-0 bg-[linear-gradient(to_right,rgba(0,0,0,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.02)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_40%,#000_70%,transparent_100%)] pointer-events-none" 
      />

      {/* Main Hero Container */}
      <div className="relative z-10 w-full max-w-5xl mx-auto flex flex-col items-center text-center">
        {/* Subtle Brand Pill */}
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: 0.05 }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FAFAFA] border border-black/[0.08] shadow-[0_1px_4px_rgba(0,0,0,0.02)] mb-6 sm:mb-8 font-sans"
        >
          <ProjectVerseLogo size={16} color="#111111" className="text-[#111111]" />
          <span className="text-[11.5px] tracking-wider uppercase text-[#4A4A4A] font-medium">
            Academic Project Infrastructure
          </span>
        </motion.div>

        {/* Main Heading: "Your Projects Shouldn’t End With Submission." */}
        <motion.h1
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.1 }}
          className="font-serif text-[36px] xs:text-[42px] sm:text-[54px] md:text-[64px] lg:text-[72px] text-[#111111] font-normal tracking-[-0.015em] leading-[1.08] sm:leading-[1.1] max-w-3xl"
        >
          Your Projects Shouldn’t End With Submission.
        </motion.h1>

        {/* Supporting Copy */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="mt-5 sm:mt-6 text-[15px] sm:text-[17px] md:text-[18.5px] text-[#4E4E4E] max-w-[620px] leading-relaxed font-sans"
        >
          Discover, build, verify, and continue academic projects across campuses.
        </motion.p>

        {/* Action CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: 0.28 }}
          className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 w-full sm:w-auto font-sans"
        >
          <button
            id="hero-explore-btn"
            onClick={onExploreClick}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-white hover:bg-[#F7F7F5] text-[#111111] border border-black/[0.12] shadow-[0_2px_8px_rgba(0,0,0,0.03)] hover:border-black/25 text-[14px] sm:text-[15px] font-medium transition-all duration-200 cursor-pointer"
          >
            <Compass className="w-4 h-4 text-[#111111]" />
            <span>Explore ProjectVerse</span>
          </button>

          <button
            id="hero-get-started-btn"
            onClick={onGetStartedClick}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3 rounded-full bg-[#111111] hover:bg-black text-white text-[14px] sm:text-[15px] font-medium shadow-[0_4px_14px_rgba(0,0,0,0.12)] hover:shadow-[0_6px_20px_rgba(0,0,0,0.16)] active:scale-[0.98] transition-all duration-200 cursor-pointer"
          >
            <span>Get Started</span>
            <ArrowRight className="w-4 h-4 text-white" />
          </button>
        </motion.div>

        {/* Small Credibility Line: Students • Faculty • HODs • Institutions */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.35 }}
          className="mt-8 sm:mt-10 flex items-center justify-center flex-wrap gap-2 text-[12.5px] sm:text-[13.5px] text-[#737373] font-sans"
        >
          <span className="text-[#333333] font-medium">Students</span>
          <span className="text-black/20">•</span>
          <span className="text-[#333333] font-medium">Faculty</span>
          <span className="text-black/20">•</span>
          <span className="text-[#333333] font-medium">HODs</span>
          <span className="text-black/20">•</span>
          <span className="text-[#333333] font-medium">Institutions</span>
        </motion.div>

        {/* ========================================================================= */}
        {/* HERO VISUAL: ANIMATED PROJECT FLOW VISUALIZATION */}
        {/* PROJECT → DISCOVER → COLLABORATE → BUILD → VERIFY → CONTINUE */}
        {/* ========================================================================= */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.42, ease: [0.16, 1, 0.3, 1] }}
          className="w-full mt-14 sm:mt-20 pt-6 border-t border-black/[0.06]"
        >
          <div className="text-[11px] uppercase tracking-widest text-[#737373] font-mono mb-6 text-center">
            Project Continuity Lifecycle
          </div>

          {/* Flow Cards Grid: Horizontal with Connecting Lines on Desktop, Responsive 2-Col / Stack on Mobile */}
          <div className="relative w-full max-w-4xl mx-auto">
            {/* Desktop Connecting SVG Path */}
            <div className="hidden lg:block absolute top-[28px] left-[6%] right-[6%] h-[2px] -z-0 pointer-events-none">
              <svg className="w-full h-full" preserveAspectRatio="none">
                <line
                  x1="0%"
                  y1="50%"
                  x2="100%"
                  y2="50%"
                  stroke="rgba(0, 0, 0, 0.09)"
                  strokeWidth="2"
                  strokeDasharray="4 4"
                />
              </svg>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4 relative z-10">
              {FLOW_STEPS.map((step, idx) => {
                const Icon = step.icon;
                return (
                  <motion.div
                    key={step.id}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.4,
                      delay: 0.45 + idx * 0.08,
                      ease: [0.21, 0.47, 0.32, 0.98],
                    }}
                    whileHover={{ y: -3 }}
                    className="flex flex-col items-center p-3.5 sm:p-4 rounded-2xl bg-white border border-black/[0.07] shadow-[0_2px_12px_rgba(0,0,0,0.03)] hover:border-black/20 hover:shadow-[0_4px_16px_rgba(0,0,0,0.06)] transition-all duration-200 group"
                  >
                    {/* Icon Circle */}
                    <div className="w-10 h-10 rounded-full bg-[#F7F7F5] border border-black/[0.06] flex items-center justify-center text-[#111111] group-hover:bg-[#111111] group-hover:text-white transition-colors duration-200 mb-2.5">
                      <Icon size={18} />
                    </div>

                    {/* Step Title */}
                    <span className="text-[12px] sm:text-[13px] font-semibold text-[#111111] tracking-wide font-sans">
                      {step.label}
                    </span>

                    {/* Step Subtext */}
                    <span className="text-[10.5px] sm:text-[11px] text-[#737373] mt-0.5 font-sans whitespace-nowrap">
                      {step.sub}
                    </span>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
