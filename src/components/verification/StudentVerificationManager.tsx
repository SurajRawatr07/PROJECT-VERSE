import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, 
  FileText, 
  CheckCircle2, 
  XCircle, 
  Clock, 
  AlertTriangle, 
  Eye, 
  Download, 
  UserCheck, 
  GraduationCap, 
  Building2, 
  BookOpen, 
  Lock,
  Search,
  Filter,
  Check,
  X
} from 'lucide-react';
import { 
  VerificationRequest, 
  UserRole, 
  DocumentVerificationStatus, 
  DocumentType 
} from '../../types';
import { 
  loadVerificationRequests, 
  reviewVerificationRequest 
} from '../../lib/authService';

interface StudentVerificationManagerProps {
  reviewerName: string;
  reviewerRole: UserRole;
  onNotification?: (msg: string) => void;
}

export const StudentVerificationManager: React.FC<StudentVerificationManagerProps> = ({
  reviewerName,
  reviewerRole,
  onNotification
}) => {
  const [requests, setRequests] = useState<VerificationRequest[]>([]);
  const [filterStatus, setFilterStatus] = useState<string>('ALL');
  const [filterType, setFilterType] = useState<string>('ALL');
  const [searchTerm, setSearchTerm] = useState('');
  
  // Rejection modal state
  const [rejectingRequest, setRejectingRequest] = useState<VerificationRequest | null>(null);
  const [rejectionReason, setRejectionReason] = useState('');
  const [inspectingRequest, setInspectingRequest] = useState<VerificationRequest | null>(null);

  const fetchRequests = () => {
    const list = loadVerificationRequests();
    setRequests(list);
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const handleApprove = (req: VerificationRequest) => {
    const result = reviewVerificationRequest(
      req.id,
      reviewerName,
      reviewerRole,
      'VERIFIED'
    );

    if (result.success) {
      fetchRequests();
      const badgeText = req.studentType === 'ALUMNI' ? 'Verified Alumni' : 'Verified Student';
      if (onNotification) {
        onNotification(`Approved ${req.fullName}'s academic identity. Profile updated to ${badgeText} ✓`);
      }
    }
  };

  const handleConfirmReject = () => {
    if (!rejectingRequest) return;
    if (!rejectionReason.trim()) return;

    const result = reviewVerificationRequest(
      rejectingRequest.id,
      reviewerName,
      reviewerRole,
      'REJECTED',
      rejectionReason.trim()
    );

    if (result.success) {
      fetchRequests();
      if (onNotification) {
        onNotification(`Verification request for ${rejectingRequest.fullName} rejected.`);
      }
      setRejectingRequest(null);
      setRejectionReason('');
    }
  };

  const filteredRequests = requests.filter((r) => {
    const matchesSearch =
      r.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (r.rollNumber && r.rollNumber.toLowerCase().includes(searchTerm.toLowerCase())) ||
      r.institution.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      filterStatus === 'ALL' || r.status === filterStatus;

    const matchesType =
      filterType === 'ALL' ||
      (filterType === 'CURRENT_STUDENT' && r.studentType === 'CURRENT_STUDENT') ||
      (filterType === 'ALUMNI' && r.studentType === 'ALUMNI');

    return matchesSearch && matchesStatus && matchesType;
  });

  const pendingCount = requests.filter((r) => r.status === 'PENDING_REVIEW').length;
  const verifiedCount = requests.filter((r) => r.status === 'VERIFIED').length;
  const rejectedCount = requests.filter((r) => r.status === 'REJECTED').length;

  return (
    <div className="space-y-6">
      {/* Header & Stats */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-[#111111]" />
            <h2 className="font-display text-2xl text-[#111111] font-normal">
              Student & Alumni Identity Verification Queue
            </h2>
          </div>
          <p className="text-xs text-[#4A4A4A] mt-0.5">
            Review submitted academic identity documents, enrollment records, and degree credentials before issuing the ProjectVerse verification seal.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-3 py-1 rounded-xl bg-amber-50 text-amber-800 border border-amber-200 text-xs font-mono-code font-semibold">
            {pendingCount} Pending Review
          </span>
        </div>
      </div>

      {/* Metrics Bar */}
      <div className="grid grid-cols-3 gap-3 text-center">
        <div className="p-3.5 rounded-2xl bg-[#FBFBFA] border border-black/8">
          <span className="text-[10.5px] font-mono-code text-[#737373] uppercase">Pending Requests</span>
          <p className="text-xl font-bold text-amber-700 mt-0.5">{pendingCount}</p>
        </div>
        <div className="p-3.5 rounded-2xl bg-[#FBFBFA] border border-black/8">
          <span className="text-[10.5px] font-mono-code text-[#737373] uppercase">Verified Identities</span>
          <p className="text-xl font-bold text-emerald-700 mt-0.5">{verifiedCount}</p>
        </div>
        <div className="p-3.5 rounded-2xl bg-[#FBFBFA] border border-black/8">
          <span className="text-[10.5px] font-mono-code text-[#737373] uppercase">Rejected / Flagged</span>
          <p className="text-xl font-bold text-red-600 mt-0.5">{rejectedCount}</p>
        </div>
      </div>

      {/* Search & Filter Controls */}
      <div className="flex flex-col sm:flex-row items-center gap-3">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#737373]" />
          <input
            type="text"
            placeholder="Search by student name, roll number, email, or institution..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#F7F7F5] border border-black/10 text-[#111111] placeholder-[#737373] text-xs focus:outline-none focus:border-black focus:bg-white transition-colors"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-3 py-2.5 rounded-xl bg-[#F7F7F5] border border-black/10 text-xs text-[#111111] focus:outline-none focus:border-black transition-colors cursor-pointer"
          >
            <option value="ALL">All Statuses</option>
            <option value="PENDING_REVIEW">Pending Review</option>
            <option value="VERIFIED">Verified</option>
            <option value="REJECTED">Rejected</option>
          </select>

          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="px-3 py-2.5 rounded-xl bg-[#F7F7F5] border border-black/10 text-xs text-[#111111] focus:outline-none focus:border-black transition-colors cursor-pointer"
          >
            <option value="ALL">All Types</option>
            <option value="CURRENT_STUDENT">Current Student</option>
            <option value="ALUMNI">Alumni</option>
          </select>
        </div>
      </div>

      {/* Requests List */}
      <div className="space-y-3">
        {filteredRequests.length === 0 ? (
          <div className="p-8 rounded-2xl bg-[#FBFBFA] border border-black/8 text-center text-xs text-[#737373]">
            No verification requests found matching your filters.
          </div>
        ) : (
          filteredRequests.map((req) => {
            const isPending = req.status === 'PENDING_REVIEW';
            const isVerified = req.status === 'VERIFIED';
            const isRejected = req.status === 'REJECTED';
            const isAlumni = req.studentType === 'ALUMNI';

            return (
              <div
                key={req.id}
                className="bg-white rounded-2xl p-5 border border-black/8 hover:border-black/20 transition-all shadow-xs space-y-4"
              >
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-3">
                  <div className="space-y-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-[10px] font-mono-code px-2 py-0.5 rounded-full bg-black/5 text-[#111111] font-semibold">
                        {req.id}
                      </span>
                      <span
                        className={`text-[10px] font-mono-code px-2 py-0.5 rounded-full font-semibold ${
                          isAlumni
                            ? 'bg-purple-50 text-purple-800 border border-purple-200'
                            : 'bg-blue-50 text-blue-800 border border-blue-200'
                        }`}
                      >
                        {isAlumni ? 'ALUMNI / PASS-OUT' : 'CURRENT STUDENT'}
                      </span>
                      <span
                        className={`text-[10px] font-mono-code px-2 py-0.5 rounded-full font-medium ${
                          isVerified
                            ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                            : isPending
                            ? 'bg-amber-50 text-amber-800 border border-amber-200'
                            : 'bg-red-50 text-red-800 border border-red-200'
                        }`}
                      >
                        {isVerified ? '✓ VERIFIED' : isPending ? '⏳ PENDING REVIEW' : '✕ REJECTED'}
                      </span>
                    </div>

                    <h3 className="text-base font-semibold text-[#111111]">{req.fullName}</h3>
                    <p className="text-xs text-[#4A4A4A]">
                      {req.institution} • {req.department}
                    </p>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-wrap items-center gap-2">
                    <button
                      onClick={() => setInspectingRequest(req)}
                      className="px-3 py-1.5 rounded-xl bg-[#F7F7F5] hover:bg-[#EBEBE8] border border-black/8 text-xs text-[#111111] font-medium flex items-center gap-1.5 cursor-pointer"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Inspect Details</span>
                    </button>

                    {isPending && (
                      <>
                        <button
                          onClick={() => {
                            setRejectingRequest(req);
                            setRejectionReason('Uploaded document could not be verified. Please submit a clearer copy of your institutional ID.');
                          }}
                          className="px-3 py-1.5 rounded-xl bg-red-50 hover:bg-red-100 border border-red-200 text-xs text-red-700 font-medium flex items-center gap-1 cursor-pointer"
                        >
                          <X className="w-3.5 h-3.5" />
                          <span>Reject</span>
                        </button>
                        <button
                          onClick={() => handleApprove(req)}
                          className="btn-primary-black px-4 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 cursor-pointer shadow-xs"
                        >
                          <Check className="w-3.5 h-3.5" />
                          <span>Approve & Verify</span>
                        </button>
                      </>
                    )}
                  </div>
                </div>

                {/* Academic Metadata Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-3 border-t border-black/8 text-xs font-mono-code text-[#737373]">
                  <div>
                    <span className="block text-[10px] uppercase text-[#737373]">Roll / ID Number</span>
                    <span className="text-[#111111] font-semibold">{req.rollNumber || 'N/A'}</span>
                  </div>
                  <div>
                    <span className="block text-[10px] uppercase text-[#737373]">
                      {isAlumni ? 'Graduation Year' : 'Academic Cohort'}
                    </span>
                    <span className="text-[#111111] font-semibold">
                      {isAlumni ? req.graduationYear : req.batch || '2023–2027'}
                    </span>
                  </div>
                  <div>
                    <span className="block text-[10px] uppercase text-[#737373]">Course / Degree</span>
                    <span className="text-[#111111] font-semibold">{req.course || 'B.Tech CSE'}</span>
                  </div>
                  <div>
                    <span className="block text-[10px] uppercase text-[#737373]">Registered Email</span>
                    <span className="text-[#111111] font-semibold truncate block" title={req.email}>
                      {req.email}
                    </span>
                  </div>
                </div>

                {/* Attached Document Snapshot */}
                <div className="p-3 rounded-xl bg-[#FBFBFA] border border-black/6 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2.5">
                    <FileText className="w-4 h-4 text-[#111111] shrink-0" />
                    <div>
                      <span className="font-semibold text-[#111111] block">{req.documentFileName}</span>
                      <span className="text-[10.5px] text-[#737373] font-mono-code">
                        {req.documentType} • {req.documentFileSize} • Uploaded {req.documentUploadedAt}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono-code text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                      Private Encrypted File
                    </span>
                  </div>
                </div>

                {/* If rejected, show reason */}
                {isRejected && req.rejectionReason && (
                  <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-xs text-red-800 flex items-start gap-2">
                    <AlertTriangle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-semibold">Rejection Reason:</span>
                      <p className="mt-0.5">{req.rejectionReason}</p>
                      {req.reviewedBy && (
                        <p className="text-[10px] text-red-700 font-mono-code mt-1">
                          Reviewed by {req.reviewedBy} at {req.reviewedAt}
                        </p>
                      )}
                    </div>
                  </div>
                )}

                {/* If verified, show reviewer note */}
                {isVerified && req.reviewedBy && (
                  <div className="text-[11px] text-[#737373] font-mono-code flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Verified by {req.reviewedBy} ({req.reviewedAt || 'Approved'})</span>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

      {/* Inspect Document Modal */}
      {inspectingRequest && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/45 backdrop-blur-sm">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full border border-black/10 shadow-2xl text-[#111111] max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-display text-2xl text-[#111111] font-normal">Student Academic Credential</h3>
              <button
                onClick={() => setInspectingRequest(null)}
                className="w-7 h-7 rounded-full bg-[#F5F5F3] hover:bg-[#EBEBE8] border border-black/8 flex items-center justify-center text-[#4A4A4A] cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <div className="p-4 rounded-2xl bg-[#F7F7F5] border border-black/8 space-y-2">
                <div className="flex justify-between">
                  <span className="text-[#737373]">Full Name:</span>
                  <span className="font-semibold text-[#111111]">{inspectingRequest.fullName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#737373]">Account Type:</span>
                  <span className="font-semibold text-[#111111]">
                    {inspectingRequest.studentType === 'ALUMNI' ? 'Alumni / Pass-Out' : 'Current Student'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#737373]">Roll / Enrollment Number:</span>
                  <span className="font-semibold text-[#111111] font-mono-code">{inspectingRequest.rollNumber}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#737373]">Institution:</span>
                  <span className="font-semibold text-[#111111]">{inspectingRequest.institution}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#737373]">Department:</span>
                  <span className="font-semibold text-[#111111]">{inspectingRequest.department}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#737373]">Email:</span>
                  <span className="font-semibold text-[#111111] font-mono-code">{inspectingRequest.email}</span>
                </div>
              </div>

              {/* Document Details */}
              <div className="p-4 rounded-2xl border border-black/10 bg-white space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="font-semibold text-[#111111]">Submitted Document Proof</h4>
                  <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-[#F7F7F5] border border-black/8 text-[#111111] text-[10px] font-mono-code">
                    <FileText className="w-3 h-3 text-emerald-700" />
                    <span>Client MVP Record</span>
                  </div>
                </div>
                <p className="text-[#737373] text-[11px]">Type: {inspectingRequest.documentType}</p>
                <p className="text-[#737373] text-[11px]">File: {inspectingRequest.documentFileName} ({inspectingRequest.documentFileSize})</p>
                
                <div className="mt-3 p-3 rounded-xl bg-[#FBFBFA] border border-black/6 flex items-center justify-between">
                  <span className="text-[11px] font-mono-code text-[#4A4A4A]">Document Verification Status</span>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-amber-50 text-amber-800 border border-amber-200 font-mono-code">
                    Pending Review
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 mt-6 pt-3 border-t border-black/8">
              <button
                onClick={() => setInspectingRequest(null)}
                className="px-4 py-2 rounded-xl bg-[#F5F5F3] hover:bg-[#EBEBE8] text-xs text-[#4A4A4A] font-medium cursor-pointer"
              >
                Close
              </button>
              {inspectingRequest.status === 'PENDING_REVIEW' && (
                <button
                  onClick={() => {
                    handleApprove(inspectingRequest);
                    setInspectingRequest(null);
                  }}
                  className="btn-primary-black px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 cursor-pointer shadow-xs"
                >
                  <Check className="w-3.5 h-3.5" />
                  <span>Approve Student</span>
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Reject Reason Modal */}
      {rejectingRequest && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/45 backdrop-blur-sm">
          <div className="bg-white rounded-3xl p-6 max-w-md w-full border border-black/10 shadow-2xl text-[#111111]">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-display text-xl text-[#111111] font-normal">Reject Verification Request</h3>
              <button
                onClick={() => setRejectingRequest(null)}
                className="w-7 h-7 rounded-full bg-[#F5F5F3] hover:bg-[#EBEBE8] border border-black/8 flex items-center justify-center text-[#4A4A4A] cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
            <p className="text-xs text-[#4A4A4A] mb-3">
              Please specify the reason for rejecting <strong>{rejectingRequest.fullName}</strong>'s verification document. This note will be visible to the student to help them re-submit.
            </p>

            <textarea
              rows={3}
              value={rejectionReason}
              onChange={(e) => setRejectionReason(e.target.value)}
              placeholder="e.g. Student ID is expired or unreadable. Please upload a clear photo of your current college ID or enrollment letter."
              className="w-full p-3 rounded-xl bg-[#F7F7F5] border border-black/10 text-xs text-[#111111] focus:outline-none focus:border-black focus:bg-white"
            />

            <div className="flex items-center justify-end gap-2.5 mt-4 pt-3 border-t border-black/8">
              <button
                onClick={() => setRejectingRequest(null)}
                className="px-4 py-2 rounded-xl bg-[#F5F5F3] hover:bg-[#EBEBE8] text-xs text-[#4A4A4A] font-medium cursor-pointer"
              >
                Cancel
              </button>
              <button
                disabled={!rejectionReason.trim()}
                onClick={handleConfirmReject}
                className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-xs font-semibold text-white cursor-pointer shadow-xs disabled:opacity-50"
              >
                Confirm Rejection
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
