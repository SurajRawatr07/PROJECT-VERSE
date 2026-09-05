import React from 'react';
import { motion } from 'motion/react';
import { 
  TrendingUp, 
  Repeat2, 
  Network, 
  FastForward, 
  Award,
  ArrowUpRight
} from 'lucide-react';

export const ImpactSection: React.FC = () => {
  const impacts = [
    {
      title: 'LESS REPETITION',
      subtitle: 'Eliminate Wheel-Reinvention',
      desc: 'Discover and build directly on validated existing foundations rather than re-creating identical student prototypes every academic year.',
      metric: '70% Reduction in Redundant Setup',
      icon: Repeat2
    },
    {
      title: 'BETTER COLLABORATION',
      subtitle: 'Break University Silos',
      desc: 'Connect students, mentors, and faculty across leading global institutions based on complementary skill sets and shared technical curiosity.',
      metric: '3.4x Higher Multi-Disciplinary Reach',
      icon: Network
    },
    {
      title: 'PROJECT CONTINUITY',
      subtitle: 'Preserve Innovation Capital',
      desc: 'Ensure architecture context, benchmark results, and deployment code survive senior graduation to fuel future batch capstones.',
      metric: '100% Retained Architectural Lineage',
      icon: FastForward
    },
    {
      title: 'CREDIBLE SKILL EVIDENCE',
      subtitle: 'Verifiable Proof of Work',
      desc: 'Replace unverifiable resume claims with tamper-proof git telemetry and faculty rubric signoffs recognized by top engineering firms.',
      metric: 'Cryptographically Verified Transcripts',
      icon: Award
    }
  ];

  return (
    <section id="impact" className="relative w-full py-24 sm:py-32 px-4 sm:px-6 bg-[#040714] border-t border-white/5">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 sm:mb-20 gap-6">
          <div className="max-w-2xl">
            <span className="text-xs font-medium uppercase tracking-widest text-indigo-400 font-body">
              Measurable Academic Transformation
            </span>
            <h2 className="font-display text-3xl sm:text-5xl md:text-6xl text-white font-normal mt-3 leading-[1.1]">
              From One-Time Submission to Long-Term Value.
            </h2>
          </div>
          <p className="text-slate-400 font-body text-sm sm:text-base max-w-md leading-relaxed">
            Cultivating an enduring academic research flywheel that turns student effort into permanent intellectual capital.
          </p>
        </div>

        {/* 4 Impact Blocks */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {impacts.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="liquid-glass rounded-2xl p-7 sm:p-9 border border-white/10 flex flex-col justify-between hover:border-white/20 transition-all duration-300 group"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-indigo-400 group-hover:text-white group-hover:bg-indigo-600 transition-all">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-xs font-mono-code px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                      {item.metric}
                    </span>
                  </div>

                  <span className="text-[11px] font-mono-code uppercase tracking-wider text-indigo-300 block mb-1">
                    {item.subtitle}
                  </span>
                  <h3 className="font-body text-xl sm:text-2xl font-bold text-white mb-3">
                    {item.title}
                  </h3>

                  <p className="font-body text-sm text-slate-300 leading-relaxed">
                    {item.desc}
                  </p>
                </div>

                <div className="mt-8 pt-4 border-t border-white/10 flex items-center justify-between text-xs text-slate-400">
                  <span>ProjectVerse Ecosystem Metric</span>
                  <ArrowUpRight className="w-4 h-4 text-slate-500 group-hover:text-white transition-colors" />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
