import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  ArrowRight, 
  Compass, 
  Search, 
  Users, 
  Code2, 
  ShieldCheck, 
  FileBadge, 
  GitFork 
} from 'lucide-react';
import { ProjectVerseWordmark } from './ProjectVerseWordmark';

interface HeroProps {
  onExploreClick: () => void;
  onGetStartedClick: () => void;
}

interface StageItem {
  id: string;
  number: string;
  label: string;
  sub: string;
  icon: React.ComponentType<{ className?: string; size?: number }>;
}

const FLOW_STAGES: StageItem[] = [
  { id: 'discover', number: '01', label: 'DISCOVER', sub: 'Cross-campus', icon: Search },
  { id: 'connect', number: '02', label: 'CONNECT', sub: 'Teammates & guides', icon: Users },
  { id: 'build', number: '03', label: 'BUILD', sub: 'Active repository', icon: Code2 },
  { id: 'verify', number: '04', label: 'VERIFY', sub: 'Faculty rubric', icon: ShieldCheck },
  { id: 'preserve', number: '05', label: 'PRESERVE', sub: 'Project passport', icon: FileBadge },
  { id: 'continue', number: '06', label: 'CONTINUE', sub: 'Next cohort', icon: GitFork },
];

export const Hero: React.FC<HeroProps> = ({
  onExploreClick,
  onGetStartedClick,
}) => {
  const [activeStage, setActiveStage] = useState<number>(0);

  // Progressive travel sequence for the pure-black flowchart indicator
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveStage((prev) => (prev + 1) % FLOW_STAGES.length);
    }, 2200);
    return () => clearInterval(timer);
  }, []);

  return (
    <section 
      id="home" 
      className="relative w-full min-h-[90vh] flex flex-col items-center justify-center bg-white pt-28 sm:pt-36 pb-16 sm:pb-24 px-4 sm:px-6 select-none"
    >
      <div className="w-full max-w-5xl mx-auto flex flex-col items-center text-center">
        {/* Top Hero Brand Lockup: Custom ProjectVerse Wordmark Identity */}
        <motion.div
          initial={{ opacity: 0, y: -8, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center mb-6 sm:mb-8"
        >
          <div className="hidden sm:block">
            <ProjectVerseWordmark
              height={34}
              color="#111111"
              animated={false}
              interactiveHover={false}
            />
          </div>
          <div className="block sm:hidden">
            <ProjectVerseWordmark
              height={26}
              color="#111111"
              animated={false}
              interactiveHover={false}
            />
          </div>

          <div className="mt-3 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F5F5F3] border border-black/[0.08] font-['Manrope',sans-serif]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#111111]" />
            <span className="text-[10.5px] font-semibold tracking-wider uppercase text-[#333333]">
              STUDENT PROJECT INFRASTRUCTURE
            </span>
          </div>
        </motion.div>

        {/* Main Heading: 56–64px desktop / 36–42px mobile in Instrument Serif */}
        <motion.h1
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.08 }}
          className="font-serif text-[36px] sm:text-[42px] md:text-[56px] lg:text-[64px] text-[#111111] font-normal tracking-[-0.015em] leading-[1.08] max-w-3xl"
        >
          Your Projects Shouldn’t End With Submission.
        </motion.h1>

        {/* Supporting Line: 15–18px desktop / 14–16px mobile in Inter */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.16 }}
          className="mt-5 sm:mt-6 text-[15px] sm:text-[17px] md:text-[18px] text-[#4A4A4A] max-w-[620px] leading-relaxed font-sans"
        >
          Discover, build, verify, and continue academic projects across campuses.
        </motion.p>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: 0.24 }}
          className="mt-8 sm:mt-9 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 w-full sm:w-auto font-['Manrope',sans-serif]"
        >
          <button
            id="hero-explore-btn"
            onClick={onExploreClick}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 sm:px-7 sm:py-3 rounded-full bg-white hover:bg-[#F7F7F5] text-[#111111] border border-black/[0.12] shadow-[0_1px_3px_rgba(0,0,0,0.03)] text-[14px] sm:text-[15px] font-semibold transition-all duration-150 cursor-pointer"
          >
            <Compass className="w-4 h-4 text-[#111111]" />
            <span>Explore ProjectVerse</span>
          </button>

          <button
            id="hero-get-started-btn"
            onClick={onGetStartedClick}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 sm:px-7 sm:py-3 rounded-full bg-[#111111] hover:bg-black text-white text-[14px] sm:text-[15px] font-semibold shadow-[0_2px_8px_rgba(0,0,0,0.1)] active:scale-[0.98] transition-all duration-150 cursor-pointer"
          >
            <span>Get Started</span>
            <ArrowRight className="w-4 h-4 text-white" />
          </button>
        </motion.div>

        {/* Small Credibility Line: Students • Faculty • HODs • Institutions */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.32 }}
          className="mt-8 flex items-center justify-center flex-wrap gap-2 text-[12.5px] sm:text-[13.5px] text-[#666666] font-sans"
        >
          <span className="text-[#222222] font-medium">Students</span>
          <span className="text-black/25">•</span>
          <span className="text-[#222222] font-medium">Faculty</span>
          <span className="text-black/25">•</span>
          <span className="text-[#222222] font-medium">HODs</span>
          <span className="text-black/25">•</span>
          <span className="text-[#222222] font-medium">Institutions</span>
        </motion.div>

        {/* ========================================================================= */}
        {/* HERO VISUAL: REAL PRODUCT FLOW DIAGRAM */}
        {/* DISCOVER → CONNECT → BUILD → VERIFY → PRESERVE → CONTINUE */}
        {/* Pure Black SVG Connectors, 1.5–2px, Clean Geometric Arrowheads */}
        {/* ========================================================================= */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-20px' }}
          transition={{ duration: 0.5, delay: 0.38 }}
          className="w-full mt-14 sm:mt-18 pt-6 border-t border-black/[0.06]"
        >
          <div className="text-[11px] uppercase tracking-widest text-[#666666] font-mono mb-6 text-center">
            System Workflow Architecture
          </div>

          <div className="relative w-full max-w-4xl mx-auto">
            {/* Desktop Pure-Black SVG Connector Spine */}
            <div className="hidden lg:block absolute top-[28px] left-[5%] right-[5%] h-[2px] pointer-events-none -z-0">
              <svg className="w-full h-full overflow-visible" preserveAspectRatio="none">
                <defs>
                  <marker
                    id="hero-black-arrow"
                    markerWidth="6"
                    markerHeight="6"
                    refX="5"
                    refY="3"
                    orient="auto"
                  >
                    <path d="M0,0 L6,3 L0,6 Z" fill="#000000" />
                  </marker>
                </defs>
                <line
                  x1="0%"
                  y1="50%"
                  x2="100%"
                  y2="50%"
                  stroke="#000000"
                  strokeWidth="1.75"
                  strokeLinecap="round"
                  strokeDasharray="4 4"
                />
              </svg>
            </div>

            {/* 6 Stage Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-3.5 relative z-10">
              {FLOW_STAGES.map((stage, idx) => {
                const Icon = stage.icon;
                const isCurrent = activeStage === idx;
                return (
                  <motion.div
                    key={stage.id}
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.35,
                      delay: 0.4 + idx * 0.07,
                    }}
                    className={`flex flex-col items-center p-3 sm:p-3.5 rounded-2xl bg-white border transition-all duration-200 ${
                      isCurrent
                        ? 'border-black shadow-[0_4px_16px_rgba(0,0,0,0.08)] -translate-y-1'
                        : 'border-black/[0.09] shadow-[0_1px_4px_rgba(0,0,0,0.02)]'
                    }`}
                  >
                    <div
                      className={`w-9 h-9 rounded-xl flex items-center justify-center mb-2 transition-colors duration-200 ${
                        isCurrent
                          ? 'bg-[#111111] text-white'
                          : 'bg-[#F7F7F5] border border-black/[0.06] text-[#111111]'
                      }`}
                    >
                      <Icon size={18} />
                    </div>

                    <span className="text-[11.5px] sm:text-[12px] font-bold text-[#111111] tracking-wide font-['Manrope',sans-serif]">
                      {stage.label}
                    </span>

                    <span className="text-[10px] text-[#666666] mt-0.5 font-sans whitespace-nowrap">
                      {stage.sub}
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
