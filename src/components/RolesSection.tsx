import React from 'react';
import { motion } from 'motion/react';
import { GraduationCap, UserCheck, Building2, Landmark } from 'lucide-react';

interface RoleCard {
  title: string;
  role: string;
  desc: string;
  icon: React.ComponentType<{ className?: string; size?: number }>;
}

const ROLES: RoleCard[] = [
  {
    title: 'Student',
    role: 'Undergraduate & Alumni',
    desc: 'Discover projects, collaborate, build, and create verified proof-of-work.',
    icon: GraduationCap,
  },
  {
    title: 'Faculty',
    role: 'Academic Guides',
    desc: 'Guide, review, and verify student projects.',
    icon: UserCheck,
  },
  {
    title: 'HOD',
    role: 'Department Leadership',
    desc: 'Monitor department projects and academic innovation.',
    icon: Building2,
  },
  {
    title: 'Institution',
    role: 'University & Campus',
    desc: 'Preserve project knowledge and institutional history.',
    icon: Landmark,
  },
];

export const RolesSection: React.FC = () => {
  return (
    <section 
      id="roles" 
      className="relative w-full py-20 sm:py-28 px-4 sm:px-6 bg-white border-t border-black/[0.06] select-none"
    >
      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14 sm:mb-20">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/[0.04] text-[11px] font-mono uppercase tracking-widest text-[#4A4A4A] mb-3">
            Target Audience
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#111111] font-normal tracking-[-0.01em] leading-tight">
            Who Is It For?
          </h2>
          <p className="mt-3 text-[14.5px] sm:text-[15.5px] text-[#666666] font-sans">
            Built for every stakeholder across the academic innovation lifecycle.
          </p>
        </div>

        {/* 4 Clean Minimal Role Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {ROLES.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-30px' }}
                transition={{
                  duration: 0.45,
                  delay: idx * 0.08,
                  ease: [0.16, 1, 0.3, 1],
                }}
                whileHover={{ y: -3 }}
                className="p-6 rounded-3xl bg-[#FAFAF8] border border-black/[0.08] shadow-[0_2px_8px_rgba(0,0,0,0.02)] hover:border-black/20 hover:shadow-[0_8px_24px_rgba(0,0,0,0.05)] transition-all duration-200 flex flex-col justify-between group"
              >
                <div>
                  <div className="w-11 h-11 rounded-2xl bg-white border border-black/[0.08] flex items-center justify-center text-[#111111] group-hover:bg-[#111111] group-hover:text-white transition-colors duration-200 mb-5 shadow-2xs">
                    <Icon size={20} />
                  </div>
                  <h3 className="text-[19px] sm:text-[20px] font-medium text-[#111111] font-serif tracking-tight mb-1">
                    {item.title}
                  </h3>
                  <div className="text-[11px] font-mono text-[#888888] uppercase tracking-wider mb-3">
                    {item.role}
                  </div>
                  <p className="text-[13.5px] sm:text-[14px] text-[#666666] leading-relaxed font-sans">
                    {item.desc}
                  </p>
                </div>

                <div className="mt-6 pt-3 border-t border-black/[0.04] text-[11px] font-mono text-[#888888]">
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
