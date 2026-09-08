import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Plus, Minus } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
}

const FAQ_ITEMS: FAQItem[] = [
  {
    question: 'What is ProjectVerse?',
    answer:
      'ProjectVerse is academic project infrastructure connecting student repositories across colleges. It enables students to discover existing work, collaborate with peers, verify genuine contributions with faculty, and pass projects forward to future cohorts.',
  },
  {
    question: 'Who can use ProjectVerse?',
    answer:
      'Undergraduate and graduate students, faculty project guides, department heads (HODs), and campus administrators can use ProjectVerse with institutional or verified email credentials.',
  },
  {
    question: 'How does project verification work?',
    answer:
      'Verification links actual GitHub commit activity and technical documentation directly with formal faculty review and department approval, generating an accredited Proof of Work record.',
  },
  {
    question: 'What is a Project Passport?',
    answer:
      'A Project Passport is a verified digital document containing a project’s permanent identity, institutional affiliation, active contributors, tech stack, repository links, and faculty validation stamps.',
  },
  {
    question: 'What is Project Lineage?',
    answer:
      'Project Lineage is a multi-year version tree showing how subsequent batches inherit, maintain, and upgrade an existing project rather than rebuilding common solutions from scratch.',
  },
  {
    question: 'Can students collaborate across colleges?',
    answer:
      'Yes. Students from different campuses can form inter-college teams, fork repositories, contribute modules, and coordinate with remote faculty mentors through the platform.',
  },
  {
    question: 'Is GitHub required?',
    answer:
      'GitHub integration is standard for automated commit tracking, pull request verification, and code provenance, but hardware and design projects can also attach research documents, CAD files, and media.',
  },
  {
    question: 'Can alumni continue existing projects?',
    answer:
      'Yes. Alumni can transition to advisory and mentor roles, preserving their original contribution records while guiding active batches that continue developing the codebase.',
  },
];

export const FAQSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleQuestion = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section 
      id="faq" 
      className="relative w-full py-18 sm:py-24 px-4 sm:px-6 bg-[#FAFAF8] border-t border-black/[0.06] select-none"
    >
      <div className="max-w-3xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/[0.04] text-[11px] font-['Manrope',sans-serif] font-semibold uppercase tracking-wider text-[#555555] mb-3">
            Common Inquiries
          </div>
          <h2 className="font-serif text-[28px] sm:text-[32px] md:text-[40px] text-[#111111] font-normal tracking-[-0.01em] leading-tight">
            Frequently Asked Questions
          </h2>
          <p className="mt-2.5 text-[15px] sm:text-[16px] text-[#555555] font-sans">
            Practical answers about ProjectVerse architecture, verification, and academic collaboration.
          </p>
        </div>

        {/* Accordion Container */}
        <div className="space-y-2.5">
          {FAQ_ITEMS.map((item, idx) => {
            const isOpen = openIndex === idx;
            return (
              <motion.div
                key={item.question}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-20px' }}
                transition={{ duration: 0.3, delay: idx * 0.04 }}
                className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                  isOpen
                    ? 'bg-white border-black/[0.12] shadow-[0_2px_12px_rgba(0,0,0,0.03)]'
                    : 'bg-white/80 border-black/[0.06] hover:bg-white hover:border-black/[0.1]'
                }`}
              >
                <button
                  onClick={() => toggleQuestion(idx)}
                  className="w-full min-h-[48px] px-5 sm:px-6 py-4 flex items-center justify-between text-left gap-4 cursor-pointer focus:outline-none"
                  aria-expanded={isOpen}
                >
                  <span className="text-[15px] sm:text-[16px] font-semibold text-[#111111] font-['Manrope',sans-serif]">
                    {item.question}
                  </span>
                  <div className="w-6 h-6 rounded-full bg-[#F5F5F3] flex items-center justify-center shrink-0 text-[#111111]">
                    {isOpen ? <Minus size={13} /> : <Plus size={13} />}
                  </div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="content"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 sm:px-6 pb-5 pt-1 text-[14px] sm:text-[14.5px] text-[#555555] leading-relaxed font-sans border-t border-black/[0.04]">
                        {item.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
