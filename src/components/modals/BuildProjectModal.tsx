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
  const [institution, setInstitution] = useState('');
  const [githubRepo, setGithubRepo] = useState('');
  const [facultyAdvisor, setFacultyAdvisor] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [generatedPassportId, setGeneratedPassportId] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !institution) return;

    const shortInst = institution.split(' ')[0].toUpperCase() || 'UNIV';
    const randomNum = Math.floor(100 + Math.random() * 900);
    const newPassportId = `PV-2026-${shortInst}-CAP${randomNum}`;
    setGeneratedPassportId(newPassportId);
    setIsSuccess(true);

    setTimeout(() => {
      onProjectCreated({
        title,
        tagline,
        domain,
        techStack: techInput.split(',').map(s => s.trim()),
        institution,
        githubRepo,
        passportId: newPassportId
      });
    }, 1500);
  };

  const handleReset = () => {
    setIsSuccess(false);
    onClose();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleReset}
          className="fixed inset-0 bg-[#040714]/85 backdrop-blur-xl"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative z-10 w-full max-w-2xl liquid-glass-elevated rounded-3xl p-6 sm:p-9 border border-white/20 shadow-2xl bg-[#080d1e]/95 text-slate-100"
        >
          <button
            onClick={handleReset}
            className="absolute top-5 right-5 w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center text-slate-400 hover:text-white transition-all cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>

          {!isSuccess ? (
            <div>
              <div className="flex items-center gap-2 text-xs font-mono-code text-indigo-300 mb-2">
                <PlusCircle className="w-3.5 h-3.5 text-indigo-400" />
                <span>PROJECT REGISTRATION WIZARD</span>
              </div>
              <h2 className="font-display text-2xl sm:text-3xl text-white font-normal mb-2">
                Index Your Academic Capstone
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 font-body mb-6">
                Register your project to generate a cryptographic Project Passport and enable future batches to inherit your work.
              </p>

              <form onSubmit={handleSubmit} className="space-y-4 font-body text-xs sm:text-sm">
                <div>
                  <label className="block text-xs font-mono-code text-slate-300 mb-1">
                    Project Title *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. AeroSync: Edge-Neuromorphic Drone Swarm Guidance"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-black/50 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-indigo-400 text-xs sm:text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono-code text-slate-300 mb-1">
                    Tagline / One-Line Summary *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Sub-millisecond visual-inertial odometry for search & rescue swarms"
                    value={tagline}
                    onChange={(e) => setTagline(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-black/50 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-indigo-400 text-xs sm:text-sm"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono-code text-slate-300 mb-1">
                      Academic Domain
                    </label>
                    <select
                      value={domain}
                      onChange={(e) => setDomain(e.target.value as ProjectDomain)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-black/50 border border-white/10 text-white focus:outline-none focus:border-indigo-400 text-xs"
                    >
                      {DOMAINS_LIST.filter(d => d !== 'All').map((d) => (
                        <option key={d} value={d}>{d}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-mono-code text-slate-300 mb-1">
                      Home Institution *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. IIT Bombay, Stanford, MIT"
                      value={institution}
                      onChange={(e) => setInstitution(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-black/50 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-indigo-400 text-xs"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono-code text-slate-300 mb-1">
                      GitHub Repository URL
                    </label>
                    <input
                      type="text"
                      placeholder="github.com/org/repo"
                      value={githubRepo}
                      onChange={(e) => setGithubRepo(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-black/50 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-indigo-400 text-xs"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono-code text-slate-300 mb-1">
                      Faculty Advisor / Reviewer
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Dr. S. Anand"
                      value={facultyAdvisor}
                      onChange={(e) => setFacultyAdvisor(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-black/50 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-indigo-400 text-xs"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono-code text-slate-300 mb-1">
                    Tech Stack (comma separated)
                  </label>
                  <input
                    type="text"
                    placeholder="React, TypeScript, PyTorch, ROS 2, CUDA"
                    value={techInput}
                    onChange={(e) => setTechInput(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-black/50 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-indigo-400 text-xs"
                  />
                </div>

                <div className="pt-4 flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={handleReset}
                    className="px-4 py-2 rounded-full liquid-glass text-xs font-semibold text-slate-400 hover:text-white"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-full bg-white text-slate-950 hover:bg-slate-100 font-semibold text-xs transition-all shadow-md flex items-center gap-1.5 cursor-pointer"
                  >
                    <span>Generate Passport</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </form>
            </div>
          ) : (
            <div className="py-8 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center text-emerald-400 mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="font-display text-3xl text-white">
                Project Passport Provisioned!
              </h3>
              <p className="text-sm text-slate-300 max-w-md mx-auto">
                Your academic repository has been indexed and assigned its unique immutable verification hash:
              </p>
              <div className="p-3.5 rounded-xl bg-black/60 border border-emerald-500/40 text-emerald-300 font-mono-code text-base font-bold inline-block">
                {generatedPassportId}
              </div>
              <p className="text-xs text-slate-400 font-mono-code pt-2">
                Faculty verification token dispatched to departmental coordinator.
              </p>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
