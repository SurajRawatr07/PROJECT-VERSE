import React, { useState, memo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
}

const FAQ_LIST: FAQItem[] = [
  {
    question: 'What is ProjectVerse?',
    answer: 'ProjectVerse is an academic project platform that connects projects across colleges, allowing students to discover prior work, collaborate inter-campus, verify proof-of-work, and allow future batches to continue existing codebases.',
  },
  {
    question: 'Who can use ProjectVerse?',
    answer: 'Students (undergraduate, postgraduate, and alumni), faculty evaluators, Department Heads (HODs), and academic institutions. Verified accounts ensure genuine contributions.',
  },
  {
    question: 'How does project verification work?',
    answer: 'Verification combines GitHub commit logs, technical documentation, author contribution metrics, and official faculty rubric review into a trusted academic record.',
  },
  {
    question: 'What is a Project Passport?',
    answer: 'A digital academic identity card for your project summarizing its contributors, tech stack, verification status, institutional affiliation, and historical milestones.',
  },
  {
    question: 'What is Project Lineage?',
    answer: 'Project Lineage is an inter-batch genealogical chain. It allows graduating students to hand off verified codebases to incoming cohorts so projects grow over years rather than reset to zero.',
  },
  {
    question: 'Can students collaborate across colleges?',
    answer: 'Yes. ProjectVerse is built specifically for inter-institutional collaboration, letting students from different universities discover and co-author shared projects.',
  },
  {
    question: 'Is GitHub required?',
    answer: 'GitHub is used as the code evidence provider for commit tracking and repository linking. Authentication uses your verified institutional email.',
  },
  {
    question: 'Can alumni continue existing projects?',
    answer: 'Yes. Alumni retain permanent primary attribution for their original work and can mentor or contribute to successor cohorts on active project lineages.',
  },
];

interface FAQItemRowProps {
  item: FAQItem;
  isOpen: boolean;
  onToggle: () => void;
  index: number;
}

const FAQItemRow: React.FC<FAQItemRowProps> = memo(({ item, isOpen, onToggle, index }) => {
  return (
    <div className="rounded-2xl bg-white border border-black/[0.08] shadow-[0_1px_4px_rgba(0,0,0,0.02)] overflow-hidden transition-all duration-200">
      <button
        type="button"
        id={`faq-item-toggle-${index}`}
        onClick={onToggle}
        className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 cursor-pointer focus:outline-none select-none group"
        aria-expanded={isOpen}
      >
        <h3 className="text-[15.5px] sm:text-[17px] font-medium text-[#111111] font-serif pr-2 group-hover:text-black transition-colors">
          {item.question}
        </h3>
        <div
          className={`w-7 h-7 rounded-full bg-[#F7F7F5] border border-black/[0.06] flex items-center justify-center text-[#111111] shrink-0 transition-transform duration-200 ${
            isOpen ? 'rotate-180 bg-[#111111] text-white' : 'group-hover:bg-[#EBEBE8]'
          }`}
        >
          <ChevronDown className="w-3.5 h-3.5" />
        </div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="px-5 pb-5 sm:px-6 sm:pb-6 pt-0 border-t border-black/[0.04]">
              <p className="text-[14px] sm:text-[14.5px] text-[#555555] leading-relaxed font-sans pt-3">
                {item.answer}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
});

FAQItemRow.displayName = 'FAQItemRow';

export const FAQSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleItem = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section 
      id="faq" 
      className="relative w-full py-20 sm:py-28 px-4 sm:px-6 bg-[#FAFAF8] border-t border-black/[0.06] select-none"
    >
      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/[0.04] text-[11px] font-mono uppercase tracking-widest text-[#4A4A4A] mb-3">
            Clear Answers
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#111111] font-normal tracking-[-0.01em] leading-tight">
            Frequently Asked Questions
          </h2>
          <p className="mt-3 text-[14.5px] sm:text-[15.5px] text-[#666666] font-sans">
            Everything you need to know about the ProjectVerse ecosystem.
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-3 sm:space-y-3.5">
          {FAQ_LIST.map((item, idx) => (
            <FAQItemRow
              key={item.question}
              item={item}
              isOpen={openIndex === idx}
              onToggle={() => toggleItem(idx)}
              index={idx}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
