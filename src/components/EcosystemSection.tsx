import React from 'react';
import { motion } from 'motion/react';
import { 
  GraduationCap, 
  FolderGit2, 
  UserCheck, 
  Award, 
  Building2, 
  Landmark,
  Search,
  Users,
  ShieldCheck,
  Archive,
  GitFork
} from 'lucide-react';
import { ProjectVerseLogo } from './ProjectVerseLogo';

interface EcosystemNode {
  title: string;
  sub: string;
  icon: React.ComponentType<{ className?: string; size?: number }>;
  position: string;
}

const NODES: EcosystemNode[] = [
  { title: 'Students', sub: 'Builders & contributors', icon: GraduationCap, position: 'top-0 left-1/2 -translate-x-1/2' },
  { title: 'Projects', sub: 'Living codebases', icon: FolderGit2, position: 'top-[22%] right-2 sm:right-6 md:right-10' },
  { title: 'Faculty', sub: 'Academic evaluators', icon: UserCheck, position: 'bottom-[22%] right-2 sm:right-6 md:right-10' },
  { title: 'Institutions', sub: 'Accredited campuses', icon: Landmark, position: 'bottom-0 left-1/2 -translate-x-1/2' },
  { title: 'HODs', sub: 'Department governance', icon: Building2, position: 'bottom-[22%] left-2 sm:left-6 md:left-10' },
  { title: 'Mentors', sub: 'Domain specialists', icon: Award, position: 'top-[22%] left-2 sm:left-6 md:left-10' },
];

const PILLARS = [
  { label: 'Discover', icon: Search },
  { label: 'Collaborate', icon: Users },
  { label: 'Verify', icon: ShieldCheck },
  { label: 'Preserve', icon: Archive },
  { label: 'Continue', icon: GitFork },
];

export const EcosystemSection: React.FC = () => {
  return (
    <section 
      id="ecosystem" 
      className="relative w-full py-20 sm:py-28 px-4 sm:px-6 bg-white border-t border-black/[0.06] overflow-hidden select-none"
    >
      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/[0.04] text-[11px] font-mono uppercase tracking-widest text-[#4A4A4A] mb-3">
            Unified Platform Ecosystem
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#111111] font-normal tracking-[-0.01em] leading-tight">
            ProjectVerse connects the missing pieces.
          </h2>
          <p className="mt-3 text-[15px] sm:text-[16px] text-[#666666] font-sans">
            A single collaborative network where work, identity, and academic oversight converge.
          </p>
        </div>

        {/* ========================================================================= */}
        {/* LARGE VISUAL ECOSYSTEM DIAGRAM */}
        {/* ========================================================================= */}
        <div className="relative w-full max-w-3xl mx-auto h-[480px] sm:h-[540px] md:h-[580px] flex items-center justify-center">
          {/* Subtle Concentric Rings */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-[280px] sm:w-[360px] md:w-[420px] h-[280px] sm:h-[360px] md:h-[420px] rounded-full border border-black/[0.05]" />
            <div className="absolute w-[440px] sm:w-[500px] md:w-[560px] h-[440px] sm:h-[500px] md:h-[560px] rounded-full border border-black/[0.03] border-dashed" />
          </div>

          {/* SVG Animated Connector Spokes from Center */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none -z-0">
            <line x1="50%" y1="50%" x2="50%" y2="8%" stroke="rgba(0,0,0,0.1)" strokeWidth="1.5" strokeDasharray="3 3" />
            <line x1="50%" y1="50%" x2="84%" y2="28%" stroke="rgba(0,0,0,0.1)" strokeWidth="1.5" strokeDasharray="3 3" />
            <line x1="50%" y1="50%" x2="84%" y2="72%" stroke="rgba(0,0,0,0.1)" strokeWidth="1.5" strokeDasharray="3 3" />
            <line x1="50%" y1="50%" x2="50%" y2="92%" stroke="rgba(0,0,0,0.1)" strokeWidth="1.5" strokeDasharray="3 3" />
            <line x1="50%" y1="50%" x2="16%" y2="72%" stroke="rgba(0,0,0,0.1)" strokeWidth="1.5" strokeDasharray="3 3" />
            <line x1="50%" y1="50%" x2="16%" y2="28%" stroke="rgba(0,0,0,0.1)" strokeWidth="1.5" strokeDasharray="3 3" />
          </svg>

          {/* Center Hub: PROJECTVERSE */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-20 flex flex-col items-center justify-center w-36 h-36 sm:w-44 sm:h-44 rounded-full bg-white border-2 border-black/[0.12] shadow-[0_12px_40px_rgba(0,0,0,0.08)] p-4 text-center group cursor-default"
          >
            <div className="w-10 h-10 rounded-2xl bg-[#111111] text-white flex items-center justify-center mb-2 shadow-sm">
              <ProjectVerseLogo size={20} color="#FFFFFF" />
            </div>
            <div className="font-serif text-[14px] sm:text-[15px] font-medium tracking-tight text-[#111111] leading-none">
              PROJECT VERSE
            </div>
            <span className="text-[10px] sm:text-[10.5px] font-mono text-[#666666] mt-1 uppercase tracking-wider">
              Core Engine
            </span>
          </motion.div>

          {/* 6 Peripheral Orbiting Nodes */}
          {NODES.map((node, i) => {
            const Icon = node.icon;
            return (
              <motion.div
                key={node.title}
                initial={{ opacity: 0, scale: 0.85 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: 0.1 + i * 0.08 }}
                whileHover={{ scale: 1.05 }}
                className={`absolute ${node.position} z-20 flex items-center gap-2.5 px-3.5 py-2.5 rounded-2xl bg-white/95 backdrop-blur-xs border border-black/[0.09] shadow-[0_4px_16px_rgba(0,0,0,0.04)] hover:border-black/25 hover:shadow-[0_8px_24px_rgba(0,0,0,0.08)] transition-all duration-200 cursor-default`}
              >
                <div className="w-8 h-8 rounded-xl bg-[#F7F7F5] border border-black/[0.06] flex items-center justify-center text-[#111111] shrink-0">
                  <Icon size={16} />
                </div>
                <div className="text-left">
                  <div className="text-[13px] sm:text-[13.5px] font-semibold text-[#111111] leading-tight font-sans">
                    {node.title}
                  </div>
                  <div className="text-[10px] sm:text-[11px] text-[#737373] hidden sm:block font-sans whitespace-nowrap">
                    {node.sub}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* 5 Core Actions Beneath Ecosystem: Discover • Collaborate • Verify • Preserve • Continue */}
        <div className="mt-6 pt-8 border-t border-black/[0.06]">
          <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3">
            {PILLARS.map((pillar) => {
              const Icon = pillar.icon;
              return (
                <div
                  key={pillar.label}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#FAFAF8] border border-black/[0.07] text-[#111111] text-[12.5px] sm:text-[13px] font-medium font-sans"
                >
                  <Icon size={14} className="text-[#666666]" />
                  <span>{pillar.label}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default EcosystemSection;
