import React from 'react';
import { motion } from 'motion/react';
import { FileCheck2, GitBranch, Sparkles, Code2, ShieldCheck } from 'lucide-react';

export const CoreInnovationsSection: React.FC = () => {
  const capabilities = [
    {
      title: 'Project Passport',
      desc: 'A verified academic identity and credential record for every project.',
      icon: FileCheck2
    },
    {
      title: 'Project Lineage',
      desc: 'Visualize and manage how projects evolve and expand across cohorts.',
      icon: GitBranch
    },
    {
      title: 'AI Matching',
      desc: 'Find relevant research, interdisciplinary teammates and faculty advisors.',
      icon: Sparkles
    },
    {
      title: 'GitHub Evidence',
      desc: 'Connect tangible technical commits and documentation with academic credits.',
      icon: Code2
    },
    {
      title: 'Verification',
      desc: 'Build authentic institutional trust through structured departmental review.',
      icon: ShieldCheck
    }
  ];

  return (
    <section id="innovations" className="relative w-full py-16 sm:py-20 md:py-24 px-4 sm:px-6 bg-[#F7F7F5] border-t border-black/8 font-serif">
      <div className="max-w-5xl mx-auto">
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14">
          <span className="text-[11px] sm:text-[12px] uppercase tracking-[0.2em] text-[#737373] font-bold block mb-2">
            CORE FEATURES
          </span>
          <h2 className="text-[26px] sm:text-[32px] md:text-[38px] text-[#111111] font-bold tracking-tight uppercase">
            Platform Capabilities
          </h2>
          <p className="text-[14px] sm:text-[15px] text-[#4A4A4A] mt-2 leading-relaxed">
            Engineered specifically to solve academic project abandonment and lack of institutional memory.
          </p>
        </div>

        {/* 5 Clean Capability Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {capabilities.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: idx * 0.05 }}
                className="card-white p-6 sm:p-7 flex flex-col justify-between group hover:border-black/20 hover:-translate-y-1 transition-all duration-200"
              >
                <div>
                  <div className="w-10 h-10 rounded-xl bg-[#F5F5F3] border border-black/6 flex items-center justify-center text-[#111111] mb-5 group-hover:bg-[#111111] group-hover:text-white transition-colors duration-200">
                    <Icon className="w-5 h-5" />
                  </div>

                  <h3 className="text-[19px] sm:text-[21px] font-bold text-[#111111] mb-2 tracking-wide">
                    {item.title}
                  </h3>

                  <p className="text-[14px] sm:text-[15px] text-[#4A4A4A] leading-relaxed tracking-wide">
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
