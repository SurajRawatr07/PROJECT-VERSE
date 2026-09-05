import React, { useState, useEffect } from 'react';
import { 
  Users, 
  Check, 
  X, 
  Clock, 
  CheckCircle2, 
  XCircle, 
  Send, 
  MessageSquare,
  Building2,
  FolderGit2
} from 'lucide-react';
import { CollaborationRequest } from '../../types';
import { 
  getAllCollaborationRequests, 
  updateCollaborationRequestStatus 
} from '../../lib/collaborationService';

interface CollaborationRequestsViewProps {
  currentUserId?: string;
  onOpenProject?: (projectId: string) => void;
}

export const CollaborationRequestsView: React.FC<CollaborationRequestsViewProps> = ({
  currentUserId = 'usr-student-01',
  onOpenProject
}) => {
  const [requests, setRequests] = useState<CollaborationRequest[]>([]);
  const [activeTab, setActiveTab] = useState<'incoming' | 'outgoing'>('incoming');

  useEffect(() => {
    setRequests(getAllCollaborationRequests());
  }, []);

  const handleUpdateStatus = (requestId: string, status: 'ACCEPTED' | 'REJECTED') => {
    const updated = updateCollaborationRequestStatus(requestId, status);
    if (updated) {
      setRequests(getAllCollaborationRequests());
    }
  };

  const incomingRequests = requests.filter(r => r.targetOwnerId === currentUserId || !r.targetOwnerId);
  const outgoingRequests = requests.filter(r => r.studentId === currentUserId);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="p-5 sm:p-6 bg-white rounded-2xl border border-black/8 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <Users className="w-5 h-5 text-indigo-600" />
            <h2 className="text-xl sm:text-2xl font-display font-bold text-[#111111]">
              Team Collaboration Hub
            </h2>
          </div>
          <p className="text-xs text-[#4A4A4A] mt-1">
            Manage peer proposals, join requests, and contributor invitations across projects.
          </p>
        </div>

        {/* Tabs */}
        <div className="flex items-center gap-1 bg-[#F7F7F5] p-1 rounded-xl border border-black/8">
          <button
            onClick={() => setActiveTab('incoming')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'incoming'
                ? 'bg-white text-[#111111] shadow-2xs font-medium'
                : 'text-[#737373] hover:text-[#111111]'
            }`}
          >
            <span>Incoming Proposals</span>
            {incomingRequests.filter(r => r.status === 'PENDING').length > 0 && (
              <span className="px-1.5 py-0.2 rounded-full text-[10px] font-mono-code font-bold bg-blue-600 text-white">
                {incomingRequests.filter(r => r.status === 'PENDING').length}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('outgoing')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'outgoing'
                ? 'bg-white text-[#111111] shadow-2xs font-medium'
                : 'text-[#737373] hover:text-[#111111]'
            }`}
          >
            <span>My Outgoing Requests</span>
            <span className="text-[10px] font-mono-code text-[#737373]">
              ({outgoingRequests.length})
            </span>
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="space-y-3">
        {activeTab === 'incoming' ? (
          incomingRequests.length === 0 ? (
            <div className="py-16 text-center bg-white rounded-2xl border border-black/8 p-8">
              <Users className="w-10 h-10 text-[#737373] mx-auto mb-2 opacity-40" />
              <h3 className="text-sm font-bold text-[#111111]">No Incoming Requests</h3>
              <p className="text-xs text-[#737373] mt-1">When students apply to contribute to your capstone repo, requests will appear here.</p>
            </div>
          ) : (
            incomingRequests.map((req) => (
              <div
                key={req.id}
                className="p-4 sm:p-5 bg-white rounded-2xl border border-black/8 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div className="flex items-start gap-3.5 flex-1 min-w-0">
                  {req.studentAvatar ? (
                    <img
                      src={req.studentAvatar}
                      alt={req.studentName}
                      className="w-10 h-10 rounded-full object-cover border border-black/10 shrink-0"
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-[#111111] text-white flex items-center justify-center font-bold text-xs shrink-0">
                      {req.studentName[0]}
                    </div>
                  )}

                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <h4 className="text-xs sm:text-sm font-bold text-[#111111]">
                        {req.studentName}
                      </h4>
                      <span className="text-[11px] text-indigo-700 font-medium px-2 py-0.5 rounded-md bg-indigo-50 border border-indigo-200">
                        {req.roleInterest}
                      </span>
                      {req.studentInstitution && (
                        <span className="text-[11px] text-[#737373] font-mono-code truncate">
                          • {req.studentInstitution}
                        </span>
                      )}
                    </div>

                    <p className="text-xs text-[#4A4A4A] leading-relaxed mb-2">
                      "{req.message}"
                    </p>

                    <div className="flex items-center gap-2 text-[11px] font-mono-code text-[#737373]">
                      <span>Project: <strong className="text-[#111111]">{req.projectTitle}</strong></span>
                      <span>• {new Date(req.createdAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>

                {/* Status & Actions */}
                <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
                  {req.status === 'PENDING' ? (
                    <>
                      <button
                        onClick={() => handleUpdateStatus(req.id, 'ACCEPTED')}
                        className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-medium flex items-center gap-1 transition-colors cursor-pointer shadow-xs"
                      >
                        <Check className="w-3.5 h-3.5" />
                        <span>Accept</span>
                      </button>
                      <button
                        onClick={() => handleUpdateStatus(req.id, 'REJECTED')}
                        className="px-3 py-1.5 rounded-xl bg-[#F7F7F5] hover:bg-rose-50 text-[#737373] hover:text-rose-700 text-xs font-medium flex items-center gap-1 transition-colors cursor-pointer"
                      >
                        <X className="w-3.5 h-3.5" />
                        <span>Decline</span>
                      </button>
                    </>
                  ) : req.status === 'ACCEPTED' ? (
                    <span className="inline-flex items-center gap-1 text-xs font-mono-code px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
                      <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                      Accepted
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 text-xs font-mono-code px-3 py-1 rounded-full bg-rose-50 text-rose-800 border border-rose-200">
                      <XCircle className="w-3 h-3 text-rose-600" />
                      Declined
                    </span>
                  )}
                </div>
              </div>
            ))
          )
        ) : (
          outgoingRequests.length === 0 ? (
            <div className="py-16 text-center bg-white rounded-2xl border border-black/8 p-8">
              <Send className="w-10 h-10 text-[#737373] mx-auto mb-2 opacity-40" />
              <h3 className="text-sm font-bold text-[#111111]">No Outgoing Requests</h3>
              <p className="text-xs text-[#737373] mt-1">You haven't requested to collaborate on any projects yet.</p>
            </div>
          ) : (
            outgoingRequests.map((req) => (
              <div
                key={req.id}
                className="p-4 sm:p-5 bg-white rounded-2xl border border-black/8 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3"
              >
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <FolderGit2 className="w-4 h-4 text-[#111111]" />
                    <h4 className="text-sm font-bold text-[#111111] truncate">
                      {req.projectTitle}
                    </h4>
                  </div>
                  <p className="text-xs text-[#4A4A4A] mb-1.5">
                    Proposed Role: <strong className="text-[#111111]">{req.roleInterest}</strong>
                  </p>
                  <p className="text-xs text-[#737373] italic">
                    "{req.message}"
                  </p>
                </div>

                <div className="shrink-0 self-end sm:self-center">
                  {req.status === 'PENDING' ? (
                    <span className="inline-flex items-center gap-1 text-xs font-mono-code px-3 py-1 rounded-full bg-amber-50 text-amber-800 border border-amber-200">
                      <Clock className="w-3 h-3 text-amber-600" />
                      Pending Review
                    </span>
                  ) : req.status === 'ACCEPTED' ? (
                    <span className="inline-flex items-center gap-1 text-xs font-mono-code px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
                      <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                      Accepted
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 text-xs font-mono-code px-3 py-1 rounded-full bg-rose-50 text-rose-800 border border-rose-200">
                      <XCircle className="w-3 h-3 text-rose-600" />
                      Declined
                    </span>
                  )}
                </div>
              </div>
            ))
          )
        )}
      </div>
    </div>
  );
};
