import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  FolderPlus, 
  GitBranch, 
  Users2, 
  GraduationCap, 
  ShieldCheck, 
  Zap, 
  Award,
  ArrowRight,
  CheckCircle2
} from 'lucide-react';

interface HowItWorksViewProps {
  onGetStarted: () => void;
}

export const HowItWorksView: React.FC<HowItWorksViewProps> = ({ onGetStarted }) => {
  const [selectedStep, setSelectedStep] = useState(0);

  const steps = [
    {
      num: '01',
      id: 'create',
      title: 'Create Project',
      subtitle: 'Initiate Structured Identity',
      icon: FolderPlus,
      summary: 'Register your capstone or research thesis with standardized architecture taxonomy, problem statement, and milestone goals.',
      details: [
        'Select domain categories and target technological stack',
        'Define active milestones and multi-term deliverables',
        'Assign team contributors and institutional advisors'
      ]
    },
    {
      num: '02',
      id: 'connect',
      title: 'Connect GitHub',
      subtitle: 'Automated Git Synchronization',
      icon: GitBranch,
      summary: 'Link your public or institutional GitHub repositories. ProjectVerse automatically tracks commit density, code health, and PR lineages.',
      details: [
        'Live synchronization of commits, branches, and releases',
        'Automated CI/CD test metrics and coverage analysis',
        'Per-contributor line-level telemetry mapping'
      ]
    },
    {
      num: '03',
      id: 'collaborate',
      title: 'Discover & Collaborate',
      subtitle: 'Cross-Campus Talent Matchmaking',
      icon: Users2,
      summary: 'Discover active academic repositories and form multidisciplinary cross-institution teams based on complementary skill gaps.',
      details: [
        'AI-driven skill matching across colleges and departments',
        'Open contributor roles with explicit skill requirements',
        'Seamless team invitation and proposal workflows'
      ]
    },
    {
      num: '04',
      id: 'faculty-review',
      title: 'Faculty Review',
      subtitle: 'Rubric-Based Academic Evaluation',
      icon: GraduationCap,
      summary: 'Assigned faculty mentors evaluate deliverables using structured academic rubrics covering novelty, rigor, and documentation quality.',
      details: [
        'Multi-criteria scoring: Technical Rigor, Novelty, Architecture',
        'Structured qualitative guidance and milestone approvals',
        'Faculty digital verification badge attached to repository'
      ]
    },
    {
      num: '05',
      id: 'hod-validation',
      title: 'HOD Validation',
      subtitle: 'Institutional Sign-Off',
      icon: ShieldCheck,
      summary: 'Department Heads and institutional deans certify academic compliance, validating projects for national and inter-university recognition.',
      details: [
        'Department-wide quality audit and capstone approval',
        'Issuance of official institutional validation hash',
        'Public indexing into the national academic network'
      ]
    },
    {
      num: '06',
      id: 'continue',
      title: 'Continue & Improve',
      subtitle: 'Next-Batch Inheritance',
      icon: Zap,
      summary: 'Graduating cohorts publish explicit roadmaps and transition documentation, allowing incoming cohorts to fork and extend validated foundations.',
      details: [
        'Multi-generational Lineage Tree tracks all legacy batches',
        'Inheritance of existing codebases without lost institutional knowledge',
        'Continuous evolution from prototype to production-grade system'
      ]
    },
    {
      num: '07',
      id: 'proof-of-work',
      title: 'Build Proof-of-Work',
      subtitle: 'Cryptographic Credentials',
      icon: Award,
      summary: 'Every student receives an immutable, verifiable Proof-of-Work passport credential proving real contributions for employers and universities.',
      details: [
        'Verifiable digital credential with QR hash and metadata',
        'Direct links to approved commits and signed faculty reviews',
        'Universally exportable for graduate applications and industry recruiting'
      ]
    }
  ];

  return (
    <div className="w-full min-h-screen bg-[#FFFFFF] text-[#111111] pt-32 pb-24 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto">
        {/* Page Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-mono-code uppercase tracking-widest text-[#737373] font-semibold">
            Lifecycle Workflow
          </span>
          <h1 className="font-display text-4xl sm:text-6xl text-[#111111] font-normal mt-3 leading-tight">
            How ProjectVerse Works
          </h1>
          <p className="mt-4 font-body text-sm sm:text-base text-[#4A4A4A] leading-relaxed">
            A 7-step visual workflow taking academic projects from initial creation to generational continuation and verified credentials.
          </p>
        </div>

        {/* 7-Step Navigation Chips */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2.5 mb-10">
          {steps.map((st, idx) => {
            const Icon = st.icon;
            const isSelected = selectedStep === idx;
            return (
              <button
                key={st.id}
                onClick={() => setSelectedStep(idx)}
                className={`p-3 rounded-2xl border text-center flex flex-col items-center justify-center transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-[#111111] text-white border-[#111111] shadow-sm'
                    : 'bg-[#F7F7F5] border-black/8 hover:bg-[#F3F3F1] text-[#4A4A4A]'
                }`}
              >
                <span className={`font-mono-code text-[11px] mb-1.5 ${isSelected ? 'text-white/70' : 'text-[#737373]'}`}>
                  {st.num}
                </span>
                <div className={`w-8 h-8 rounded-xl flex items-center justify-center mb-1.5 ${
                  isSelected ? 'bg-white/15 text-white' : 'bg-black/5 text-[#111111]'
                }`}>
                  <Icon className="w-4 h-4" />
                </div>
                <span className={`text-[11px] font-semibold tracking-wide ${
                  isSelected ? 'text-white' : 'text-[#111111]'
                }`}>
                  {st.title}
                </span>
              </button>
            );
          })}
        </div>

        {/* Selected Step Detailed Card */}
        <div className="mb-16">
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedStep}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.22 }}
              className="card-white p-6 sm:p-10 border border-black/8"
            >
              <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
                <div className="md:col-span-7">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F5F5F3] border border-black/8 text-xs font-mono-code text-[#111111] mb-4">
                    <span>STEP {steps[selectedStep].num} OF 07</span>
                    <span>•</span>
                    <span className="text-[#737373] uppercase">{steps[selectedStep].subtitle}</span>
                  </div>

                  <h2 className="font-display text-3xl sm:text-4xl text-[#111111] font-normal mb-3">
                    {steps[selectedStep].title}
                  </h2>

                  <p className="font-body text-[#4A4A4A] text-sm sm:text-base leading-relaxed mb-6">
                    {steps[selectedStep].summary}
                  </p>

                  <div className="space-y-2.5">
                    {steps[selectedStep].details.map((detail, dIdx) => (
                      <div key={dIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#4A4A4A]">
                        <CheckCircle2 className="w-4 h-4 text-[#111111] shrink-0 mt-0.5" />
                        <span>{detail}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="md:col-span-5 bg-[#F7F7F5] border border-black/8 rounded-2xl p-6 font-mono-code text-xs">
                  <div className="flex items-center justify-between pb-3 mb-3 border-b border-black/8 text-[#737373] text-[11px]">
                    <span>SYSTEM_WORKFLOW</span>
                    <span className="text-[#111111] font-semibold">ACTIVE</span>
                  </div>

                  <div className="space-y-2 text-[#4A4A4A] text-[11px] leading-relaxed">
                    <p><span className="text-[#111111] font-bold">#</span> stage: {steps[selectedStep].id}</p>
                    <p><span className="text-[#111111] font-bold">#</span> execution: automated_protocol</p>
                    <p><span className="text-[#111111] font-bold">#</span> validation: multi_stakeholder</p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-black/8 flex items-center justify-between">
                    <button
                      onClick={() => setSelectedStep((prev) => (prev > 0 ? prev - 1 : steps.length - 1))}
                      className="text-[#737373] hover:text-[#111111] transition-colors cursor-pointer text-[11px]"
                    >
                      ← Previous
                    </button>
                    <button
                      onClick={() => setSelectedStep((prev) => (prev + 1) % steps.length)}
                      className="text-[#111111] hover:underline font-semibold flex items-center gap-1 cursor-pointer text-[11px]"
                    >
                      Next Step <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Bottom CTA */}
        <div className="text-center pt-8 border-t border-black/8">
          <button
            onClick={onGetStarted}
            className="btn-primary-black px-8 py-3.5 inline-flex items-center gap-2 cursor-pointer text-sm font-medium"
          >
            <span>Get Started with ProjectVerse</span>
            <ArrowRight className="w-4 h-4 text-white" />
          </button>
        </div>
      </div>
    </div>
  );
};
