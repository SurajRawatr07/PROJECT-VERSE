import React from 'react';
import { motion } from 'motion/react';
import { Compass, Code2, ShieldCheck, Users2, FastForward, ArrowRight, ArrowDown } from 'lucide-react';

export const ApproachFlowSection: React.FC = () => {
  const flowSteps = [
    { 
      label: 'DISCOVER', 
      desc: 'Find relevant projects by domain, technology, skills and requirements.',
      icon: Compass 
    },
    { 
      label: 'BUILD', 
      desc: 'Work with the right teammates, mentors and resources.',
      icon: Code2 
    },
    { 
      label: 'VERIFY', 
      desc: 'Build credibility through GitHub activity, faculty review and institutional validation.',
      icon: ShieldCheck 
    },
    { 
      label: 'COLLABORATE', 
      desc: 'Connect with students and mentors beyond your own campus.',
      icon: Users2 
    },
    { 
      label: 'CONTINUE', 
      desc: 'Help future students understand, improve and extend existing work.',
      icon: FastForward 
    }
  ];

  return (
    <section id="approach-flow" className="relative w-full py-20 sm:py-28 px-4 sm:px-6 bg-[#FFFFFF] border-t border-black/8 overflow-hidden">
      <div className="max-w-6xl mx-auto text-center">
        {/* Section Heading */}
        <span className="text-xs font-mono-code uppercase tracking-widest text-[#737373] font-semibold">
          Ecosystem Approach
        </span>
        <h2 className="font-display text-3xl sm:text-4xl md:text-5xl text-[#111111] font-normal mt-2">
          A Better Lifecycle for Academic Projects
        </h2>
        <p className="mt-4 font-body text-sm sm:text-base text-[#4A4A4A] max-w-2xl mx-auto leading-relaxed mb-12 sm:mb-16">
          ProjectVerse connects project discovery, collaboration, verification and continuity in one ecosystem.
        </p>

        {/* Process Flow Badge Chain */}
        <div className="hidden lg:flex items-center justify-center gap-2 mb-10 py-2.5 px-6 rounded-full bg-[#F5F5F3] border border-black/8 w-max mx-auto font-mono-code text-xs font-semibold text-[#111111]">
          <span>DISCOVER</span>
          <span className="text-[#737373]">→</span>
          <span>BUILD</span>
          <span className="text-[#737373]">→</span>
          <span>VERIFY</span>
          <span className="text-[#737373]">→</span>
          <span>COLLABORATE</span>
          <span className="text-[#737373]">→</span>
          <span>CONTINUE</span>
        </div>

        {/* 5 Step Cards with Short Explanations */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 lg:gap-5 text-left">
          {flowSteps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.label}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: idx * 0.06 }}
                className="card-white p-5 sm:p-6 flex flex-col justify-between border border-black/8 hover:border-black/20 transition-all duration-200"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 rounded-xl bg-[#F5F5F3] border border-black/6 flex items-center justify-center text-[#111111]">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="font-mono-code text-[11px] text-[#737373] font-semibold">
                      0{idx + 1}
                    </span>
                  </div>

                  <h3 className="font-mono-code text-xs font-bold tracking-wider text-[#111111] mb-2 uppercase">
                    {step.label}
                  </h3>

                  <p className="font-body text-xs sm:text-[13px] text-[#4A4A4A] leading-relaxed">
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
