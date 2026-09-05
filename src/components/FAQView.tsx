import React, { useState, useCallback, memo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Plus } from 'lucide-react';
import { ProjectVerseLogo } from './ProjectVerseLogo';

interface FAQQuestion {
  id: string;
  num: string;
  question: string;
  answer: string;
}

interface FAQCategory {
  label: string;
  questions: FAQQuestion[];
}

const FAQ_DATA: FAQCategory[] = [
  {
    label: '01 — PROJECTVERSE',
    questions: [
      {
        id: 'q1',
        num: '01',
        question: 'What is ProjectVerse?',
        answer:
          'ProjectVerse is an academic project ecosystem that connects students, faculty, HODs and institutions around real academic projects. It helps users discover existing work, collaborate, verify projects and continue their development across batches.'
      },
      {
        id: 'q2',
        num: '02',
        question: 'What problem does ProjectVerse solve?',
        answer:
          'Academic projects are often difficult to discover, repeated by different students and abandoned after submission or graduation. ProjectVerse gives projects a structured identity, verified academic context and a path for future collaboration and continuation.'
      }
    ]
  },
  {
    label: '02 — VERIFICATION',
    questions: [
      {
        id: 'q3',
        num: '03',
        question: 'How are students verified?',
        answer:
          'Registration and verification are separate. Students provide academic information such as institution, department, roll/enrollment number and academic email. Email OTP verifies email ownership, while academic documents and authorized Faculty/HOD review can be used for student-status verification.'
      },
      {
        id: 'q4',
        num: '04',
        question: 'Does having a college email automatically make a student verified?',
        answer:
          'No. A college email verifies ownership of the institutional email address. Student verification can additionally require academic details, enrollment information, supporting documents and authorized institutional review.'
      },
      {
        id: 'q5',
        num: '05',
        question: 'Can alumni join ProjectVerse?',
        answer:
          'Yes. Alumni can register under the Student role as an Alumni account type. Verified alumni can contribute to projects, mentor students, collaborate and help continue project work across batches.'
      }
    ]
  },
  {
    label: '03 — PROJECT PASSPORT',
    questions: [
      {
        id: 'q6',
        num: '06',
        question: 'What is a Project Passport?',
        answer:
          'Project Passport is the structured identity of an academic project. It can contain the project title, team members, institution, department, technologies, faculty mentor, verification status, GitHub repository and project status.'
      },
      {
        id: 'q7',
        num: '07',
        question: 'Why is Project Passport important?',
        answer:
          'It keeps important academic project information organized in one place and provides a consistent identity that can remain associated with the project throughout its lifecycle.'
      }
    ]
  },
  {
    label: '04 — PROJECT LINEAGE',
    questions: [
      {
        id: 'q8',
        num: '08',
        question: 'What is Project Lineage?',
        answer:
          'Project Lineage records how a project evolves over time. Future students or contributors can continue an existing project while preserving its previous contributors, milestones and development history.'
      },
      {
        id: 'q9',
        num: '09',
        question: 'How does Project Lineage prevent projects from being lost after graduation?',
        answer:
          'The project remains connected to its previous work and contributors instead of ending with one academic batch. Future students and alumni can extend, improve or contribute to the same project while maintaining its history.'
      }
    ]
  },
  {
    label: '05 — COLLABORATION & AI',
    questions: [
      {
        id: 'q10',
        num: '10',
        question: 'Can students collaborate with students from other colleges?',
        answer:
          'Yes, where the project and user visibility settings allow it. ProjectVerse is designed to make academic projects discoverable across institutions and help students connect around relevant skills and project requirements.'
      },
      {
        id: 'q11',
        num: '11',
        question: 'How does AI Matching work?',
        answer:
          'The recommendation system can use project requirements, skills, interests and verified proof-of-work to suggest relevant projects, teammates or mentors.'
      },
      {
        id: 'q12',
        num: '12',
        question: 'Is ProjectVerse replacing GitHub?',
        answer:
          'No. GitHub remains the development and repository platform. ProjectVerse adds the academic ecosystem around the project, including verification, institutional context, project identity, collaboration, Project Passport and Project Lineage.'
      }
    ]
  },
  {
    label: '06 — INSTITUTIONAL ROLES',
    questions: [
      {
        id: 'q13',
        num: '13',
        question: 'What does a Faculty member do?',
        answer:
          'Faculty members can mentor students, review projects, provide feedback and participate in project verification workflows.'
      },
      {
        id: 'q14',
        num: '14',
        question: 'What does an HOD do?',
        answer:
          'HODs can get an institution/department-level view of relevant students, faculty and projects. Project and user records are mapped to institutions and departments so authorized HODs can monitor project activity and verification.'
      },
      {
        id: 'q15',
        num: '15',
        question: 'What does the Admin do?',
        answer:
          'Admin manages platform-level operations such as users, institutions, verification workflows, projects, reports and audit activities. Admin access is restricted and should not be freely selectable during public registration.'
      },
      {
        id: 'q16',
        num: '16',
        question: 'Can students access Faculty, HOD or Admin dashboards?',
        answer:
          'No. Access must be controlled through backend role-based authorization. A student should not gain access simply by changing a URL, local storage value or frontend state.'
      }
    ]
  }
];

