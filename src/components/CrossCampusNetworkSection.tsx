import React from 'react';
import { motion } from 'motion/react';
import { Building2, ArrowRight, GitMerge, Compass, Sparkles, FolderGit2 } from 'lucide-react';
import { ProjectVerseLogo } from './ProjectVerseLogo';

const CAMPUSES = [
  {
    id: 'campus-a',
    name: 'Campus A',
    institution: 'Graphic Era University',
    role: 'Origin & Core MVP',
    pos: 'top-0 left-4 sm:left-12',
  },
  {
    id: 'campus-b',
    name: 'Campus B',
    institution: 'IIT Delhi',
    role: 'ML & Research Cohort',
    pos: 'top-0 right-4 sm:right-12',
  },
  {
    id: 'campus-c',
    name: 'Campus C',
    institution: 'BITS Pilani',
    role: 'Performance Optimization',
    pos: 'bottom-0 left-4 sm:left-12',
  },
  {
    id: 'campus-d',
    name: 'Campus D',
    institution: 'NIT Trichy',
    role: 'Continuation & Deployment',
    pos: 'bottom-0 right-4 sm:right-12',
  },
];

const CONCEPT_FLOW = ['Discover', 'Improve', 'Share', 'Continue'];

export const CrossCampusNetworkSection: React.FC = () => {
  return (
    <section 
      id="cross-campus" 
      className="relative w-full py-20 sm:py-28 px-4 sm:px-6 bg-[#FAFAF8] border-t border-black/[0.06] select-none overflow-hidden"
    >
      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/[0.04] text-[11px] font-mono uppercase tracking-widest text-[#4A4A4A] mb-3">
            Inter-Institutional Network
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#111111] font-normal tracking-[-0.01em] leading-tight">
            One Project. Many Campuses.
          </h2>
          <p className="mt-3 text-[14.5px] sm:text-[15.5px] text-[#666666] font-sans">
            Valuable work scales beyond institutional walls through cross-campus collaboration.
          </p>
        </div>

        {/* Concept Flow Banner: Discover → Improve → Share → Continue */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4 mb-12 sm:mb-16">
          {CONCEPT_FLOW.map((step, idx) => (
            <React.Fragment key={step}>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-black/[0.08] shadow-2xs text-[12.5px] sm:text-[13px] font-medium text-[#111111] font-sans">
                <span className="w-1.5 h-1.5 rounded-full bg-[#111111]" />
                <span>{step}</span>
              </div>
              {idx < CONCEPT_FLOW.length - 1 && (
                <ArrowRight size={14} className="text-[#999999]" />
              )}
            </React.Fragment>
          ))}
        </div>

        {/* ========================================================================= */}
        {/* VISUAL DIAGRAM: Center ONE PROJECT, surrounded by 4 Campuses */}
        {/* ========================================================================= */}
        <div className="relative w-full max-w-2xl mx-auto h-[400px] sm:h-[440px] flex items-center justify-center">
          {/* Subtle Directional SVG Arrows */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none -z-0">
            {/* Top-Left to Center */}
            <line x1="24%" y1="20%" x2="44%" y2="44%" stroke="rgba(0,0,0,0.12)" strokeWidth="1.5" strokeDasharray="4 4" />
            {/* Top-Right to Center */}
            <line x1="76%" y1="20%" x2="56%" y2="44%" stroke="rgba(0,0,0,0.12)" strokeWidth="1.5" strokeDasharray="4 4" />
            {/* Bottom-Left to Center */}
            <line x1="24%" y1="80%" x2="44%" y2="56%" stroke="rgba(0,0,0,0.12)" strokeWidth="1.5" strokeDasharray="4 4" />
            {/* Bottom-Right to Center */}
            <line x1="76%" y1="80%" x2="56%" y2="56%" stroke="rgba(0,0,0,0.12)" strokeWidth="1.5" strokeDasharray="4 4" />
          </svg>

          {/* Center: ONE PROJECT */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="relative z-20 flex flex-col items-center justify-center w-36 h-36 sm:w-44 sm:h-44 rounded-3xl bg-white border-2 border-black/[0.12] shadow-[0_12px_36px_rgba(0,0,0,0.06)] p-4 text-center group cursor-default"
          >
            <div className="w-10 h-10 rounded-2xl bg-[#111111] text-white flex items-center justify-center mb-2 shadow-2xs">
              <FolderGit2 size={20} />
            </div>
            <div className="font-serif text-[15px] sm:text-[16px] font-medium text-[#111111] leading-tight">
              ONE PROJECT
            </div>
            <span className="text-[10px] sm:text-[11px] font-mono text-[#666666] mt-1">
              Shared Codebase
            </span>
          </motion.div>

          {/* 4 Orbiting Campuses */}
          {CAMPUSES.map((campus, idx) => (
            <motion.div
              key={campus.id}
              initial={{ opacity: 0, scale: 0.88 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: 0.15 + idx * 0.08 }}
              whileHover={{ scale: 1.04 }}
              className={`absolute ${campus.pos} z-20 w-44 sm:w-52 p-3 sm:p-3.5 rounded-2xl bg-white border border-black/[0.08] shadow-[0_4px_16px_rgba(0,0,0,0.04)] hover:border-black/20 hover:shadow-[0_8px_24px_rgba(0,0,0,0.06)] transition-all duration-200 cursor-default`}
            >
              <div className="flex items-center gap-2 mb-1">
                <div className="w-6 h-6 rounded-lg bg-[#F7F7F5] flex items-center justify-center text-[#111111] shrink-0">
                  <Building2 size={13} />
                </div>
                <span className="text-[12px] font-semibold text-[#111111] font-sans">
                  {campus.name}
                </span>
              </div>
              <div className="text-[11px] text-[#444444] font-medium truncate font-sans">
                {campus.institution}
              </div>
              <div className="text-[10px] text-[#777777] font-mono mt-0.5 truncate">
                {campus.role}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CrossCampusNetworkSection;
