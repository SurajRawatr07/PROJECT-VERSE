import React from 'react';
import { motion } from 'motion/react';
import { 
  Compass, 
  Code2, 
  ShieldCheck, 
  Users2, 
  FastForward, 
  ArrowRight,
  Sparkles
} from 'lucide-react';
import { ProjectVerseLogo } from './ProjectVerseLogo';

interface HowItWorksViewProps {
  onGetStarted: () => void;
  onExploreProjects?: () => void;
}

export const HowItWorksView: React.FC<HowItWorksViewProps> = ({ 
  onGetStarted,
  onExploreProjects 
}) => {
  const steps = [
    {
      num: '01',
      title: 'Discover',
      desc: 'Search verified academic work by college, tech stack, and discipline.',
      icon: Compass
    },
    {
      num: '02',
      title: 'Build',
      desc: 'Form teams with matched skills and connect active GitHub repositories.',
      icon: Code2
    },
    {
      num: '03',
      title: 'Verify',
      desc: 'Get validated through technical commit proof and faculty evaluation.',
      icon: ShieldCheck
    },
    {
      num: '04',
      title: 'Collaborate',
      desc: 'Work across batches and invite cross-department contributors.',
      icon: Users2
    },
    {
      num: '05',
      title: 'Continue',
      desc: 'Pass projects forward with structured passports and lineage history.',
      icon: FastForward
    }
  ];

  return (
    <div className="w-full min-h-screen bg-[#FFFFFF] text-[#111111] pt-32 sm:pt-36 pb-20 sm:pb-24 px-4 sm:px-6 font-serif">
      <div className="max-w-4xl mx-auto">
        {/* ONE Clear Heading & Short Description */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FAFAFA] border border-black/8 shadow-xs mb-6"
          >
            <ProjectVerseLogo size={16} color="#111111" />
            <span className="text-[12px] uppercase tracking-widest text-[#4A4A4A] font-medium">
              Academic Projects • Connected People • Continuous Progress
            </span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.1 }}
            className="text-[32px] sm:text-[38px] md:text-[44px] text-[#111111] font-bold tracking-tight uppercase"
          >
            How ProjectVerse Works
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.18 }}
            className="mt-4 text-[15px] sm:text-[16px] md:text-[17px] text-[#4A4A4A] leading-relaxed tracking-wide"
          >
            A simple five-stage lifecycle designed to turn classroom projects into permanent academic assets.
          </motion.p>
        </div>

        {/* 5 Clean Steps in Sequential Flow */}
        <div className="space-y-4 sm:space-y-5 mb-14 sm:mb-16">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: idx * 0.05 }}
                className="card-white p-6 sm:p-7 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border border-black/8 hover:border-black/15 transition-all duration-200"
              >
                <div className="flex items-start sm:items-center gap-4">
                  <div className="w-11 h-11 rounded-xl bg-[#F5F5F3] border border-black/6 flex items-center justify-center text-[#111111] shrink-0">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[12px] font-bold text-[#737373] tracking-wider">
                        STEP {step.num}
                      </span>
                    </div>
                    <h3 className="text-[19px] sm:text-[21px] font-bold text-[#111111] tracking-wide">
                      {step.title}
                    </h3>
                    <p className="text-[14px] sm:text-[15px] text-[#4A4A4A] leading-relaxed tracking-wide mt-0.5">
                      {step.desc}
                    </p>
                  </div>
                </div>

                <div className="shrink-0 self-end sm:self-center">
                  <span className="text-xs px-3 py-1 rounded-full bg-[#F5F5F3] border border-black/6 text-[#4A4A4A] font-medium tracking-wide">
                    Phase {idx + 1}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* CLEAR Actions */}
        <div className="card-white p-8 sm:p-10 text-center border border-black/8">
          <h3 className="text-[22px] sm:text-[26px] font-bold text-[#111111] mb-2 uppercase tracking-tight">
            Ready to Begin?
          </h3>
          <p className="text-[14px] sm:text-[15px] text-[#4A4A4A] mb-6 max-w-md mx-auto tracking-wide">
            Start exploring projects or register to build your project passport.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={onGetStarted}
              className="btn-primary-black w-full sm:w-auto px-6 py-2.5 rounded-full inline-flex items-center justify-center gap-2 cursor-pointer text-[15px] font-medium shadow-xs tracking-wide"
            >
              <span>Get Started</span>
              <ArrowRight className="w-4 h-4 text-white" />
            </button>
            {onExploreProjects && (
              <button
                onClick={onExploreProjects}
                className="btn-secondary-white w-full sm:w-auto px-6 py-2.5 rounded-full inline-flex items-center justify-center gap-2 cursor-pointer text-[15px] font-medium shadow-xs hover:border-black/20 tracking-wide"
              >
                <span>Explore Projects</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowItWorksView;
