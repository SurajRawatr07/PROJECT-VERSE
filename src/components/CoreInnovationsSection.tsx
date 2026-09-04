import React from 'react';
import { motion } from 'motion/react';
import { FileCheck2, GitBranch, Sparkles } from 'lucide-react';

export const CoreInnovationsSection: React.FC = () => {
  const innovations = [
    {
      num: '01',
      title: 'PROJECT PASSPORT',
      desc: 'A structured identity for every project.',
      icon: FileCheck2
    },
    {
      num: '02',
      title: 'PROJECT LINEAGE',
      desc: 'Track how a project evolves across batches.',
      icon: GitBranch
    },
    {
      num: '03',
      title: 'AI MATCHING',
      desc: 'Find relevant projects, teammates and mentors.',
      icon: Sparkles
    }
  ];

  return (
    <section id="innovations" className="relative w-full py-20 sm:py-28 px-4 sm:px-6 bg-[#F7F7F5] border-t border-black/8 font-serif">
      <div className="max-w-5xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <span className="text-[12px] uppercase tracking-widest text-[#737373] font-semibold">
            Platform Capabilities
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl text-[#111111] font-bold tracking-tight mt-2">
            Core Innovations
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#4A4A4A] leading-relaxed tracking-wide">
            Three foundational pillars powering verifiable academic continuity.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {innovations.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.num}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: idx * 0.08 }}
                className="card-white p-7 sm:p-8 flex flex-col justify-between group hover:border-black/15 transition-all duration-200"
              >
                <div>
                  <div className="flex items-center justify-between mb-8">
                    <span className="text-xs text-[#111111] font-bold px-2.5 py-1 rounded-full bg-[#F5F5F3] border border-black/8 tracking-wider">
                      {item.num}
                    </span>
                    <div className="w-10 h-10 rounded-xl bg-[#F5F5F3] border border-black/6 flex items-center justify-center text-[#111111] group-hover:bg-[#111111] group-hover:text-white transition-colors duration-200">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  <h3 className="text-sm sm:text-[15px] font-bold text-[#111111] tracking-wider uppercase mb-2.5">
                    {item.title}
                  </h3>

                  <p className="text-sm text-[#4A4A4A] leading-relaxed tracking-wide">
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

export default CoreInnovationsSection;
