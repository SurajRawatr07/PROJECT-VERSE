import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Compass, 
  Code2, 
  GitBranch, 
  ShieldCheck, 
  Users2, 
  Zap, 
  FastForward, 
  Award,
  ArrowRight,
  CheckCircle2,
  ExternalLink
} from 'lucide-react';

export const SolutionLifecycleSection: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      id: 'discover',
      title: 'DISCOVER',
      subtitle: 'Find Proven Baselines',
      icon: Compass,
      desc: 'Explore previous semesters’ and partner institutions’ projects with clear documentation, tech stacks, and active problem statements.',
      highlight: 'Semantic cross-college project search'
    },
    {
      id: 'build',
      title: 'BUILD',
      subtitle: 'Stand on Validated Work',
      icon: Code2,
      desc: 'Instead of starting from zero, pick up validated architectural foundations and implement real advanced features for your academic term.',
      highlight: 'Inherit clean architecture & testbeds'
    },
    {
      id: 'connect',
      title: 'CONNECT GITHUB',
      subtitle: 'Live Contribution Tracking',
      icon: GitBranch,
      desc: 'Synchronize commits, pull requests, automated CI test runs, and line-level changes directly into the project record.',
      highlight: 'Real-time verifiable git telemetry'
    },
    {
      id: 'verify',
      title: 'VERIFY',
      subtitle: 'Dual Academic & Code Proof',
      icon: ShieldCheck,
      desc: 'Faculty advisors and department heads evaluate rubrics on-platform, issuing cryptographic academic validation signatures.',
      highlight: 'Tamper-proof faculty endorsement'
    },
    {
      id: 'collaborate',
      title: 'COLLABORATE',
      subtitle: 'Cross-Campus Team Formation',
      icon: Users2,
      desc: 'Match with students from other institutions possessing complementary skills (e.g. AI specialist + VLSI architect).',
      highlight: 'Inter-university capstone teams'
    },
    {
      id: 'improve',
      title: 'IMPROVE',
      subtitle: 'Iterative Refinement',
      icon: Zap,
      desc: 'Upgrade performance, resolve open issues, scale benchmarks, and containerize deployments for real-world testing.',
      highlight: 'Measurable metric improvements'
    },
    {
      id: 'continue',
      title: 'CONTINUE',
      subtitle: 'Next Batch Handoff',
      icon: FastForward,
      desc: 'Publish an immutable Project Lineage record so next year’s incoming batch can inherit roadmap tasks seamlessly.',
      highlight: 'Never lose project context'
    },
    {
      id: 'prove',
      title: 'PROVE YOUR WORK',
      subtitle: 'Verified Developer Passport',
      icon: Award,
      desc: 'Every contributor receives a permanent, verified Proof-of-Work credential linking exact commits and faculty reviews for jobs and grad school.',
      highlight: 'Cryptographic portfolio evidence'
    }
  ];

  return (
    <section id="lifecycle" className="relative w-full py-24 sm:py-32 px-4 sm:px-6 bg-[#040714] border-t border-white/5 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <span className="text-xs font-semibold uppercase tracking-widest text-indigo-400 font-body">
            The ProjectVerse Architecture
          </span>
          <h2 className="font-display text-3xl sm:text-5xl md:text-6xl text-white font-normal mt-3 leading-[1.1]">
            One Platform. A Complete Project Lifecycle.
          </h2>
          <p className="text-slate-400 font-body text-sm sm:text-base mt-4 max-w-2xl mx-auto leading-relaxed">
            From initial discovery to cross-batch continuation and verified credentials —
            transforming disposable coursework into an enduring open-source research ecosystem.
          </p>
        </div>

        {/* Animated Connected Nodes Carousel / Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2.5 sm:gap-3 mb-10">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            const isActive = activeStep === idx;
            return (
              <button
                key={step.id}
                id={`lifecycle-step-btn-${step.id}`}
                onClick={() => setActiveStep(idx)}
                className={`relative flex flex-col items-center text-center p-3 sm:p-4 rounded-xl border transition-all duration-300 cursor-pointer ${
                  isActive
                    ? 'bg-indigo-950/40 border-indigo-400/50 shadow-lg shadow-indigo-500/10'
                    : 'liquid-glass border-white/10 hover:border-white/20'
                }`}
              >
                {/* Step number */}
                <span className="text-[10px] font-mono-code text-slate-400 mb-2">
                  0{idx + 1}
                </span>

                {/* Node icon */}
                <div
                  className={`w-9 h-9 rounded-lg flex items-center justify-center mb-2 transition-all ${
                    isActive
                      ? 'bg-indigo-500 text-white shadow-md shadow-indigo-500/30'
                      : 'bg-white/5 text-slate-300'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                </div>

                {/* Title */}
                <span className={`text-[11px] font-bold tracking-wider font-body ${
                  isActive ? 'text-white' : 'text-slate-300'
                }`}>
                  {step.title}
                </span>

                {/* Connected indicator bar */}
                {isActive && (
                  <motion.div
                    layoutId="active-step-indicator"
                    className="absolute -bottom-1 w-6 h-1 bg-indigo-400 rounded-full"
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* Interactive Active Node Showcase Card */}
        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeStep}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="liquid-glass-elevated rounded-2xl p-6 sm:p-10 border border-indigo-500/20"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                <div className="lg:col-span-7">
                  <div className="flex items-center gap-2.5 text-xs text-indigo-400 font-mono-code mb-2">
                    <span>STAGE 0{activeStep + 1} OF 08</span>
                    <span>•</span>
                    <span className="text-slate-400 uppercase">{steps[activeStep].subtitle}</span>
                  </div>

                  <h3 className="font-display text-2xl sm:text-4xl text-white font-normal mb-4">
                    {steps[activeStep].title} — {steps[activeStep].subtitle}
                  </h3>

                  <p className="text-slate-300 font-body text-sm sm:text-base leading-relaxed mb-6">
                    {steps[activeStep].desc}
                  </p>

                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-indigo-500/10 border border-indigo-400/20 text-xs sm:text-sm text-indigo-200">
                    <CheckCircle2 className="w-4 h-4 text-indigo-400" />
                    <span>{steps[activeStep].highlight}</span>
                  </div>
                </div>

                <div className="lg:col-span-5 bg-black/40 border border-white/10 rounded-xl p-5 font-mono-code text-xs text-slate-300">
                  <div className="flex items-center justify-between pb-3 mb-3 border-b border-white/10 text-slate-500 text-[11px]">
                    <span>PROJECTVERSE_PIPELINE.LOG</span>
                    <span className="text-emerald-400">ACTIVE</span>
                  </div>
                  <div className="space-y-2 text-slate-400">
                    <p><span className="text-indigo-400">&gt;</span> lifecycle.trigger(<span className="text-emerald-300">"{steps[activeStep].id}"</span>)</p>
                    <p><span className="text-indigo-400">&gt;</span> status: <span className="text-slate-200">Synchronizing across institutional nodes</span></p>
                    <p><span className="text-indigo-400">&gt;</span> integrity_hash: <span className="text-slate-400">0x7f4e9102ab88921b</span></p>
                    <p><span className="text-indigo-400">&gt;</span> verified_by: <span className="text-indigo-300">Faculty Review Board & Git CI</span></p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-[11px]">
                    <span className="text-slate-400">Autonomous Lineage Engine</span>
                    <button 
                      onClick={() => setActiveStep((prev) => (prev + 1) % steps.length)}
                      className="text-indigo-400 hover:text-indigo-300 flex items-center gap-1 font-semibold"
                    >
                      Next Step <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};
