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
  const [applicantName, setApplicantName] = useState('Suraj Rawat');
  const [applicantCollege, setApplicantCollege] = useState('Graphic Era Hill University');
  const [githubProfile, setGithubProfile] = useState('https://github.com/surajrawat-dev');
  const [note, setNote] = useState('Interested in contributing to the edge SLAM and ROS 2 module for next batch roadmap.');
  const [submitted, setSubmitted] = useState(false);

  if (!project) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 1500);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/45 backdrop-blur-sm"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 16 }}
          className="relative z-10 w-full max-w-lg bg-white rounded-3xl p-6 sm:p-8 border border-black/10 shadow-2xl text-[#111111] max-h-[92vh] overflow-y-auto"
        >
          <button
            onClick={onClose}
            className="absolute top-5 right-5 w-8 h-8 rounded-full bg-[#F5F5F3] hover:bg-[#ECECE9] border border-black/8 flex items-center justify-center text-[#4A4A4A] hover:text-[#111111] transition-all cursor-pointer"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>

          {!submitted ? (
            <div>
              <div className="flex items-center gap-2 text-xs font-mono-code text-[#737373] uppercase mb-1 font-semibold">
                <Users className="w-3.5 h-3.5 text-[#111111]" />
                <span>Inter-College Collaboration Request</span>
              </div>
              <h2 className="font-display text-2xl sm:text-3xl text-[#111111] font-normal mb-1">
                Join {project.title.split(':')[0]}
              </h2>
              <p className="text-xs text-[#4A4A4A] font-body mb-6">
                Apply to become an active contributor or batch lead for the next academic cycle.
              </p>

              <form onSubmit={handleSubmit} className="space-y-4 text-xs sm:text-sm font-body">
                <div>
                  <label className="block text-xs font-mono-code text-[#4A4A4A] mb-1 font-medium">
                    Select Desired Role
                  </label>
                  <select
                    value={selectedRole}
                    onChange={(e) => setSelectedRole(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#F7F7F5] border border-black/10 text-[#111111] focus:outline-none focus:border-[#111111] text-xs transition-colors"
                  >
                    {project.openRoles.map((r) => (
                      <option key={r} value={r} className="bg-white text-[#111111]">{r}</option>
                    ))}
                    <option value="General Open Source Contributor" className="bg-white text-[#111111]">General Open Source Contributor</option>
                  </select>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-mono-code text-[#4A4A4A] mb-1 font-medium">
                      Your Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Suraj Rawat"
                      value={applicantName}
                      onChange={(e) => setApplicantName(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-[#F7F7F5] border border-black/10 text-[#111111] placeholder-[#737373] focus:outline-none focus:border-[#111111] focus:bg-white text-xs transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono-code text-[#4A4A4A] mb-1 font-medium">
                      Institution / University *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Graphic Era Hill University"
                      value={applicantCollege}
                      onChange={(e) => setApplicantCollege(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-[#F7F7F5] border border-black/10 text-[#111111] placeholder-[#737373] focus:outline-none focus:border-[#111111] focus:bg-white text-xs transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono-code text-[#4A4A4A] mb-1 font-medium">
                    GitHub Profile URL
                  </label>
                  <input
                    type="text"
                    placeholder="https://github.com/surajrawat-dev"
                    value={githubProfile}
                    onChange={(e) => setGithubProfile(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#F7F7F5] border border-black/10 text-[#111111] placeholder-[#737373] focus:outline-none focus:border-[#111111] focus:bg-white text-xs transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono-code text-[#4A4A4A] mb-1 font-medium">
                    Relevant Experience & Motivation
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Briefly state your technical background and how you plan to advance this project."
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#F7F7F5] border border-black/10 text-[#111111] placeholder-[#737373] focus:outline-none focus:border-[#111111] focus:bg-white text-xs transition-colors"
                  />
                </div>

                <div className="pt-2 flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-4 py-2 rounded-xl bg-[#F5F5F3] hover:bg-[#EBEBE8] text-xs font-medium text-[#4A4A4A] cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="btn-primary-black px-5 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 cursor-pointer shadow-xs"
                  >
                    <span>Submit Proposal</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </form>
            </div>
          ) : (
            <div className="py-8 text-center space-y-3 font-body">
              <div className="w-14 h-14 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-700 mx-auto">
                <CheckCircle2 className="w-7 h-7" />
              </div>
              <h3 className="font-display text-2xl text-[#111111]">
                Proposal Dispatched!
              </h3>
              <p className="text-xs text-[#4A4A4A] max-w-xs mx-auto">
                The current batch leads and faculty advisor have received your application proposal.
              </p>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
