import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Sparkles, 
  Check, 
  Users, 
  GraduationCap, 
  Compass, 
  ArrowRight, 
  CheckCircle2, 
  Layers,
  Cpu,
  Plus
} from 'lucide-react';
import { AI_SKILLS_POOL, SAMPLE_PEERS, SAMPLE_MENTORS, SAMPLE_PROJECTS } from '../data/mockData';

export const AIMatchingSection: React.FC = () => {
  const [selectedSkills, setSelectedSkills] = useState<string[]>([
    'React',
    'TypeScript',
    'PyTorch',
    'Node.js'
  ]);
  const [activeTab, setActiveTab] = useState<'projects' | 'teammates' | 'mentors'>('projects');

  const toggleSkill = (skill: string) => {
    if (selectedSkills.includes(skill)) {
      if (selectedSkills.length > 1) {
        setSelectedSkills(selectedSkills.filter((s) => s !== skill));
      }
    } else {
      setSelectedSkills([...selectedSkills, skill]);
    }
  };

  // Dynamic recommendation calculations
  const recommendedProject = SAMPLE_PROJECTS[0]; // AeroSync or dynamically chosen
  const matchScore = Math.min(98, 70 + selectedSkills.length * 6);

  return (
    <section id="ai-matching" className="relative w-full py-24 sm:py-32 px-4 sm:px-6 bg-[#040714] border-t border-white/5">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full liquid-glass text-xs font-mono-code text-indigo-300 mb-3">
            <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
            <span>SEMANTIC GRAPH RECOMMENDATION ENGINE</span>
          </div>
          <h2 className="font-display text-3xl sm:text-5xl md:text-6xl text-white font-normal leading-[1.1]">
            Find the Right Project, Person, or Mentor.
          </h2>
          <p className="text-slate-400 font-body text-sm sm:text-base mt-4 max-w-2xl mx-auto leading-relaxed">
            ProjectVerse analyzes skill graphs, project requirements, and institutional backgrounds to deliver explainable recommendations without the noise.
          </p>
        </div>

        {/* Skill Selector Studio */}
        <div className="liquid-glass rounded-2xl p-6 sm:p-8 mb-8 border border-white/10">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
            <div>
              <span className="text-xs font-mono-code uppercase tracking-wider text-indigo-300">
                Interactive Skill Matrix
              </span>
              <h3 className="text-lg font-bold text-white font-body mt-0.5">
                Select Your Technical Competencies:
              </h3>
            </div>
            <span className="text-xs font-mono-code text-slate-400">
              {selectedSkills.length} Skills Selected
            </span>
          </div>

          {/* Skill Pills */}
          <div className="flex flex-wrap gap-2">
            {AI_SKILLS_POOL.map((skill) => {
              const isSelected = selectedSkills.includes(skill);
              return (
                <button
                  key={skill}
                  id={`skill-pill-${skill.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
                  onClick={() => toggleSkill(skill)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono-code flex items-center gap-1.5 transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-indigo-500 text-white font-semibold shadow-md shadow-indigo-500/20'
                      : 'bg-white/5 text-slate-400 hover:text-slate-200 hover:bg-white/10 border border-white/5'
                  }`}
                >
                  {isSelected ? <Check className="w-3 h-3 text-white" /> : <Plus className="w-3 h-3 text-slate-500" />}
                  <span>{skill}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Recommendations Output Tabs */}
        <div className="flex items-center justify-center gap-2 mb-8">
          <button
            id="tab-rec-projects"
            onClick={() => setActiveTab('projects')}
            className={`px-5 py-2 rounded-full text-xs sm:text-sm font-semibold flex items-center gap-2 transition-all cursor-pointer ${
              activeTab === 'projects'
                ? 'bg-white text-slate-950 shadow-md'
                : 'liquid-glass text-slate-400 hover:text-white border-white/10'
            }`}
          >
            <Compass className="w-3.5 h-3.5" />
            <span>Recommended Projects</span>
          </button>

          <button
            id="tab-rec-teammates"
            onClick={() => setActiveTab('teammates')}
            className={`px-5 py-2 rounded-full text-xs sm:text-sm font-semibold flex items-center gap-2 transition-all cursor-pointer ${
              activeTab === 'teammates'
                ? 'bg-white text-slate-950 shadow-md'
                : 'liquid-glass text-slate-400 hover:text-white border-white/10'
            }`}
          >
            <Users className="w-3.5 h-3.5" />
            <span>Matched Teammates</span>
          </button>

          <button
            id="tab-rec-mentors"
            onClick={() => setActiveTab('mentors')}
            className={`px-5 py-2 rounded-full text-xs sm:text-sm font-semibold flex items-center gap-2 transition-all cursor-pointer ${
              activeTab === 'mentors'
                ? 'bg-white text-slate-950 shadow-md'
                : 'liquid-glass text-slate-400 hover:text-white border-white/10'
            }`}
          >
            <GraduationCap className="w-3.5 h-3.5" />
            <span>Faculty Mentors</span>
          </button>
        </div>

        {/* Tab Content Display */}
        <AnimatePresence mode="wait">
          {activeTab === 'projects' && (
            <motion.div
              key="rec-projects"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="liquid-glass-elevated rounded-3xl p-6 sm:p-10 border border-indigo-500/20"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                <div className="lg:col-span-8 space-y-4">
                  <div className="flex items-center gap-3">
                    <span className="px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 font-mono-code text-xs font-bold border border-indigo-500/30">
                      TOP MATCH CANDIDATE
                    </span>
                    <span className="text-xs font-mono-code text-slate-400">
                      {recommendedProject.institution}
                    </span>
                  </div>

                  <h3 className="font-display text-2xl sm:text-4xl text-white font-normal">
                    {recommendedProject.title}
                  </h3>

                  <p className="text-slate-300 font-body text-sm sm:text-base leading-relaxed">
                    {recommendedProject.description}
                  </p>

                  {/* Explainable AI Reason Tags */}
                  <div className="pt-2">
                    <span className="text-xs font-mono-code uppercase tracking-wider text-slate-400 block mb-2">
                      Why This Project Matches Your Profile:
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {selectedSkills.slice(0, 3).map((s) => (
                        <span key={s} className="px-2.5 py-1 rounded-lg bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 text-xs font-mono-code flex items-center gap-1">
                          <Check className="w-3 h-3" />
                          <span>{s} Direct Match</span>
                        </span>
                      ))}
                      <span className="px-2.5 py-1 rounded-lg bg-indigo-500/15 text-indigo-300 border border-indigo-500/30 text-xs font-mono-code flex items-center gap-1">
                        <Check className="w-3 h-3" />
                        <span>Core Lead Role Open</span>
                      </span>
                      <span className="px-2.5 py-1 rounded-lg bg-indigo-500/15 text-indigo-300 border border-indigo-500/30 text-xs font-mono-code flex items-center gap-1">
                        <Check className="w-3 h-3" />
                        <span>Batch '26 Continuity Need</span>
                      </span>
                    </div>
                  </div>
                </div>

                {/* Match Score Display Block */}
                <div className="lg:col-span-4 flex flex-col items-center justify-center p-8 rounded-2xl bg-black/40 border border-white/10 text-center">
                  <span className="text-xs font-mono-code uppercase tracking-widest text-slate-400 mb-1">
                    MATCH CONFIDENCE
                  </span>
                  <div className="font-display text-6xl sm:text-7xl font-normal text-white my-2">
                    {matchScore}%
                  </div>
                  <span className="text-xs text-emerald-400 font-mono-code flex items-center gap-1 mb-6">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    High Affinity Requisite
                  </span>

                  <button
                    onClick={() => {}}
                    className="w-full py-3 px-4 rounded-xl bg-white text-slate-950 font-semibold text-xs sm:text-sm shadow-md hover:bg-slate-100 transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>Request Collaboration</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'teammates' && (
            <motion.div
              key="rec-teammates"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-6"
            >
              {SAMPLE_PEERS.map((peer, idx) => (
                <div key={idx} className="liquid-glass rounded-2xl p-6 border border-white/10 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-3 mb-4">
                      <img
                        src={peer.avatar}
                        alt={peer.name}
                        referrerPolicy="no-referrer"
                        className="w-12 h-12 rounded-full object-cover border border-white/20"
                      />
                      <div>
                        <h4 className="text-base font-bold text-white">{peer.name}</h4>
                        <p className="text-xs text-indigo-300 font-mono-code">{peer.institution} • {peer.batch}</p>
                      </div>
                    </div>

                    <div className="p-2.5 rounded-lg bg-indigo-500/10 border border-indigo-400/20 mb-4">
                      <span className="text-[11px] font-mono-code text-indigo-200 block font-semibold">Specialization:</span>
                      <span className="text-xs text-white block mt-0.5">{peer.role}</span>
                    </div>

                    <div className="flex flex-wrap gap-1 mb-4">
                      {peer.skills.map((sk) => (
                        <span key={sk} className="text-[11px] font-mono-code px-2 py-0.5 rounded bg-white/5 text-slate-300 border border-white/10">
                          {sk}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                    <span className="text-xs font-mono-code text-emerald-400 font-semibold">{peer.matchScore}% Synergy</span>
                    <button className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs font-semibold transition-all">
                      Invite to Project
                    </button>
                  </div>
                </div>
              ))}
            </motion.div>
          )}

          {activeTab === 'mentors' && (
            <motion.div
              key="rec-mentors"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-6"
            >
              {SAMPLE_MENTORS.map((mentor, idx) => (
                <div key={idx} className="liquid-glass rounded-2xl p-6 border border-white/10 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-3 mb-4">
                      <img
                        src={mentor.avatar}
                        alt={mentor.name}
                        referrerPolicy="no-referrer"
                        className="w-12 h-12 rounded-full object-cover border border-white/20"
                      />
                      <div>
                        <h4 className="text-base font-bold text-white">{mentor.name}</h4>
                        <p className="text-xs text-indigo-300 font-mono-code">{mentor.institution}</p>
                      </div>
                    </div>

                    <p className="text-xs text-slate-300 mb-4 leading-relaxed font-body">
                      {mentor.title}
                    </p>

                    <div className="space-y-1.5 mb-4">
                      <span className="text-[10px] font-mono-code text-slate-400 uppercase block">Expertise Domains</span>
                      <div className="flex flex-wrap gap-1">
                        {mentor.domains.map((dom) => (
                          <span key={dom} className="text-[11px] font-mono-code px-2 py-0.5 rounded bg-indigo-950/40 text-indigo-200 border border-indigo-500/30">
                            {dom}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs">
                    <span className="text-slate-400 font-mono-code">{mentor.verifiedProjectsCount} Capstones Mentored</span>
                    <button className="px-3 py-1.5 rounded-lg bg-indigo-500 text-white font-semibold text-xs hover:bg-indigo-600 transition-all">
                      Request Guidance
                    </button>
                  </div>
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};
