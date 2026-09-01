import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  GitFork, 
  GitCommit, 
  GitPullRequest, 
  Calendar, 
  CheckCircle2, 
  Clock, 
  Sparkles, 
  ArrowRight, 
  Users, 
  Layers,
  ArrowDown
} from 'lucide-react';
import { SAMPLE_PROJECTS } from '../data/mockData';

interface ProjectLineageSectionProps {
  onContinueProjectClick: (projectName: string) => void;
}

export const ProjectLineageSection: React.FC<ProjectLineageSectionProps> = ({
  onContinueProjectClick
}) => {
  const [selectedProjectIndex, setSelectedProjectIndex] = useState(0);
  const currentProject = SAMPLE_PROJECTS[selectedProjectIndex];
  const lineage = currentProject.lineage;

  return (
    <section id="lineage" className="relative w-full py-24 sm:py-32 px-4 sm:px-6 bg-[#040714] border-t border-white/5">
      <div className="max-w-6xl mx-auto">
        {/* Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 sm:mb-20 gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full liquid-glass text-xs font-mono-code text-indigo-300 mb-3">
              <GitFork className="w-3.5 h-3.5 text-indigo-400" />
              <span>PROJECT LINEAGE & MULTI-BATCH CONTINUITY</span>
            </div>
            <h2 className="font-display text-3xl sm:text-5xl md:text-6xl text-white font-normal leading-[1.1]">
              Good Projects Should Have a Next Batch.
            </h2>
            <p className="text-slate-400 font-body text-sm sm:text-base mt-4 leading-relaxed">
              Break the cycle of single-semester throwaway prototypes. ProjectLineage links previous engineering milestones with incoming capstone batches.
            </p>
          </div>

          {/* Project Selector */}
          <div className="flex flex-wrap gap-2">
            {SAMPLE_PROJECTS.slice(0, 3).map((p, idx) => (
              <button
                key={p.id}
                id={`lineage-project-${p.id}`}
                onClick={() => setSelectedProjectIndex(idx)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-mono-code transition-all cursor-pointer ${
                  selectedProjectIndex === idx
                    ? 'bg-indigo-500 text-white shadow-lg shadow-indigo-500/20'
                    : 'liquid-glass text-slate-400 hover:text-white border-white/10'
                }`}
              >
                {p.title.split(':')[0]}
              </button>
            ))}
          </div>
        </div>

        {/* Lineage Tree Header Banner */}
        <div className="liquid-glass rounded-2xl p-6 sm:p-8 mb-12 border border-white/10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <span className="text-[11px] font-mono-code text-indigo-300 uppercase tracking-widest block mb-1">
              Active Lineage Track
            </span>
            <h3 className="text-xl sm:text-2xl font-bold text-white font-body">
              {currentProject.title}
            </h3>
            <p className="text-sm text-slate-400 mt-1">
              Originated at {currentProject.institution} • {lineage.length} Sequential Batch Iterations
            </p>
          </div>

          <button
            id="continue-this-project-cta"
            onClick={() => onContinueProjectClick(currentProject.title)}
            className="px-6 py-3 rounded-full bg-white text-slate-950 hover:bg-slate-100 font-semibold text-sm transition-all shadow-lg flex items-center gap-2 cursor-pointer active:scale-95 shrink-0"
          >
            <GitFork className="w-4 h-4 text-slate-900" />
            <span>Continue This Project (Batch '26)</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Interactive Vertical Timeline */}
        <div className="relative border-l-2 border-indigo-500/30 ml-4 sm:ml-8 pl-6 sm:pl-10 space-y-12">
          {lineage.map((batch, idx) => {
            const isCurrent = batch.activeStatus === 'Current';
            const isRoadmap = batch.activeStatus === 'Upcoming Roadmap';
            return (
              <motion.div
                key={batch.year}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: idx * 0.15 }}
                className="relative"
              >
                {/* Timeline node icon */}
                <div
                  className={`absolute -left-[35px] sm:-left-[51px] top-1.5 w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center border-2 ${
                    isCurrent
                      ? 'bg-indigo-600 border-white text-white shadow-lg shadow-indigo-500/50'
                      : isRoadmap
                      ? 'bg-slate-900 border-amber-400/80 text-amber-300'
                      : 'bg-emerald-950 border-emerald-500 text-emerald-400'
                  }`}
                >
                  {isCurrent ? (
                    <Clock className="w-3 h-3 sm:w-4 sm:h-4 animate-spin-slow" />
                  ) : isRoadmap ? (
                    <Sparkles className="w-3 h-3 sm:w-4 sm:h-4" />
                  ) : (
                    <CheckCircle2 className="w-3 h-3 sm:w-4 sm:h-4" />
                  )}
                </div>

                {/* Batch Timeline Card */}
                <div className={`liquid-glass rounded-2xl p-6 sm:p-8 border transition-all duration-300 ${
                  isCurrent
                    ? 'border-indigo-500/40 bg-indigo-950/20 shadow-xl'
                    : isRoadmap
                    ? 'border-amber-500/30 bg-amber-950/10 border-dashed'
                    : 'border-white/10 hover:border-white/20'
                }`}>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 mb-4 border-b border-white/10 gap-3">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-mono-code text-sm font-bold text-indigo-400">
                          {batch.year}
                        </span>
                        <span className="text-slate-600">•</span>
                        <span className={`text-xs px-2 py-0.5 rounded-full font-semibold ${
                          isCurrent
                            ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30'
                            : isRoadmap
                            ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                            : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                        }`}>
                          {batch.activeStatus}
                        </span>
                      </div>
                      <h4 className="text-lg sm:text-xl font-bold text-white font-body">
                        {batch.batchName}
                      </h4>
                    </div>

                    <div className="flex items-center gap-4 text-xs font-mono-code text-slate-400">
                      {batch.commits > 0 && (
                        <span className="flex items-center gap-1">
                          <GitCommit className="w-3.5 h-3.5 text-indigo-400" />
                          {batch.commits} Commits
                        </span>
                      )}
                      {batch.pullRequests > 0 && (
                        <span className="flex items-center gap-1">
                          <GitPullRequest className="w-3.5 h-3.5 text-emerald-400" />
                          {batch.pullRequests} PRs
                        </span>
                      )}
                    </div>
                  </div>

                  <p className="text-sm text-slate-300 font-body mb-4 leading-relaxed">
                    {batch.summary}
                  </p>

                  {/* Milestones list */}
                  <div className="space-y-2 mb-6">
                    <span className="text-[11px] font-mono-code uppercase tracking-wider text-slate-400 block">
                      Key Delivered Milestones
                    </span>
                    {batch.keyMilestones.map((milestone, mIdx) => (
                      <div key={mIdx} className="flex items-start gap-2 text-xs sm:text-sm text-slate-300">
                        <span className="text-indigo-400 font-bold mt-0.5">•</span>
                        <span>{milestone}</span>
                      </div>
                    ))}
                  </div>

                  {/* Team Leads */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between pt-4 border-t border-white/10 gap-3 text-xs text-slate-400">
                    <div className="flex items-center gap-2">
                      <Users className="w-3.5 h-3.5 text-indigo-400" />
                      <span>Batch Leads: <strong className="text-slate-200">{batch.leadContributors.join(', ')}</strong></span>
                    </div>

                    {isRoadmap && (
                      <button
                        onClick={() => onContinueProjectClick(currentProject.title)}
                        className="text-amber-300 hover:text-amber-200 font-semibold flex items-center gap-1 self-start sm:self-auto cursor-pointer"
                      >
                        <span>Apply to Lead Batch '26</span>
                        <ArrowRight className="w-3 h-3" />
                      </button>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
