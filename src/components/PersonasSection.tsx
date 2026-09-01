import React from 'react';
import { motion } from 'motion/react';
import { 
  GraduationCap, 
  BookOpen, 
  Users, 
  Building2, 
  CheckCircle2, 
  ArrowRight,
  Sparkles
} from 'lucide-react';

interface PersonasSectionProps {
  onSelectRole: (role: string) => void;
}

export const PersonasSection: React.FC<PersonasSectionProps> = ({ onSelectRole }) => {
  const personas = [
    {
      id: 'students',
      title: 'STUDENTS',
      subtitle: 'Build What Matters',
      icon: GraduationCap,
      color: 'border-indigo-500/30 text-indigo-400',
      features: [
        'Discover validated capstone baselines',
        'Find teammates with complementary skills',
        'Receive guidance from top industry mentors',
        'Build cryptographic proof-of-work for hiring'
      ],
      cta: 'Join as a Student'
    },
    {
      id: 'faculty',
      title: 'FACULTY',
      subtitle: 'Empower Research Rigor',
      icon: BookOpen,
      color: 'border-emerald-500/30 text-emerald-400',
      features: [
        'Standardize rubric grading across departments',
        'Verify real git contributions vs ghost claims',
        'Publish actionable milestone feedback',
        'Track multi-year academic project impact'
      ],
      cta: 'Join as Faculty'
    },
    {
      id: 'mentors',
      title: 'MENTORS',
      subtitle: 'Guide the Next Generation',
      icon: Users,
      color: 'border-amber-500/30 text-amber-400',
      features: [
        'Discover promising deep-tech student projects',
        'Provide industry-grade architectural reviews',
        'Share domain expertise & production tooling',
        'Recruit verified top collegiate talent early'
      ],
      cta: 'Join as a Mentor'
    },
    {
      id: 'institutions',
      title: 'INSTITUTIONS',
      subtitle: 'Preserve Innovation Capital',
      icon: Building2,
      color: 'border-purple-500/30 text-purple-400',
      features: [
        'Manage departmental capstone repositories',
        'Prevent annual wheel-reinvention & duplication',
        'Accredit multi-college cross-campus initiatives',
        'Preserve institutional intellectual property'
      ],
      cta: 'Register Institution'
    }
  ];

  return (
    <section id="personas" className="relative w-full py-24 sm:py-32 px-4 sm:px-6 bg-[#040714] border-t border-white/5">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full liquid-glass text-xs font-mono-code text-indigo-300 mb-3">
            <Users className="w-3.5 h-3.5 text-indigo-400" />
            <span>TAILORED ECOSYSTEM STAKEHOLDERS</span>
          </div>
          <h2 className="font-display text-3xl sm:text-5xl md:text-6xl text-white font-normal leading-[1.1]">
            Designed for Every Stakeholder.
          </h2>
          <p className="text-slate-400 font-body text-sm sm:text-base mt-4 max-w-2xl mx-auto leading-relaxed">
            Whether you are building, evaluating, guiding, or accrediting — ProjectVerse provides a seamless collaborative interface.
          </p>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {personas.map((p, idx) => {
            const Icon = p.icon;
            return (
              <motion.div
                key={p.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className="liquid-glass rounded-2xl p-6 sm:p-7 flex flex-col justify-between border border-white/10 hover:border-white/20 transition-all duration-300 group"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-300 group-hover:text-white transition-all">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-mono-code uppercase tracking-widest text-slate-500">
                      0{idx + 1}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-white font-body mb-1">
                    {p.title}
                  </h3>
                  <p className="text-xs text-indigo-300 font-mono-code mb-5">
                    {p.subtitle}
                  </p>

                  <div className="space-y-3 mb-8">
                    {p.features.map((feat, fIdx) => (
                      <div key={fIdx} className="flex items-start gap-2 text-xs text-slate-300">
                        <CheckCircle2 className="w-3.5 h-3.5 text-indigo-400 shrink-0 mt-0.5" />
                        <span className="leading-snug">{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <button
                  onClick={() => onSelectRole(p.title)}
                  className="w-full py-2.5 px-4 rounded-xl liquid-glass text-xs font-semibold text-white hover:bg-white/10 border-white/15 transition-all flex items-center justify-center gap-1.5 group-hover:border-indigo-400/40 cursor-pointer"
                >
                  <span>{p.cta}</span>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-white group-hover:translate-x-0.5 transition-transform" />
                </button>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
