import React from 'react';
import { motion } from 'motion/react';
import { GraduationCap, BookOpen, Building2, ShieldCheck } from 'lucide-react';

interface RolesSectionProps {
  onSelectRole?: (role: string) => void;
}

export const RolesSection: React.FC<RolesSectionProps> = ({ onSelectRole }) => {
  const roles = [
    {
      id: 'student',
      title: 'Student',
      desc: 'Build and collaborate.',
      icon: GraduationCap
    },
    {
      id: 'faculty',
      title: 'Faculty',
      desc: 'Guide and review.',
      icon: BookOpen
    },
    {
      id: 'hod',
      title: 'HOD',
      desc: 'Track department projects.',
      icon: Building2
    },
    {
      id: 'admin',
      title: 'Admin',
      desc: 'Manage the platform.',
      icon: ShieldCheck
    }
  ];

  return (
    <section id="roles" className="relative w-full py-16 sm:py-20 md:py-24 px-4 sm:px-6 bg-[#FFFFFF] border-t border-black/8 font-serif">
      <div className="max-w-5xl mx-auto">
        {/* Section Heading: 32–40px Desktop, 28–34px Tablet, 26–30px Mobile */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14">
          <h2 className="text-[26px] sm:text-[30px] md:text-[36px] text-[#111111] font-bold tracking-tight uppercase">
            One Platform. Every Role.
          </h2>
        </div>

        {/* 4 Concise Role Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
          {roles.map((role, idx) => {
            const Icon = role.icon;
            return (
              <motion.div
                key={role.id}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: idx * 0.05 }}
                onClick={() => onSelectRole?.(role.id)}
                className="card-white p-6 sm:p-7 flex flex-col justify-between group hover:border-black/15 transition-all duration-200 cursor-default"
              >
                <div>
                  <div className="w-10 h-10 rounded-xl bg-[#F5F5F3] border border-black/6 flex items-center justify-center text-[#111111] mb-5 group-hover:bg-[#111111] group-hover:text-white transition-colors duration-200">
                    <Icon className="w-5 h-5" />
                  </div>

                  <h3 className="text-[19px] sm:text-[21px] md:text-[22px] font-bold text-[#111111] mb-2 tracking-wide">
                    {role.title}
                  </h3>

                  <p className="text-[14px] sm:text-[15px] md:text-[16px] text-[#4A4A4A] leading-relaxed tracking-wide">
                    {role.desc}
                  </p>
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
