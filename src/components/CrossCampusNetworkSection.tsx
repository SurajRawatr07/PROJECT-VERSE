import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Landmark, FolderGit2 } from 'lucide-react';

interface CampusNode {
  id: string;
  name: string;
  location: string;
  version: string;
  students: string[];
  action: string;
}

const CAMPUSES: CampusNode[] = [
  {
    id: 'campus-a',
    name: 'Campus A',
    location: 'Dehradun Institute',
    version: 'v1.0 Seed',
    students: ['SR', 'AK'],
    action: 'Origin Batch',
  },
  {
    id: 'campus-b',
    name: 'Campus B',
    location: 'Bangalore Tech',
    version: 'v1.4 Fork',
    students: ['VN', 'ML'],
    action: 'Added Mobile App',
  },
  {
    id: 'campus-c',
    name: 'Campus C',
    location: 'Pune University',
    version: 'v2.0 Core',
    students: ['TC', 'RS'],
    action: 'Backend Scale',
  },
  {
    id: 'campus-d',
    name: 'Campus D',
    location: 'Delhi Technology',
    version: 'v2.3 Active',
    students: ['NP', 'DW'],
    action: 'ML Pipeline',
  },
];

const FLOW_STEPS = ['DISCOVER', 'IMPROVE', 'SHARE', 'CONTINUE'];

