import React from 'react';
import { motion } from 'motion/react';
import { FileCheck2, GitBranch, Sparkles } from 'lucide-react';

export const CoreInnovationsSection: React.FC = () => {
  const innovations = [
    {
      num: '01',
      title: 'PROJECT PASSPORT',
      desc: 'Every project gets a structured academic identity with contributions, documentation, GitHub activity and verification.',
      icon: FileCheck2
    },
    {
      num: '02',
      title: 'PROJECT LINEAGE',
      desc: 'Project history stays connected so future students can understand, improve and continue existing work.',
      icon: GitBranch
    },
    {
      num: '03',
      title: 'AI MATCHING',
      desc: 'Skill-based recommendations connect students with relevant projects, teammates and mentors.',
      icon: Sparkles
    }
  ];

  return (
    <section id="innovations" className="relative w-full py-20 sm:py-28 px-4 sm:px-6 bg-[#0A0F14] border-t border-white/5 transition-colors duration-300">
      <div className="max-w-5xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl text-white font-normal">
            Three Core Innovations
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {innovations.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.num}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.12 }}
                className="liquid-glass-elevated rounded-2xl p-7 sm:p-8 flex flex-col justify-between border border-white/10 hover:border-indigo-400/40 transition-all duration-300 group"
              >
                <div>
                  <div className="flex items-center justify-between mb-8">
                    <span className="font-mono-code text-xs text-indigo-400 dark:text-indigo-300 font-bold px-2.5 py-1 rounded-full bg-indigo-500/10 border border-indigo-400/20">
                      {item.num}
                    </span>
                    <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-300 group-hover:text-indigo-400 group-hover:bg-white/10 transition-all">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  <h3 className="font-mono-code text-sm font-semibold text-white tracking-wider uppercase mb-3">
                    {item.title}
                  </h3>

                  <p className="font-body text-sm text-slate-300/90 leading-relaxed">
                    {item.desc}
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
