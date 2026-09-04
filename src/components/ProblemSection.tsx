import React from 'react';
import { motion } from 'motion/react';
import { SearchX, CopySlash, History } from 'lucide-react';

export const ProblemSection: React.FC = () => {
  const problems = [
    {
      title: 'Hard to Discover',
      desc: 'Good projects get buried after submission.',
      icon: SearchX
    },
    {
      title: 'Repeated Work',
      desc: 'Students often rebuild existing ideas.',
      icon: CopySlash
    },
    {
      title: 'No Continuity',
      desc: 'Projects rarely continue across batches.',
      icon: History
    }
  ];

  return (
    <section id="problem" className="relative w-full py-16 sm:py-20 md:py-24 px-4 sm:px-6 bg-[#F7F7F5] border-t border-black/8 font-serif">
      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14">
          <h2 className="text-[26px] sm:text-[30px] md:text-[36px] text-[#111111] font-bold tracking-tight uppercase">
            Why ProjectVerse?
          </h2>
        </div>

        {/* 3 Concise Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
          {problems.map((prob, idx) => {
            const Icon = prob.icon;
            return (
              <motion.div
                key={prob.title}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: idx * 0.06 }}
                className="card-white p-6 sm:p-7 flex flex-col justify-between group hover:border-black/15 transition-all duration-200"
              >
                <div>
                  <div className="w-10 h-10 rounded-xl bg-[#F5F5F3] border border-black/6 flex items-center justify-center text-[#111111] mb-5 group-hover:bg-[#111111] group-hover:text-white transition-colors duration-200">
                    <Icon className="w-4 h-4" />
                  </div>

                  {/* Card heading: 20–24px Desktop, 18–21px Mobile */}
                  <h3 className="text-[19px] sm:text-[21px] md:text-[22px] font-bold text-[#111111] mb-2 tracking-wide">
                    {prob.title}
                  </h3>

                  {/* Body text: 16–18px Desktop, 14–16px Mobile */}
                  <p className="text-[14px] sm:text-[15px] md:text-[16px] text-[#4A4A4A] leading-relaxed tracking-wide">
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