interface FAQRowProps {
  item: FAQQuestion;
  isOpen: boolean;
  onToggle: () => void;
}

const FAQRow: React.FC<FAQRowProps> = memo(({ item, isOpen, onToggle }) => {
  return (
    <div className="bg-white border border-black/[0.07] rounded-xl overflow-hidden transition-all duration-180 hover:border-black/15">
      <button
        type="button"
        id={`faq-btn-${item.id}`}
        onClick={onToggle}
        aria-expanded={isOpen}
        aria-controls={`faq-panel-${item.id}`}
        className="w-full min-h-[52px] p-4 sm:p-5 text-left flex items-center justify-between gap-3 sm:gap-4 cursor-pointer focus:outline-none focus-visible:ring-1 focus-visible:ring-black select-none group"
      >
        <div className="flex items-center gap-3 sm:gap-4 min-w-0 flex-1">
          {/* Index on the left */}
          <span className="font-mono-code text-[12px] sm:text-[13px] text-[#777777] font-medium shrink-0 w-6 sm:w-7 tracking-tight">
            {item.num}
          </span>
          {/* Question text in center */}
          <span className="text-[15px] sm:text-[16.5px] font-bold text-[#111111] leading-snug group-hover:text-black">
            {item.question}
          </span>
        </div>

        {/* Plus icon on the right: rotates 45deg to an 'x' when opened */}
        <div
          className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full border border-black/8 flex items-center justify-center shrink-0 transition-all duration-200 ease-out ${
            isOpen
              ? 'bg-[#111111] text-white rotate-45 border-transparent shadow-2xs'
              : 'bg-[#F7F7F5] text-[#111111] group-hover:bg-[#EBEBE8]'
          }`}
          aria-hidden="true"
        >
          <Plus className="w-3.5 h-3.5 sm:w-4 sm:h-4 stroke-[2]" />
        </div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            id={`faq-panel-${item.id}`}
            role="region"
            aria-labelledby={`faq-btn-${item.id}`}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <div className="px-4 sm:px-5 pb-5 pt-1 border-t border-black/[0.05]">
              <p className="text-[14px] sm:text-[15px] text-[#4A4A4A] leading-relaxed pl-9 sm:pl-11 font-normal font-sans">
                {item.answer}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
});

interface FAQViewProps {
  onGetStarted?: () => void;
  onExploreProjects?: () => void;
}

export const FAQView: React.FC<FAQViewProps> = () => {
  // Store set of open item IDs for flexible user exploration
  const [openIds, setOpenIds] = useState<Set<string>>(() => new Set(['q1']));

  const handleToggle = useCallback((id: string) => {
    setOpenIds(prev => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  }, []);

  return (
    <div className="w-full min-h-screen bg-[#FFFFFF] text-[#111111] pt-28 sm:pt-36 pb-20 sm:pb-28 px-4 sm:px-6 font-serif">
      <div className="max-w-4xl mx-auto">
        {/* Page Header Area */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          {/* Subtle Category Pill */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FAFAFA] border border-black/8 shadow-xs mb-5">
            <ProjectVerseLogo size={15} color="#111111" />
            <span className="text-[11px] sm:text-[12px] uppercase tracking-widest text-[#4A4A4A] font-medium font-sans">
              Academic Continuity & Verification
            </span>
          </div>

          {/* Primary Page Heading */}
          <h1 className="text-[28px] sm:text-[36px] md:text-[42px] text-[#111111] font-bold tracking-tight uppercase leading-tight">
            FREQUENTLY ASKED QUESTIONS
          </h1>

          {/* Subheading */}
          <h2 className="text-[17px] sm:text-[19px] md:text-[21px] text-[#222222] font-medium mt-3">
            Clarity on Academic Continuity
          </h2>

          {/* Supporting Text */}
          <p className="mt-3 text-[14px] sm:text-[15.5px] text-[#555555] leading-relaxed max-w-2xl mx-auto font-normal font-sans">
            Direct answers regarding project verification, Project Passports, Project Lineage, collaboration, AI matching, and institutional roles.
          </p>
        </div>

        {/* Categories & Accordion List */}
        <div className="space-y-10 sm:space-y-12">
          {FAQ_DATA.map(category => (
            <div key={category.label} className="space-y-3">
              {/* Category Label */}
              <div className="flex items-center gap-2 px-1">
                <span className="text-[11.5px] sm:text-[12px] font-mono-code font-medium text-[#777777] uppercase tracking-widest">
                  {category.label}
                </span>
                <div className="h-[1px] bg-black/[0.06] flex-1" />
              </div>

              {/* Questions in Category */}
              <div className="space-y-2.5">
                {category.questions.map(item => (
                  <FAQRow
                    key={item.id}
                    item={item}
                    isOpen={openIds.has(item.id)}
                    onToggle={() => handleToggle(item.id)}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FAQView;
