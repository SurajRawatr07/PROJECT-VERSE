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
          <div className="relative p-8 sm:p-10 rounded-2xl bg-[#FAFAFA] border border-black/8 shadow-xs overflow-hidden">
            {/* Background connecting lines SVG */}
            <svg 
              className="absolute inset-0 w-full h-full pointer-events-none z-0 opacity-60" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <linearGradient id="lineGradLeft" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#D4D4D8" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="#111111" stopOpacity="0.25" />
                </linearGradient>
                <linearGradient id="lineGradRight" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#111111" stopOpacity="0.25" />
                  <stop offset="100%" stopColor="#D4D4D8" stopOpacity="0.4" />
                </linearGradient>
              </defs>

              {/* Left connections: 3 campus points converging to center hub */}
              <path d="M 280 115 C 330 115, 340 180, 390 180" fill="none" stroke="url(#lineGradLeft)" strokeWidth="1.5" strokeDasharray="3 3" />
              <path d="M 280 180 L 390 180" fill="none" stroke="url(#lineGradLeft)" strokeWidth="1.5" strokeDasharray="3 3" />
              <path d="M 280 245 C 330 245, 340 180, 390 180" fill="none" stroke="url(#lineGradLeft)" strokeWidth="1.5" strokeDasharray="3 3" />

              {/* Right connections: center hub expanding to 3 actor points */}
              <path d="M 590 180 C 640 180, 650 115, 700 115" fill="none" stroke="url(#lineGradRight)" strokeWidth="1.5" strokeDasharray="3 3" />
              <path d="M 590 180 L 700 180" fill="none" stroke="url(#lineGradRight)" strokeWidth="1.5" strokeDasharray="3 3" />
              <path d="M 590 180 C 640 180, 650 245, 700 245" fill="none" stroke="url(#lineGradRight)" strokeWidth="1.5" strokeDasharray="3 3" />
            </svg>

            {/* Top Node Flow: Campuses -> ProjectVerse Hub -> Actors */}
            <div className="grid grid-cols-12 items-center gap-4 relative z-10">
              {/* Left Column: Campuses / Universities */}
              <div className="col-span-4 flex flex-col gap-3.5">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[11px] uppercase tracking-widest text-[#737373] font-bold">
                    Origins & Institutions
                  </span>
                </div>

                <div className="p-3.5 rounded-xl bg-white border border-black/8 shadow-2xs flex items-center gap-3 group hover:border-black/20 hover:-translate-y-0.5 transition-all">
                  <div className="w-8 h-8 rounded-lg bg-[#F5F5F3] flex items-center justify-center text-[#111111] shrink-0">
                    <Building2 className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-[13.5px] font-bold text-[#111111] truncate">College / Campus A</div>
                    <div className="text-[11.5px] text-[#737373] truncate">Student Projects & Research</div>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-white border border-black/8 shadow-2xs flex items-center gap-3 group hover:border-black/20 hover:-translate-y-0.5 transition-all">
                  <div className="w-8 h-8 rounded-lg bg-[#F5F5F3] flex items-center justify-center text-[#111111] shrink-0">
                    <GraduationCap className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-[13.5px] font-bold text-[#111111] truncate">University Campus</div>
                    <div className="text-[11.5px] text-[#737373] truncate">Engineering & Science Labs</div>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-white border border-black/8 shadow-2xs flex items-center gap-3 group hover:border-black/20 hover:-translate-y-0.5 transition-all">
                  <div className="w-8 h-8 rounded-lg bg-[#F5F5F3] flex items-center justify-center text-[#111111] shrink-0">
                    <Building2 className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-[13.5px] font-bold text-[#111111] truncate">College / Campus B</div>
                    <div className="text-[11.5px] text-[#737373] truncate">Interdisciplinary Teams</div>
                  </div>
                </div>
              </div>

              {/* Center Column: ProjectVerse Hub */}
              <div className="col-span-4 flex flex-col items-center justify-center px-2">
                <div className="flex items-center gap-2 mb-2 text-[#737373] text-[11px] font-medium tracking-widest uppercase">
                  <span>Converge & Index</span>
                </div>

                <motion.div 
                  initial={{ scale: 0.96 }}
                  whileInView={{ scale: 1 }}
                  transition={{ duration: 0.3 }}
                  className="w-full max-w-[210px] p-5 rounded-2xl bg-white border-2 border-black/10 shadow-xs flex flex-col items-center text-center relative group hover:border-black/25 transition-all"
                >
                  <div className="w-12 h-12 rounded-xl bg-[#111111] text-white flex items-center justify-center mb-3 shadow-2xs">
                    <ProjectVerseLogo size={24} color="#FFFFFF" />
                  </div>
                  <span className="text-[15px] font-bold text-[#111111] tracking-wide">
                    PROJECTVERSE
                  </span>
                  <span className="text-[11px] uppercase tracking-wider text-[#737373] font-medium mt-0.5">
                    Academic Hub
                  </span>
                  <div className="mt-3 pt-2.5 border-t border-black/6 w-full text-[11px] text-[#4A4A4A] leading-tight">
                    Cross-Campus Discovery & Verification
                  </div>
                </motion.div>

                <div className="flex items-center gap-2 mt-2 text-[#737373] text-[11px] font-medium tracking-widest uppercase">
                  <span>Expand & Connect</span>
                </div>
              </div>

              {/* Right Column: Stakeholders & Roles */}
              <div className="col-span-4 flex flex-col gap-3.5">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[11px] uppercase tracking-widest text-[#737373] font-bold">
                    Ecosystem Roles
                  </span>
                </div>

                <div className="p-3.5 rounded-xl bg-white border border-black/8 shadow-2xs flex items-center gap-3 group hover:border-black/20 hover:-translate-y-0.5 transition-all">
                  <div className="w-8 h-8 rounded-lg bg-[#F5F5F3] flex items-center justify-center text-[#111111] shrink-0">
                    <Users className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-[13.5px] font-bold text-[#111111] truncate">Students & Builders</div>
                    <div className="text-[11.5px] text-[#737373] truncate">Find cross-college collaborators</div>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-white border border-black/8 shadow-2xs flex items-center gap-3 group hover:border-black/20 hover:-translate-y-0.5 transition-all">
                  <div className="w-8 h-8 rounded-lg bg-[#F5F5F3] flex items-center justify-center text-[#111111] shrink-0">
                    <FolderGit2 className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-[13.5px] font-bold text-[#111111] truncate">Academic Projects</div>
                    <div className="text-[11.5px] text-[#737373] truncate">Carry lineage beyond submission</div>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-white border border-black/8 shadow-2xs flex items-center gap-3 group hover:border-black/20 hover:-translate-y-0.5 transition-all">
                  <div className="w-8 h-8 rounded-lg bg-[#F5F5F3] flex items-center justify-center text-[#111111] shrink-0">
                    <UserCheck className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-[13.5px] font-bold text-[#111111] truncate">Faculty & Mentors</div>
                    <div className="text-[11.5px] text-[#737373] truncate">Verify research & mentor teams</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Convergence: Multi-Campus Collaboration & Continuity */}
            <div className="mt-8 pt-6 border-t border-black/8 flex items-center justify-center">
              <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-xl bg-white border border-black/8 shadow-2xs">
                <div className="w-6 h-6 rounded-md bg-[#F5F5F3] flex items-center justify-center text-[#111111] shrink-0">
                  <GitBranch className="w-3.5 h-3.5" />
                </div>
                <div className="text-[12.5px] text-[#4A4A4A]">
                  <span className="font-bold text-[#111111] mr-1.5 uppercase tracking-wider text-[11.5px]">Outcome:</span>
                  Shared discovery, cross-college mentorship, and continued project lineage
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* MOBILE VISUALIZATION (Strict Clean Vertical Flow: 320px–768px) */}
        {/* ========================================================================= */}
        <div className="block md:hidden">
          <div className="p-5 rounded-2xl bg-[#FAFAFA] border border-black/8 shadow-xs flex flex-col items-center">
            {/* Step 1: College / University */}
            <div className="w-full max-w-[300px] p-3.5 rounded-xl bg-white border border-black/8 shadow-2xs flex items-center gap-3 text-left">
              <div className="w-9 h-9 rounded-lg bg-[#F5F5F3] flex items-center justify-center text-[#111111] shrink-0">
                <Building2 className="w-4 h-4" />
              </div>
              <div>
                <div className="text-[13px] font-bold text-[#111111] uppercase tracking-wide">
                  COLLEGE / UNIVERSITY
                </div>
                <div className="text-[11.5px] text-[#737373]">
                  Campuses, labs, and student cohorts
                </div>
              </div>
            </div>

            {/* Vertical Connector */}
            <div className="h-6 w-0.5 bg-black/15 flex items-center justify-center my-1 relative">
              <ArrowDown className="w-3 h-3 text-[#737373] absolute -bottom-1.5" />
            </div>

            {/* Step 2: ProjectVerse Hub */}
            <div className="w-full max-w-[300px] p-4 rounded-xl bg-white border-2 border-black/10 shadow-xs flex items-center gap-3 text-left my-1">
              <div className="w-10 h-10 rounded-xl bg-[#111111] text-white flex items-center justify-center shrink-0 shadow-2xs">
                <ProjectVerseLogo size={20} color="#FFFFFF" />
              </div>
              <div>
                <div className="text-[14px] font-bold text-[#111111] tracking-wide">
                  PROJECTVERSE
                </div>
                <div className="text-[11.5px] text-[#737373]">
                  Connected platform & lineage hub
                </div>
              </div>
            </div>

            {/* Vertical Connector */}
            <div className="h-6 w-0.5 bg-black/15 flex items-center justify-center my-1 relative">
              <ArrowDown className="w-3 h-3 text-[#737373] absolute -bottom-1.5" />
            </div>

            {/* Step 3: Discover */}
            <div className="w-full max-w-[300px] p-3.5 rounded-xl bg-white border border-black/8 shadow-2xs flex items-center gap-3 text-left">
              <div className="w-8 h-8 rounded-lg bg-[#F5F5F3] flex items-center justify-center text-[#111111] shrink-0">
                <Compass className="w-4 h-4" />
              </div>
              <div>
                <div className="text-[12.5px] font-bold text-[#111111] uppercase tracking-wide">
                  DISCOVER
                </div>
                <div className="text-[11.5px] text-[#737373]">
                  Find projects and ideas across campuses
                </div>
              </div>
            </div>

            {/* Vertical Connector */}
            <div className="h-6 w-0.5 bg-black/15 flex items-center justify-center my-1 relative">
              <ArrowDown className="w-3 h-3 text-[#737373] absolute -bottom-1.5" />
            </div>

            {/* Step 4: Collaborate */}
            <div className="w-full max-w-[300px] p-3.5 rounded-xl bg-white border border-black/8 shadow-2xs flex items-center gap-3 text-left">
              <div className="w-8 h-8 rounded-lg bg-[#F5F5F3] flex items-center justify-center text-[#111111] shrink-0">
                <Users className="w-4 h-4" />
              </div>
              <div>
                <div className="text-[12.5px] font-bold text-[#111111] uppercase tracking-wide">
                  COLLABORATE
                </div>
                <div className="text-[11.5px] text-[#737373]">
                  Work with peers beyond your college
                </div>
              </div>
            </div>

            {/* Vertical Connector */}
            <div className="h-6 w-0.5 bg-black/15 flex items-center justify-center my-1 relative">
              <ArrowDown className="w-3 h-3 text-[#737373] absolute -bottom-1.5" />
            </div>

            {/* Step 5: Continue */}
            <div className="w-full max-w-[300px] p-3.5 rounded-xl bg-white border border-black/8 shadow-2xs flex items-center gap-3 text-left">
              <div className="w-8 h-8 rounded-lg bg-[#F5F5F3] flex items-center justify-center text-[#111111] shrink-0">
                <GitBranch className="w-4 h-4" />
              </div>
              <div>
                <div className="text-[12.5px] font-bold text-[#111111] uppercase tracking-wide">
                  CONTINUE
                </div>
                <div className="text-[11.5px] text-[#737373]">
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
