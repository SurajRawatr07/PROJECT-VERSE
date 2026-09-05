import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Sparkles,
  Users,
  GraduationCap,
  FolderGit2,
  CheckCircle2,
  ArrowRight,
  Send,
  SlidersHorizontal,
  Brain,
  ShieldCheck,
  ExternalLink,
  Plus,
  Check
} from 'lucide-react';
import { AI_SKILLS_POOL, SAMPLE_PEERS, SAMPLE_MENTORS, SAMPLE_PROJECTS } from '../../data/mockData';
import { ProjectItem } from '../../types';

interface AIMatchingDashboardProps {
  onSelectProject?: (project: ProjectItem) => void;
  onOpenPassport?: (project: ProjectItem) => void;
  onInvitePeer?: (peerName: string) => void;
  onRequestMentor?: (mentorName: string) => void;
}

export const AIMatchingDashboard: React.FC<AIMatchingDashboardProps> = ({
  onSelectProject,
  onOpenPassport,
  onInvitePeer,
  onRequestMentor
}) => {
  const [activeTab, setActiveTab] = useState<'teammates' | 'projects' | 'mentors'>('teammates');
  const [selectedSkills, setSelectedSkills] = useState<string[]>(['React', 'TypeScript', 'PyTorch', 'ROS 2']);
  const [minMatchThreshold, setMinMatchThreshold] = useState<number>(80);
  const [invitedPeers, setInvitedPeers] = useState<string[]>([]);
  const [requestedMentors, setRequestedMentors] = useState<string[]>([]);
  const [feedbackToast, setFeedbackToast] = useState<string | null>(null);

  const toggleSkill = (skill: string) => {
    if (selectedSkills.includes(skill)) {
      if (selectedSkills.length > 1) {
        setSelectedSkills(selectedSkills.filter(s => s !== skill));
      }
    } else {
      setSelectedSkills([...selectedSkills, skill]);
    }
  };

  const handleInvite = (name: string) => {
    setInvitedPeers(prev => [...prev, name]);
    setFeedbackToast(`Collaboration proposal dispatched to ${name}!`);
    setTimeout(() => setFeedbackToast(null), 3500);
    onInvitePeer?.(name);
  };

  const handleMentorRequest = (name: string) => {
    setRequestedMentors(prev => [...prev, name]);
    setFeedbackToast(`Mentorship guidance inquiry submitted to ${name}!`);
    setTimeout(() => setFeedbackToast(null), 3500);
    onRequestMentor?.(name);
  };

  // Filter peers by matching score threshold
  const filteredPeers = SAMPLE_PEERS.filter(p => p.matchScore >= minMatchThreshold);
  const filteredMentors = SAMPLE_MENTORS.filter(m => m.matchScore >= minMatchThreshold);

  return (
    <div className="space-y-6">
      {/* Toast Notification */}
      <AnimatePresence>
        {feedbackToast && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs sm:text-sm font-medium flex items-center gap-2 shadow-xs"
          >
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>{feedbackToast}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header Banner */}
      <div className="bg-[#FBFBFA] rounded-2xl p-6 sm:p-8 border border-black/8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-indigo-50 border border-indigo-200/80 text-[11px] font-mono-code text-indigo-800 font-medium mb-2">
              <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
              <span>GRAPH-POWERED SEMANTIC MATCHING</span>
            </div>
            <h1 className="font-display text-2xl sm:text-3xl text-[#111111] font-normal">
              AI Skill-Gap & Peer Matching
            </h1>
            <p className="text-xs sm:text-sm text-[#4A4A4A] mt-1 max-w-2xl">
              Analyzes complementary technical strengths, verified GitHub contributions, and institutional lineage to pair optimal capstone teams.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="text-right hidden sm:block">
              <span className="text-[10px] font-mono-code uppercase text-[#737373] block">Engine Consensus</span>
              <span className="text-sm font-bold text-emerald-700 font-mono-code">Vector Similarity v2.4</span>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Skill Filter Bar */}
      <div className="bg-white rounded-2xl p-5 border border-black/8 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="w-4 h-4 text-[#737373]" />
            <h3 className="text-xs font-mono-code uppercase font-bold text-[#111111]">
              Target Technical Competencies (Toggle to Re-Weight Model)
            </h3>
          </div>
          <div className="flex items-center gap-2 text-xs font-mono-code text-[#737373]">
            <span>Min Match:</span>
            <select
              value={minMatchThreshold}
              onChange={(e) => setMinMatchThreshold(Number(e.target.value))}
              className="px-2 py-1 rounded-lg bg-[#F7F7F5] border border-black/10 text-[#111111] font-medium text-xs"
            >
              <option value={70}>70% and above</option>
              <option value={80}>80% and above</option>
              <option value={90}>90% and above (High synergy)</option>
            </select>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          {AI_SKILLS_POOL.map((skill) => {
            const isSelected = selectedSkills.includes(skill);
            return (
              <button
                key={skill}
                onClick={() => toggleSkill(skill)}
                className={`px-3 py-1.5 rounded-xl text-xs font-mono-code transition-all cursor-pointer flex items-center gap-1.5 ${
                  isSelected
                    ? 'bg-[#111111] text-white font-medium shadow-xs'
                    : 'bg-[#F7F7F5] text-[#4A4A4A] hover:bg-[#EBEBE8] border border-black/5'
                }`}
              >
                {isSelected ? <Check className="w-3 h-3 text-emerald-400" /> : <Plus className="w-3 h-3 opacity-50" />}
                <span>{skill}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Tabs Selection */}
      <div className="flex border-b border-black/8 gap-2 sm:gap-6">
        <button
          onClick={() => setActiveTab('teammates')}
          className={`pb-3 text-xs sm:text-sm font-medium flex items-center gap-2 border-b-2 transition-colors cursor-pointer ${
            activeTab === 'teammates'
              ? 'border-[#111111] text-[#111111]'
              : 'border-transparent text-[#737373] hover:text-[#111111]'
          }`}
        >
          <Users className="w-4 h-4" />
          <span>Recommended Teammates ({filteredPeers.length})</span>
        </button>
        <button
          onClick={() => setActiveTab('projects')}
          className={`pb-3 text-xs sm:text-sm font-medium flex items-center gap-2 border-b-2 transition-colors cursor-pointer ${
            activeTab === 'projects'
              ? 'border-[#111111] text-[#111111]'
              : 'border-transparent text-[#737373] hover:text-[#111111]'
          }`}
        >
          <FolderGit2 className="w-4 h-4" />
          <span>Recommended Capstones ({SAMPLE_PROJECTS.length})</span>
        </button>
        <button
          onClick={() => setActiveTab('mentors')}
          className={`pb-3 text-xs sm:text-sm font-medium flex items-center gap-2 border-b-2 transition-colors cursor-pointer ${
            activeTab === 'mentors'
              ? 'border-[#111111] text-[#111111]'
              : 'border-transparent text-[#737373] hover:text-[#111111]'
          }`}
        >
          <GraduationCap className="w-4 h-4" />
          <span>Faculty Guides ({filteredMentors.length})</span>
        </button>
      </div>

      {/* Tab 1: Teammates */}
      {activeTab === 'teammates' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredPeers.map((peer, idx) => {
            const hasInvited = invitedPeers.includes(peer.name);
            return (
              <div
                key={idx}
                className="bg-white rounded-2xl p-5 border border-black/8 hover:border-black/20 transition-all shadow-xs flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="flex items-center gap-3">
                      <img
                        src={peer.avatar}
                        alt={peer.name}
                        className="w-12 h-12 rounded-xl object-cover border border-black/10 shrink-0"
                      />
                      <div>
                        <h4 className="text-sm font-bold text-[#111111]">{peer.name}</h4>
                        <p className="text-xs text-[#4A4A4A]">{peer.role}</p>
                        <p className="text-[11px] text-[#737373] font-mono-code">{peer.institution}</p>
                      </div>
                    </div>
                    <div className="text-right shrink-0">
                      <span className="text-xs font-bold font-mono-code px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
                        {peer.matchScore}% Match
                      </span>
                    </div>
                  </div>

                  {/* Synergy Explanation */}
                  <div className="p-3 rounded-xl bg-[#FBFBFA] border border-black/6 mb-3 text-xs text-[#4A4A4A]">
                    <div className="flex items-center gap-1.5 text-indigo-900 font-medium text-[11px] mb-1">
                      <Brain className="w-3.5 h-3.5 text-indigo-600" />
                      <span>Match Reasoning</span>
                    </div>
                    <p className="leading-relaxed">
                      Strong skill balance with your stack. Specializes in {peer.skills.join(', ')} with verified academic repositories.
                    </p>
                  </div>

                  {/* Skills tags */}
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {peer.skills.map((s) => (
                      <span
                        key={s}
                        className={`text-[10px] font-mono-code px-2 py-0.5 rounded-md ${
                          selectedSkills.includes(s)
                            ? 'bg-indigo-50 border border-indigo-200 text-indigo-900 font-medium'
                            : 'bg-[#F7F7F5] border border-black/5 text-[#4A4A4A]'
                        }`}
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-3 border-t border-black/8 flex items-center justify-between">
                  <span className="text-[11px] font-mono-code text-[#737373]">
                    Academic Batch '25–'26
                  </span>
                  <button
                    onClick={() => handleInvite(peer.name)}
                    disabled={hasInvited}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer ${
                      hasInvited
                        ? 'bg-emerald-100 text-emerald-800 cursor-default'
                        : 'bg-[#111111] hover:bg-black text-white shadow-xs'
                    }`}
                  >
                    {hasInvited ? (
                      <>
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Invited</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-3.5 h-3.5" />
                        <span>Send Invitation</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Tab 2: Projects */}
      {activeTab === 'projects' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {SAMPLE_PROJECTS.map((proj) => (
            <div
              key={proj.id}
              className="bg-white rounded-2xl p-5 border border-black/8 hover:border-black/20 transition-all shadow-xs flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-mono-code text-[#737373] uppercase font-medium">
                    {proj.domain}
                  </span>
                  <span className="text-[10px] font-mono-code px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 font-medium">
                    96% Synergy
                  </span>
                </div>
                <h3 className="text-base font-bold text-[#111111] mb-1">{proj.title}</h3>
                <p className="text-xs text-[#4A4A4A] mb-3 line-clamp-2">{proj.description}</p>
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {proj.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="text-[10px] font-mono-code px-2 py-0.5 rounded bg-[#F7F7F5] border border-black/5 text-[#4A4A4A]"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-3 border-t border-black/8 flex items-center justify-between">
                <span className="text-[11px] text-[#737373]">{proj.institution}</span>
                <div className="flex items-center gap-2">
                  {onOpenPassport && (
                    <button
                      onClick={() => onOpenPassport(proj)}
                      className="px-2.5 py-1 rounded-lg bg-[#F7F7F5] hover:bg-[#EBEBE8] text-[#111111] text-xs font-medium border border-black/8 cursor-pointer"
                    >
                      Passport
                    </button>
                  )}
                  {onSelectProject && (
                    <button
                      onClick={() => onSelectProject(proj)}
                      className="px-2.5 py-1 rounded-lg bg-[#111111] text-white hover:bg-black text-xs font-medium cursor-pointer shadow-xs"
                    >
                      Details
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Tab 3: Mentors */}
      {activeTab === 'mentors' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredMentors.map((mentor, idx) => {
            const hasRequested = requestedMentors.includes(mentor.name);
            return (
              <div
                key={idx}
                className="bg-white rounded-2xl p-5 border border-black/8 hover:border-black/20 transition-all shadow-xs flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="flex items-center gap-3">
                      <img
                        src={mentor.avatar}
                        alt={mentor.name}
                        className="w-12 h-12 rounded-xl object-cover border border-black/10 shrink-0"
                      />
                      <div>
                        <h4 className="text-sm font-bold text-[#111111]">{mentor.name}</h4>
                        <p className="text-xs text-[#4A4A4A]">{mentor.title}</p>
                        <p className="text-[11px] text-[#737373] font-mono-code">{mentor.institution}</p>
                      </div>
                    </div>
                    <div className="text-right shrink-0">
                      <span className="text-xs font-bold font-mono-code px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
                        {mentor.matchScore}% Synergy
                      </span>
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-[#FBFBFA] border border-black/6 mb-3 text-xs text-[#4A4A4A]">
                    <span className="text-[10px] font-mono-code text-emerald-700 font-medium block mb-0.5">
                      {mentor.verifiedProjectsCount} Verified Capstones Guided
                    </span>
                    <p className="leading-relaxed">
                      Available for academic advising on architecture reviews and patent disclosures.
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {mentor.domains.map((d) => (
                      <span
                        key={d}
                        className="text-[10px] font-mono-code px-2 py-0.5 rounded bg-[#F7F7F5] border border-black/5 text-[#4A4A4A]"
                      >
                        {d}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-3 border-t border-black/8 flex items-center justify-between">
                  <span className="text-[11px] font-mono-code text-[#737373]">Senior Faculty Guide</span>
                  <button
                    onClick={() => handleMentorRequest(mentor.name)}
                    disabled={hasRequested}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer ${
                      hasRequested
                        ? 'bg-emerald-100 text-emerald-800 cursor-default'
                        : 'bg-[#111111] hover:bg-black text-white shadow-xs'
                    }`}
                  >
                    {hasRequested ? (
                      <>
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Request Sent</span>
                      </>
                    ) : (
                      <>
                        <GraduationCap className="w-3.5 h-3.5" />
                        <span>Request Mentorship</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
