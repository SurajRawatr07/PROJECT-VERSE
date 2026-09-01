import React from 'react';
import { motion } from 'motion/react';
import { SearchX, CopySlash, History } from 'lucide-react';

export const ProblemSection: React.FC = () => {
  const problems = [
    {
      num: '01',
      title: 'HARD TO DISCOVER',
      desc: 'Valuable academic work remains scattered across institutions.',
      icon: SearchX
    },
    {
      num: '02',
      title: 'REPEATED WORK',
      desc: 'Students often rebuild solutions that already exist.',
      icon: CopySlash
    },
    {
      num: '03',
      title: 'NO CONTINUITY',
      desc: 'Useful projects lose their knowledge when a batch graduates.',
      icon: History
    }
  ];

  return (
    <section id="problem" className="relative w-full py-20 sm:py-28 px-4 sm:px-6 bg-[#0A0F14] border-t border-white/5 transition-colors duration-300">
      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl text-white font-normal leading-tight">
            “Good Projects Shouldn’t Disappear After Submission.”
          </h2>
        </div>

        {/* 3 Short Problem Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
          {problems.map((prob, idx) => {
            const Icon = prob.icon;
            return (
              <motion.div
                key={prob.num}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: idx * 0.1 }}
                className="liquid-glass rounded-2xl p-6 sm:p-7 flex flex-col justify-between hover:border-white/20 transition-all duration-300 group"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="font-mono-code text-xs text-slate-500 font-medium">
                      {prob.num}
                    </span>
                    <div className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 group-hover:text-white group-hover:bg-white/10 transition-all">
                      <Icon className="w-4 h-4" />
                    </div>
                  </div>

                  <h3 className="font-mono-code text-sm font-semibold text-white mb-2 tracking-wider uppercase">
                    {prob.title}
                  </h3>

                  <p className="font-body text-sm text-slate-300/90 leading-relaxed">
                    {prob.desc}
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
