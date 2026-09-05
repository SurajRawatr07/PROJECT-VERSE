import React from 'react';
import { motion } from 'motion/react';
import { 
  UserRoundPlus, 
  ShieldCheck, 
  Search, 
  Users, 
  FileCheck2, 
  GitBranch,
  CheckCircle2,
  Building2
} from 'lucide-react';
import { ProjectVerseLogo } from './ProjectVerseLogo';

interface HowItWorksViewProps {
  onGetStarted: () => void;
  onExploreProjects?: () => void;
}

export const HowItWorksView: React.FC<HowItWorksViewProps> = () => {
  const steps = [
    {
      num: '01',
      title: 'Create Your Account',
      desc: 'Register as a Student (Current or Alumni), Faculty Guide, or HOD and establish your verified institutional identity.',
      icon: UserRoundPlus,
      meta: 'Student • Faculty • HOD'
    },
    {
      num: '02',
      title: 'Get Verified',
      desc: 'Confirm your institutional email OTP, enrollment roll number, and department credentials to build authentic trust.',
      icon: ShieldCheck,
      meta: 'Email OTP → Institution → Proof'
    },
    {
      num: '03',
      title: 'Discover or Create Projects',
      desc: 'Explore previous cohort solutions by domain and technology, or initiate a new capstone with structured milestones.',
      icon: Search,
      meta: 'Explore Work • Start Projects'
    },
    {
      num: '04',
      title: 'Connect & Collaborate',
      desc: 'Form complementary teams, find cross-department contributors, and receive direct evaluation from faculty mentors.',
      icon: Users,
      meta: 'Skill Matching • Faculty Guidance'
    },
    {
      num: '05',
      title: 'Verify & Build Your Project Passport',
      desc: 'Seal project identity, active contributor roles, verified GitHub commits, and faculty rubric scores into an unalterable passport.',
      icon: FileCheck2,
      meta: 'Cryptographic Identity • Sealed'
    },
    {
      num: '06',
      title: 'Continue the Project',
      desc: 'Enable succeeding batches to inherit the verified codebase, expand features, and keep the work alive beyond final exams.',
      icon: GitBranch,
      meta: 'Cross-Batch Lineage'
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

          <h1 
            className="text-[32px] sm:text-[38px] md:text-[44px] text-[#111111] font-bold tracking-tight uppercase"
          >
            How ProjectVerse Works
          </h1>

          <p 
            className="mt-4 text-[15px] sm:text-[16px] md:text-[17px] text-[#4A4A4A] leading-relaxed tracking-wide"
          >
            A connected six-stage academic journey from student onboarding to continuous multi-batch project evolution.
          </p>
        </div>

        {/* 6 Clean Steps in Sequential Flow */}
        <div className="space-y-4 sm:space-y-5 mb-14 sm:mb-16">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: idx * 0.05 }}
                className="card-white p-6 sm:p-7 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 border border-black/8 hover:border-black/20 group transition-all duration-200"
              >
                <div className="flex items-start gap-4">
                  {/* Step Number Badge */}
                  <span className="text-xl sm:text-2xl font-bold text-[#737373] tracking-tighter shrink-0 pt-0.5">
                    {step.num}
                  </span>

                  <div>
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <h2 className="text-[19px] sm:text-[21px] font-bold text-[#111111] tracking-tight">
                        {step.title}
                      </h2>
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-black/5 text-[#737373] font-medium">
                        {step.meta}
                      </span>
                    </div>

                    <p className="text-[14px] sm:text-[15px] text-[#4A4A4A] leading-relaxed tracking-wide max-w-xl">
                      {step.desc}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
                  <div className="w-10 h-10 rounded-xl bg-[#F5F5F3] border border-black/6 flex items-center justify-center text-[#111111] group-hover:bg-[#111111] group-hover:text-white transition-colors duration-200 shadow-xs">
                    <Icon className="w-5 h-5" />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Informational Academic Note (Zero duplicate CTA buttons) */}
        <div className="card-white p-6 sm:p-8 text-center border border-black/8 bg-[#FBFBFA]">
          <div className="w-10 h-10 rounded-xl bg-white border border-black/8 flex items-center justify-center text-[#111111] mx-auto mb-3 shadow-xs">
            <Building2 className="w-5 h-5" />
          </div>
          <h3 className="text-[18px] sm:text-[20px] font-bold text-[#111111] mb-1.5 uppercase tracking-tight">
            Institutional Continuity Framework
          </h3>
          <p className="text-[13.5px] sm:text-[14px] text-[#4A4A4A] max-w-lg mx-auto leading-relaxed">
            Every step is designed to ensure work continues across academic years. Department leads and coordinators can verify credentials and audit capstones directly.
          </p>
        </div>
      </div>
    </div>
  );
};

export default HowItWorksView;
