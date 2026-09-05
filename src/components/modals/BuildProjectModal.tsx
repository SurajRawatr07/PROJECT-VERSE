import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, 
  PlusCircle, 
  GitBranch, 
  ShieldCheck, 
  GraduationCap, 
  CheckCircle2, 
  Sparkles, 
  Layers,
  ArrowRight
} from 'lucide-react';
import { DOMAINS_LIST } from '../../data/mockData';
import { ProjectDomain } from '../../types';

interface BuildProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onProjectCreated: (projectData: any) => void;
}

export const BuildProjectModal: React.FC<BuildProjectModalProps> = ({
  isOpen,
  onClose,
  onProjectCreated
}) => {
  const [title, setTitle] = useState('');
  const [tagline, setTagline] = useState('');
  const [domain, setDomain] = useState<ProjectDomain>('Artificial Intelligence & ML');
  const [techInput, setTechInput] = useState('React, TypeScript, PyTorch, ROS 2');
  const [institution, setInstitution] = useState('Graphic Era Hill University');
  const [githubRepo, setGithubRepo] = useState('');
  const [facultyAdvisor, setFacultyAdvisor] = useState('Dr. Anil Sharma');
  const [isSuccess, setIsSuccess] = useState(false);
  const [generatedPassportId, setGeneratedPassportId] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !institution) return;

    const shortInst = institution.includes('Graphic Era') ? 'GEHU' : institution.split(' ')[0].toUpperCase() || 'UNIV';
    const randomNum = Math.floor(100 + Math.random() * 900);
    const newPassportId = `PV-2026-${shortInst}-CAP${randomNum}`;
    setGeneratedPassportId(newPassportId);
    setIsSuccess(true);

    setTimeout(() => {
      onProjectCreated({
        title,
        tagline,
        domain,
        techStack: techInput.split(',').map((s) => s.trim()),
        institution,
        githubRepo,
        passportId: newPassportId
      });
    }, 1200);
  };

  const handleReset = () => {
    setIsSuccess(false);
    onClose();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleReset}
          className="fixed inset-0 bg-black/45 backdrop-blur-sm"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 16 }}
          className="relative z-10 w-full max-w-2xl bg-white rounded-3xl p-6 sm:p-9 border border-black/10 shadow-2xl text-[#111111] max-h-[92vh] overflow-y-auto"
        >
          <button
            onClick={handleReset}
            className="absolute top-5 right-5 w-8 h-8 rounded-full bg-[#F5F5F3] hover:bg-[#ECECE9] border border-black/8 flex items-center justify-center text-[#4A4A4A] hover:text-[#111111] transition-all cursor-pointer"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>

          {!isSuccess ? (
            <div>
              <div className="flex items-center gap-2 text-xs font-mono-code text-[#737373] uppercase mb-1 font-medium">
                <PlusCircle className="w-3.5 h-3.5 text-[#111111]" />
                <span>Capstone Registration Wizard</span>
              </div>
              <h2 className="font-display text-2xl sm:text-3xl text-[#111111] font-normal mb-1">
                Index Your Academic Capstone
              </h2>
              <p className="text-xs sm:text-sm text-[#4A4A4A] font-body mb-6">
                Register your project to generate a cryptographic Project Passport and enable future batches to inherit your work.
              </p>

              <form onSubmit={handleSubmit} className="space-y-4 font-body text-xs sm:text-sm">
                <div>
                  <label className="block text-xs font-mono-code text-[#4A4A4A] mb-1 font-medium">
                    Project Title *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. AeroSync: Edge-Neuromorphic Drone Swarm Guidance"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#F7F7F5] border border-black/10 text-[#111111] placeholder-[#737373] focus:outline-none focus:border-[#111111] focus:bg-white text-xs transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono-code text-[#4A4A4A] mb-1 font-medium">
                    Tagline / One-Line Summary *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Sub-millisecond visual-inertial odometry for search & rescue swarms"
                    value={tagline}
                    onChange={(e) => setTagline(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#F7F7F5] border border-black/10 text-[#111111] placeholder-[#737373] focus:outline-none focus:border-[#111111] focus:bg-white text-xs transition-colors"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono-code text-[#4A4A4A] mb-1 font-medium">
                      Academic Domain
                    </label>
                    <select
                      value={domain}
                      onChange={(e) => setDomain(e.target.value as ProjectDomain)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#F7F7F5] border border-black/10 text-[#111111] focus:outline-none focus:border-[#111111] text-xs transition-colors"
                    >
                      {DOMAINS_LIST.filter((d) => d !== 'All').map((d) => (
                        <option key={d} value={d} className="bg-white text-[#111111]">
                          {d}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-mono-code text-[#4A4A4A] mb-1 font-medium">
                      Institution / University *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Graphic Era Hill University"
                      value={institution}
                      onChange={(e) => setInstitution(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#F7F7F5] border border-black/10 text-[#111111] placeholder-[#737373] focus:outline-none focus:border-[#111111] focus:bg-white text-xs transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono-code text-[#4A4A4A] mb-1 font-medium">
                    Technology Stack (comma separated)
                  </label>
                  <input
                    type="text"
                    placeholder="React, TypeScript, PyTorch, ROS 2"
                    value={techInput}
                    onChange={(e) => setTechInput(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#F7F7F5] border border-black/10 text-[#111111] placeholder-[#737373] focus:outline-none focus:border-[#111111] focus:bg-white text-xs transition-colors"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono-code text-[#4A4A4A] mb-1 font-medium">
                      GitHub Repository URL
                    </label>
                    <input
                      type="text"
                      placeholder="https://github.com/gehu-capstones/aerosync"
                      value={githubRepo}
                      onChange={(e) => setGithubRepo(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#F7F7F5] border border-black/10 text-[#111111] placeholder-[#737373] focus:outline-none focus:border-[#111111] focus:bg-white text-xs transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono-code text-[#4A4A4A] mb-1 font-medium">
                      Assigned Faculty Advisor
                    </label>
                    <input
                      type="text"
                      placeholder="Dr. Anil Sharma"
                      value={facultyAdvisor}
                      onChange={(e) => setFacultyAdvisor(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#F7F7F5] border border-black/10 text-[#111111] placeholder-[#737373] focus:outline-none focus:border-[#111111] focus:bg-white text-xs transition-colors"
                    />
                  </div>
                </div>

                <div className="pt-4 flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-4 py-2 rounded-xl bg-[#F5F5F3] hover:bg-[#EBEBE8] text-xs font-medium text-[#4A4A4A] cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="btn-primary-black px-6 py-2.5 rounded-xl text-xs font-medium flex items-center gap-1.5 cursor-pointer shadow-xs"
                  >
                    <span>Generate Cryptographic Passport</span>
                    <ArrowRight className="w-3.5 h-3.5 text-white" />
                  </button>
                </div>
              </form>
            </div>
          ) : (
            <div className="py-8 text-center space-y-4 font-body">
              <div className="w-16 h-16 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-700 mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="font-display text-2xl sm:text-3xl text-[#111111]">
                Capstone Registered!
              </h3>
              <p className="text-xs sm:text-sm text-[#4A4A4A] max-w-md mx-auto">
                Assigned Cryptographic Passport ID:
              </p>
              <div className="inline-block px-4 py-2 rounded-xl bg-[#F7F7F5] border border-black/10 font-mono-code text-sm font-bold text-[#111111]">
                {generatedPassportId}
              </div>
              <p className="text-[11px] text-[#737373] font-mono-code">
                Repository indexed on ProjectVerse National Node Ledger.
              </p>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
