import React, { useState, useEffect, useMemo, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Search, 
  X, 
  FolderGit2, 
  Users, 
  GraduationCap, 
  Cpu, 
  Building2, 
  ArrowRight,
  Sparkles,
  Command
} from 'lucide-react';
import { SAMPLE_PROJECTS, SAMPLE_MENTORS, SAMPLE_PEERS } from '../../data/mockData';
import { ProjectItem } from '../../types';

interface GlobalSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectProject: (project: ProjectItem) => void;
  onSelectTech?: (tech: string) => void;
  onSelectInstitution?: (institution: string) => void;
}

export const GlobalSearchModal: React.FC<GlobalSearchModalProps> = ({
  isOpen,
  onClose,
  onSelectProject,
  onSelectTech,
  onSelectInstitution
}) => {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  // Handle keyboard escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const searchResults = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) {
      return {
        projects: SAMPLE_PROJECTS.slice(0, 3),
        people: [...SAMPLE_PEERS.slice(0, 2), ...SAMPLE_MENTORS.slice(0, 2)],
        technologies: ['React', 'PyTorch', 'ROS 2', 'TypeScript', 'CUDA', 'Node.js'],
        institutions: ['Graphic Era Hill University', 'IIT Bombay', 'IIIT Hyderabad', 'BITS Pilani']
      };
    }

    // Projects
    const projects = SAMPLE_PROJECTS.filter(
      p => p.title.toLowerCase().includes(q) ||
           p.description.toLowerCase().includes(q) ||
           p.techStack.some(t => t.toLowerCase().includes(q))
    ).slice(0, 4);

    // People (Students & Faculty)
    const peers = SAMPLE_PEERS.filter(
      p => p.name.toLowerCase().includes(q) ||
           p.skills.some(s => s.toLowerCase().includes(q)) ||
           p.institution.toLowerCase().includes(q)
    );
    const mentors = SAMPLE_MENTORS.filter(
      m => m.name.toLowerCase().includes(q) ||
           m.domains.some(d => d.toLowerCase().includes(q)) ||
           m.institution.toLowerCase().includes(q)
    );
    const people = [...peers, ...mentors].slice(0, 4);

    // Technologies
    const techPool = ['React', 'PyTorch', 'ROS 2', 'TypeScript', 'Node.js', 'Python', 'CUDA', 'C++', 'Docker', 'Solidity', 'Tailwind CSS', 'Go'];
    const technologies = techPool.filter(t => t.toLowerCase().includes(q));

    // Institutions
    const instPool = [
      'Graphic Era Hill University',
      'IIT Bombay',
      'IIIT Hyderabad',
      'BITS Pilani',
      'NIT Trichy',
      'Delhi Technological University'
    ];
    const institutions = instPool.filter(i => i.toLowerCase().includes(q));

    return { projects, people, technologies, institutions };
  }, [query]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-start justify-center p-3 sm:p-6 sm:pt-20 overflow-y-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.97, y: -10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.97, y: -10 }}
          transition={{ duration: 0.18 }}
          className="relative z-10 w-full max-w-2xl bg-white rounded-2xl sm:rounded-3xl border border-black/12 shadow-2xl overflow-hidden text-[#111111]"
        >
          {/* Search Input Bar */}
          <div className="p-3.5 sm:p-4 border-b border-black/8 flex items-center gap-3">
            <Search className="w-5 h-5 text-[#737373] shrink-0" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search projects, students, faculty, technologies, institutions..."
              className="flex-1 bg-transparent text-sm sm:text-base font-body text-[#111111] placeholder:text-[#737373] focus:outline-none"
            />
            {query && (
              <button
                onClick={() => setQuery('')}
                className="p-1 text-[#737373] hover:text-[#111111]"
              >
                <X className="w-4 h-4" />
              </button>
            )}
            <button
              onClick={onClose}
              className="px-2.5 py-1 rounded-lg bg-[#F5F5F3] hover:bg-[#EBEBE8] text-xs font-mono-code text-[#4A4A4A] cursor-pointer"
            >
              ESC
            </button>
          </div>

          {/* Grouped Results */}
          <div className="max-h-[60vh] overflow-y-auto p-3 sm:p-4 space-y-4">
            {/* PROJECTS */}
            {searchResults.projects.length > 0 && (
              <div>
                <div className="flex items-center gap-2 px-2 pb-1.5 text-[11px] font-mono-code uppercase text-[#737373] tracking-wider font-semibold">
                  <FolderGit2 className="w-3.5 h-3.5" />
                  <span>Projects</span>
                </div>
                <div className="space-y-1">
                  {searchResults.projects.map((p) => (
                    <button
                      key={p.id}
                      onClick={() => {
                        onSelectProject(p);
                        onClose();
                      }}
                      className="w-full p-2.5 rounded-xl hover:bg-[#F7F7F5] flex items-center justify-between text-left transition-colors cursor-pointer group"
                    >
                      <div className="min-w-0 pr-2">
                        <div className="flex items-center gap-2">
                          <p className="text-xs sm:text-sm font-semibold text-[#111111] truncate group-hover:text-blue-600">
                            {p.title}
                          </p>
                          <span className="text-[10px] font-mono-code px-1.5 py-0.2 rounded bg-neutral-100 text-neutral-600 shrink-0">
                            {p.domain.split('&')[0]}
                          </span>
                        </div>
                        <p className="text-[11px] text-[#737373] truncate">{p.institution}</p>
                      </div>
                      <ArrowRight className="w-3.5 h-3.5 text-[#737373] group-hover:text-blue-600 group-hover:translate-x-0.5 transition-all shrink-0" />
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* PEOPLE */}
            {searchResults.people.length > 0 && (
              <div>
                <div className="flex items-center gap-2 px-2 pb-1.5 text-[11px] font-mono-code uppercase text-[#737373] tracking-wider font-semibold">
                  <Users className="w-3.5 h-3.5" />
                  <span>Students & Faculty</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                  {searchResults.people.map((person: any, idx) => (
                    <div
                      key={idx}
                      className="p-2.5 rounded-xl bg-[#FBFBFA] border border-black/6 flex items-center gap-2.5"
                    >
                      <img
                        src={person.avatar}
                        alt={person.name}
                        className="w-8 h-8 rounded-full object-cover border border-black/10 shrink-0"
                      />
                      <div className="min-w-0">
                        <p className="text-xs font-semibold text-[#111111] truncate">{person.name}</p>
                        <p className="text-[10px] text-[#737373] truncate">
                          {person.role || person.title || 'Researcher'} • {person.institution}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TECHNOLOGIES */}
            {searchResults.technologies.length > 0 && (
              <div>
                <div className="flex items-center gap-2 px-2 pb-1.5 text-[11px] font-mono-code uppercase text-[#737373] tracking-wider font-semibold">
                  <Cpu className="w-3.5 h-3.5" />
                  <span>Technologies</span>
                </div>
                <div className="flex flex-wrap gap-1.5 px-2">
                  {searchResults.technologies.map((tech) => (
                    <button
                      key={tech}
                      onClick={() => {
                        if (onSelectTech) onSelectTech(tech);
                        onClose();
                      }}
                      className="px-3 py-1.5 rounded-xl bg-[#F7F7F5] hover:bg-[#111111] hover:text-white border border-black/8 text-xs font-mono-code text-[#111111] transition-colors cursor-pointer"
                    >
                      {tech}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* INSTITUTIONS */}
            {searchResults.institutions.length > 0 && (
              <div>
                <div className="flex items-center gap-2 px-2 pb-1.5 text-[11px] font-mono-code uppercase text-[#737373] tracking-wider font-semibold">
                  <Building2 className="w-3.5 h-3.5" />
                  <span>Institutions</span>
                </div>
                <div className="space-y-1">
                  {searchResults.institutions.map((inst) => (
                    <button
                      key={inst}
                      onClick={() => {
                        if (onSelectInstitution) onSelectInstitution(inst);
                        onClose();
                      }}
                      className="w-full px-3 py-2 rounded-xl hover:bg-[#F7F7F5] text-left text-xs font-medium text-[#111111] flex items-center justify-between transition-colors cursor-pointer"
                    >
                      <span>{inst}</span>
                      <ArrowRight className="w-3 h-3 text-[#737373]" />
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Footer keyboard hint */}
          <div className="p-3 bg-[#FBFBFA] border-t border-black/8 flex items-center justify-between text-[11px] font-mono-code text-[#737373]">
            <span>Navigate: Global Directory Index</span>
            <div className="flex items-center gap-2">
              <span>Press <kbd className="px-1.5 py-0.5 rounded bg-white border border-black/10">ESC</kbd> to exit</span>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
