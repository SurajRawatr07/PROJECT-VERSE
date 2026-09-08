import React from 'react';
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

interface NodeData {
  id: string;
  title: string;
  sub: string;
  icon: React.ComponentType<{ className?: string; size?: number }>;
  // Coordinates in 640x440 viewBox
  x: number;
  y: number;
  // Offset angle for line endpoint calculation
  angle: number;
}

const NODES: NodeData[] = [
  { id: 'students', title: 'STUDENTS', sub: 'Project builders', icon: GraduationCap, x: 320, y: 44, angle: -90 },
  { id: 'projects', title: 'PROJECTS', sub: 'Living codebases', icon: FolderGit2, x: 524, y: 124, angle: -30 },
  { id: 'faculty', title: 'FACULTY', sub: 'Academic evaluators', icon: UserCheck, x: 524, y: 316, angle: 30 },
  { id: 'institutions', title: 'INSTITUTIONS', sub: 'Campus governance', icon: Landmark, x: 320, y: 396, angle: 90 },
  { id: 'hods', title: 'HODs', sub: 'Department leaders', icon: Building2, x: 116, y: 316, angle: 150 },
  { id: 'mentors', title: 'MENTORS', sub: 'Domain advisors', icon: Award, x: 116, y: 124, angle: -150 },
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
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-black/[0.04] text-[11px] font-['Manrope',sans-serif] font-semibold uppercase tracking-widest text-[#333333] mb-3">
            ECOSYSTEM ARCHITECTURE
          </div>
          <h2 className="font-serif text-[30px] sm:text-[36px] md:text-[44px] text-[#111111] font-normal tracking-[-0.015em] leading-tight">
            Connecting every stakeholder into one verified lifecycle.
          </h2>
          <p className="mt-3 text-[15px] sm:text-[16px] text-[#555555] font-sans max-w-xl mx-auto leading-relaxed">
            ProjectVerse unifies academic projects, contributors, reviews, and institutions in an interconnected infrastructure.
          </p>
        </div>

        {/* ========================================================================= */}
        {/* DESKTOP & TABLET: Interactive Animated SVG Architecture Diagram */}
        {/* Thin Pure Black Connectors (1.35px), Minimal Geometric Arrowheads */}
        {/* Sequential Animation: Center -> Connector 1 -> Node 1 -> ... */}
        {/* ========================================================================= */}
        <div className="hidden md:block relative w-full max-w-3xl mx-auto h-[460px]">
          <svg 
            className="absolute inset-0 w-full h-full pointer-events-none" 
            viewBox="0 0 640 440" 
            fill="none"
          >
            <defs>
              {/* Minimal, geometric, proportionate black arrowhead */}
              <marker
                id="eco-black-arrow"
                viewBox="0 0 6 6"
                refX="5"
                refY="3"
                markerWidth="4.5"
                markerHeight="4.5"
                orient="auto-start-reverse"
              >
                <path d="M 0 1 L 5 3 L 0 5 Z" fill="#000000" />
              </marker>
            </defs>

            {/* Sequential Connector Lines: Center (320, 220) to Each Node */}
            {NODES.map((node, i) => {
              // Calculate center boundary offset and node target offset to prevent line overlap
              const rad = (node.angle * Math.PI) / 180;
              const startX = 320 + Math.cos(rad) * 62;
              const startY = 220 + Math.sin(rad) * 36;
              const endX = node.x - Math.cos(rad) * 58;
              const endY = node.y - Math.sin(rad) * 26;

              const lineDelay = 0.35 + i * 0.28;
              const lineDuration = 0.38;

              return (
                <g key={node.id}>
                  {/* Pure Black Thin Connector (1.35px) */}
                  <motion.line
                    x1={startX}
                    y1={startY}
                    x2={endX}
                    y2={endY}
                    stroke="#000000"
                    strokeWidth="1.35"
                    strokeLinecap="round"
                    markerEnd="url(#eco-black-arrow)"
                    initial={{ pathLength: 0, opacity: 0 }}
                    whileInView={{ pathLength: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: lineDuration,
                      delay: lineDelay,
                      ease: [0.25, 1, 0.5, 1],
                    }}
                  />

                  {/* Optional subtle moving black dot during draw */}
                  <motion.circle
                    r="2"
                    fill="#000000"
                    initial={{ cx: startX, cy: startY, opacity: 0 }}
                    whileInView={{
                      cx: [startX, endX],
                      cy: [startY, endY],
                      opacity: [0, 1, 0],
                    }}
                    viewport={{ once: true }}
                    transition={{
                      duration: lineDuration,
                      delay: lineDelay,
                      ease: 'easeInOut',
                    }}
                  />
                </g>
              );
            })}
          </svg>

          {/* Center Hub: PROJECTVERSE (Appears at t=0) */}
          <motion.div
            initial={{ scale: 0.92, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 flex flex-col items-center justify-center w-40 h-24 rounded-2xl bg-white border border-black shadow-[0_2px_12px_rgba(0,0,0,0.06)] p-3 text-center cursor-default"
          >
            <div className="mb-1.5">
              <ProjectVerseWordmark
                height={16}
                theme="light"
                animated={false}
                interactiveHover={false}
              />
            </div>
            <span className="text-[9.5px] font-['Manrope',sans-serif] text-[#555555] font-semibold uppercase tracking-wider">
              Core Platform
            </span>
          </motion.div>

          {/* 6 Peripheral Orbiting Nodes (Sequential reveal after line draws) */}
          {NODES.map((node, i) => {
            const Icon = node.icon;
            const nodeDelay = 0.48 + i * 0.28;

            return (
              <motion.div
                key={node.id}
                initial={{ opacity: 0, scale: 0.94 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: nodeDelay, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  left: `${node.x}px`,
                  top: `${node.y}px`,
                  transform: 'translate(-50%, -50%)',
                }}
                className="absolute z-20 flex items-center gap-2.5 px-3.5 py-2 rounded-xl bg-white border border-black/[0.1] shadow-[0_1px_4px_rgba(0,0,0,0.03)] hover:border-black hover:shadow-[0_4px_12px_rgba(0,0,0,0.06)] hover:-translate-y-0.5 transition-all duration-200 cursor-default"
              >
                <div className="w-7 h-7 rounded-lg bg-[#F7F7F5] border border-black/[0.06] flex items-center justify-center text-[#111111] shrink-0">
                  <Icon size={15} />
                </div>
                <div className="text-left">
                  <div className="text-[12px] font-['Manrope',sans-serif] font-bold text-[#111111] leading-none tracking-tight">
                    {node.title}
                  </div>
                  <div className="text-[10px] text-[#666666] font-sans mt-0.5 whitespace-nowrap">
                    {node.sub}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* ========================================================================= */}
        {/* MOBILE: Clean Vertical Network Architecture */}
        {/* Avoids cramped coordinates, preserves thin black SVG connectors */}
        {/* ========================================================================= */}
        <div className="block md:hidden max-w-sm mx-auto">
          {/* Mobile Center Hub */}
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="flex flex-col items-center justify-center p-3.5 rounded-2xl bg-white border border-black shadow-sm text-center mb-6"
          >
            <ProjectVerseWordmark height={16} theme="light" animated={false} interactiveHover={false} />
            <span className="text-[9.5px] font-['Manrope',sans-serif] text-[#555555] font-semibold uppercase tracking-wider mt-1.5">
              Core Platform
            </span>
          </motion.div>

          {/* Connected Stakeholders Grid with Thin Black Connectors */}
          <div className="relative pl-6 space-y-3.5 border-l-[1.35px] border-black ml-4">
            {NODES.map((node, idx) => {
              const Icon = node.icon;
              return (
                <motion.div
                  key={node.id}
                  initial={{ opacity: 0, x: -6 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.35, delay: 0.15 + idx * 0.08 }}
                  className="relative flex items-center gap-3 p-3 rounded-xl bg-white border border-black/[0.09] shadow-sm"
                >
                  {/* Thin horizontal connector dot to main branch */}
                  <span className="absolute -left-[30.5px] top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-black" />
                  
                  <div className="w-8 h-8 rounded-lg bg-[#F7F7F5] border border-black/[0.06] flex items-center justify-center text-[#111111] shrink-0">
                    <Icon size={16} />
                  </div>
                  <div>
                    <div className="text-[13px] font-['Manrope',sans-serif] font-bold text-[#111111] leading-none">
                      {node.title}
                    </div>
                    <div className="text-[11px] text-[#666666] font-sans mt-0.5">
                      {node.sub}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default EcosystemSection;
