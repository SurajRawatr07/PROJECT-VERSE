import React from 'react';
import { motion } from 'motion/react';
import { 
  Users2, 
  Building, 
  ArrowRight, 
  Globe2, 
  Layers, 
  Plus, 
  Code, 
  Brain, 
  Cpu, 
  Palette, 
  Microscope,
  CheckCircle2
} from 'lucide-react';

export const CollaborationSection: React.FC = () => {
  const roles = [
    { title: 'Frontend Architecture', lead: 'Devansh Kulkarni', college: 'IIT Bombay', icon: Code, color: 'text-blue-400' },
    { title: 'Spiking Edge AI & SNNs', lead: 'Aarohi Sen', college: 'IIIT Hyderabad', icon: Brain, color: 'text-violet-400' },
    { title: 'PX4 Flight Control Firmware', lead: 'Marcus Vance', college: 'BITS Pilani', icon: Cpu, color: 'text-emerald-400' },
    { title: 'Telemetry UI / UX Design', lead: 'Kavya Pillai', college: 'Stanford BioE', icon: Palette, color: 'text-pink-400' },
    { title: 'Flight Sensor Benchmarks', lead: 'Varun Swaminathan', college: 'IIT Madras', icon: Microscope, color: 'text-amber-400' }
  ];

  return (
    <section id="collaboration" className="relative w-full py-24 sm:py-32 px-4 sm:px-6 bg-[#040714] border-t border-white/5 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full liquid-glass text-xs font-mono-code text-indigo-300 mb-3">
            <Globe2 className="w-3.5 h-3.5 text-indigo-400" />
            <span>INTER-COLLEGIATE TALENT SYNERGY</span>
          </div>
          <h2 className="font-display text-3xl sm:text-5xl md:text-6xl text-white font-normal leading-[1.1]">
            Talent Shouldn’t Stop at the Campus Gate.
          </h2>
          <p className="text-slate-400 font-body text-sm sm:text-base mt-4 max-w-2xl mx-auto leading-relaxed">
            ProjectVerse connects students beyond institutional boundaries based on verified skills and project requirements.
          </p>
        </div>

        {/* Multi-College Convergence Graphic Card */}
        <div className="liquid-glass-elevated rounded-3xl p-6 sm:p-10 border border-white/15 mb-12">
          {/* Institutional nodes converging */}
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6 pb-8 border-b border-white/10">
            {/* College A */}
            <div className="flex items-center gap-3.5 p-4 rounded-xl bg-white/5 border border-white/10 w-full lg:w-auto">
              <div className="w-10 h-10 rounded-lg bg-indigo-500/20 border border-indigo-400/30 flex items-center justify-center text-indigo-300 font-bold font-mono-code text-sm">
                IITB
              </div>
              <div>
                <span className="text-xs font-bold text-white block">IIT Bombay</span>
                <span className="text-[11px] text-slate-400 font-mono-code">Autonomous Swarm Perception</span>
              </div>
            </div>

            <div className="text-slate-500 font-bold hidden lg:block">
              <Plus className="w-5 h-5 text-indigo-400" />
            </div>

            {/* College B */}
            <div className="flex items-center gap-3.5 p-4 rounded-xl bg-white/5 border border-white/10 w-full lg:w-auto">
              <div className="w-10 h-10 rounded-lg bg-emerald-500/20 border border-emerald-400/30 flex items-center justify-center text-emerald-300 font-bold font-mono-code text-sm">
                IIITH
              </div>
              <div>
                <span className="text-xs font-bold text-white block">IIIT Hyderabad</span>
                <span className="text-[11px] text-slate-400 font-mono-code">Neuromorphic SNN Inference</span>
              </div>
            </div>

            <div className="text-slate-500 font-bold hidden lg:block">
              <Plus className="w-5 h-5 text-indigo-400" />
            </div>

            {/* College C */}
            <div className="flex items-center gap-3.5 p-4 rounded-xl bg-white/5 border border-white/10 w-full lg:w-auto">
              <div className="w-10 h-10 rounded-lg bg-amber-500/20 border border-amber-400/30 flex items-center justify-center text-amber-300 font-bold font-mono-code text-sm">
                BITS
              </div>
              <div>
                <span className="text-xs font-bold text-white block">BITS Pilani</span>
                <span className="text-[11px] text-slate-400 font-mono-code">PX4 Hardware Testbench</span>
              </div>
            </div>

            <div className="text-slate-500 font-bold hidden lg:block">
              <ArrowRight className="w-6 h-6 text-emerald-400 animate-pulse" />
            </div>

            {/* Result: Single Unified Deep-Tech Capstone */}
            <div className="p-4 rounded-xl bg-gradient-to-br from-indigo-900/60 to-slate-900 border border-indigo-400/40 w-full lg:w-auto shadow-lg shadow-indigo-500/10">
              <div className="flex items-center gap-2 text-xs font-mono-code text-emerald-300 font-bold mb-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>UNIFIED PROJECT REPOSITORY</span>
              </div>
              <span className="text-sm font-bold text-white block">AeroSync Swarm v2.4</span>
            </div>
          </div>

          {/* Role Distribution Grid */}
          <div className="pt-8">
            <span className="text-xs font-mono-code uppercase tracking-wider text-slate-400 block mb-6">
              Inter-Disciplinary Role Distribution Matrix:
            </span>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5">
              {roles.map((r, idx) => {
                const Icon = r.icon;
                return (
                  <motion.div
                    key={r.title}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 }}
                    className="p-4 rounded-xl bg-black/40 border border-white/10 flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <Icon className={`w-4 h-4 ${r.color}`} />
                        <span className="text-[10px] font-mono-code text-slate-500">ROLE 0{idx + 1}</span>
                      </div>
                      <h4 className="text-xs font-bold text-white mb-2 leading-tight">
                        {r.title}
                      </h4>
                    </div>

                    <div className="pt-2 border-t border-white/5">
                      <span className="text-[11px] text-slate-300 block font-medium">{r.lead}</span>
                      <span className="text-[10px] text-indigo-300 font-mono-code">{r.college}</span>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
