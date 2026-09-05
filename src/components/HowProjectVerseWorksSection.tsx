import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  UserRoundPlus,
  ShieldCheck,
  Search,
  FolderPlus,
  Users,
  FileCheck2,
  GitBranch,
  ArrowRight,
  ArrowDown,
  ArrowLeft,
  CheckCircle2,
  Code2,
  ChevronRight,
  GraduationCap,
  Sparkles,
  Layers
} from 'lucide-react';

interface HowProjectVerseWorksSectionProps {
  onGetStartedClick?: () => void;
  onExploreProjectsClick?: () => void;
}

interface StepItem {
  id: string;
  stepNum: string;
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  badge?: string;
  visualDetails: {
    type: 'roles' | 'verification-flow' | 'discovery-paths' | 'collab-flow' | 'passport-flow' | 'lineage-timeline';
  };
}

export const HowProjectVerseWorksSection: React.FC<HowProjectVerseWorksSectionProps> = ({
  onGetStartedClick,
  onExploreProjectsClick
}) => {
  const [activeStep, setActiveStep] = useState<string | null>(null);

  const steps: StepItem[] = [
    {
      id: 'step-1',
      stepNum: '01',
      icon: UserRoundPlus,
      title: 'Create Your Account',
      description: 'Register as a Student, Faculty or HOD and build your verified academic profile.',
      badge: 'Student • Faculty • HOD',
      visualDetails: { type: 'roles' }
    },
    {
      id: 'step-2',
      stepNum: '02',
      icon: ShieldCheck,
      title: 'Get Verified',
      description: 'Verify your email and academic details to build trust around your identity and work.',
      badge: 'Email & Academic Verification',
      visualDetails: { type: 'verification-flow' }
    },
    {
      id: 'step-3',
      stepNum: '03',
      icon: Search,
      title: 'Discover or Create Projects',
      description: 'Explore existing academic projects or start your own with the right project details, team and goals.',
      badge: 'Explore • Initiate',
      visualDetails: { type: 'discovery-paths' }
    },
    {
      id: 'step-4',
      stepNum: '04',
      icon: Users,
      title: 'Connect & Collaborate',
      description: 'Find suitable teammates, connect with mentors and collaborate across skills, departments and campuses.',
      badge: 'Skill-Based Matching',
      visualDetails: { type: 'collab-flow' }
    },
    {
      id: 'step-5',
      stepNum: '05',
      icon: FileCheck2,
      title: 'Verify & Build Your Project Passport',
      description: 'Connect project evidence, GitHub activity, reviews and academic details into a trusted Project Passport.',
      badge: 'Cryptographic Identity',
      visualDetails: { type: 'passport-flow' }
    },
    {
      id: 'step-6',
      stepNum: '06',
      icon: GitBranch,
      title: 'Continue the Project',
      description: 'Keep the work alive beyond one semester or batch through Project Lineage, contributions and future collaboration.',
      badge: 'Cross-Batch Lineage',
      visualDetails: { type: 'lineage-timeline' }
    }
  ];

  return (
    <section
      id="how-it-works-journey"
      className="relative w-full py-16 sm:py-20 md:py-24 px-4 sm:px-6 bg-[#FFFFFF] border-t border-black/8 font-serif overflow-hidden"
    >
      <div className="max-w-6xl mx-auto">
        {/* ========================================================================= */}
        {/* TOP SECTION: BUILT AROUND YOUR PROJECT */}
        {/* ========================================================================= */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <h2 className="text-[26px] sm:text-[32px] md:text-[38px] text-[#111111] font-bold tracking-tight uppercase mb-3">
            BUILT AROUND YOUR PROJECT.
          </h2>
          <p className="text-[15px] sm:text-[16px] md:text-[17px] text-[#4A4A4A] leading-relaxed tracking-wide max-w-2xl mx-auto">
            From finding the right idea to building, verifying and continuing it — ProjectVerse keeps your entire project journey connected.
          </p>

          <div className="mt-8 pt-6 border-t border-black/8">
            <span className="text-[11px] sm:text-[12px] uppercase tracking-[0.2em] text-[#737373] font-bold block mb-2">
              HOW PROJECTVERSE WORKS
            </span>
            <p className="text-[14px] sm:text-[15px] text-[#111111] font-medium tracking-wide">
              Everything your academic project needs, connected in one place.
            </p>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* DESKTOP & TABLET CONNECTED JOURNEY (01 -> 02 -> 03 | 06 <- 05 <- 04) */}
        {/* ========================================================================= */}
        <div className="hidden lg:block relative">
          {/* Row 1: Steps 01, 02, 03 */}
          <div className="grid grid-cols-3 gap-6 relative z-10 mb-10">
            {steps.slice(0, 3).map((step, idx) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={step.id}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
                  onClick={() => setActiveStep(activeStep === step.id ? null : step.id)}
                  className="card-white p-6 flex flex-col justify-between group cursor-pointer relative border border-black/8 hover:border-black/25 hover:-translate-y-1 transition-all duration-200"
                >
                  {/* Step Number + Icon + Tag */}
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-4 pb-3 border-b border-black/6">
                      <div className="flex items-center gap-2">
                        <span className="text-[12px] font-bold tracking-widest text-[#737373] bg-[#F5F5F3] px-2.5 py-0.5 rounded-md">
                          STEP {step.stepNum}
                        </span>
                        <div className="w-8 h-8 rounded-lg bg-[#F5F5F3] border border-black/6 flex items-center justify-center text-[#111111] group-hover:bg-[#111111] group-hover:text-white group-hover:scale-105 transition-all">
                          <Icon className="w-4 h-4" />
                        </div>
                      </div>
                      <span className="text-[10.5px] px-2 py-0.5 rounded-full bg-black/4 text-[#4A4A4A] font-medium truncate max-w-[150px]">
                        {step.badge}
                      </span>
                    </div>

                    <h3 className="text-[19px] font-bold text-[#111111] mb-2 tracking-tight">
                      {step.title}
                    </h3>
                    <p className="text-[14px] text-[#4A4A4A] leading-relaxed mb-4">
                      {step.description}
                    </p>
                  </div>

                  {/* Visual Sub-Detail Block */}
                  <div className="pt-3 border-t border-black/6 mt-auto">
                    {step.visualDetails.type === 'roles' && (
                      <div className="space-y-1 text-[11.5px] text-[#4A4A4A]">
                        <div className="flex items-center justify-between py-0.5">
                          <span>Student Account:</span>
                          <span className="font-medium text-[#111111]">Current • Alumni</span>
                        </div>
                        <div className="flex items-center justify-between py-0.5">
                          <span>Academic Guides:</span>
                          <span className="font-medium text-[#111111]">Faculty • HOD</span>
                        </div>
                      </div>
                    )}

                    {step.visualDetails.type === 'verification-flow' && (
                      <div className="flex items-center justify-between text-[11px] text-[#4A4A4A] font-medium overflow-x-auto py-1">
                        <span>OTP</span>
                        <span className="text-black/30">→</span>
                        <span>College</span>
                        <span className="text-black/30">→</span>
                        <span>Proof</span>
                        <span className="text-black/30">→</span>
                        <span className="font-bold text-emerald-800">Verified</span>
                      </div>
                    )}

                    {step.visualDetails.type === 'discovery-paths' && (
                      <div className="grid grid-cols-2 gap-2 text-[11px]">
                        <div className="p-1.5 rounded-lg bg-[#FBFBFA] border border-black/6 text-center">
                          <strong className="block text-[#111111]">DISCOVER</strong>
                          <span className="text-[#737373]">Explore Work</span>
                        </div>
                        <div className="p-1.5 rounded-lg bg-[#FBFBFA] border border-black/6 text-center">
                          <strong className="block text-[#111111]">CREATE</strong>
                          <span className="text-[#737373]">Start Project</span>
                        </div>
                      </div>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Transitional connector graphic: 03 bends down to 04 */}
          <div className="relative h-8 flex items-center justify-end pr-14 -mt-6 mb-4 select-none">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F5F5F3] border border-black/8 text-[11px] font-bold text-[#4A4A4A]">
              <span>Next Phase</span>
              <ArrowDown className="w-3.5 h-3.5 text-[#111111]" />
            </div>
          </div>

          {/* Row 2: Steps 06, 05, 04 (Rendered as 04 -> 05 -> 06 or 06 <- 05 <- 04) */}
          <div className="grid grid-cols-3 gap-6 relative z-10">
            {/* Step 06 */}
            {[steps[5], steps[4], steps[3]].map((step, idx) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={step.id}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: (idx + 3) * 0.1, ease: [0.16, 1, 0.3, 1] }}
                  onClick={() => setActiveStep(activeStep === step.id ? null : step.id)}
                  className="card-white p-6 flex flex-col justify-between group cursor-pointer relative border border-black/8 hover:border-black/25 hover:-translate-y-1 transition-all duration-200"
                >
                  {/* Step Number + Icon + Tag */}
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-4 pb-3 border-b border-black/6">
                      <div className="flex items-center gap-2">
                        <span className="text-[12px] font-bold tracking-widest text-[#737373] bg-[#F5F5F3] px-2.5 py-0.5 rounded-md">
                          STEP {step.stepNum}
                        </span>
                        <div className="w-8 h-8 rounded-lg bg-[#F5F5F3] border border-black/6 flex items-center justify-center text-[#111111] group-hover:bg-[#111111] group-hover:text-white group-hover:scale-105 transition-all">
                          <Icon className="w-4 h-4" />
                        </div>
                      </div>
                      <span className="text-[10.5px] px-2 py-0.5 rounded-full bg-black/4 text-[#4A4A4A] font-medium truncate max-w-[150px]">
                        {step.badge}
                      </span>
                    </div>

                    <h3 className="text-[19px] font-bold text-[#111111] mb-2 tracking-tight">
                      {step.title}
                    </h3>
                    <p className="text-[14px] text-[#4A4A4A] leading-relaxed mb-4">
                      {step.description}
                    </p>
                  </div>

                  {/* Visual Sub-Detail Block */}
                  <div className="pt-3 border-t border-black/6 mt-auto">
                    {step.visualDetails.type === 'collab-flow' && (
                      <div className="flex items-center justify-between text-[11px] text-[#4A4A4A] py-1">
                        <span>Needs</span>
                        <span className="text-black/30">→</span>
                        <span>Skills</span>
                        <span className="text-black/30">→</span>
                        <span>Mentors</span>
                        <span className="text-black/30">→</span>
                        <span className="font-bold text-[#111111]">Team</span>
                      </div>
                    )}

                    {step.visualDetails.type === 'passport-flow' && (
                      <div className="p-2 rounded-lg bg-[#FBFBFA] border border-black/6 text-center">
                        <div className="text-[11px] text-[#4A4A4A]">
                          Team + GitHub Commits + Faculty Review
                        </div>
                        <span className="inline-block mt-1 text-[11px] font-bold text-emerald-800">
                          = Sealed Passport
                        </span>
                      </div>
                    )}

                    {step.visualDetails.type === 'lineage-timeline' && (
                      <div className="p-2 rounded-lg bg-[#111111] text-white text-center">
                        <span className="text-[11.5px] font-medium block">
                          "Your project doesn't end with submission."
                        </span>
                        <span className="text-[10px] text-[#A0A0A0] mt-0.5 block">
                          Batch '24 → Batch '25 → Continuous Growth
                        </span>
                      </div>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* ========================================================================= */}
        {/* MOBILE & TABLET VERTICAL TIMELINE (01 | 02 | 03 | 04 | 05 | 06) */}
        {/* ========================================================================= */}
        <div className="block lg:hidden relative">
          {/* Vertical spine line */}
          <div className="absolute left-6 top-8 bottom-8 w-[2px] bg-black/10 z-0" />

          <div className="space-y-6 relative z-10">
            {steps.map((step, idx) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={step.id}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: idx * 0.08, ease: [0.16, 1, 0.3, 1] }}
                  onClick={() => setActiveStep(activeStep === step.id ? null : step.id)}
                  className="card-white p-5 ml-2 pl-12 relative border border-black/8 hover:border-black/20 transition-all cursor-pointer"
                >
                  {/* Timeline node icon positioned on the spine */}
                  <div className="absolute -left-3 top-5 w-8 h-8 rounded-full bg-[#111111] text-white border-2 border-white flex items-center justify-center shadow-xs">
                    <span className="text-[10px] font-bold">{step.stepNum}</span>
                  </div>

                  <div className="flex items-center justify-between gap-2 mb-2">
                    <h3 className="text-[17px] sm:text-[19px] font-bold text-[#111111]">
                      {step.title}
                    </h3>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-black/5 text-[#4A4A4A] shrink-0 font-medium">
                      {step.badge}
                    </span>
                  </div>

                  <p className="text-[13.5px] sm:text-[14px] text-[#4A4A4A] leading-relaxed mb-3">
                    {step.description}
                  </p>

                  {/* Mobile mini visual */}
                  <div className="pt-2 border-t border-black/6">
                    {step.visualDetails.type === 'roles' && (
                      <span className="text-[11.5px] text-[#4A4A4A]">
                        Roles: <strong>Student (Current & Alumni)</strong> • <strong>Faculty</strong> • <strong>HOD</strong>
                      </span>
                    )}

                    {step.visualDetails.type === 'verification-flow' && (
                      <div className="flex items-center gap-1.5 text-[11px] text-[#4A4A4A] overflow-x-auto py-0.5">
                        <span>Email OTP</span>
                        <span className="text-black/30">→</span>
                        <span>College</span>
                        <span className="text-black/30">→</span>
                        <span>Academic Proof</span>
                        <span className="text-black/30">→</span>
                        <span className="font-bold text-emerald-800">Verified</span>
                      </div>
                    )}

                    {step.visualDetails.type === 'discovery-paths' && (
                      <span className="text-[11.5px] text-[#4A4A4A]">
                        Filter by Technology • Department • College • Batch • Verified
                      </span>
                    )}

                    {step.visualDetails.type === 'collab-flow' && (
                      <span className="text-[11.5px] text-[#4A4A4A]">
                        Skill matching • Teammates • Faculty mentorship • Cross-campus
                      </span>
                    )}

                    {step.visualDetails.type === 'passport-flow' && (
                      <span className="text-[11.5px] text-[#4A4A4A]">
                        Sealed Identity: Contributors, GitHub Commits, Faculty Signature
                      </span>
                    )}

                    {step.visualDetails.type === 'lineage-timeline' && (
                      <div className="p-2 rounded-lg bg-[#111111] text-white text-center">
                        <span className="text-[12px] font-bold block">
                          “Your project doesn’t end with submission.”
                        </span>
                      </div>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowProjectVerseWorksSection;
