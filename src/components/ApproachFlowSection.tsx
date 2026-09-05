import React from 'react';
import { motion } from 'motion/react';
import { Compass, Code2, ShieldCheck, Users2, FastForward } from 'lucide-react';

export const ApproachFlowSection: React.FC = () => {
  const flowSteps = [
    { 
      label: 'Discover', 
      desc: 'Find verified projects across domains and institutions.',
      icon: Compass 
    },
    { 
      label: 'Build', 
      desc: 'Assemble teammates and mentors with complementary skills.',
      icon: Code2 
    },
    { 
      label: 'Verify', 
      desc: 'Connect repositories and academic evaluations.',
      icon: ShieldCheck 
    },
    { 
      label: 'Collaborate', 
      desc: 'Work across batches, faculties, and partner campuses.',
      icon: Users2 
    },
    { 
      label: 'Continue', 
      desc: 'Hand mature work forward to the next batch.',
      icon: FastForward 
    }
  ];

  return (
    <section id="approach-flow" className="relative w-full py-16 sm:py-20 md:py-24 px-4 sm:px-6 bg-[#FFFFFF] border-t border-black/8 overflow-hidden font-serif">
      <div className="max-w-6xl mx-auto text-center">
        {/* Section Heading: 32–40px Desktop, 28–34px Tablet, 26–30px Mobile */}
        <h2 className="text-[26px] sm:text-[30px] md:text-[36px] text-[#111111] font-bold tracking-tight uppercase mb-6 sm:mb-8">
          From Idea to Impact.
        </h2>

        {/* Horizontal Flow Indicator */}
        <div className="flex items-center justify-center flex-wrap gap-2 sm:gap-3 mb-10 sm:mb-12 py-2 px-5 sm:px-7 rounded-full bg-[#F5F5F3] border border-black/8 w-max mx-auto text-[13px] sm:text-[14px] font-medium text-[#111111] tracking-wider uppercase">
          <span>Discover</span>
          <span className="text-[#8C8C8C]">→</span>
          <span>Build</span>
          <span className="text-[#8C8C8C]">→</span>
          <span>Verify</span>
          <span className="text-[#8C8C8C]">→</span>
          <span>Collaborate</span>
          <span className="text-[#8C8C8C]">→</span>
          <span>Continue</span>
        </div>

        {/* 5 Step Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 text-left">
          {flowSteps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.label}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.25, delay: idx * 0.05 }}
                className="card-white p-5 flex flex-col justify-between border border-black/8 hover:border-black/20 group transition-all duration-200"
              >
                <div>
                  <div className="w-9 h-9 rounded-xl bg-[#F5F5F3] border border-black/6 flex items-center justify-center text-[#111111] mb-4 group-hover:bg-[#111111] group-hover:text-white transition-colors duration-200">
                    <Icon className="w-4 h-4" />
                  </div>

                  <h3 className="text-[18px] sm:text-[19px] md:text-[20px] font-bold text-[#111111] mb-2 tracking-wide">
                    {step.label}
                  </h3>

                  <p className="text-[13px] sm:text-[14px] text-[#4A4A4A] leading-relaxed tracking-wide">
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
