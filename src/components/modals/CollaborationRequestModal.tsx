import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Users, Send, CheckCircle2, AlertCircle } from 'lucide-react';
import { ProjectItem } from '../../types';
import { sendCollaborationRequest } from '../../lib/collaborationService';

interface CollaborationRequestModalProps {
  project: ProjectItem | null;
  onClose: () => void;
  onSuccess?: () => void;
  currentUser?: {
    id: string;
    fullName: string;
    avatar?: string;
    institution?: string;
  };
}

export const CollaborationRequestModal: React.FC<CollaborationRequestModalProps> = ({
  project,
  onClose,
  onSuccess,
  currentUser
}) => {
  const [roleInterest, setRoleInterest] = useState('Frontend & UI/UX');
  const [message, setMessage] = useState("I'd like to contribute to the frontend development and component architecture.");
  const [isSent, setIsSent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!project) return null;

  const roleSuggestions = [
    'Frontend & UI/UX',
    'Backend & API Integration',
    'Machine Learning / AI Pipeline',
    'Embedded Systems / ROS 2',
    'QA & Technical Documentation',
    'Research & Benchmarking'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) {
      setError('Please provide a short message explaining your intended contribution.');
      return;
    }

    sendCollaborationRequest({
      projectId: project.id,
      projectTitle: project.title,
      studentId: currentUser?.id || 'usr-student-01',
      studentName: currentUser?.fullName || 'Suraj Rawat',
      studentAvatar: currentUser?.avatar || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
      studentInstitution: currentUser?.institution || 'Graphic Era Hill University',
      roleInterest,
      message: message.trim()
    });

    setIsSent(true);
    setTimeout(() => {
      if (onSuccess) onSuccess();
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
          transition={{ duration: 0.2 }}
          className="relative z-10 w-full max-w-lg bg-white rounded-3xl p-6 sm:p-8 border border-black/10 shadow-2xl text-[#111111]"
        >
          <button
            onClick={onClose}
            className="absolute top-5 right-5 w-8 h-8 rounded-full bg-[#F5F5F3] hover:bg-[#ECECE9] border border-black/8 flex items-center justify-center text-[#4A4A4A] hover:text-[#111111] transition-all cursor-pointer"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>

          {isSent ? (
            <div className="py-8 text-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-emerald-100 border border-emerald-300 text-emerald-700 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-[#111111]">Collaboration Request Sent!</h3>
              <p className="text-xs text-[#4A4A4A] max-w-sm mx-auto">
                Your proposal has been delivered to the maintainers of <span className="font-bold">{project.title}</span>. You will receive a notification when they review your request.
              </p>
            </div>
          ) : (
            <div>
              <div className="flex items-center gap-2 mb-2">
                <div className="w-7 h-7 rounded-xl bg-[#F7F7F5] border border-black/8 flex items-center justify-center">
                  <Users className="w-3.5 h-3.5 text-[#111111]" />
                </div>
                <span className="text-xs font-mono-code uppercase text-[#737373] tracking-wider">
                  TEAM COLLABORATION
                </span>
              </div>

              <h2 className="text-xl sm:text-2xl font-display font-bold text-[#111111] mb-1">
                Collaborate on Project
              </h2>
              <p className="text-xs text-[#737373] mb-5">
                Apply to contribute to <span className="font-bold text-[#111111]">{project.title}</span> ({project.institution}).
              </p>

              {error && (
                <div className="mb-4 p-3 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-800 flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                  <span>{error}</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-medium text-[#111111] mb-1.5">
                    Proposed Role / Focus Area
                  </label>
                  <select
                    value={roleInterest}
                    onChange={(e) => setRoleInterest(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-[#FBFBFA] border border-black/10 text-xs font-body focus:outline-none focus:border-black/30"
                  >
                    {roleSuggestions.map((r) => (
                      <option key={r} value={r}>
                        {r}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-[#111111] mb-1.5">
                    Message to Maintainers
                  </label>
                  <textarea
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Briefly state your relevant experience, technical skills, and what you would like to build..."
                    className="w-full p-3 rounded-xl bg-[#FBFBFA] border border-black/10 text-xs font-body focus:outline-none focus:border-black/30 placeholder:text-[#737373] resize-none"
                    maxLength={1000}
                  />
                  <span className="text-[10px] text-[#737373] block text-right">
                    {message.length} / 1000
                  </span>
                </div>

                <div className="pt-2 flex items-center justify-end gap-2.5">
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-4 py-2 rounded-xl border border-black/10 text-xs font-medium text-[#4A4A4A] hover:text-[#111111] hover:bg-[#F5F5F3] transition-colors cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-xl bg-[#111111] hover:bg-black text-white text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Send Request</span>
                  </button>
                </div>
              </form>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
