import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  UserRoundPlus,
  ShieldCheck,
  Search,
  Users,
  FileCheck2,
  GitBranch,
  ArrowRight,
  ChevronRight,
  CheckCircle2,
  Lock,
  Building2,
  Sparkles
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
    heading: string;
    details: string[];
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
      visualDetails: {
        heading: 'Role-Based Academic Identity',
        details: [
          'Choose between Student (current or alumni), Faculty Guide, or Department HOD.',
          'Institutional verification anchors your contributions to your university.'
        ]
      }
    },
    {
      id: 'step-2',
      stepNum: '02',
      icon: ShieldCheck,
      title: 'Get Verified',
      description: 'Verify your email and academic details to build trust around your identity and work.',
      badge: 'Email & Academic Verification',
      visualDetails: {
        heading: 'Cryptographic & Institutional Verification',
        details: [
          'Institutional OTP verification confirms academic email.',
          'Department credentials validated by authorized faculty or HOD.'
        ]
      }
    },
    {
      id: 'step-3',
      stepNum: '03',
      icon: Search,
      title: 'Discover or Create Projects',
      description: 'Explore existing academic projects or start your own with the right project details, team and goals.',
      badge: 'Explore • Initiate',
      visualDetails: {
        heading: 'Structured Repository Creation',
        details: [
          'Search verified repositories by tech stack, batch year, and domain.',
          'Initiate capstones with structured milestones and rubric alignments.'
        ]
      }
    },
    {
      id: 'step-4',
      stepNum: '04',
      icon: Users,
      title: 'Connect & Collaborate',
      description: 'Find suitable teammates, connect with mentors and collaborate across skills, departments and campuses.',
      badge: 'Skill-Based Matching',
      visualDetails: {
        heading: 'Interdisciplinary Collaboration',
        details: [
          'Match skill gaps with complementary students across departments.',
          'Faculty mentors review progress and assign milestone evaluations.'
        ]
      }
    },
    {
      id: 'step-5',
      stepNum: '05',
      icon: FileCheck2,
      title: 'Verify & Build Your Project Passport',
      description: 'Connect project evidence, GitHub activity, reviews and academic details into a trusted Project Passport.',
      badge: 'Cryptographic Identity',
      visualDetails: {
        heading: 'Immutable Project Record',
        details: [
          'GitHub commit evidence linked to individual student contributors.',
          'Departmental review seals final score and institutional badge.'
        ]
      }
    },
    {
      id: 'step-6',
      stepNum: '06',
      icon: GitBranch,
      title: 'Continue the Project',
      description: 'Keep the work alive beyond one semester or batch through Project Lineage, contributions and future collaboration.',
      badge: 'Cross-Batch Lineage',
      visualDetails: {
        heading: 'Cross-Batch Continuity',
        details: [
          'Future batches inherit verified codebases instead of starting from zero.',
          'Preserve complete lineage history across alumni and succeeding teams.'
        ]
      }
    }
  ];

  return (
    <section
      id="how-it-works-journey"
      className="relative w-full py-16 sm:py-20 md:py-24 px-4 sm:px-6 bg-[#FFFFFF] border-t border-black/8 font-serif overflow-hidden"
    >
      <div className="max-w-6xl mx-auto">
        {/* TOP SECTION: BUILT AROUND YOUR PROJECT */}
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
            <h3 className="text-[22px] sm:text-[26px] font-bold text-[#111111] uppercase tracking-tight">
              A Connected Six-Stage Academic Journey
            </h3>
          </div>
        </div>

        {/* 6 Step Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 mb-12">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            const isSelected = activeStep === step.id;
            return (
              <motion.div
                key={step.id}
                id={step.id}
                onClick={() => setActiveStep(isSelected ? null : step.id)}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: idx * 0.05 }}
                className={`card-white p-6 sm:p-7 rounded-2xl flex flex-col justify-between cursor-pointer border transition-all duration-200 group ${
                  isSelected
                    ? 'border-black ring-1 ring-black/10 shadow-sm'
                    : 'border-black/8 hover:border-black/20 hover:shadow-xs'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-bold text-[13px] text-[#737373] tracking-widest uppercase">
                      STEP {step.stepNum}
                    </span>
                    {step.badge && (
                      <span className="text-[11px] px-2 py-0.5 rounded-full bg-[#F5F5F3] border border-black/6 text-[#737373] font-medium">
                        {step.badge}
                      </span>
                    )}
                  </div>

                  <div className="w-11 h-11 rounded-xl bg-[#F5F5F3] border border-black/6 flex items-center justify-center text-[#111111] mb-5 group-hover:bg-[#111111] group-hover:text-white transition-colors duration-200">
                    <Icon className="w-5 h-5" />
                  </div>

                  <h4 className="text-[18px] sm:text-[20px] font-bold text-[#111111] mb-2 tracking-wide">
                    {step.title}
                  </h4>

                  <p className="text-[14px] sm:text-[15px] text-[#4A4A4A] leading-relaxed tracking-wide">
                    {step.description}
                  </p>

                  <AnimatePresence>
                    {isSelected && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="mt-4 pt-3 border-t border-black/8 overflow-hidden"
                      >
                        <span className="text-[11px] font-mono-code uppercase font-semibold text-[#111111] block mb-1">
                          {step.visualDetails.heading}
                        </span>
                        <ul className="space-y-1">
                          {step.visualDetails.details.map((d, dIdx) => (
                            <li key={dIdx} className="text-[12.5px] text-[#666666] flex items-start gap-1.5">
                              <span className="text-[#111111] mt-1">•</span>
                              <span>{d}</span>
                            </li>
                          ))}
                        </ul>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <div className="mt-5 pt-3 border-t border-black/6 flex items-center justify-between text-[12px] text-[#737373]">
                  <span>{isSelected ? 'Click to collapse' : 'Click to inspect step'}</span>
                  <ChevronRight
                    className={`w-4 h-4 transition-transform duration-200 ${
                      isSelected ? 'rotate-90' : 'group-hover:translate-x-1'
                    }`}
                  />
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Action triggers: Explore Projects & Get Started */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mt-8">
          {onGetStartedClick && (
            <button
              id="how-it-works-cta-get-started"
              onClick={onGetStartedClick}
              className="btn-primary-black w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 sm:px-7 py-3 cursor-pointer text-[15px] sm:text-[16px] font-medium rounded-full shadow-xs hover:shadow-sm tracking-wide font-serif"
            >
              <span>Get Started</span>
              <ArrowRight className="w-4 h-4 text-white" />
            </button>
          )}

          {onExploreProjectsClick && (
            <button
              id="how-it-works-cta-explore"
              onClick={onExploreProjectsClick}
              className="btn-secondary-white w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 sm:px-7 py-3 cursor-pointer text-[15px] sm:text-[16px] font-medium rounded-full shadow-xs hover:border-black/20 tracking-wide font-serif"
            >
              <span>Explore Projects</span>
              <ChevronRight className="w-4 h-4 text-[#111111]" />
            </button>
          )}
        </div>
      </div>
    </section>
  );
};

export default HowProjectVerseWorksSection;
