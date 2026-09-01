import React from 'react';
import { motion } from 'motion/react';
import { 
  History, 
  CopySlash, 
  Users2, 
  ShieldCheck, 
  ArrowRight,
  Sparkles
} from 'lucide-react';

interface AboutViewProps {
  onGetStarted: () => void;
  onExploreHowItWorks: () => void;
}

export const AboutView: React.FC<AboutViewProps> = ({
  onGetStarted,
  onExploreHowItWorks
}) => {
  const sections = [
    {
      id: 'why-it-exists',
      title: 'Why ProjectVerse Exists',
      icon: Sparkles,
      desc: 'Higher education produces billions of dollars worth of student intellectual property every single year. Yet, without an enduring continuity system, 90% of capstone projects vanish after final grading into forgotten ZIP archives.'
    },
    {
      id: 'duplication-problem',
      title: 'The Academic Duplication Problem',
      icon: CopySlash,
      desc: 'Each academic year, incoming cohorts unwittingly re-engineer standard starter applications from scratch. This wastes immense creative potential that could instead be channeled into building novel extensions on top of proven foundations.'
    },
    {
      id: 'project-continuity',
      title: 'Project Continuity Across Batches',
      icon: History,
      desc: 'ProjectVerse introduces persistent Project Passports and Lineage Trees. A graduate batch hands off architecture documentation, open issues, and roadmaps directly to incoming cohorts, allowing academic projects to mature into real-world production systems.'
    },
    {
      id: 'cross-college-collaboration',
      title: 'Cross-College Collaboration',
      icon: Users2,
      desc: 'Break down institutional silos. An AI researcher in one university can seamlessly team up with a robotics specialist in another, guided by verified inter-university faculty advisors and peer-reviewed contribution histories.'
    },
    {
      id: 'verified-academic-work',
      title: 'Verified Academic Work & Proof-of-Work',
      icon: ShieldCheck,
      desc: 'Moving beyond unverified resumes. Every student contribution is verified against real git telemetry, rubric-based faculty reviews, and institutional HOD sign-offs — creating immutable credentials recognized worldwide.'
    }
  ];

  return (
    <div className="w-full min-h-screen bg-[#FFFFFF] text-[#111111] pt-32 pb-24 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 sm:mb-20">
          <span className="text-xs font-mono-code uppercase tracking-widest text-[#737373] font-semibold">
            About ProjectVerse
          </span>
          <h1 className="font-display text-4xl sm:text-6xl text-[#111111] font-normal mt-3 leading-tight">
            Engineering a Future Where Academic Work Never Dies.
          </h1>
          <p className="mt-4 font-body text-sm sm:text-base text-[#4A4A4A] leading-relaxed">
            ProjectVerse is the universal academic continuity ecosystem connecting students, faculty, and institutions worldwide.
          </p>
        </div>

        {/* 5 Concise Pillars */}
        <div className="space-y-6 mb-16">
          {sections.map((sec, idx) => {
            const Icon = sec.icon;
            return (
              <motion.div
                key={sec.id}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.06 }}
                className="card-white p-6 sm:p-8"
              >
                <div className="flex items-start gap-4 sm:gap-5">
                  <div className="w-10 h-10 rounded-xl bg-[#F5F5F3] border border-black/6 flex items-center justify-center text-[#111111] shrink-0 mt-0.5">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-body text-lg sm:text-xl font-semibold text-[#111111] mb-2">
                      {sec.title}
                    </h3>
                    <p className="font-body text-sm text-[#4A4A4A] leading-relaxed">
                      {sec.desc}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Action Callout */}
        <div className="card-white bg-[#F7F7F5] p-8 text-center border border-black/8">
          <h2 className="font-display text-2xl sm:text-3xl text-[#111111] font-normal mb-3">
            Ready to give your academic project a future?
          </h2>
          <p className="text-xs sm:text-sm text-[#4A4A4A] max-w-md mx-auto mb-6">
            Join students and faculty collaborating across top academic institutions.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={onGetStarted}
              className="btn-primary-black w-full sm:w-auto px-6 py-3 flex items-center justify-center gap-1.5 cursor-pointer text-xs sm:text-sm font-medium"
            >
              <span>Get Started</span>
              <ArrowRight className="w-4 h-4 text-white" />
            </button>
            <button
              onClick={onExploreHowItWorks}
              className="btn-secondary-white w-full sm:w-auto px-6 py-3 flex items-center justify-center gap-1.5 cursor-pointer text-xs sm:text-sm font-medium"
            >
              <span>View How It Works</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
