import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  UserCheck, 
  Search, 
  Users2, 
  GitBranch, 
  ShieldCheck, 
  FileCheck2, 
  GitFork,
  ArrowRight,
  ArrowDown,
  CheckCircle2,
  ExternalLink,
  Code2,
  BookOpen,
  GraduationCap,
  Building2,
  Layers,
  Sparkles
} from 'lucide-react';
import { ProjectVerseBrand } from './ProjectVerseBrand';

interface HowItWorksViewProps {
  onGetStarted: () => void;
  onExploreProjects?: () => void;
}

export const HowItWorksView: React.FC<HowItWorksViewProps> = ({ 
  onGetStarted,
  onExploreProjects 
}) => {
  const [activeStepTab, setActiveStepTab] = useState<number>(0);

  const stepsList = [
    { num: '01', title: 'Create Your Profile', icon: UserCheck },
    { num: '02', title: 'Discover Projects', icon: Search },
    { num: '03', title: 'Collaborate', icon: Users2 },
    { num: '04', title: 'Build with Evidence', icon: GitBranch },
    { num: '05', title: 'Verify', icon: ShieldCheck },
    { num: '06', title: 'Project Passport', icon: FileCheck2 },
    { num: '07', title: 'Project Lineage', icon: GitFork },
  ];

  return (
    <div className="w-full min-h-screen bg-[#FFFFFF] text-[#111111] pt-32 sm:pt-36 pb-24 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto">
        
        {/* HERO HEADER */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
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
            How ProjectVerse Works
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-6 font-body text-base sm:text-lg md:text-xl text-[#4A4A4A] leading-relaxed max-w-2xl mx-auto"
          >
            From discovering an existing project to building, verifying and continuing it — ProjectVerse creates a structured lifecycle for academic work.
          </motion.p>
        </div>

        {/* QUICK STEP NAVIGATION STRIP */}
        <div className="flex items-center justify-start sm:justify-center overflow-x-auto pb-4 mb-12 sm:mb-16 gap-2 no-scrollbar">
          {stepsList.map((step, idx) => {
            const Icon = step.icon;
            const isSelected = activeStepTab === idx;
            return (
              <button
                key={step.num}
                onClick={() => {
                  setActiveStepTab(idx);
                  const el = document.getElementById(`step-${step.num}`);
                  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-full font-mono-code text-xs whitespace-nowrap transition-all duration-200 cursor-pointer border ${
                  isSelected 
                    ? 'bg-[#111111] text-white border-[#111111]' 
                    : 'bg-[#F5F5F3] text-[#4A4A4A] border-black/6 hover:border-black/15 hover:text-[#111111]'
                }`}
              >
                <span>{step.num}</span>
                <span className="hidden md:inline font-sans font-medium">{step.title}</span>
              </button>
            );
          })}
        </div>

        {/* 7 STRUCTURED LIFECYCLE STEPS */}
        <div className="space-y-16 sm:space-y-20">
          
          {/* STEP 01 */}
          <section id="step-01" className="card-white p-7 sm:p-9 border border-black/8 scroll-mt-28">
            <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-start">
              <div className="flex-1 space-y-4">
                <div className="flex items-center gap-2.5">
                  <span className="font-mono-code text-xs font-bold px-2.5 py-1 rounded-full bg-[#111111] text-white">
                    01
                  </span>
                  <span className="font-mono-code text-xs uppercase tracking-widest text-[#737373] font-semibold">
                    Account Setup
                  </span>
                </div>
                
                <h2 className="font-display text-2xl sm:text-3xl text-[#111111] font-normal">
                  Create Your Profile
                </h2>

                <p className="font-body text-sm sm:text-base text-[#4A4A4A] leading-relaxed">
                  Students, Faculty, HODs and Administrators create accounts according to their role.
                </p>

                <div className="pt-2">
                  <span className="font-mono-code text-xs uppercase tracking-wider text-[#111111] font-semibold block mb-2">
                    Students can add:
                  </span>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {['Name', 'College', 'Skills', 'Technologies', 'Interests', 'Projects'].map((field) => (
                      <div key={field} className="flex items-center gap-2 px-3 py-2 rounded-lg bg-[#F5F5F3] border border-black/6 text-xs text-[#111111] font-mono-code">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#111111]" />
                        <span>{field}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Example Profile Preview Card */}
              <div className="w-full lg:w-[320px] p-5 rounded-2xl bg-[#F7F7F5] border border-black/8 text-left space-y-3 shrink-0">
                <div className="flex items-center justify-between pb-2.5 border-b border-black/6">
                  <span className="font-mono-code text-[10px] text-[#737373] uppercase tracking-wider">
                    Demo Student Profile
                  </span>
                  <span className="font-mono-code text-[10px] px-2 py-0.5 rounded-full bg-black/5 text-[#111111] font-semibold">
                    STUDENT
                  </span>
                </div>
                
                <div>
                  <h4 className="font-body font-semibold text-base text-[#111111]">
                    Suraj Rawat
                  </h4>
                  <p className="font-body text-xs text-[#737373] mt-0.5">
                    Graphic Era Hill University
                  </p>
                </div>

                <div className="space-y-1.5 pt-1 text-xs">
                  <div className="flex items-center justify-between text-[#4A4A4A]">
                    <span className="font-mono-code text-[11px]">Department:</span>
                    <span className="font-medium text-[#111111]">Computer Science</span>
                  </div>
                  <div className="flex items-center justify-between text-[#4A4A4A]">
                    <span className="font-mono-code text-[11px]">Primary Focus:</span>
                    <span className="font-medium text-[#111111]">Full-Stack & ML</span>
                  </div>
                </div>

                <div className="pt-2 flex flex-wrap gap-1.5">
                  <span className="px-2 py-0.5 rounded bg-white text-[#111111] text-[10px] font-mono-code border border-black/6">React</span>
                  <span className="px-2 py-0.5 rounded bg-white text-[#111111] text-[10px] font-mono-code border border-black/6">TypeScript</span>
                  <span className="px-2 py-0.5 rounded bg-white text-[#111111] text-[10px] font-mono-code border border-black/6">FastAPI</span>
                </div>
              </div>
            </div>
          </section>

          {/* STEP 02 */}
          <section id="step-02" className="card-white p-7 sm:p-9 border border-black/8 scroll-mt-28">
            <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-start">
              <div className="flex-1 space-y-4">
                <div className="flex items-center gap-2.5">
                  <span className="font-mono-code text-xs font-bold px-2.5 py-1 rounded-full bg-[#111111] text-white">
                    02
                  </span>
                  <span className="font-mono-code text-xs uppercase tracking-widest text-[#737373] font-semibold">
                    Exploration & Filter Engine
                  </span>
                </div>
                
                <h2 className="font-display text-2xl sm:text-3xl text-[#111111] font-normal">
                  Discover Projects
                </h2>

                <p className="font-body text-sm sm:text-base text-[#4A4A4A] leading-relaxed">
                  Students can discover projects based on domain, technology, skills, project requirements, institution, and project status.
                </p>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 pt-2">
                  {[
                    { label: 'Domain', desc: 'AI, IoT, Health, FinTech' },
                    { label: 'Technology', desc: 'React, PyTorch, Node.js' },
                    { label: 'Skills', desc: 'Backend, UI/UX, Research' },
                    { label: 'Project Requirements', desc: 'Open roles & scope' },
                    { label: 'Institution', desc: 'Colleges & universities' },
                    { label: 'Project Status', desc: 'Active, Verified, Archived' }
                  ].map((filter) => (
                    <div key={filter.label} className="p-3 rounded-xl bg-[#F5F5F3] border border-black/6">
                      <span className="font-mono-code text-xs font-bold text-[#111111] block mb-0.5">
                        {filter.label}
                      </span>
                      <span className="font-body text-[11px] text-[#737373]">
                        {filter.desc}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Discovery Interface Mockup */}
              <div className="w-full lg:w-[320px] p-5 rounded-2xl bg-[#F7F7F5] border border-black/8 text-left space-y-3 shrink-0">
                <div className="flex items-center gap-2 p-2.5 rounded-xl bg-white border border-black/8 text-xs text-[#737373]">
                  <Search className="w-3.5 h-3.5 text-[#111111]" />
                  <span>Search by skill, domain, college...</span>
                </div>

                <div className="p-3.5 rounded-xl bg-white border border-black/6 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-mono-code text-[10px] text-blue-600 font-semibold">AI & Health</span>
                    <span className="text-[10px] font-mono-code text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded">Verified</span>
                  </div>
                  <h5 className="font-body font-semibold text-xs text-[#111111]">
                    Autonomous ECG Anomaly Detector
                  </h5>
                  <p className="font-body text-[11px] text-[#737373] line-clamp-2">
                    Transformer-based real-time arrhythmia classification from telemetry streams.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* STEP 03 */}
          <section id="step-03" className="card-white p-7 sm:p-9 border border-black/8 scroll-mt-28">
            <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-start">
              <div className="flex-1 space-y-4">
                <div className="flex items-center gap-2.5">
                  <span className="font-mono-code text-xs font-bold px-2.5 py-1 rounded-full bg-[#111111] text-white">
                    03
                  </span>
                  <span className="font-mono-code text-xs uppercase tracking-widest text-[#737373] font-semibold">
                    Inter-Campus Matchmaking
                  </span>
                </div>
                
                <h2 className="font-display text-2xl sm:text-3xl text-[#111111] font-normal">
                  Collaborate
                </h2>

                <p className="font-body text-sm sm:text-base text-[#4A4A4A] leading-relaxed">
                  Students can find teammates, mentors, faculty, and relevant contributors. Skill and project requirements make collaboration more relevant and targeted.
                </p>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-2">
                  {[
                    { title: 'Teammates', icon: Users2 },
                    { title: 'Mentors', icon: BookOpen },
                    { title: 'Faculty', icon: GraduationCap },
                    { title: 'Contributors', icon: GitBranch }
                  ].map((role) => {
                    const Icon = role.icon;
                    return (
                      <div key={role.title} className="p-3.5 rounded-xl bg-[#F5F5F3] border border-black/6 flex flex-col items-center text-center">
                        <Icon className="w-5 h-5 text-[#111111] mb-1.5" />
                        <span className="font-mono-code text-xs font-bold text-[#111111]">
                          {role.title}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Match Card */}
              <div className="w-full lg:w-[320px] p-5 rounded-2xl bg-[#F7F7F5] border border-black/8 text-left space-y-3 shrink-0">
                <span className="font-mono-code text-[10px] text-[#737373] uppercase tracking-wider block">
                  Skill Match Suggestion
                </span>
                <div className="p-3.5 rounded-xl bg-white border border-black/6 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-body font-semibold text-xs text-[#111111]">Target Team Match</span>
                    <span className="font-mono-code text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">94% Fit</span>
                  </div>
                  <p className="font-body text-[11px] text-[#4A4A4A]">
                    Looking for Frontend UI Specialist + Edge ML experience.
                  </p>
                  <div className="flex items-center gap-1.5 pt-1 text-[10px] text-[#737373] font-mono-code">
                    <span>Active In: Graphic Era & IIT R</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* STEP 04 */}
          <section id="step-04" className="card-white p-7 sm:p-9 border border-black/8 scroll-mt-28">
            <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-start">
              <div className="flex-1 space-y-4">
                <div className="flex items-center gap-2.5">
                  <span className="font-mono-code text-xs font-bold px-2.5 py-1 rounded-full bg-[#111111] text-white">
                    04
                  </span>
                  <span className="font-mono-code text-xs uppercase tracking-widest text-[#737373] font-semibold">
                    Automated Telemetry
                  </span>
                </div>
                
                <h2 className="font-display text-2xl sm:text-3xl text-[#111111] font-normal">
                  Build with Evidence
                </h2>

                <p className="font-body text-sm sm:text-base text-[#4A4A4A] leading-relaxed">
                  Connect GitHub repositories to the project. ProjectVerse can associate repositories, commits, contributions, documentation, and project activity with the project record.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2 font-mono-code text-xs text-[#111111]">
                  {[
                    'Live GitHub Repositories Synchronization',
                    'Timestamped Commit & Branch History',
                    'Per-Member Contribution Telemetry',
                    'Technical Documentation & Readme Audits',
                    'Ongoing Milestone & Sprint Activity'
                  ].map((item) => (
                    <div key={item} className="flex items-center gap-2 p-2.5 rounded-xl bg-[#F5F5F3] border border-black/6">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#111111] shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* GitHub Evidence Tile */}
              <div className="w-full lg:w-[320px] p-5 rounded-2xl bg-[#F7F7F5] border border-black/8 text-left space-y-3 shrink-0">
                <div className="flex items-center justify-between pb-2.5 border-b border-black/6">
                  <div className="flex items-center gap-2">
                    <GitBranch className="w-4 h-4 text-[#111111]" />
                    <span className="font-mono-code text-xs font-semibold text-[#111111]">github/repo-sync</span>
                  </div>
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                </div>
                <div className="space-y-2 font-mono-code text-[11px] text-[#4A4A4A]">
                  <div className="flex justify-between">
                    <span>Commits Tracked:</span>
                    <span className="font-semibold text-[#111111]">142 commits</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Active Contributors:</span>
                    <span className="font-semibold text-[#111111]">3 verified</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Documentation:</span>
                    <span className="font-semibold text-[#111111]">Architecture.md</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* STEP 05 */}
          <section id="step-05" className="card-white p-7 sm:p-9 border border-black/8 scroll-mt-28">
            <div className="space-y-6">
              <div className="flex items-center gap-2.5">
                <span className="font-mono-code text-xs font-bold px-2.5 py-1 rounded-full bg-[#111111] text-white">
                  05
                </span>
                <span className="font-mono-code text-xs uppercase tracking-widest text-[#737373] font-semibold">
                  Three-Tier Verification
                </span>
              </div>
              
              <h2 className="font-display text-2xl sm:text-3xl text-[#111111] font-normal">
                Verify
              </h2>

              <p className="font-body text-sm sm:text-base text-[#4A4A4A] leading-relaxed max-w-2xl">
                Verification involves technical proof, academic review, and institutional validation to eliminate unbacked claims.
              </p>

              {/* Formula Visualization */}
              <div className="p-6 rounded-2xl bg-[#F7F7F5] border border-black/8">
                <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 items-center text-center">
                  <div className="p-4 rounded-xl bg-white border border-black/8">
                    <span className="font-mono-code text-xs font-bold text-[#111111] block">
                      TECHNICAL EVIDENCE
                    </span>
                    <span className="font-body text-[11px] text-[#737373] mt-1 block">
                      GitHub Activity & Telemetry
                    </span>
                  </div>

                  <span className="font-mono-code text-base font-bold text-[#737373]">+</span>

                  <div className="p-4 rounded-xl bg-white border border-black/8">
                    <span className="font-mono-code text-xs font-bold text-[#111111] block">
                      ACADEMIC REVIEW
                    </span>
                    <span className="font-body text-[11px] text-[#737373] mt-1 block">
                      Faculty Rubric & Mentorship
                    </span>
                  </div>

                  <span className="font-mono-code text-base font-bold text-[#737373]">+</span>

                  <div className="p-4 rounded-xl bg-white border border-black/8">
                    <span className="font-mono-code text-xs font-bold text-[#111111] block">
                      INSTITUTIONAL VALIDATION
                    </span>
                    <span className="font-body text-[11px] text-[#737373] mt-1 block">
                      HOD / University Sign-Off
                    </span>
                  </div>
                </div>

                <div className="flex justify-center my-4">
                  <ArrowDown className="w-4 h-4 text-[#737373]" />
                </div>

                <div className="flex justify-center">
                  <div className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-white border border-black/15 shadow-xs font-mono-code text-xs font-bold text-[#111111]">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>VERIFIED PROJECT</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* STEP 06 */}
          <section id="step-06" className="card-white p-7 sm:p-9 border border-black/8 scroll-mt-28">
            <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-start">
              <div className="flex-1 space-y-4">
                <div className="flex items-center gap-2.5">
                  <span className="font-mono-code text-xs font-bold px-2.5 py-1 rounded-full bg-[#111111] text-white">
                    06
                  </span>
                  <span className="font-mono-code text-xs uppercase tracking-widest text-[#737373] font-semibold">
                    Digital Credential
                  </span>
                </div>
                
                <h2 className="font-display text-2xl sm:text-3xl text-[#111111] font-normal">
                  Project Passport
                </h2>

                <p className="font-body text-sm sm:text-base text-[#4A4A4A] leading-relaxed">
                  Every verified project receives a structured Project Passport containing all critical metadata in one immutable digital record.
                </p>

                <div className="grid grid-cols-2 gap-2.5 pt-2 font-mono-code text-xs text-[#111111]">
                  {[
                    'Project Identity & Abstract',
                    'Contributors & Roles',
                    'Technologies & Taxonomy',
                    'GitHub Activity & Metrics',
                    'Documentation & Architecture',
                    'Faculty Reviews & Scores',
                    'Verification Status & Sign-off'
                  ].map((field) => (
                    <div key={field} className="flex items-center gap-2 p-2.5 rounded-xl bg-[#F5F5F3] border border-black/6">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#111111]" />
                      <span>{field}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Digital Passport Card Preview */}
              <div className="w-full lg:w-[340px] p-6 rounded-2xl bg-white border border-black/12 shadow-[0_8px_30px_rgba(0,0,0,0.04)] text-left space-y-4 shrink-0">
                <div className="flex items-center justify-between pb-3 border-b border-black/8">
                  <div className="flex items-center gap-2">
                    <FileCheck2 className="w-4 h-4 text-[#111111]" />
                    <span className="font-mono-code text-xs font-bold text-[#111111]">PROJECT PASSPORT</span>
                  </div>
                  <span className="font-mono-code text-[10px] text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                    CERTIFIED
                  </span>
                </div>

                <div className="space-y-1">
                  <span className="font-mono-code text-[10px] text-[#737373]">PASSPORT ID: #PV-88219</span>
                  <h4 className="font-display text-lg font-normal text-[#111111]">
                    Decentralized Sensor Mesh
                  </h4>
                  <p className="font-body text-[11px] text-[#4A4A4A]">
                    Graphic Era Hill University • Dept. of Computer Science
                  </p>
                </div>

                <div className="pt-2 border-t border-black/6 space-y-1.5 font-mono-code text-[10.5px]">
                  <div className="flex justify-between text-[#4A4A4A]">
                    <span>Contributors:</span>
                    <span className="font-semibold text-[#111111]">Suraj Rawat + 2</span>
                  </div>
                  <div className="flex justify-between text-[#4A4A4A]">
                    <span>Academic Score:</span>
                    <span className="font-semibold text-[#111111]">98/100 (Dr. Anil Sharma)</span>
                  </div>
                  <div className="flex justify-between text-[#4A4A4A]">
                    <span>HOD Validation:</span>
                    <span className="font-semibold text-[#111111]">Dr. Rajesh Kumar</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* STEP 07 */}
          <section id="step-07" className="card-white p-7 sm:p-9 border border-black/8 scroll-mt-28">
            <div className="space-y-6">
              <div className="flex items-center gap-2.5">
                <span className="font-mono-code text-xs font-bold px-2.5 py-1 rounded-full bg-[#111111] text-white">
                  07
                </span>
                <span className="font-mono-code text-xs uppercase tracking-widest text-[#737373] font-semibold">
                  Multi-Batch Continuity
                </span>
              </div>
              
              <h2 className="font-display text-3xl sm:text-4xl text-[#111111] font-normal">
                Projects Grow Across Batches.
              </h2>

              <p className="font-body text-sm sm:text-base text-[#4A4A4A] leading-relaxed max-w-2xl">
                Instead of starting from zero, future students can understand what already exists and build on it. When a project is improved by future students, its history is preserved.
              </p>

              {/* Lineage Tree Visualization */}
              <div className="p-6 sm:p-8 rounded-2xl bg-[#F7F7F5] border border-black/8 max-w-3xl">
                <div className="space-y-4 font-mono-code text-xs">
                  {/* Batch 2025 */}
                  <div className="p-4 rounded-xl bg-white border border-black/8 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <span className="font-bold text-[#111111] block text-sm">Batch 2025</span>
                      <span className="font-body text-xs text-[#4A4A4A]">Initial Project Foundation & Architecture</span>
                    </div>
                    <span className="px-2.5 py-1 rounded bg-[#F5F5F3] text-[#737373] text-[11px] self-start sm:self-center">
                      v1.0 Milestone
                    </span>
                  </div>

                  <div className="flex justify-center text-[#737373]">
                    <ArrowDown className="w-4 h-4" />
                  </div>

                  {/* Batch 2026 */}
                  <div className="p-4 rounded-xl bg-white border border-black/8 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <span className="font-bold text-[#111111] block text-sm">Batch 2026</span>
                      <span className="font-body text-xs text-[#4A4A4A]">Improved Features, Optimization & APIs</span>
                    </div>
                    <span className="px-2.5 py-1 rounded bg-[#F5F5F3] text-[#737373] text-[11px] self-start sm:self-center">
                      v2.0 Milestone
                    </span>
                  </div>

                  <div className="flex justify-center text-[#737373]">
                    <ArrowDown className="w-4 h-4" />
                  </div>

                  {/* Batch 2027 */}
                  <div className="p-4 rounded-xl bg-white border border-black/12 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <span className="font-bold text-[#111111] block text-sm">Batch 2027</span>
                      <span className="font-body text-xs text-[#4A4A4A]">New Research / Extension & Production Deployment</span>
                    </div>
                    <span className="px-2.5 py-1 rounded bg-black text-white text-[11px] font-bold self-start sm:self-center">
                      Active Lineage
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </section>

        </div>

        {/* 21. FINAL CTA SECTION */}
        <div className="mt-20 sm:mt-24 card-white bg-[#F7F7F5] p-8 sm:p-12 text-center border border-black/8 max-w-3xl mx-auto">
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl text-[#111111] font-normal leading-tight mb-4">
            Your Next Project Can Start From Someone Else's Best Work.
          </h2>

          <p className="font-mono-code text-xs sm:text-sm uppercase tracking-wider text-[#737373] font-semibold mb-8">
            Discover. Build. Verify. Collaborate. Continue.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5">
            <button
              onClick={onExploreProjects || onGetStarted}
              className="btn-secondary-white w-full sm:w-auto px-7 py-3.5 flex items-center justify-center gap-2 cursor-pointer text-sm font-medium"
            >
              <span>Explore ProjectVerse</span>
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
