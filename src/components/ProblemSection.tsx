import React from 'react';
import { motion } from 'motion/react';
import { SearchX, CopySlash, History } from 'lucide-react';

export const ProblemSection: React.FC = () => {
  const problems = [
    {
      num: '01',
      title: 'Hard to Discover',
      desc: 'Valuable projects get buried after submission.',
      icon: SearchX
    },
    {
      num: '02',
      title: 'Repeated Work',
      desc: 'Students often rebuild what already exists.',
      icon: CopySlash
    },
    {
      num: '03',
      title: 'No Continuity',
      desc: 'Projects rarely continue across batches.',
      icon: History
    }
  ];

  return (
    <section id="problem" className="relative w-full py-20 sm:py-28 px-4 sm:px-6 bg-[#F7F7F5] border-t border-black/8 font-serif">
      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <span className="text-[12px] uppercase tracking-widest text-[#737373] font-semibold">
            The Academic Challenge
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl text-[#111111] font-bold tracking-tight mt-2">
            Projects End Too Soon.
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#4A4A4A] leading-relaxed tracking-wide">
            Without an active ecosystem, valuable student work disappears the moment grades are submitted.
          </p>
        </div>

        {/* 3 Concise Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
          {problems.map((prob, idx) => {
            const Icon = prob.icon;
            return (
              <motion.div
                key={prob.title}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: idx * 0.08 }}
                className="card-white p-6 sm:p-7 flex flex-col justify-between group hover:border-black/15 transition-all duration-200"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <span className="text-xs text-[#737373] font-bold tracking-wider">
                      {prob.num}
                    </span>
                    <div className="w-10 h-10 rounded-xl bg-[#F5F5F3] border border-black/6 flex items-center justify-center text-[#111111] group-hover:bg-[#111111] group-hover:text-white transition-colors duration-200">
                      <Icon className="w-4 h-4" />
                    </div>
                  </div>

                  <h3 className="text-base sm:text-lg font-bold text-[#111111] mb-2 tracking-wide">
                    {prob.title}
                  </h3>

                  <p className="text-sm text-[#4A4A4A] leading-relaxed tracking-wide">
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

export default ProblemSection;
