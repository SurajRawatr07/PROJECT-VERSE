import React from 'react';
import { motion } from 'motion/react';
import { SearchX, CopySlash, History } from 'lucide-react';

export const ProblemSection: React.FC = () => {
  const problems = [
    {
      num: '01',
      title: 'HARD TO DISCOVER',
      desc: 'Valuable academic work remains scattered across institutions without a central repository.',
      icon: SearchX
    },
    {
      num: '02',
      title: 'REPEATED WORK',
      desc: 'Incoming student cohorts frequently re-engineer existing starter applications from scratch.',
      icon: CopySlash
    },
    {
      num: '03',
      title: 'NO CONTINUITY',
      desc: 'High-potential capstone projects lose their domain knowledge as soon as the batch graduates.',
      icon: History
    }
  ];

  return (
    <section id="problem" className="relative w-full py-20 sm:py-28 px-4 sm:px-6 bg-[#F7F7F5] border-t border-black/8">
      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <span className="text-xs font-mono-code uppercase tracking-widest text-[#737373] font-semibold">
            The Academic Challenge
          </span>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl text-[#111111] font-normal leading-tight mt-2">
            “Good Projects Shouldn’t Disappear After Submission.”
          </h2>
        </div>

        {/* 3 Minimal Problem Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
          {problems.map((prob, idx) => {
            const Icon = prob.icon;
            return (
              <motion.div
                key={prob.num}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                className="card-white p-6 sm:p-7 flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="font-mono-code text-xs text-[#737373] font-medium">
                      {prob.num}
                    </span>
                    <div className="w-9 h-9 rounded-xl bg-[#F5F5F3] border border-black/6 flex items-center justify-center text-[#111111]">
                      <Icon className="w-4 h-4" />
                    </div>
                  </div>

                  <h3 className="font-mono-code text-xs sm:text-sm font-semibold text-[#111111] mb-2 tracking-wider uppercase">
                    {prob.title}
                  </h3>

                  <p className="font-body text-sm text-[#4A4A4A] leading-relaxed">
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