export const CrossCampusNetworkSection: React.FC = () => {
  const [activeCampus, setActiveCampus] = useState<number>(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveCampus((prev) => (prev + 1) % CAMPUSES.length);
    }, 2400);
    return () => clearInterval(timer);
  }, []);

  return (
    <section 
      id="cross-campus" 
      className="relative w-full py-20 sm:py-28 px-4 sm:px-6 bg-[#FAFAF8] border-t border-black/[0.06] select-none overflow-hidden"
    >
      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-14">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-black/[0.04] text-[11px] font-['Manrope',sans-serif] font-semibold uppercase tracking-widest text-[#333333] mb-3">
            INTER-INSTITUTIONAL NETWORK
          </div>
          <h2 className="font-serif text-[32px] sm:text-[38px] md:text-[46px] text-[#111111] font-normal tracking-[-0.015em] leading-tight">
            One Project. Many Campuses.
          </h2>
          <p className="mt-3 text-[15px] sm:text-[16px] text-[#555555] font-sans leading-relaxed max-w-xl mx-auto">
            How a breakthrough repository created at one college is discovered, extended, and deployed across others.
          </p>
        </div>

        {/* 4-Step Action Flow: DISCOVER → IMPROVE → SHARE → CONTINUE with Thin Black Connectors */}
        <div className="flex items-center justify-center flex-wrap gap-2 sm:gap-3.5 mb-14">
          {FLOW_STEPS.map((step, idx) => (
            <React.Fragment key={step}>
              <span className="px-3.5 py-1.5 rounded-full bg-white border border-black/[0.1] text-[11.5px] font-['Manrope',sans-serif] font-bold text-[#111111] shadow-2xs tracking-wider">
                {step}
              </span>
              {idx < FLOW_STEPS.length - 1 && (
                <span className="text-black font-semibold text-sm">→</span>
              )}
            </React.Fragment>
          ))}
        </div>

        {/* ========================================================================= */}
        {/* CROSS-CAMPUS ARCHITECTURE: Center ONE PROJECT + 4 Campus Cards */}
        {/* Thin Pure Black SVG Connectors (1.35px) */}
        {/* ========================================================================= */}
        <div className="relative grid grid-cols-1 lg:grid-cols-3 gap-6 items-center">
          {/* Left Column: Campus A & Campus B */}
          <div className="flex flex-col gap-5">
            {[CAMPUSES[0], CAMPUSES[1]].map((campus, i) => {
              const isCurrent = activeCampus === i;
              return (
                <motion.div
                  key={campus.id}
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.35, delay: i * 0.1 }}
                  className={`p-4.5 rounded-2xl bg-white border transition-all duration-200 ${
                    isCurrent
                      ? 'border-black shadow-[0_4px_16px_rgba(0,0,0,0.06)]'
                      : 'border-black/[0.09] shadow-[0_1px_3px_rgba(0,0,0,0.02)]'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-lg bg-[#F5F5F3] border border-black/[0.06] flex items-center justify-center text-[#111111]">
                        <Landmark size={14} />
                      </div>
                      <span className="text-[14px] font-bold text-[#111111] font-['Manrope',sans-serif]">
                        {campus.name}
                      </span>
                    </div>
                    <span className="px-2 py-0.5 rounded-md bg-[#F7F7F5] border border-black/[0.06] text-[10.5px] font-['Manrope',sans-serif] text-[#555555] font-bold">
                      {campus.version}
                    </span>
                  </div>
                  <div className="text-[12.5px] text-[#555555] font-sans mb-3">
                    {campus.location} • <span className="text-[#111111] font-semibold">{campus.action}</span>
                  </div>
                  <div className="flex items-center justify-between pt-2.5 border-t border-black/[0.05]">
                    <span className="text-[11px] font-['Manrope',sans-serif] text-[#777777] font-medium">Team</span>
                    <div className="flex -space-x-1.5">
                      {campus.students.map((st) => (
                        <div key={st} className="w-5 h-5 rounded-full bg-[#111111] text-white flex items-center justify-center text-[8px] font-['Manrope',sans-serif] font-bold">
                          {st}
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Center Hub: ONE PROJECT */}
          <div className="flex flex-col items-center justify-center p-6 sm:p-8 rounded-3xl bg-white border-2 border-black shadow-[0_4px_24px_rgba(0,0,0,0.06)] text-center relative z-10">
            {/* Pure-black indicator badge */}
            <span className="px-2.5 py-0.5 rounded-full bg-[#111111] text-white text-[10px] font-['Manrope',sans-serif] font-bold uppercase tracking-wider mb-3">
              Single Source of Truth
            </span>

            <div className="w-13 h-13 rounded-2xl bg-[#F7F7F5] border border-black/[0.08] flex items-center justify-center text-[#111111] mb-3">
              <FolderGit2 size={26} />
            </div>

            <h3 className="font-serif text-[24px] sm:text-[26px] font-bold text-[#111111] tracking-tight">
              ONE PROJECT
            </h3>
            <p className="text-[12.5px] text-[#555555] font-sans mt-1.5 max-w-[200px] leading-relaxed">
              Continuous repository preserving all history, commits, and multi-campus contributions.
            </p>

            <div className="mt-4 pt-3 border-t border-black/[0.06] w-full flex items-center justify-center gap-2 text-[11px] font-['Manrope',sans-serif] text-[#666666] font-semibold">
              <span>CampusConnect v2.3</span>
            </div>
          </div>

          {/* Right Column: Campus C & Campus D */}
          <div className="flex flex-col gap-5">
            {[CAMPUSES[2], CAMPUSES[3]].map((campus, i) => {
              const isCurrent = activeCampus === i + 2;
              return (
                <motion.div
                  key={campus.id}
                  initial={{ opacity: 0, x: 16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.35, delay: i * 0.1 }}
                  className={`p-4.5 rounded-2xl bg-white border transition-all duration-200 ${
                    isCurrent
                      ? 'border-black shadow-[0_4px_16px_rgba(0,0,0,0.06)]'
                      : 'border-black/[0.09] shadow-[0_1px_3px_rgba(0,0,0,0.02)]'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-lg bg-[#F5F5F3] border border-black/[0.06] flex items-center justify-center text-[#111111]">
                        <Landmark size={14} />
                      </div>
                      <span className="text-[14px] font-bold text-[#111111] font-['Manrope',sans-serif]">
                        {campus.name}
                      </span>
                    </div>
                    <span className="px-2 py-0.5 rounded-md bg-[#F7F7F5] border border-black/[0.06] text-[10.5px] font-['Manrope',sans-serif] text-[#555555] font-bold">
                      {campus.version}
                    </span>
                  </div>
                  <div className="text-[12.5px] text-[#555555] font-sans mb-3">
                    {campus.location} • <span className="text-[#111111] font-semibold">{campus.action}</span>
                  </div>
                  <div className="flex items-center justify-between pt-2.5 border-t border-black/[0.05]">
                    <span className="text-[11px] font-['Manrope',sans-serif] text-[#777777] font-medium">Team</span>
                    <div className="flex -space-x-1.5">
                      {campus.students.map((st) => (
                        <div key={st} className="w-5 h-5 rounded-full bg-[#111111] text-white flex items-center justify-center text-[8px] font-['Manrope',sans-serif] font-bold">
                          {st}
                        </div>
                      ))}
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

export default CrossCampusNetworkSection;
