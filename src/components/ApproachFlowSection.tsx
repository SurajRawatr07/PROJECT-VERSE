import React from 'react';
import { motion } from 'motion/react';
import { Compass, Code2, ShieldCheck, Users2, FastForward } from 'lucide-react';

export const ApproachFlowSection: React.FC = () => {
  const flowSteps = [
    { 
      label: 'DISCOVER', 
      desc: 'Find verified work by domain, stack, and institutional track.',
      icon: Compass 
    },
    { 
      label: 'BUILD', 
      desc: 'Assemble teammates and advisors with matched skills.',
      icon: Code2 
    },
    { 
      label: 'VERIFY', 
      desc: 'Anchor credibility via GitHub activity and academic sign-off.',
      icon: ShieldCheck 
    },
    { 
      label: 'COLLABORATE', 
      desc: 'Work across batches, faculties, and partner campuses.',
      icon: Users2 
    },
    { 
      label: 'CONTINUE', 
      desc: 'Pass mature codebases forward for future student iterations.',
      icon: FastForward 
    }
  ];

  return (
    <section id="approach-flow" className="relative w-full py-20 sm:py-28 px-4 sm:px-6 bg-[#FFFFFF] border-t border-black/8 overflow-hidden font-serif">
      <div className="max-w-6xl mx-auto text-center">
        {/* Eyebrow & Headline */}
        <span className="text-[12px] uppercase tracking-widest text-[#737373] font-semibold">
          Ecosystem Approach
        </span>
        <h2 className="text-3xl sm:text-4xl md:text-5xl text-[#111111] font-bold tracking-tight mt-2">
          A Continuous Academic Lifecycle
        </h2>
        <p className="mt-3 text-sm sm:text-base text-[#4A4A4A] max-w-xl mx-auto leading-relaxed mb-10 sm:mb-14 tracking-wide">
          Five cohesive stages designed to turn isolated submissions into lasting assets.
        </p>

        {/* Desktop Horizontal Flow Chain Badge */}
        <div className="hidden lg:flex items-center justify-center gap-3 mb-10 py-2.5 px-6 rounded-full bg-[#F5F5F3] border border-black/8 w-max mx-auto text-xs font-bold text-[#111111] tracking-wider">
          <span>DISCOVER</span>
          <span className="text-[#8C8C8C]">→</span>
          <span>BUILD</span>
          <span className="text-[#8C8C8C]">→</span>
          <span>VERIFY</span>
          <span className="text-[#8C8C8C]">→</span>
          <span>COLLABORATE</span>
          <span className="text-[#8C8C8C]">→</span>
          <span>CONTINUE</span>
        </div>

        {/* 5 Step Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 text-left">
          {flowSteps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.label}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: idx * 0.05 }}
                className="card-white p-5 flex flex-col justify-between border border-black/8 hover:border-black/20 group transition-all duration-200"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-9 h-9 rounded-xl bg-[#F5F5F3] border border-black/6 flex items-center justify-center text-[#111111] group-hover:bg-[#111111] group-hover:text-white transition-colors duration-200">
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className="text-xs text-[#737373] font-bold tracking-wider">
                      0{idx + 1}
                    </span>
                  </div>

                  <h3 className="text-xs font-bold tracking-wider text-[#111111] mb-2 uppercase">
                    {step.label}
                  </h3>

                  <p className="text-xs sm:text-[13.5px] text-[#4A4A4A] leading-relaxed tracking-wide">
                    {step.desc}
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

export default ApproachFlowSection;
