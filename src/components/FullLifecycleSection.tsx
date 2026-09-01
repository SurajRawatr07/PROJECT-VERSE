import React from 'react';
import { motion } from 'motion/react';
import { 
  Lightbulb, 
  Users, 
  Code2, 
  FileSearch, 
  ShieldCheck, 
  GitFork, 
  Zap, 
  FastForward, 
  Award,
  ArrowRight
} from 'lucide-react';

export const FullLifecycleSection: React.FC = () => {
  const lifecycleStages = [
    { title: 'IDEA', icon: Lightbulb, desc: 'Problem formulation & baseline heritage lookup.' },
    { title: 'TEAM', icon: Users, desc: 'Cross-campus skill matching & role assignment.' },
    { title: 'DEVELOPMENT', icon: Code2, desc: 'Iterative Git engineering with automated CI.' },
    { title: 'REVIEW', icon: FileSearch, desc: 'Faculty rubric & milestone assessments.' },
    { title: 'VERIFICATION', icon: ShieldCheck, desc: 'Cryptographic Project Passport generation.' },
    { title: 'COLLABORATION', icon: GitFork, desc: 'Inter-collegiate testbeds & peer contributions.' },
    { title: 'IMPROVEMENT', icon: Zap, desc: 'Performance benchmarking & hardening.' },
    { title: 'CONTINUATION', icon: FastForward, desc: 'Next-batch roadmap handoff & inheritance.' },
    { title: 'PROOF OF WORK', icon: Award, desc: 'Permanent career credentials for contributors.' }
  ];

  return (
    <section id="full-lifecycle" className="relative w-full py-24 sm:py-32 px-4 sm:px-6 bg-[#040714] border-t border-white/5 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <span className="text-xs font-semibold uppercase tracking-widest text-indigo-400 font-body">
            Systematic Methodology
          </span>
          <h2 className="font-display text-3xl sm:text-5xl md:text-6xl text-white font-normal mt-3 leading-[1.1]">
            From Ideation to Permanent Proof.
          </h2>
          <p className="text-slate-400 font-body text-sm sm:text-base mt-4 max-w-2xl mx-auto leading-relaxed">
            A cohesive 9-step continuous loop ensuring every student contribution accumulates enduring academic value.
          </p>
        </div>

        {/* 9-Step Roadmap Flow */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
          {lifecycleStages.map((stage, idx) => {
            const Icon = stage.icon;
            return (
              <motion.div
                key={stage.title}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                className="liquid-glass rounded-2xl p-6 border border-white/10 flex flex-col justify-between hover:border-indigo-400/30 transition-all duration-300 group"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-indigo-400 group-hover:bg-indigo-500 group-hover:text-white transition-all">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-xs font-mono-code text-slate-500 font-bold">
                      PHASE 0{idx + 1}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-white font-body mb-2 tracking-wide">
                    {stage.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-300 font-body leading-relaxed">
                    {stage.desc}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-[11px] text-slate-400 font-mono-code">
                  <span>Continuous Pipeline</span>
                  {idx < 8 ? (
                    <ArrowRight className="w-3.5 h-3.5 text-indigo-400 group-hover:translate-x-1 transition-transform" />
                  ) : (
                    <span className="text-emerald-400 font-bold">Accumulated Value</span>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
