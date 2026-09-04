import React from 'react';
import { motion } from 'motion/react';
import { 
  Compass, 
  Users2, 
  ShieldCheck, 
  FastForward, 
  ArrowRight,
  GraduationCap,
  Building2,
  BookOpen,
  FolderGit2
} from 'lucide-react';
import { ProjectVerseLogo } from './ProjectVerseLogo';

interface AboutViewProps {
  onGetStarted: () => void;
  onExploreHowItWorks: () => void;
}

export const AboutView: React.FC<AboutViewProps> = ({
  onGetStarted,
  onExploreHowItWorks
}) => {
  const pillars = [
    {
      title: 'Discover',
      desc: 'Find verified academic work across disciplines and universities.',
      icon: Compass
    },
    {
      title: 'Collaborate',
      desc: 'Connect students, faculty mentors, and domain specialists.',
      icon: Users2
    },
    {
      title: 'Verify',
      desc: 'Anchor credibility through GitHub metrics and institutional review.',
      icon: ShieldCheck
    },
    {
      title: 'Continue',
      desc: 'Pass mature codebases forward so future batches can build further.',
      icon: FastForward
    }
  ];

  const stakeholders = [
    { label: 'Students', icon: GraduationCap, desc: 'Creators and contributors' },
    { label: 'Projects', icon: FolderGit2, desc: 'Verifiable academic assets' },
    { label: 'Faculty', icon: BookOpen, desc: 'Mentors and evaluators' },
    { label: 'Institutions', icon: Building2, desc: 'Universities and departments' }
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
            About ProjectVerse
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.18 }}
            className="mt-4 text-[15px] sm:text-[16px] md:text-[17px] text-[#4A4A4A] leading-relaxed tracking-wide"
          >
            A connected academic technology platform where student projects continue across batches.
          </motion.p>
        </div>

        {/* 4 Core Pillars */}
        <div className="mb-14 sm:mb-16">
          <h2 className="text-[20px] sm:text-[22px] md:text-[24px] font-bold text-[#111111] mb-6 text-center tracking-tight uppercase">
            Four Core Pillars
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {pillars.map((item, idx) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: idx * 0.05 }}
                  className="card-white p-6 flex flex-col justify-between group hover:border-black/15 transition-all duration-200"
                >
                  <div>
                    <div className="w-10 h-10 rounded-xl bg-[#F5F5F3] border border-black/6 flex items-center justify-center text-[#111111] mb-4 group-hover:bg-[#111111] group-hover:text-white transition-colors duration-200">
                      <Icon className="w-4 h-4" />
                    </div>
                    <h3 className="text-[18px] sm:text-[20px] font-bold text-[#111111] mb-1.5 tracking-wide">
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

        {/* Connected Ecosystem */}
        <div className="mb-14 sm:mb-16">
          <h2 className="text-[20px] sm:text-[22px] md:text-[24px] font-bold text-[#111111] mb-6 text-center tracking-tight uppercase">
            The Connected Ecosystem
          </h2>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {stakeholders.map((s, idx) => {
              const Icon = s.icon;
              return (
                <motion.div
                  key={s.label}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: idx * 0.04 }}
                  className="card-white p-5 text-center flex flex-col items-center justify-center"
                >
                  <div className="w-9 h-9 rounded-xl bg-[#F5F5F3] border border-black/6 flex items-center justify-center text-[#111111] mb-3">
                    <Icon className="w-4 h-4" />
                  </div>
                  <h4 className="text-[16px] sm:text-[17px] font-bold text-[#111111] mb-1">
                    {s.label}
                  </h4>
                  <p className="text-[12.5px] sm:text-[13px] text-[#737373]">
                    {s.desc}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* CLEAR Actions */}
        <div className="card-white p-8 sm:p-10 text-center border border-black/8">
          <h3 className="text-[22px] sm:text-[26px] font-bold text-[#111111] mb-2 uppercase tracking-tight">
            Give Your Project a Future.
          </h3>
          <p className="text-[14px] sm:text-[15px] text-[#4A4A4A] mb-6 max-w-md mx-auto tracking-wide">
            Build verified academic work and pass it forward.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={onGetStarted}
              className="btn-primary-black w-full sm:w-auto px-6 py-2.5 rounded-full inline-flex items-center justify-center gap-2 cursor-pointer text-[15px] font-medium shadow-xs tracking-wide"
            >
              <span>Get Started</span>
              <ArrowRight className="w-4 h-4 text-white" />
            </button>
            <button
              onClick={onExploreHowItWorks}
              className="btn-secondary-white w-full sm:w-auto px-6 py-2.5 rounded-full inline-flex items-center justify-center gap-2 cursor-pointer text-[15px] font-medium shadow-xs hover:border-black/20 tracking-wide"
            >
              <span>How It Works</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutView;
