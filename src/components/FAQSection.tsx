import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, HelpCircle } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
}

const FAQ_LIST: FAQItem[] = [
  {
    question: 'What is a Project Passport and how is it verified?',
    answer: 'A Project Passport is a cryptographically verifiable academic identity card for your project. It consolidates team contributor roles, institutional affiliation, faculty review sign-offs, and verified GitHub commits without publicly exposing private student documentation.'
  },
  {
    question: 'How does Project Lineage allow work to continue across cohorts?',
    answer: 'Instead of academic projects being abandoned after final exams, Project Lineage establishes a clear genealogical chain. Subsequent batches can inherit the verified codebase, expand features, and contribute new milestones while original creators permanently retain primary attribution.'
  },
  {
    question: 'Can alumni still participate and mentor after graduating?',
    answer: 'Yes. Alumni register under the verified Student account tier (selecting the Alumni / Pass-out profile). They can mentor active student teams, review cross-batch lineage developments, and contribute to open repositories as senior advisors.'
  },
  {
    question: 'Is GitHub required, and is it used as a login provider?',
    answer: 'GitHub is used strictly for repository evidence, technical commit tracking, and commit verification. It is not used as a login or authentication provider. You sign in using your verified institutional email credentials.'
  },
  {
    question: 'What roles can join ProjectVerse?',
    answer: 'ProjectVerse supports Students (both current undergraduates/postgraduates and alumni), Faculty Mentors, and Department Heads (HOD). System administrators are governed through internal institutional protocols.'
  }
];

export const FAQSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFAQ = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="faq" className="relative w-full py-16 sm:py-20 md:py-24 px-4 sm:px-6 bg-[#F7F7F5] border-t border-black/8 font-serif">
      <div className="max-w-4xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14">
          <span className="text-[11px] sm:text-[12px] uppercase tracking-[0.2em] text-[#737373] font-bold block mb-2">
            FREQUENTLY ASKED QUESTIONS
          </span>
          <h2 className="text-[26px] sm:text-[32px] md:text-[38px] text-[#111111] font-bold tracking-tight uppercase">
            Clarity on Academic Continuity
          </h2>
          <p className="text-[14px] sm:text-[15px] text-[#4A4A4A] mt-2">
            Direct answers regarding project verification, passports, lineage, and institutional roles.
          </p>
        </div>

        <div className="space-y-3 max-w-3xl mx-auto">
          {FAQ_LIST.map((item, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="card-white border border-black/8 overflow-hidden transition-all duration-200"
              >
                <button
                  type="button"
                  onClick={() => toggleFAQ(idx)}
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 cursor-pointer focus:outline-none select-none"
                  aria-expanded={isOpen}
                >
                  <h3 className="text-[16px] sm:text-[18px] font-bold text-[#111111] pr-2">
                    {item.question}
                  </h3>
                  <div className={`w-7 h-7 rounded-full bg-[#F5F5F3] border border-black/6 flex items-center justify-center text-[#111111] shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-180 bg-[#111111] text-white' : ''}`}>
                    <ChevronDown className="w-3.5 h-3.5" />
                  </div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 sm:px-6 pb-5 sm:pb-6 pt-1 text-[14px] sm:text-[15px] text-[#4A4A4A] leading-relaxed border-t border-black/5">
                        {item.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
