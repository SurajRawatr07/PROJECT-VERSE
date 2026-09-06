import React from 'react';
import { motion } from 'motion/react';
import { 
  Building2, 
  GraduationCap, 
  Compass, 
  Users, 
  BookOpen, 
  GitBranch, 
  ArrowDown, 
  Layers,
  FolderGit2,
  UserCheck
} from 'lucide-react';
import { ProjectVerseLogo } from './ProjectVerseLogo';

export const CrossCampusNetworkSection: React.FC = () => {
  const supportingPoints = [
    {
      title: 'DISCOVER',
      desc: 'Find projects and ideas from different campuses.',
      icon: Compass
    },
    {
      title: 'COLLABORATE',
      desc: 'Work with students and contributors beyond your college.',
      icon: Users
    },
    {
      title: 'LEARN',
      desc: 'Explore real academic work and proven approaches.',
      icon: BookOpen
    },
    {
      title: 'CONTINUE',
      desc: 'Build on projects instead of starting from zero.',
      icon: GitBranch
    }
  ];

  return (
    <section 
      id="cross-campus" 
      className="relative w-full py-16 sm:py-20 md:py-24 px-4 sm:px-6 bg-[#FFFFFF] border-t border-black/8 font-serif overflow-hidden"
    >
      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <span className="text-[11px] sm:text-[12px] uppercase tracking-[0.2em] text-[#737373] font-bold block mb-2.5">
            CROSS-CAMPUS ECOSYSTEM
          </span>
          <h2 className="text-[26px] sm:text-[32px] md:text-[38px] text-[#111111] font-bold tracking-tight uppercase leading-[1.08]">
            ONE PROJECT. MANY CAMPUSES.
          </h2>
          <p className="text-[15px] sm:text-[16px] text-[#111111] font-medium mt-3 max-w-xl mx-auto leading-relaxed">
            Connect students, ideas and expertise across colleges and universities — and give academic projects a longer life.
          </p>
          <p className="text-[13.5px] sm:text-[14.5px] text-[#555555] mt-2 max-w-2xl mx-auto leading-relaxed">
            Great academic work shouldn't stay inside one classroom. ProjectVerse connects students, faculty and projects across colleges so ideas can be discovered, improved and continued.
          </p>
        </div>

        {/* ========================================================================= */}
        {/* DESKTOP / TABLET VISUALIZATION (Modern Academic Ecosystem Flow) */}
        {/* ========================================================================= */}
        <div className="hidden md:block">
          <div className="relative p-8 sm:p-10 rounded-2xl bg-[#FAFAFA] border border-black/8 shadow-xs">
            {/* Top Ecosystem Tier: Campuses -> Converging Black Lines -> ProjectVerse Hub -> Expanding Black Lines -> Roles */}
            <div className="grid grid-cols-12 items-center gap-0 relative z-10">
              {/* Left Column (4 cols): Campuses / Universities */}
              <div className="col-span-4 flex flex-col justify-between h-[224px]">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[11px] uppercase tracking-widest text-[#737373] font-bold">
                    Origins & Institutions
                  </span>
                </div>

                <div className="h-[58px] p-3 rounded-xl bg-white border border-black/8 shadow-2xs flex items-center gap-3 group hover:border-black/20 hover:-translate-y-0.5 transition-all">
                  <div className="w-8 h-8 rounded-lg bg-[#F5F5F3] flex items-center justify-center text-[#000000] shrink-0">
                    <Building2 className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-[13px] font-bold text-[#111111] truncate">College / Campus A</div>
                    <div className="text-[11px] text-[#737373] truncate">Student Projects & Labs</div>
                  </div>
                </div>

                <div className="h-[58px] p-3 rounded-xl bg-white border border-black/8 shadow-2xs flex items-center gap-3 group hover:border-black/20 hover:-translate-y-0.5 transition-all">
                  <div className="w-8 h-8 rounded-lg bg-[#F5F5F3] flex items-center justify-center text-[#000000] shrink-0">
                    <GraduationCap className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-[13px] font-bold text-[#111111] truncate">University Campus</div>
                    <div className="text-[11px] text-[#737373] truncate">Engineering & Research</div>
                  </div>
                </div>

                <div className="h-[58px] p-3 rounded-xl bg-white border border-black/8 shadow-2xs flex items-center gap-3 group hover:border-black/20 hover:-translate-y-0.5 transition-all">
                  <div className="w-8 h-8 rounded-lg bg-[#F5F5F3] flex items-center justify-center text-[#000000] shrink-0">
                    <Building2 className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-[13px] font-bold text-[#111111] truncate">College / Campus B</div>
                    <div className="text-[11px] text-[#737373] truncate">Interdisciplinary Teams</div>
                  </div>
                </div>
              </div>

              {/* Middle-Left Connector (1 col): 3 Solid Black Lines Converging into ProjectVerse Hub */}
              <div className="col-span-1 h-[224px] flex items-center justify-center relative select-none">
                <svg className="w-full h-full" viewBox="0 0 50 224" preserveAspectRatio="none" fill="none">
                  <defs>
                    <marker
                      id="arrow-black-in"
                      viewBox="0 0 10 10"
                      refX="8"
                      refY="5"
                      markerWidth="6"
                      markerHeight="6"
                      orient="auto"
                    >
                      <path d="M 1 1.5 L 8.5 5 L 1 8.5 z" fill="#000000" stroke="#000000" strokeWidth="0.5" />
                    </marker>
                  </defs>

                  {/* Top line to center */}
                  <motion.path
                    d="M 2 48 C 26 48, 26 122, 46 122"
                    stroke="#000000"
                    strokeWidth="1.75"
                    strokeLinecap="round"
                    markerEnd="url(#arrow-black-in)"
                    initial={{ pathLength: 0, opacity: 0 }}
                    whileInView={{ pathLength: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.45, ease: 'easeOut' }}
                  />

                  {/* Middle straight line */}
                  <motion.path
                    d="M 2 122 L 46 122"
                    stroke="#000000"
                    strokeWidth="1.75"
                    strokeLinecap="round"
                    markerEnd="url(#arrow-black-in)"
                    initial={{ pathLength: 0, opacity: 0 }}
                    whileInView={{ pathLength: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.45, delay: 0.08, ease: 'easeOut' }}
                  />

                  {/* Bottom line to center */}
                  <motion.path
                    d="M 2 196 C 26 196, 26 122, 46 122"
                    stroke="#000000"
                    strokeWidth="1.75"
                    strokeLinecap="round"
                    markerEnd="url(#arrow-black-in)"
                    initial={{ pathLength: 0, opacity: 0 }}
                    whileInView={{ pathLength: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.45, delay: 0.16, ease: 'easeOut' }}
                  />
                </svg>
              </div>

              {/* Center Column (2 cols): ProjectVerse Hub */}
              <div className="col-span-2 h-[224px] flex flex-col items-center justify-center px-1">
                <motion.div 
                  initial={{ scale: 0.96 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3 }}
                  className="w-full p-4 rounded-2xl bg-white border-2 border-black/15 shadow-xs flex flex-col items-center text-center relative group hover:border-black/30 transition-all"
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

              {/* Middle-Right Connector (1 col): 3 Solid Black Lines Diverging to Ecosystem Roles */}
              <div className="col-span-1 h-[224px] flex items-center justify-center relative select-none">
                <svg className="w-full h-full" viewBox="0 0 50 224" preserveAspectRatio="none" fill="none">
                  <defs>
                    <marker
                      id="arrow-black-out"
                      viewBox="0 0 10 10"
                      refX="8"
                      refY="5"
                      markerWidth="6"
                      markerHeight="6"
                      orient="auto"
                    >
                      <path d="M 1 1.5 L 8.5 5 L 1 8.5 z" fill="#000000" stroke="#000000" strokeWidth="0.5" />
                    </marker>
                  </defs>

                  {/* Center to top line */}
                  <motion.path
                    d="M 4 122 C 24 122, 24 48, 46 48"
                    stroke="#000000"
                    strokeWidth="1.75"
                    strokeLinecap="round"
                    markerEnd="url(#arrow-black-out)"
                    initial={{ pathLength: 0, opacity: 0 }}
                    whileInView={{ pathLength: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.45, ease: 'easeOut' }}
                  />

                  {/* Center straight to middle line */}
                  <motion.path
                    d="M 4 122 L 46 122"
                    stroke="#000000"
                    strokeWidth="1.75"
                    strokeLinecap="round"
                    markerEnd="url(#arrow-black-out)"
                    initial={{ pathLength: 0, opacity: 0 }}
                    whileInView={{ pathLength: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.45, delay: 0.08, ease: 'easeOut' }}
                  />

                  {/* Center to bottom line */}
                  <motion.path
                    d="M 4 122 C 24 122, 24 196, 46 196"
                    stroke="#000000"
                    strokeWidth="1.75"
                    strokeLinecap="round"
                    markerEnd="url(#arrow-black-out)"
                    initial={{ pathLength: 0, opacity: 0 }}
                    whileInView={{ pathLength: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.45, delay: 0.16, ease: 'easeOut' }}
                  />
                </svg>
              </div>

              {/* Right Column (4 cols): Ecosystem Roles */}
              <div className="col-span-4 flex flex-col justify-between h-[224px]">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[11px] uppercase tracking-widest text-[#737373] font-bold">
                    Ecosystem Roles
                  </span>
                </div>

                <div className="h-[58px] p-3 rounded-xl bg-white border border-black/8 shadow-2xs flex items-center gap-3 group hover:border-black/20 hover:-translate-y-0.5 transition-all">
                  <div className="w-8 h-8 rounded-lg bg-[#F5F5F3] flex items-center justify-center text-[#000000] shrink-0">
                    <Users className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-[13px] font-bold text-[#111111] truncate">Students & Builders</div>
                    <div className="text-[11px] text-[#737373] truncate">Cross-college collaborators</div>
                  </div>
                </div>

                <div className="h-[58px] p-3 rounded-xl bg-white border border-black/8 shadow-2xs flex items-center gap-3 group hover:border-black/20 hover:-translate-y-0.5 transition-all">
                  <div className="w-8 h-8 rounded-lg bg-[#F5F5F3] flex items-center justify-center text-[#000000] shrink-0">
                    <FolderGit2 className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-[13px] font-bold text-[#111111] truncate">Academic Projects</div>
                    <div className="text-[11px] text-[#737373] truncate">Lineage beyond submission</div>
                  </div>
                </div>

                <div className="h-[58px] p-3 rounded-xl bg-white border border-black/8 shadow-2xs flex items-center gap-3 group hover:border-black/20 hover:-translate-y-0.5 transition-all">
                  <div className="w-8 h-8 rounded-lg bg-[#F5F5F3] flex items-center justify-center text-[#000000] shrink-0">
                    <UserCheck className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-[13px] font-bold text-[#111111] truncate">Faculty & Mentors</div>
                    <div className="text-[11px] text-[#737373] truncate">Verify research & cohorts</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Vertical Black Downward Connector from Hub into Directional Pipeline */}
            <div className="flex flex-col items-center justify-center pt-5 pb-2">
              <motion.div
                initial={{ opacity: 0, y: -4 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, ease: 'easeOut' }}
                className="flex flex-col items-center select-none"
                aria-hidden="true"
              >
                <svg width="14" height="26" viewBox="0 0 14 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <line x1="7" y1="0" x2="7" y2="18" stroke="#000000" strokeWidth="2" strokeLinecap="round" />
                  <polygon points="2,17 7,25 12,17" fill="#000000" stroke="#000000" strokeWidth="1" strokeLinejoin="round" />
                </svg>
              </motion.div>
            </div>

            {/* Directional Flow: DISCOVER → COLLABORATE → CONTINUE */}
            <div className="flex items-center justify-center gap-2.5 sm:gap-4 py-2.5 px-4 rounded-xl bg-white border border-black/8 shadow-2xs max-w-xl mx-auto">
              {/* DISCOVER */}
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#F5F5F3] border border-black/6">
                <Compass className="w-4 h-4 text-[#000000]" />
                <span className="text-[12px] font-bold text-[#000000] tracking-wider uppercase">DISCOVER</span>
              </div>

              {/* Solid Black Horizontal Arrow */}
              <motion.div
                initial={{ opacity: 0, scaleX: 0.8, x: -3 }}
                whileInView={{ opacity: 1, scaleX: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: 0.1, ease: 'easeOut' }}
                className="shrink-0 flex items-center select-none"
                aria-hidden="true"
              >
                <svg width="32" height="12" viewBox="0 0 32 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <line x1="1" y1="6" x2="24" y2="6" stroke="#000000" strokeWidth="2" strokeLinecap="round" />
                  <polygon points="23,1.5 31,6 23,10.5" fill="#000000" stroke="#000000" strokeWidth="0.5" strokeLinejoin="round" />
                </svg>
              </motion.div>

              {/* COLLABORATE */}
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#F5F5F3] border border-black/6">
                <Users className="w-4 h-4 text-[#000000]" />
                <span className="text-[12px] font-bold text-[#000000] tracking-wider uppercase">COLLABORATE</span>
              </div>

              {/* Solid Black Horizontal Arrow */}
              <motion.div
                initial={{ opacity: 0, scaleX: 0.8, x: -3 }}
                whileInView={{ opacity: 1, scaleX: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: 0.2, ease: 'easeOut' }}
                className="shrink-0 flex items-center select-none"
                aria-hidden="true"
              >
                <svg width="32" height="12" viewBox="0 0 32 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <line x1="1" y1="6" x2="24" y2="6" stroke="#000000" strokeWidth="2" strokeLinecap="round" />
                  <polygon points="23,1.5 31,6 23,10.5" fill="#000000" stroke="#000000" strokeWidth="0.5" strokeLinejoin="round" />
                </svg>
              </motion.div>

              {/* CONTINUE */}
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#F5F5F3] border border-black/6">
                <GitBranch className="w-4 h-4 text-[#000000]" />
                <span className="text-[12px] font-bold text-[#000000] tracking-wider uppercase">CONTINUE</span>
              </div>
            </div>

            {/* Bottom Continuity Outcome */}
            <div className="mt-4 pt-3 border-t border-black/6 flex items-center justify-center">
              <div className="text-[12px] text-[#4A4A4A] text-center font-sans">
                <span className="font-bold text-[#000000] mr-1.5 uppercase tracking-wider text-[11px]">Academic Continuity:</span>
                Shared discovery, cross-college mentorship, and continued project lineage
              </div>
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* MOBILE VISUALIZATION (Clean Vertical Structure: 320px–768px) */}
        {/* ========================================================================= */}
        <div className="block md:hidden">
          <div className="p-4 sm:p-5 rounded-2xl bg-[#FAFAFA] border border-black/8 shadow-xs flex flex-col items-center w-full">
            {/* 1. COLLEGE / UNIVERSITY A */}
            <div className="w-full max-w-[290px] p-3 rounded-xl bg-white border border-black/8 shadow-2xs flex items-center gap-3 text-left">
              <div className="w-8 h-8 rounded-lg bg-[#F5F5F3] flex items-center justify-center text-[#000000] shrink-0">
                <Building2 className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <div className="text-[12.5px] font-bold text-[#111111] uppercase tracking-wide truncate">
                  COLLEGE / UNIVERSITY
                </div>
                <div className="text-[11px] text-[#737373] truncate">
                  Campus & Research Lab A
                </div>
              </div>
            </div>

            {/* Solid Black Vertical Connector */}
            <div className="flex flex-col items-center justify-center py-1 select-none" aria-hidden="true">
              <svg width="14" height="26" viewBox="0 0 14 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                <line x1="7" y1="0" x2="7" y2="18" stroke="#000000" strokeWidth="2" strokeLinecap="round" />
                <polygon points="2,17 7,25 12,17" fill="#000000" stroke="#000000" strokeWidth="1" strokeLinejoin="round" />
              </svg>
            </div>

            {/* 2. COLLEGE / UNIVERSITY B */}
            <div className="w-full max-w-[290px] p-3 rounded-xl bg-white border border-black/8 shadow-2xs flex items-center gap-3 text-left">
              <div className="w-8 h-8 rounded-lg bg-[#F5F5F3] flex items-center justify-center text-[#000000] shrink-0">
                <GraduationCap className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <div className="text-[12.5px] font-bold text-[#111111] uppercase tracking-wide truncate">
                  COLLEGE / UNIVERSITY
                </div>
                <div className="text-[11px] text-[#737373] truncate">
                  Interdisciplinary Campus B
                </div>
              </div>
            </div>

            {/* Solid Black Vertical Connector */}
            <div className="flex flex-col items-center justify-center py-1 select-none" aria-hidden="true">
              <svg width="14" height="26" viewBox="0 0 14 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                <line x1="7" y1="0" x2="7" y2="18" stroke="#000000" strokeWidth="2" strokeLinecap="round" />
                <polygon points="2,17 7,25 12,17" fill="#000000" stroke="#000000" strokeWidth="1" strokeLinejoin="round" />
              </svg>
            </div>

            {/* 3. PROJECTVERSE HUB */}
            <div className="w-full max-w-[290px] p-3.5 rounded-xl bg-white border-2 border-black/15 shadow-xs flex items-center gap-3 text-left">
              <div className="w-9 h-9 rounded-xl bg-[#111111] text-white flex items-center justify-center shrink-0 shadow-2xs">
                <ProjectVerseLogo size={20} color="#FFFFFF" />
              </div>
              <div className="min-w-0">
                <div className="text-[13.5px] font-bold text-[#111111] tracking-wide truncate">
                  PROJECTVERSE
                </div>
                <div className="text-[11px] text-[#737373] truncate">
                  Connected Platform & Lineage Hub
                </div>
              </div>
            </div>

            {/* Solid Black Vertical Connector */}
            <div className="flex flex-col items-center justify-center py-1 select-none" aria-hidden="true">
              <svg width="14" height="26" viewBox="0 0 14 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                <line x1="7" y1="0" x2="7" y2="18" stroke="#000000" strokeWidth="2" strokeLinecap="round" />
                <polygon points="2,17 7,25 12,17" fill="#000000" stroke="#000000" strokeWidth="1" strokeLinejoin="round" />
              </svg>
            </div>

            {/* 4. STUDENTS */}
            <div className="w-full max-w-[290px] p-3 rounded-xl bg-white border border-black/8 shadow-2xs flex items-center gap-3 text-left">
              <div className="w-8 h-8 rounded-lg bg-[#F5F5F3] flex items-center justify-center text-[#000000] shrink-0">
                <Users className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <div className="text-[12px] font-bold text-[#111111] uppercase tracking-wide truncate">
                  STUDENTS
                </div>
                <div className="text-[11px] text-[#737373] truncate">
                  Cross-campus builders & collaborators
                </div>
              </div>
            </div>

            {/* Solid Black Vertical Connector */}
            <div className="flex flex-col items-center justify-center py-1 select-none" aria-hidden="true">
              <svg width="14" height="26" viewBox="0 0 14 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                <line x1="7" y1="0" x2="7" y2="18" stroke="#000000" strokeWidth="2" strokeLinecap="round" />
                <polygon points="2,17 7,25 12,17" fill="#000000" stroke="#000000" strokeWidth="1" strokeLinejoin="round" />
              </svg>
            </div>

            {/* 5. PROJECTS */}
            <div className="w-full max-w-[290px] p-3 rounded-xl bg-white border border-black/8 shadow-2xs flex items-center gap-3 text-left">
              <div className="w-8 h-8 rounded-lg bg-[#F5F5F3] flex items-center justify-center text-[#000000] shrink-0">
                <FolderGit2 className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <div className="text-[12px] font-bold text-[#111111] uppercase tracking-wide truncate">
                  PROJECTS
                </div>
                <div className="text-[11px] text-[#737373] truncate">
                  Verified research & living repos
                </div>
              </div>
            </div>

            {/* Solid Black Vertical Connector */}
            <div className="flex flex-col items-center justify-center py-1 select-none" aria-hidden="true">
              <svg width="14" height="26" viewBox="0 0 14 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                <line x1="7" y1="0" x2="7" y2="18" stroke="#000000" strokeWidth="2" strokeLinecap="round" />
                <polygon points="2,17 7,25 12,17" fill="#000000" stroke="#000000" strokeWidth="1" strokeLinejoin="round" />
              </svg>
            </div>

            {/* 6. COLLABORATE */}
            <div className="w-full max-w-[290px] p-3 rounded-xl bg-white border border-black/8 shadow-2xs flex items-center gap-3 text-left">
              <div className="w-8 h-8 rounded-lg bg-[#F5F5F3] flex items-center justify-center text-[#000000] shrink-0">
                <BookOpen className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <div className="text-[12px] font-bold text-[#111111] uppercase tracking-wide truncate">
                  COLLABORATE
                </div>
                <div className="text-[11px] text-[#737373] truncate">
                  Inter-college teams & faculty mentors
                </div>
              </div>
            </div>

            {/* Solid Black Vertical Connector */}
            <div className="flex flex-col items-center justify-center py-1 select-none" aria-hidden="true">
              <svg width="14" height="26" viewBox="0 0 14 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                <line x1="7" y1="0" x2="7" y2="18" stroke="#000000" strokeWidth="2" strokeLinecap="round" />
                <polygon points="2,17 7,25 12,17" fill="#000000" stroke="#000000" strokeWidth="1" strokeLinejoin="round" />
              </svg>
            </div>

            {/* 7. CONTINUE */}
            <div className="w-full max-w-[290px] p-3 rounded-xl bg-white border border-black/8 shadow-2xs flex items-center gap-3 text-left">
              <div className="w-8 h-8 rounded-lg bg-[#F5F5F3] flex items-center justify-center text-[#000000] shrink-0">
                <GitBranch className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <div className="text-[12px] font-bold text-[#111111] uppercase tracking-wide truncate">
                  CONTINUE
                </div>
                <div className="text-[11px] text-[#737373] truncate">
                  Build on projects instead of starting from zero
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* SUPPORTING PILLARS: DISCOVER • COLLABORATE • LEARN • CONTINUE */}
        {/* Small supporting points around the visual, not huge cards */}
        {/* ========================================================================= */}
        <div className="mt-8 sm:mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-4">
          {supportingPoints.map((pt, idx) => {
            const Icon = pt.icon;
            return (
              <motion.div
                key={pt.title}
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.25, delay: idx * 0.05 }}
                className="p-4 rounded-xl bg-[#FAFAFA] border border-black/8 hover:border-black/20 hover:-translate-y-0.5 transition-all duration-200 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-6 h-6 rounded-md bg-white border border-black/8 flex items-center justify-center text-[#111111] shrink-0">
                      <Icon className="w-3.5 h-3.5" />
                    </div>
                    <span className="text-[12px] font-bold text-[#111111] tracking-wider uppercase">
                      {pt.title}
                    </span>
                  </div>
                  <p className="text-[13px] text-[#4A4A4A] leading-relaxed">
                    {pt.desc}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default CrossCampusNetworkSection;
