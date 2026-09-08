import React from 'react';
import { motion } from 'motion/react';
import { GraduationCap, UserCheck, Building2, Landmark } from 'lucide-react';

interface RoleCard {
  role: string;
  desc: string;
  icon: React.ComponentType<{ className?: string; size?: number }>;
  tag: string;
}

const ROLES: RoleCard[] = [
  {
    role: 'STUDENT',
    desc: 'Discover, build, collaborate and prove your work.',
    icon: GraduationCap,
    tag: 'Builder',
  },
  {
    role: 'FACULTY',
    desc: 'Guide and verify student projects.',
    icon: UserCheck,
    tag: 'Mentor',
  },
  {
    role: 'HOD',
    desc: 'Monitor projects and verification.',
    icon: Building2,
    tag: 'Oversight',
  },
  {
    role: 'INSTITUTION',
    desc: 'Preserve project knowledge and history.',
    icon: Landmark,
    tag: 'Governance',
  },
];

export const RolesSection: React.FC = () => {
  return (
    <section 
      id="roles" 
      className="relative w-full py-18 sm:py-24 px-4 sm:px-6 bg-white border-t border-black/[0.06] select-none"
    >
      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/[0.04] text-[11px] font-['Manrope',sans-serif] font-semibold uppercase tracking-wider text-[#555555] mb-3">
            Target Stakeholders
          </div>
          <h2 className="font-serif text-[28px] sm:text-[32px] md:text-[40px] text-[#111111] font-normal tracking-[-0.01em] leading-tight">
            Who Uses ProjectVerse
          </h2>
          <p className="mt-2.5 text-[15px] sm:text-[16px] text-[#555555] font-sans">
            Designed to serve every role in the higher education project lifecycle.
          </p>
        </div>

        {/* 4 Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-4.5">
          {ROLES.map((role, idx) => {
            const Icon = role.icon;
            return (
              <motion.div
                key={role.role}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-20px' }}
                transition={{ duration: 0.35, delay: idx * 0.08 }}
                whileHover={{ y: -2 }}
                className="p-5 sm:p-6 rounded-2xl bg-[#FAFAF8] border border-black/[0.08] shadow-[0_1px_3px_rgba(0,0,0,0.02)] hover:border-black/25 transition-all duration-150 flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 rounded-xl bg-white border border-black/[0.07] flex items-center justify-center text-[#111111] group-hover:bg-[#111111] group-hover:text-white transition-colors duration-150">
                      <Icon size={20} />
                    </div>
                    <span className="text-[10.5px] font-mono font-semibold text-[#888888] uppercase">
                      {role.tag}
                    </span>
                  </div>

                  <h3 className="text-[15px] sm:text-[16px] font-bold text-[#111111] font-['Manrope',sans-serif] tracking-wide mb-1.5">
                    {role.role}
                  </h3>

                  <p className="text-[13.5px] sm:text-[14px] text-[#555555] leading-relaxed font-sans">
                    {role.desc}
                  </p>
                </div>

                <div className="mt-5 pt-3 border-t border-black/[0.05] text-[11px] font-mono text-[#888888]">
                  ROLE 0{idx + 1}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default RolesSection;
