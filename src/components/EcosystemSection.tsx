import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  GraduationCap, 
  FolderGit2, 
  UserCheck, 
  Award, 
  Building2, 
  Landmark 
} from 'lucide-react';
import { ProjectVerseWordmark } from './ProjectVerseWordmark';

interface EcosystemNode {
  title: string;
  sub: string;
  icon: React.ComponentType<{ className?: string; size?: number }>;
  coords: { x: number; y: number }; // percentage coords in SVG box
  posClass: string;
}

const NODES: EcosystemNode[] = [
  { title: 'Students', sub: 'Project builders', icon: GraduationCap, coords: { x: 50, y: 10 }, posClass: 'top-2 sm:top-4 left-1/2 -translate-x-1/2' },
  { title: 'Projects', sub: 'Living codebases', icon: FolderGit2, coords: { x: 86, y: 30 }, posClass: 'top-[26%] right-2 sm:right-6 md:right-8' },
  { title: 'Faculty', sub: 'Academic evaluators', icon: UserCheck, coords: { x: 86, y: 70 }, posClass: 'bottom-[26%] right-2 sm:right-6 md:right-8' },
  { title: 'Institutions', sub: 'Campus governance', icon: Landmark, coords: { x: 50, y: 90 }, posClass: 'bottom-2 sm:bottom-4 left-1/2 -translate-x-1/2' },
  { title: 'HODs', sub: 'Department leadership', icon: Building2, coords: { x: 14, y: 70 }, posClass: 'bottom-[26%] left-2 sm:left-6 md:left-8' },
  { title: 'Mentors', sub: 'Domain advisors', icon: Award, coords: { x: 14, y: 30 }, posClass: 'top-[26%] left-2 sm:left-6 md:left-8' },
];

export const EcosystemSection: React.FC = () => {
  const [activeNode, setActiveNode] = useState<number>(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveNode((prev) => (prev + 1) % NODES.length);
    }, 2400);
    return () => clearInterval(timer);
  }, []);

  return (
    <section 
      id="ecosystem" 
      className="relative w-full py-18 sm:py-24 px-4 sm:px-6 bg-white border-t border-black/[0.06] overflow-hidden select-none"
    >
      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/[0.04] text-[11px] font-['Manrope',sans-serif] font-semibold uppercase tracking-wider text-[#555555] mb-3">
            Ecosystem Diagram
          </div>
          <h2 className="font-serif text-[28px] sm:text-[32px] md:text-[40px] text-[#111111] font-normal tracking-[-0.01em] leading-tight">
            ProjectVerse connects the missing pieces.
          </h2>
          <p className="mt-2.5 text-[15px] sm:text-[16px] text-[#555555] font-sans">
            A functional structural map connecting all stakeholders into a unified workflow.
          </p>
        </div>

        {/* ========================================================================= */}
        {/* CLEAN FUNCTIONAL SVG ECOSYSTEM DIAGRAM */}
        {/* All Lines: PURE BLACK (1.5–2px), No colored lines, No glowing network */}
        {/* ========================================================================= */}
        <div className="relative w-full max-w-2xl mx-auto h-[440px] sm:h-[480px] flex items-center justify-center">
          {/* Pure-Black SVG Connector Lines from Center (50%, 50%) to Nodes */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none -z-0" viewBox="0 0 100 100" preserveAspectRatio="none">
            <defs>
              <marker
                id="ecosystem-black-arrow"
                markerWidth="5"
                markerHeight="5"
                refX="4"
                refY="2.5"
                orient="auto"
              >
                <path d="M0,0 L5,2.5 L0,5 Z" fill="#000000" />
              </marker>
            </defs>

            {/* Pure black SVG connector spokes */}
            {NODES.map((node, i) => (
              <motion.line
                key={node.title}
                x1="50"
                y1="50"
                x2={node.coords.x}
                y2={node.coords.y}
                stroke="#000000"
                strokeWidth="1.75"
                strokeLinecap="round"
                strokeDasharray="3 3"
                initial={{ pathLength: 0, opacity: 0 }}
                whileInView={{ pathLength: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 + i * 0.08 }}
              />
            ))}
          </svg>

          {/* Center Hub: PROJECTVERSE (Appears first) */}
          <motion.div
            initial={{ scale: 0.85, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-20 flex flex-col items-center justify-center w-36 h-32 sm:w-44 sm:h-36 rounded-3xl bg-white border-2 border-black shadow-[0_4px_20px_rgba(0,0,0,0.06)] p-3 text-center group cursor-default"
          >
            <div className="mb-2">
              <ProjectVerseWordmark height={18} color="#111111" animated={false} interactiveHover={false} />
            </div>
            <span className="text-[10px] font-['Manrope',sans-serif] text-[#666666] font-semibold uppercase tracking-wider">
              Core Network Hub
            </span>
          </motion.div>

          {/* 6 Peripheral Orbiting Nodes (Sequential reveal) */}
          {NODES.map((node, i) => {
            const Icon = node.icon;
            const isCurrent = activeNode === i;
            return (
              <motion.div
                key={node.title}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.3 + i * 0.07 }}
                className={`absolute ${node.posClass} z-20 flex items-center gap-2.5 px-3 sm:px-3.5 py-2 sm:py-2.5 rounded-2xl bg-white border transition-all duration-200 cursor-default ${
                  isCurrent
                    ? 'border-black shadow-[0_4px_16px_rgba(0,0,0,0.08)] scale-105'
                    : 'border-black/[0.09] shadow-[0_1px_4px_rgba(0,0,0,0.02)]'
                }`}
              >
                <div
                  className={`w-7 h-7 sm:w-8 sm:h-8 rounded-xl flex items-center justify-center shrink-0 transition-colors duration-200 ${
                    isCurrent ? 'bg-[#111111] text-white' : 'bg-[#F7F7F5] border border-black/[0.06] text-[#111111]'
                  }`}
                >
                  <Icon size={16} />
                </div>
                <div className="text-left">
                  <div className="text-[12.5px] sm:text-[13px] font-bold text-[#111111] leading-tight font-['Manrope',sans-serif]">
                    {node.title}
                  </div>
                  <div className="text-[10px] sm:text-[10.5px] text-[#666666] hidden sm:block font-sans whitespace-nowrap">
                    {node.sub}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Below Text: “One platform for discovering, building, verifying, and continuing student projects.” */}
        <div className="mt-8 text-center border-t border-black/[0.06] pt-6">
          <p className="text-[14px] sm:text-[15px] font-sans font-medium text-[#333333]">
            One platform for discovering, building, verifying, and continuing student projects.
          </p>
        </div>
      </div>
    </section>
  );
};

export default EcosystemSection;
