import React from 'react';
import { motion } from 'motion/react';
import { 
  Compass, 
  Users2, 
  ShieldCheck, 
  FastForward, 
  ArrowDown, 
  ArrowRight,
  GraduationCap,
  Sparkles,
  Building2,
  BookOpen,
  GitBranch,
  FolderGit2
} from 'lucide-react';
import { ProjectVerseBrand } from './ProjectVerseBrand';

interface AboutViewProps {
  onGetStarted: () => void;
  onExploreHowItWorks: () => void;
}

export const AboutView: React.FC<AboutViewProps> = ({
  onGetStarted,
  onExploreHowItWorks
}) => {
  const principles = [
    {
      title: 'DISCOVER',
      desc: 'Make valuable academic work easier to find.',
      icon: Compass
    },
    {
      title: 'COLLABORATE',
      desc: 'Connect students with the right people and expertise.',
      icon: Users2
    },
    {
      title: 'VERIFY',
      desc: 'Support project credibility through evidence and academic review.',
      icon: ShieldCheck
    },
    {
      title: 'CONTINUE',
      desc: 'Preserve project knowledge for future students and batches.',
      icon: FastForward
    }
  ];

  const ecosystemNodes = [
    { label: 'STUDENTS', icon: GraduationCap, sub: 'Learners & Creators' },
    { label: 'PROJECTS', icon: FolderGit2, sub: 'Passports & Repositories' },
    { label: 'FACULTY', icon: BookOpen, sub: 'Academic Advisors' },
    { label: 'MENTORS', icon: Users2, sub: 'Domain Specialists' },
    { label: 'INSTITUTIONS', icon: Building2, sub: 'Universities & HODs' }
  ];

  const visionSteps = [
    { title: 'Learning material', desc: 'Real reference codebases & architectural schemas' },
    { title: 'Open-source contribution', desc: 'Collaborative modular libraries for community use' },
    { title: 'Research direction', desc: 'Peer-reviewed problem statements and whitepapers' },
    { title: 'Improved project', desc: 'Enhanced features & optimized performance by new batches' },
    { title: 'New innovation', desc: 'Production-ready spin-offs and institutional patents' }
  ];

  return (
    <div className="w-full min-h-screen bg-[#FFFFFF] text-[#111111] pt-32 sm:pt-36 pb-24 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto">
        
        {/* 1. HERO SECTION */}
        <div className="text-center max-w-3xl mx-auto mb-20 sm:mb-24">
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
            className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[#F5F5F3] border border-black/8 mb-8"
          >
            <ProjectVerseBrand
              logoSize={18}
              textSizeClassName="text-[13px] sm:text-[14px]"
              interactive={false}
            />
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-display text-4xl sm:text-6xl md:text-7xl text-[#111111] font-normal leading-tight tracking-tight"
          >
            Projects Should Have a Future.
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-6 font-body text-base sm:text-lg md:text-xl text-[#4A4A4A] leading-relaxed max-w-2xl mx-auto"
          >
            ProjectVerse is a project-based academic ecosystem designed to help students discover existing work, collaborate across institutions, learn from real implementations and continue projects beyond submission.
          </motion.p>
        </div>

        {/* 2. WHY PROJECTVERSE EXISTS */}
        <section id="why-projectverse" className="mb-20 sm:mb-24 border-t border-black/8 pt-16">
          <div className="max-w-3xl mx-auto">
            <span className="text-xs font-mono-code uppercase tracking-widest text-[#737373] font-semibold block mb-2 text-center">
              Purpose & Origins
            </span>
            <h2 className="font-display text-3xl sm:text-4xl text-[#111111] font-normal text-center mb-8">
              Why ProjectVerse Exists
            </h2>

            <div className="card-white p-7 sm:p-9 border border-black/8 space-y-6 text-[#4A4A4A] font-body text-sm sm:text-base leading-relaxed">
              <p>
                Academic projects represent months of learning, development and problem solving. Yet after submission, much of that work becomes difficult to discover, difficult to verify and difficult to continue.
              </p>
              <p>
                ProjectVerse turns these one-time submissions into structured, discoverable and reusable learning assets.
              </p>
              
              <div className="pt-4 border-t border-black/6">
                <p className="font-semibold text-[#111111] mb-3">
                  The goal is simple:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 font-mono-code text-xs sm:text-sm text-[#111111]">
                  <div className="flex items-center gap-2.5 p-3 rounded-xl bg-[#F5F5F3] border border-black/6">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#111111]" />
                    <span>Make academic project work easier to discover,</span>
                  </div>
                  <div className="flex items-center gap-2.5 p-3 rounded-xl bg-[#F5F5F3] border border-black/6">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#111111]" />
                    <span>easier to trust,</span>
                  </div>
                  <div className="flex items-center gap-2.5 p-3 rounded-xl bg-[#F5F5F3] border border-black/6">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#111111]" />
                    <span>easier to collaborate on,</span>
                  </div>
                  <div className="flex items-center gap-2.5 p-3 rounded-xl bg-[#F5F5F3] border border-black/6">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#111111]" />
                    <span>and easier to continue.</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 3. WHAT PROJECTVERSE CONNECTS */}
        <section id="ecosystem" className="mb-20 sm:mb-24 border-t border-black/8 pt-16">
          <div className="max-w-4xl mx-auto text-center">
            <span className="text-xs font-mono-code uppercase tracking-widest text-[#737373] font-semibold block mb-2">
              Connected Infrastructure
            </span>
            <h2 className="font-display text-3xl sm:text-4xl text-[#111111] font-normal mb-4">
              What ProjectVerse Connects
            </h2>
            <p className="font-body text-sm sm:text-base text-[#4A4A4A] max-w-xl mx-auto leading-relaxed mb-10">
              ProjectVerse brings the people, projects and academic guidance around student innovation into one connected ecosystem.
            </p>

            {/* Clean Ecosystem Visualization (Desktop Horizontal / Mobile Vertical) */}
            <div className="hidden md:flex items-center justify-between gap-2 p-6 rounded-2xl bg-[#F7F7F5] border border-black/8">
              {ecosystemNodes.map((node, idx) => {
                const Icon = node.icon;
                return (
                  <React.Fragment key={node.label}>
                    <div className="flex-1 card-white p-4 flex flex-col items-center justify-center text-center">
                      <div className="w-9 h-9 rounded-xl bg-[#F5F5F3] border border-black/6 flex items-center justify-center text-[#111111] mb-2">
                        <Icon className="w-4 h-4" />
                      </div>
                      <span className="font-mono-code text-xs font-bold text-[#111111]">
                        {node.label}
                      </span>
                      <span className="font-body text-[11px] text-[#737373] mt-0.5">
                        {node.sub}
                      </span>
                    </div>

                    {idx < ecosystemNodes.length - 1 && (
                      <div className="text-[#737373] font-mono-code text-sm px-1 flex items-center justify-center">
                        <ArrowRight className="w-4 h-4 text-[#737373]" />
                      </div>
                    )}
                  </React.Fragment>
                );
              })}
            </div>

            {/* Mobile Ecosystem Stack */}
            <div className="md:hidden flex flex-col items-center gap-2 max-w-xs mx-auto">
              {ecosystemNodes.map((node, idx) => {
                const Icon = node.icon;
                return (
                  <React.Fragment key={node.label}>
                    <div className="w-full card-white p-4 flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-[#F5F5F3] flex items-center justify-center text-[#111111] shrink-0">
                        <Icon className="w-4 h-4" />
                      </div>
                      <div className="text-left">
                        <span className="font-mono-code text-xs font-bold text-[#111111] block">
                          {node.label}
                        </span>
                        <span className="font-body text-[11px] text-[#737373]">
                          {node.sub}
                        </span>
                      </div>
                    </div>

                    {idx < ecosystemNodes.length - 1 && (
                      <ArrowDown className="w-3.5 h-3.5 text-[#737373] my-0.5" />
                    )}
                  </React.Fragment>
                );
              })}
            </div>
          </div>
        </section>

        {/* 4. OUR PRINCIPLES */}
        <section id="principles" className="mb-20 sm:mb-24 border-t border-black/8 pt-16">
          <div className="max-w-4xl mx-auto">
            <span className="text-xs font-mono-code uppercase tracking-widest text-[#737373] font-semibold block mb-2 text-center">
              Core Tenets
            </span>
            <h2 className="font-display text-3xl sm:text-4xl text-[#111111] font-normal text-center mb-10">
              Our Principles
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
              {principles.map((prin, idx) => {
                const Icon = prin.icon;
                return (
                  <motion.div
                    key={prin.title}
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.35, delay: idx * 0.07 }}
                    className="card-white p-6 sm:p-7 flex items-start gap-4 border border-black/8"
                  >
                    <div className="w-10 h-10 rounded-xl bg-[#F5F5F3] border border-black/6 flex items-center justify-center text-[#111111] shrink-0 mt-0.5">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-mono-code text-xs sm:text-sm font-bold tracking-wider text-[#111111] uppercase mb-1.5">
                        {prin.title}
                      </h3>
                      <p className="font-body text-sm text-[#4A4A4A] leading-relaxed">
                        {prin.desc}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* 5. PROJECTVERSE VISION */}
        <section id="vision" className="mb-16 sm:mb-20 border-t border-black/8 pt-16">
          <div className="max-w-3xl mx-auto text-center">
            <span className="text-xs font-mono-code uppercase tracking-widest text-[#737373] font-semibold block mb-2">
              Long-Term Horizon
            </span>
            <h2 className="font-display text-3xl sm:text-4xl text-[#111111] font-normal mb-4">
              From Submission to Continuity.
            </h2>
            <p className="font-body text-sm sm:text-base text-[#4A4A4A] leading-relaxed mb-10 max-w-xl mx-auto">
              ProjectVerse aims to create an academic environment where projects do not disappear after evaluation.
            </p>

            <div className="card-white p-6 sm:p-8 border border-black/8 text-left">
              <span className="font-mono-code text-xs uppercase tracking-wider text-[#737373] font-semibold block mb-5">
                A completed project can become:
              </span>

              <div className="space-y-3">
                {visionSteps.map((step, idx) => (
                  <React.Fragment key={step.title}>
                    <div className="flex items-center justify-between p-3.5 rounded-xl bg-[#F5F5F3] border border-black/6">
                      <div className="flex items-center gap-3">
                        <span className="w-6 h-6 rounded-lg bg-white border border-black/8 flex items-center justify-center font-mono-code text-[11px] font-bold text-[#111111]">
                          0{idx + 1}
                        </span>
                        <div>
                          <span className="font-body font-semibold text-sm sm:text-base text-[#111111] block">
                            {step.title}
                          </span>
                          <span className="font-body text-xs text-[#737373]">
                            {step.desc}
                          </span>
                        </div>
                      </div>
                      <span className="font-mono-code text-[11px] text-[#737373] hidden sm:inline">
                        Step 0{idx + 1}
                      </span>
                    </div>

                    {idx < visionSteps.length - 1 && (
                      <div className="flex justify-center text-[#737373] py-0.5">
                        <ArrowDown className="w-3.5 h-3.5 text-[#737373]" />
                      </div>
                    )}
                  </React.Fragment>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Action Callout CTA */}
        <div className="card-white bg-[#F7F7F5] p-8 sm:p-10 text-center border border-black/8 max-w-3xl mx-auto">
          <h2 className="font-display text-2xl sm:text-3xl text-[#111111] font-normal mb-3">
            Build Projects That Outlast Your Final Semester.
          </h2>
          <p className="text-xs sm:text-sm text-[#4A4A4A] max-w-md mx-auto mb-6 leading-relaxed">
            Discover active repositories, connect with mentors, and obtain verified academic credentials.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={onExploreHowItWorks}
              className="btn-secondary-white w-full sm:w-auto px-7 py-3.5 flex items-center justify-center gap-2 cursor-pointer text-sm font-medium"
            >
              <span>How It Works</span>
            </button>
            <button
              onClick={onGetStarted}
              className="btn-primary-black w-full sm:w-auto px-7 py-3.5 flex items-center justify-center gap-2 cursor-pointer text-sm font-medium"
            >
              <span>Get Started</span>
              <ArrowRight className="w-4 h-4 text-white" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
