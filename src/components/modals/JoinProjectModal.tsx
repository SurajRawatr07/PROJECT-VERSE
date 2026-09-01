import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ArrowRight, CheckCircle2, GitFork, Users, Sparkles } from 'lucide-react';
import { ProjectItem } from '../../types';

interface JoinProjectModalProps {
  project: ProjectItem | null;
  onClose: () => void;
}

export const JoinProjectModal: React.FC<JoinProjectModalProps> = ({
  project,
  onClose
}) => {
  const [selectedRole, setSelectedRole] = useState(project?.openRoles[0] || 'Core Contributor');
  const [applicantName, setApplicantName] = useState('');
  const [applicantCollege, setApplicantCollege] = useState('');
  const [githubProfile, setGithubProfile] = useState('');
  const [note, setNote] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!project) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 2000);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-[#040714]/85 backdrop-blur-xl"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative z-10 w-full max-w-lg liquid-glass-elevated rounded-3xl p-6 sm:p-8 border border-white/20 shadow-2xl bg-[#080d1e]/95 text-slate-100"
        >
          <button
            onClick={onClose}
            className="absolute top-5 right-5 w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center text-slate-400 hover:text-white transition-all cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>

          {!submitted ? (
            <div>
              <div className="flex items-center gap-2 text-xs font-mono-code text-indigo-300 mb-2">
                <Users className="w-3.5 h-3.5 text-indigo-400" />
                <span>INTER-COLLEGE COLLABORATION REQUEST</span>
              </div>
              <h2 className="font-display text-2xl sm:text-3xl text-white font-normal mb-1">
                Join {project.title.split(':')[0]}
              </h2>
              <p className="text-xs text-slate-400 font-body mb-6">
                Apply to become an active contributor or batch lead for the next academic cycle.
              </p>

              <form onSubmit={handleSubmit} className="space-y-4 text-xs sm:text-sm font-body">
                <div>
                  <label className="block text-xs font-mono-code text-slate-300 mb-1">
                    Select Desired Role
                  </label>
                  <select
                    value={selectedRole}
                    onChange={(e) => setSelectedRole(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-black/50 border border-white/10 text-white focus:outline-none focus:border-indigo-400 text-xs"
                  >
                    {project.openRoles.map((r) => (
                      <option key={r} value={r}>{r}</option>
                    ))}
                    <option value="General Open Source Contributor">General Open Source Contributor</option>
                  </select>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-mono-code text-slate-300 mb-1">
                      Your Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Elena Rostova"
                      value={applicantName}
                      onChange={(e) => setApplicantName(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-black/50 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-indigo-400 text-xs"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono-code text-slate-300 mb-1">
                      Your Institution / Batch *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Stanford '26"
                      value={applicantCollege}
                      onChange={(e) => setApplicantCollege(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-black/50 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-indigo-400 text-xs"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono-code text-slate-300 mb-1">
                    GitHub Profile Link *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="github.com/your-handle"
                    value={githubProfile}
                    onChange={(e) => setGithubProfile(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-black/50 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-indigo-400 text-xs"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono-code text-slate-300 mb-1">
                    Relevant Skills & What You Plan to Build
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Describe how your skills align with the project roadmap..."
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-black/50 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-indigo-400 text-xs resize-none"
                  />
                </div>

                <div className="pt-3 flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-4 py-2 rounded-full liquid-glass text-xs font-semibold text-slate-400 hover:text-white"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-full bg-white text-slate-950 hover:bg-slate-100 font-semibold text-xs transition-all shadow-md flex items-center gap-1.5 cursor-pointer"
                  >
                    <span>Submit Collaboration Request</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </form>
            </div>
          ) : (
            <div className="py-8 text-center space-y-3">
              <div className="w-14 h-14 rounded-full bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center text-emerald-400 mx-auto">
                <CheckCircle2 className="w-7 h-7" />
              </div>
              <h3 className="font-display text-2xl text-white">Application Dispatched</h3>
              <p className="text-xs text-slate-300">
                The lead contributors and faculty advisor for <strong>{project.title.split(':')[0]}</strong> have received your request.
              </p>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
