import React from 'react';
import { motion } from 'motion/react';
import { 
  Building2, 
  GraduationCap, 
  Users, 
  FolderGit2,
  UserCheck
} from 'lucide-react';
import { ProjectVerseLogo } from './ProjectVerseLogo';

export const CrossCampusNetworkSection: React.FC = () => {
  const prefersReducedMotion = 
    typeof window !== 'undefined' && 
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const baseLineDuration = prefersReducedMotion ? 0 : 0.38;
  const baseArrowDuration = prefersReducedMotion ? 0 : 0.18;

  return (
    <section 
      id="cross-campus" 
      className="relative w-full py-16 sm:py-20 md:py-24 px-4 sm:px-6 bg-[#FFFFFF] border-t border-black/8 font-serif overflow-hidden"
    >
      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16 font-sans">
          <span className="text-[11px] sm:text-[12px] uppercase tracking-[0.2em] text-[#737373] font-bold block mb-2.5">
            CROSS-CAMPUS ECOSYSTEM
          </span>
          <h2 className="text-[32px] sm:text-[40px] md:text-[48px] text-[#111111] font-normal font-display-heading tracking-normal leading-[1.1]">
            One Project. Many Campuses.
          </h2>
          <p className="text-[15px] sm:text-[16px] text-[#111111] font-medium mt-3 max-w-xl mx-auto leading-relaxed">
            Connect students, ideas and expertise across colleges and universities — and give academic projects a longer life.
          </p>
          <p className="text-[13.5px] sm:text-[14.5px] text-[#555555] mt-2 max-w-2xl mx-auto leading-relaxed">
            Great academic work shouldn't stay inside one classroom. ProjectVerse connects students, faculty and projects across colleges so ideas can be discovered, improved and continued.
          </p>
        </div>

        {/* ========================================================================= */}
        {/* DESKTOP / TABLET VISUALIZATION (Refined Editorial Flow)                   */}
        {/* ========================================================================= */}
        <div className="hidden md:block">
          <div className="relative p-7 lg:p-9 rounded-2xl bg-[#FAFAFA] border border-black/8 shadow-xs">
            <div className="grid grid-cols-12 items-center gap-0 relative z-10">
              
              {/* Left Column (4 cols): Campuses / Origins */}
              <div className="col-span-4 flex flex-col justify-between h-[236px]">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[11px] uppercase tracking-widest text-[#737373] font-bold">
                    Origins & Institutions
                  </span>
                </div>

                {/* College / Campus A */}
                <div className="h-[60px] p-3 rounded-xl bg-white border border-black/8 shadow-2xs flex items-center gap-3 group hover:border-black/20 hover:-translate-y-0.5 transition-all">
                  <div className="w-8 h-8 rounded-lg bg-[#F5F5F3] flex items-center justify-center text-[#111111] shrink-0">
                    <Building2 className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-[13px] font-bold text-[#111111] truncate">College / Campus A</div>
                    <div className="text-[11px] text-[#737373] truncate">Student Projects & Labs</div>
                  </div>
                </div>

                {/* University Campus */}
                <div className="h-[60px] p-3 rounded-xl bg-white border border-black/8 shadow-2xs flex items-center gap-3 group hover:border-black/20 hover:-translate-y-0.5 transition-all">
                  <div className="w-8 h-8 rounded-lg bg-[#F5F5F3] flex items-center justify-center text-[#111111] shrink-0">
                    <GraduationCap className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-[13px] font-bold text-[#111111] truncate">University Campus</div>
                    <div className="text-[11px] text-[#737373] truncate">Engineering & Research</div>
                  </div>
                </div>

                {/* College / Campus B */}
                <div className="h-[60px] p-3 rounded-xl bg-white border border-black/8 shadow-2xs flex items-center gap-3 group hover:border-black/20 hover:-translate-y-0.5 transition-all">
                  <div className="w-8 h-8 rounded-lg bg-[#F5F5F3] flex items-center justify-center text-[#111111] shrink-0">
                    <Building2 className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-[13px] font-bold text-[#111111] truncate">College / Campus B</div>
                    <div className="text-[11px] text-[#737373] truncate">Interdisciplinary Teams</div>
                  </div>
                </div>
              </div>

              {/* Middle-Left Connector (1 col): Converging Curved Connectors with Directional Arrowheads */}
              <div className="col-span-1 h-[236px] flex items-center justify-center relative select-none">
                <svg 
                  className="w-full h-full overflow-visible" 
                  viewBox="0 0 64 236" 
                  preserveAspectRatio="none" 
                  fill="none"
                >
                  {/* Top card (y=30) to Hub upper port (y=86) */}
                  <motion.path
                    d="M 0 30 C 34 30, 26 86, 54 86"
                    stroke="#000000" strokeLinejoin="round"
                    strokeWidth="1.75"
                    strokeLinecap="round"
                    initial={{ pathLength: 0, opacity: 0 }}
                    whileInView={{ pathLength: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: baseLineDuration, ease: [0.16, 1, 0.3, 1] }}
                  />
                  <motion.polygon
                    points="54,82.5 61,86 54,89.5"
                    fill="#000000"
                    initial={{ opacity: 0, x: -3 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{
                      delay: prefersReducedMotion ? 0 : 0.28,
                      duration: baseArrowDuration,
                      ease: 'easeOut'
                    }}
                  />

                  {/* Middle card (y=118) to Hub center port (y=118) */}
                  <motion.path
                    d="M 0 118 L 54 118"
                    stroke="#000000" strokeLinejoin="round"
                    strokeWidth="1.75"
                    strokeLinecap="round"
                    initial={{ pathLength: 0, opacity: 0 }}
                    whileInView={{ pathLength: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{
                      delay: prefersReducedMotion ? 0 : 0.08,
                      duration: baseLineDuration,
                      ease: [0.16, 1, 0.3, 1]
                    }}
                  />
                  <motion.polygon
                    points="54,114.5 61,118 54,121.5"
                    fill="#000000"
                    initial={{ opacity: 0, x: -3 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{
                      delay: prefersReducedMotion ? 0 : 0.36,
                      duration: baseArrowDuration,
                      ease: 'easeOut'
                    }}
                  />

                  {/* Bottom card (y=206) to Hub lower port (y=150) */}
                  <motion.path
                    d="M 0 206 C 34 206, 26 150, 54 150"
                    stroke="#000000" strokeLinejoin="round"
                    strokeWidth="1.75"
                    strokeLinecap="round"
                    initial={{ pathLength: 0, opacity: 0 }}
                    whileInView={{ pathLength: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{
                      delay: prefersReducedMotion ? 0 : 0.16,
                      duration: baseLineDuration,
                      ease: [0.16, 1, 0.3, 1]
                    }}
                  />
                  <motion.polygon
                    points="54,146.5 61,150 54,153.5"
                    fill="#000000"
                    initial={{ opacity: 0, x: -3 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{
                      delay: prefersReducedMotion ? 0 : 0.44,
                      duration: baseArrowDuration,
                      ease: 'easeOut'
                    }}
                  />
                </svg>
              </div>

              {/* Center Column (2 cols): PROJECTVERSE Academic Hub */}
              <div className="col-span-2 h-[236px] flex flex-col items-center justify-center px-1">
                <motion.div 
                  initial={{ scale: 0.97, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: prefersReducedMotion ? 0 : 0.35, ease: 'easeOut' }}
                  className="w-full p-4 rounded-2xl bg-white border-2 border-black/12 shadow-xs flex flex-col items-center text-center relative group hover:border-black/25 transition-all"
                >
                  <div className="w-10 h-10 rounded-xl bg-[#111111] text-white flex items-center justify-center mb-2 shadow-2xs">
                    <ProjectVerseLogo size={22} color="#FFFFFF" />
                  </div>
                  <span className="text-[13.5px] font-bold text-[#111111] tracking-wide">
                    PROJECTVERSE
                  </span>
                  <span className="text-[10px] uppercase tracking-wider text-[#737373] font-bold mt-0.5">
                    Academic Hub
                  </span>
                  <div className="mt-2 pt-2 border-t border-black/8 w-full text-[10.5px] text-[#4A4A4A] leading-tight font-sans">
                    Indexed & Verified
                  </div>
                </motion.div>
              </div>

              {/* Middle-Right Connector (1 col): Diverging Curved Connectors with Directional Arrowheads */}
              <div className="col-span-1 h-[236px] flex items-center justify-center relative select-none">
                <svg 
                  className="w-full h-full overflow-visible" 
                  viewBox="0 0 64 236" 
                  preserveAspectRatio="none" 
                  fill="none"
                >
                  {/* Hub upper port (y=86) to Top Ecosystem Role (y=30) */}
                  <motion.path
                    d="M 6 86 C 34 86, 26 30, 54 30"
                    stroke="#000000" strokeLinejoin="round"
                    strokeWidth="1.75"
                    strokeLinecap="round"
                    initial={{ pathLength: 0, opacity: 0 }}
                    whileInView={{ pathLength: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{
                      delay: prefersReducedMotion ? 0 : 0.12,
                      duration: baseLineDuration,
                      ease: [0.16, 1, 0.3, 1]
                    }}
                  />
                  <motion.polygon
                    points="54,26.5 61,30 54,33.5"
                    fill="#000000"
                    initial={{ opacity: 0, x: -3 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{
                      delay: prefersReducedMotion ? 0 : 0.40,
                      duration: baseArrowDuration,
                      ease: 'easeOut'
                    }}
                  />

                  {/* Hub center port (y=118) to Middle Ecosystem Role (y=118) */}
                  <motion.path
                    d="M 6 118 L 54 118"
                    stroke="#000000" strokeLinejoin="round"
                    strokeWidth="1.75"
                    strokeLinecap="round"
                    initial={{ pathLength: 0, opacity: 0 }}
                    whileInView={{ pathLength: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{
                      delay: prefersReducedMotion ? 0 : 0.20,
                      duration: baseLineDuration,
                      ease: [0.16, 1, 0.3, 1]
                    }}
                  />
                  <motion.polygon
                    points="54,114.5 61,118 54,121.5"
                    fill="#000000"
                    initial={{ opacity: 0, x: -3 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{
                      delay: prefersReducedMotion ? 0 : 0.48,
                      duration: baseArrowDuration,
                      ease: 'easeOut'
                    }}
                  />

                  {/* Hub lower port (y=150) to Bottom Ecosystem Role (y=206) */}
                  <motion.path
                    d="M 6 150 C 34 150, 26 206, 54 206"
                    stroke="#000000" strokeLinejoin="round"
                    strokeWidth="1.75"
                    strokeLinecap="round"
                    initial={{ pathLength: 0, opacity: 0 }}
                    whileInView={{ pathLength: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{
                      delay: prefersReducedMotion ? 0 : 0.28,
                      duration: baseLineDuration,
                      ease: [0.16, 1, 0.3, 1]
                    }}
                  />
                  <motion.polygon
                    points="54,202.5 61,206 54,209.5"
                    fill="#000000"
                    initial={{ opacity: 0, x: -3 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{
                      delay: prefersReducedMotion ? 0 : 0.56,
                      duration: baseArrowDuration,
                      ease: 'easeOut'
                    }}
                  />
                </svg>
              </div>

              {/* Right Column (4 cols): Ecosystem Roles */}
              <div className="col-span-4 flex flex-col justify-between h-[236px]">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[11px] uppercase tracking-widest text-[#737373] font-bold">
                    Ecosystem Roles
                  </span>
                </div>

                {/* Students & Builders */}
                <div className="h-[60px] p-3 rounded-xl bg-white border border-black/8 shadow-2xs flex items-center gap-3 group hover:border-black/20 hover:-translate-y-0.5 transition-all">
                  <div className="w-8 h-8 rounded-lg bg-[#F5F5F3] flex items-center justify-center text-[#111111] shrink-0">
                    <Users className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-[13px] font-bold text-[#111111] truncate">Students & Builders</div>
                    <div className="text-[11px] text-[#737373] truncate">Cross-college collaborators</div>
                  </div>
                </div>

                {/* Academic Projects */}
                <div className="h-[60px] p-3 rounded-xl bg-white border border-black/8 shadow-2xs flex items-center gap-3 group hover:border-black/20 hover:-translate-y-0.5 transition-all">
                  <div className="w-8 h-8 rounded-lg bg-[#F5F5F3] flex items-center justify-center text-[#111111] shrink-0">
                    <FolderGit2 className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-[13px] font-bold text-[#111111] truncate">Academic Projects</div>
                    <div className="text-[11px] text-[#737373] truncate">Lineage beyond submission</div>
                  </div>
                </div>

                {/* Faculty & Mentors */}
                <div className="h-[60px] p-3 rounded-xl bg-white border border-black/8 shadow-2xs flex items-center gap-3 group hover:border-black/20 hover:-translate-y-0.5 transition-all">
                  <div className="w-8 h-8 rounded-lg bg-[#F5F5F3] flex items-center justify-center text-[#111111] shrink-0">
                    <UserCheck className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-[13px] font-bold text-[#111111] truncate">Faculty & Mentors</div>
                    <div className="text-[11px] text-[#737373] truncate">Verify research & cohorts</div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* MOBILE VISUALIZATION (Refined Strict Vertical Flow: 320px–767px)          */}
        {/* ========================================================================= */}
        <div className="block md:hidden">
          <div className="p-4 sm:p-5 rounded-2xl bg-[#FAFAFA] border border-black/8 shadow-xs flex flex-col items-center w-full">
            
            {/* 1. College / Campus A */}
            <div className="w-full max-w-[340px] p-3 rounded-xl bg-white border border-black/8 shadow-2xs flex items-center gap-3 text-left">
              <div className="w-8 h-8 rounded-lg bg-[#F5F5F3] flex items-center justify-center text-[#111111] shrink-0">
                <Building2 className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <div className="text-[12.5px] font-bold text-[#111111] uppercase tracking-wide truncate">
                  College / Campus A
                </div>
                <div className="text-[11px] text-[#737373] truncate">
                  Student Projects & Labs
                </div>
              </div>
            </div>

            {/* Vertical Connector */}
            <div className="flex flex-col items-center justify-center py-1.5 select-none" aria-hidden="true">
              <svg width="12" height="24" viewBox="0 0 12 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <motion.line 
                  x1="6" 
                  y1="0" 
                  x2="6" 
                  y2="16" 
                  stroke="#000000" strokeLinejoin="round" 
                  strokeWidth="1.75" 
                  strokeLinecap="round" 
                  initial={{ pathLength: 0, opacity: 0 }}
                  whileInView={{ pathLength: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: baseLineDuration, ease: [0.16, 1, 0.3, 1] }}
                />
                <motion.polygon 
                  points="2.5,14 6,21 9.5,14" 
                  fill="#000000" 
                  initial={{ opacity: 0, y: -3 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    delay: prefersReducedMotion ? 0 : 0.25,
                    duration: baseArrowDuration,
                    ease: 'easeOut'
                  }}
                />
              </svg>
            </div>

            {/* 2. University Campus */}
            <div className="w-full max-w-[340px] p-3 rounded-xl bg-white border border-black/8 shadow-2xs flex items-center gap-3 text-left">
              <div className="w-8 h-8 rounded-lg bg-[#F5F5F3] flex items-center justify-center text-[#111111] shrink-0">
                <GraduationCap className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <div className="text-[12.5px] font-bold text-[#111111] uppercase tracking-wide truncate">
                  University Campus
                </div>
                <div className="text-[11px] text-[#737373] truncate">
                  Engineering & Research
                </div>
              </div>
            </div>

            {/* Vertical Connector */}
            <div className="flex flex-col items-center justify-center py-1.5 select-none" aria-hidden="true">
              <svg width="12" height="24" viewBox="0 0 12 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <motion.line 
                  x1="6" 
                  y1="0" 
                  x2="6" 
                  y2="16" 
                  stroke="#000000" strokeLinejoin="round" 
                  strokeWidth="1.75" 
                  strokeLinecap="round" 
                  initial={{ pathLength: 0, opacity: 0 }}
                  whileInView={{ pathLength: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: baseLineDuration, ease: [0.16, 1, 0.3, 1] }}
                />
                <motion.polygon 
                  points="2.5,14 6,21 9.5,14" 
                  fill="#000000" 
                  initial={{ opacity: 0, y: -3 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    delay: prefersReducedMotion ? 0 : 0.25,
                    duration: baseArrowDuration,
                    ease: 'easeOut'
                  }}
                />
              </svg>
            </div>

            {/* 3. College / Campus B */}
            <div className="w-full max-w-[340px] p-3 rounded-xl bg-white border border-black/8 shadow-2xs flex items-center gap-3 text-left">
              <div className="w-8 h-8 rounded-lg bg-[#F5F5F3] flex items-center justify-center text-[#111111] shrink-0">
                <Building2 className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <div className="text-[12.5px] font-bold text-[#111111] uppercase tracking-wide truncate">
                  College / Campus B
                </div>
                <div className="text-[11px] text-[#737373] truncate">
                  Interdisciplinary Teams
                </div>
              </div>
            </div>

            {/* Vertical Connector */}
            <div className="flex flex-col items-center justify-center py-1.5 select-none" aria-hidden="true">
              <svg width="12" height="24" viewBox="0 0 12 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <motion.line 
                  x1="6" 
                  y1="0" 
                  x2="6" 
                  y2="16" 
                  stroke="#000000" strokeLinejoin="round" 
                  strokeWidth="1.75" 
                  strokeLinecap="round" 
                  initial={{ pathLength: 0, opacity: 0 }}
                  whileInView={{ pathLength: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: baseLineDuration, ease: [0.16, 1, 0.3, 1] }}
                />
                <motion.polygon 
                  points="2.5,14 6,21 9.5,14" 
                  fill="#000000" 
                  initial={{ opacity: 0, y: -3 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    delay: prefersReducedMotion ? 0 : 0.25,
                    duration: baseArrowDuration,
                    ease: 'easeOut'
                  }}
                />
              </svg>
            </div>

            {/* 4. PROJECTVERSE Academic Hub */}
            <div className="w-full max-w-[340px] p-3.5 rounded-xl bg-white border-2 border-black/15 shadow-xs flex items-center gap-3 text-left">
              <div className="w-9 h-9 rounded-xl bg-[#111111] text-white flex items-center justify-center shrink-0 shadow-2xs">
                <ProjectVerseLogo size={20} color="#FFFFFF" />
              </div>
              <div className="min-w-0">
                <div className="text-[13.5px] font-bold text-[#111111] tracking-wide truncate">
                  PROJECTVERSE
                </div>
                <div className="text-[11px] text-[#737373] truncate">
                  Connected Platform & Academic Hub
                </div>
              </div>
            </div>

            {/* Vertical Connector */}
            <div className="flex flex-col items-center justify-center py-1.5 select-none" aria-hidden="true">
              <svg width="12" height="24" viewBox="0 0 12 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <motion.line 
                  x1="6" 
                  y1="0" 
                  x2="6" 
                  y2="16" 
                  stroke="#000000" strokeLinejoin="round" 
                  strokeWidth="1.75" 
                  strokeLinecap="round" 
                  initial={{ pathLength: 0, opacity: 0 }}
                  whileInView={{ pathLength: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: baseLineDuration, ease: [0.16, 1, 0.3, 1] }}
                />
                <motion.polygon 
                  points="2.5,14 6,21 9.5,14" 
                  fill="#000000" 
                  initial={{ opacity: 0, y: -3 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    delay: prefersReducedMotion ? 0 : 0.25,
                    duration: baseArrowDuration,
                    ease: 'easeOut'
                  }}
                />
              </svg>
            </div>

            {/* 5. Students & Builders */}
            <div className="w-full max-w-[340px] p-3 rounded-xl bg-white border border-black/8 shadow-2xs flex items-center gap-3 text-left">
              <div className="w-8 h-8 rounded-lg bg-[#F5F5F3] flex items-center justify-center text-[#111111] shrink-0">
                <Users className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <div className="text-[12px] font-bold text-[#111111] uppercase tracking-wide truncate">
                  Students & Builders
                </div>
                <div className="text-[11px] text-[#737373] truncate">
                  Cross-campus builders & collaborators
                </div>
              </div>
            </div>

            {/* Vertical Connector */}
            <div className="flex flex-col items-center justify-center py-1.5 select-none" aria-hidden="true">
              <svg width="12" height="24" viewBox="0 0 12 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <motion.line 
                  x1="6" 
                  y1="0" 
                  x2="6" 
                  y2="16" 
                  stroke="#000000" strokeLinejoin="round" 
                  strokeWidth="1.75" 
                  strokeLinecap="round" 
                  initial={{ pathLength: 0, opacity: 0 }}
                  whileInView={{ pathLength: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: baseLineDuration, ease: [0.16, 1, 0.3, 1] }}
                />
                <motion.polygon 
                  points="2.5,14 6,21 9.5,14" 
                  fill="#000000" 
                  initial={{ opacity: 0, y: -3 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    delay: prefersReducedMotion ? 0 : 0.25,
                    duration: baseArrowDuration,
                    ease: 'easeOut'
                  }}
                />
              </svg>
            </div>

            {/* 6. Academic Projects */}
            <div className="w-full max-w-[340px] p-3 rounded-xl bg-white border border-black/8 shadow-2xs flex items-center gap-3 text-left">
              <div className="w-8 h-8 rounded-lg bg-[#F5F5F3] flex items-center justify-center text-[#111111] shrink-0">
                <FolderGit2 className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <div className="text-[12px] font-bold text-[#111111] uppercase tracking-wide truncate">
                  Academic Projects
                </div>
                <div className="text-[11px] text-[#737373] truncate">
                  Verified research & living repos
                </div>
              </div>
            </div>

            {/* Vertical Connector */}
            <div className="flex flex-col items-center justify-center py-1.5 select-none" aria-hidden="true">
              <svg width="12" height="24" viewBox="0 0 12 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <motion.line 
                  x1="6" 
                  y1="0" 
                  x2="6" 
                  y2="16" 
                  stroke="#000000" strokeLinejoin="round" 
                  strokeWidth="1.75" 
                  strokeLinecap="round" 
                  initial={{ pathLength: 0, opacity: 0 }}
                  whileInView={{ pathLength: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: baseLineDuration, ease: [0.16, 1, 0.3, 1] }}
                />
                <motion.polygon 
                  points="2.5,14 6,21 9.5,14" 
                  fill="#000000" 
                  initial={{ opacity: 0, y: -3 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    delay: prefersReducedMotion ? 0 : 0.25,
                    duration: baseArrowDuration,
                    ease: 'easeOut'
                  }}
                />
              </svg>
            </div>

            {/* 7. Faculty & Mentors */}
            <div className="w-full max-w-[340px] p-3 rounded-xl bg-white border border-black/8 shadow-2xs flex items-center gap-3 text-left">
              <div className="w-8 h-8 rounded-lg bg-[#F5F5F3] flex items-center justify-center text-[#111111] shrink-0">
                <UserCheck className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <div className="text-[12px] font-bold text-[#111111] uppercase tracking-wide truncate">
                  Faculty & Mentors
                </div>
                <div className="text-[11px] text-[#737373] truncate">
                  Verify research & mentor cohorts
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};

export default CrossCampusNetworkSection;
