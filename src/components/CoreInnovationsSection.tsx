import React from 'react';
import { motion } from 'motion/react';
import { FileCheck2, GitBranch, Sparkles } from 'lucide-react';

export const CoreInnovationsSection: React.FC = () => {
  const innovations = [
    {
      num: '01',
      title: 'PROJECT PASSPORT',
      desc: 'Every project receives a structured academic identity documenting architectural decisions, contributions, GitHub telemetry, and formal validation.',
      icon: FileCheck2
    },
    {
      num: '02',
      title: 'PROJECT LINEAGE',
      desc: 'Inheritance trees keep research and codebase history connected so incoming batches can understand, improve, and extend prior milestones.',
      icon: GitBranch
    },
    {
      num: '03',
      title: 'AI MATCHING',
      desc: 'Domain and skill-based algorithms recommend complementary team contributors, active research projects, and verified inter-university faculty advisors.',
      icon: Sparkles
    }
  ];

  return (
    <section id="innovations" className="relative w-full py-20 sm:py-28 px-4 sm:px-6 bg-[#F7F7F5] border-t border-black/8">
      <div className="max-w-5xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <span className="text-xs font-mono-code uppercase tracking-widest text-[#737373] font-semibold">
            Platform Capabilities
          </span>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl text-[#111111] font-normal mt-2">
            Three Core Innovations
          </h2>
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
                transition={{ duration: 0.45, delay: idx * 0.08 }}
                className="card-white p-7 sm:p-8 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-8">
                    <span className="font-mono-code text-xs text-[#111111] font-bold px-2.5 py-1 rounded-full bg-[#F5F5F3] border border-black/8">
                      {item.num}
                    </span>
                    <div className="w-10 h-10 rounded-xl bg-[#F5F5F3] border border-black/6 flex items-center justify-center text-[#111111]">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  <h3 className="font-mono-code text-xs sm:text-sm font-semibold text-[#111111] tracking-wider uppercase mb-3">
                    {item.title}
                  </h3>

                  <p className="font-body text-sm text-[#4A4A4A] leading-relaxed">
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
