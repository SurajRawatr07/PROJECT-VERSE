import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Landmark, ArrowRight, GitFork, Share2, Sparkles, FolderGit2 } from 'lucide-react';

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
      className="relative w-full py-18 sm:py-24 px-4 sm:px-6 bg-[#FAFAF8] border-t border-black/[0.06] select-none"
    >
      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/[0.04] text-[11px] font-['Manrope',sans-serif] font-semibold uppercase tracking-wider text-[#555555] mb-3">
            Inter-Institutional Network
          </div>
          <h2 className="font-serif text-[28px] sm:text-[32px] md:text-[40px] text-[#111111] font-normal tracking-[-0.01em] leading-tight">
            One Project. Many Campuses.
          </h2>
          <p className="mt-2.5 text-[15px] sm:text-[16px] text-[#555555] font-sans">
            How a breakthrough repository created at one college is discovered, extended, and deployed across others.
          </p>
        </div>

        {/* 4-Step Action Flow: DISCOVER → IMPROVE → SHARE → CONTINUE */}
        <div className="flex items-center justify-center flex-wrap gap-2 sm:gap-3 mb-10">
          {FLOW_STEPS.map((step, idx) => (
            <React.Fragment key={step}>
              <span className="px-3 py-1 rounded-full bg-white border border-black/[0.08] text-[12px] font-mono font-bold text-[#111111] shadow-2xs">
                {step}
              </span>
              {idx < FLOW_STEPS.length - 1 && (
                <span className="text-black font-bold">→</span>
              )}
            </React.Fragment>
          ))}
        </div>

        {/* ========================================================================= */}
        {/* CROSS-CAMPUS DIAGRAM: Center ONE PROJECT + 4 Campus Cards */}
        {/* ========================================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-center">
          {/* Left Column: Campus A & Campus B */}
          <div className="flex flex-col gap-4">
            {[CAMPUSES[0], CAMPUSES[1]].map((campus, i) => {
              const isCurrent = activeCampus === i;
              return (
                <motion.div
                  key={campus.id}
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.35, delay: i * 0.1 }}
                  className={`p-4 rounded-2xl bg-white border transition-all duration-200 ${
                    isCurrent
                      ? 'border-black shadow-[0_4px_16px_rgba(0,0,0,0.06)]'
                      : 'border-black/[0.08] shadow-[0_1px_3px_rgba(0,0,0,0.02)]'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-lg bg-[#F5F5F3] flex items-center justify-center text-[#111111]">
                        <Landmark size={13} />
                      </div>
                      <span className="text-[14px] font-bold text-[#111111] font-['Manrope',sans-serif]">
                        {campus.name}
                      </span>
                    </div>
                    <span className="text-[11px] font-mono text-[#777777] font-semibold">
                      {campus.version}
                    </span>
                  </div>
                  <div className="text-[12px] text-[#555555] font-sans mb-3">
                    {campus.location} • <span className="text-[#111111] font-medium">{campus.action}</span>
                  </div>
                  <div className="flex items-center justify-between pt-2 border-t border-black/[0.05]">
                    <span className="text-[10.5px] font-mono text-[#888888]">Team</span>
                    <div className="flex -space-x-1">
                      {campus.students.map((st) => (
                        <div key={st} className="w-5 h-5 rounded-full bg-[#111111] text-white flex items-center justify-center text-[8px] font-mono font-bold">
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
          <div className="flex flex-col items-center justify-center p-6 sm:p-8 rounded-3xl bg-white border-2 border-black shadow-[0_4px_24px_rgba(0,0,0,0.06)] text-center relative">
            {/* Pure-black indicator badge */}
            <span className="px-2.5 py-0.5 rounded-full bg-[#111111] text-white text-[10px] font-mono font-bold uppercase tracking-wider mb-3">
              Single Source of Truth
            </span>

            <div className="w-14 h-14 rounded-2xl bg-[#F7F7F5] border border-black/[0.08] flex items-center justify-center text-[#111111] mb-3">
              <FolderGit2 size={28} />
            </div>

            <h3 className="font-serif text-[24px] font-bold text-[#111111] tracking-tight">
              ONE PROJECT
            </h3>
            <p className="text-[12.5px] text-[#555555] font-sans mt-1 max-w-[200px]">
              Continuous repository preserving all history, commits, and campus contributions.
            </p>

            <div className="mt-4 pt-3 border-t border-black/[0.06] w-full flex items-center justify-center gap-2 text-[11px] font-mono text-[#777777]">
              <span>CampusConnect v2.3</span>
            </div>
          </div>

          {/* Right Column: Campus C & Campus D */}
          <div className="flex flex-col gap-4">
            {[CAMPUSES[2], CAMPUSES[3]].map((campus, i) => {
              const isCurrent = activeCampus === i + 2;
              return (
                <motion.div
                  key={campus.id}
                  initial={{ opacity: 0, x: 16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.35, delay: i * 0.1 }}
                  className={`p-4 rounded-2xl bg-white border transition-all duration-200 ${
                    isCurrent
                      ? 'border-black shadow-[0_4px_16px_rgba(0,0,0,0.06)]'
                      : 'border-black/[0.08] shadow-[0_1px_3px_rgba(0,0,0,0.02)]'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-lg bg-[#F5F5F3] flex items-center justify-center text-[#111111]">
                        <Landmark size={13} />
                      </div>
                      <span className="text-[14px] font-bold text-[#111111] font-['Manrope',sans-serif]">
                        {campus.name}
                      </span>
                    </div>
                    <span className="text-[11px] font-mono text-[#777777] font-semibold">
                      {campus.version}
                    </span>
                  </div>
                  <div className="text-[12px] text-[#555555] font-sans mb-3">
                    {campus.location} • <span className="text-[#111111] font-medium">{campus.action}</span>
                  </div>
                  <div className="flex items-center justify-between pt-2 border-t border-black/[0.05]">
                    <span className="text-[10.5px] font-mono text-[#888888]">Team</span>
                    <div className="flex -space-x-1">
                      {campus.students.map((st) => (
                        <div key={st} className="w-5 h-5 rounded-full bg-[#111111] text-white flex items-center justify-center text-[8px] font-mono font-bold">
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
