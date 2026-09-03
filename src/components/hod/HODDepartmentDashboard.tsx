import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  FileSpreadsheet,
  Download,
  Filter,
  Search,
  ChevronRight,
  ExternalLink,
  Award,
  Clock,
  Layers,
  Building2,
  Check
} from 'lucide-react';
import { ProjectItem } from '../../types';

interface HODDepartmentDashboardProps {
  projects: ProjectItem[];
  onSelectProject?: (project: ProjectItem) => void;
}

export const HODDepartmentDashboard: React.FC<HODDepartmentDashboardProps> = ({
  projects,
  onSelectProject
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [domainFilter, setDomainFilter] = useState('ALL');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [sealedProjects, setSealedProjects] = useState<string[]>(['proj-1', 'proj-3']);
  const [actionToast, setActionToast] = useState<string | null>(null);

  const toggleInstitutionalSeal = (projectId: string, title: string) => {
    if (sealedProjects.includes(projectId)) {
      setSealedProjects(prev => prev.filter(id => id !== projectId));
      setActionToast(`Institutional Seal revoked for "${title}".`);
    } else {
      setSealedProjects(prev => [...prev, projectId]);
      setActionToast(`Official Institutional Seal cryptographically affixed to "${title}"!`);
    }
    setTimeout(() => setActionToast(null), 3500);
  };

  const domains = Array.from(new Set(projects.map(p => p.domain)));

  const filteredProjects = projects.filter(p => {
    const matchesSearch = 
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.passportId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.teamLead.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDomain = domainFilter === 'ALL' || p.domain === domainFilter;
    const isSealed = sealedProjects.includes(p.id);
    const matchesStatus = 
      statusFilter === 'ALL' || 
      (statusFilter === 'SEALED' && isSealed) ||
      (statusFilter === 'PENDING' && !isSealed);

    return matchesSearch && matchesDomain && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Toast Notification */}
      <AnimatePresence>
        {actionToast && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs sm:text-sm font-medium flex items-center gap-2 shadow-xs"
          >
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>{actionToast}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Governance & Accreditation Overview */}
      <div className="bg-white rounded-2xl p-6 border border-black/8 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h3 className="text-sm font-semibold text-[#111111] flex items-center gap-2">
              <Building2 className="w-4 h-4 text-[#111111]" />
              <span>Departmental Governance & NAAC Compliance Stream</span>
            </h3>
            <p className="text-xs text-[#737373] mt-0.5">
              Verified records for Graphic Era Hill University • Academic Year 2025–2026.
            </p>
          </div>
          <button
            onClick={() => {
              setActionToast('Departmental accreditation dossier exported as CSV/PDF report.');
              setTimeout(() => setActionToast(null), 3000);
            }}
            className="px-3 py-1.5 rounded-xl bg-[#F7F7F5] hover:bg-[#EBEBE8] border border-black/10 text-xs font-semibold text-[#111111] flex items-center gap-1.5 cursor-pointer self-start sm:self-auto"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export NAAC Audit Dossier</span>
          </button>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 pt-2">
          <div className="p-3.5 rounded-xl bg-[#FBFBFA] border border-black/5">
            <span className="text-[10px] font-mono-code text-[#737373] uppercase block">Sealed Passports</span>
            <span className="text-xl font-bold text-emerald-700 font-mono-code mt-0.5 block">
              {sealedProjects.length} / {projects.length}
            </span>
            <span className="text-[10px] text-[#737373]">Authorized for graduation</span>
          </div>
          <div className="p-3.5 rounded-xl bg-[#FBFBFA] border border-black/5">
            <span className="text-[10px] font-mono-code text-[#737373] uppercase block">Avg Faculty Rubric</span>
            <span className="text-xl font-bold text-[#111111] font-mono-code mt-0.5 block">
              9.2 / 10
            </span>
            <span className="text-[10px] text-emerald-700 font-medium">Exceeds threshold (+1.2)</span>
          </div>
          <div className="p-3.5 rounded-xl bg-[#FBFBFA] border border-black/5">
            <span className="text-[10px] font-mono-code text-[#737373] uppercase block">Plagiarism Index</span>
            <span className="text-xl font-bold text-emerald-700 font-mono-code mt-0.5 block">
              &lt; 4.8%
            </span>
            <span className="text-[10px] text-[#737373]">100% Turnitin Clean</span>
          </div>
          <div className="p-3.5 rounded-xl bg-[#FBFBFA] border border-black/5">
            <span className="text-[10px] font-mono-code text-[#737373] uppercase block">Patent Disclosures</span>
            <span className="text-xl font-bold text-[#111111] font-mono-code mt-0.5 block">
              3 Disclosed
            </span>
            <span className="text-[10px] text-[#737373]">University IPR Cell</span>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-2xl p-4 border border-black/8 shadow-xs flex flex-col sm:flex-row items-center gap-3">
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 text-[#737373] absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by title, passport ID, or student lead..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 bg-[#FBFBFA] border border-black/10 rounded-xl text-xs sm:text-sm focus:outline-none focus:border-black/30 text-[#111111]"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <select
            value={domainFilter}
            onChange={(e) => setDomainFilter(e.target.value)}
            className="px-3 py-2 bg-[#FBFBFA] border border-black/10 rounded-xl text-xs font-semibold text-[#111111] flex-1 sm:flex-initial"
          >
            <option value="ALL">All Domains ({projects.length})</option>
            {domains.map(d => (
              <option key={d} value={d}>{d}</option>
            ))}
          </select>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 bg-[#FBFBFA] border border-black/10 rounded-xl text-xs font-semibold text-[#111111] flex-1 sm:flex-initial"
          >
            <option value="ALL">All Status</option>
            <option value="SEALED">HOD Sealed Only</option>
            <option value="PENDING">Pending Sign-Off</option>
          </select>
        </div>
      </div>

      {/* Department-Wise Project Table */}
      <div className="bg-white rounded-2xl border border-black/8 shadow-xs overflow-hidden">
        <div className="px-6 py-4 border-b border-black/8 flex items-center justify-between">
          <h3 className="text-sm font-semibold text-[#111111]">
            Department Capstone Registry ({filteredProjects.length})
          </h3>
          <span className="text-xs font-mono-code text-[#737373]">
            Official Academic Record
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#FBFBFA] border-b border-black/8 text-[#737373] font-mono-code uppercase text-[10px]">
              <tr>
                <th className="px-6 py-3 font-semibold">Passport / Title</th>
                <th className="px-4 py-3 font-semibold">Domain</th>
                <th className="px-4 py-3 font-semibold">Student Lead</th>
                <th className="px-4 py-3 font-semibold">Faculty Reviewer</th>
                <th className="px-4 py-3 font-semibold">Rubric Score</th>
                <th className="px-4 py-3 font-semibold">Seal Status</th>
                <th className="px-6 py-3 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-black/6">
              {filteredProjects.map((p) => {
                const isSealed = sealedProjects.includes(p.id);
                return (
                  <tr key={p.id} className="hover:bg-[#FBFBFA] transition-colors">
                    <td className="px-6 py-4">
                      <div>
                        <span className="text-[10px] font-mono-code text-[#737373] block">
                          {p.passportId}
                        </span>
                        <span className="font-semibold text-[#111111] text-sm block">
                          {p.title}
                        </span>
                        <span className="text-[11px] text-[#737373] font-mono-code">
                          Batch: {p.batchYear} • {p.techStack.slice(0, 3).join(', ')}
                        </span>
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <span className="text-[10px] font-mono-code px-2 py-0.5 rounded bg-[#F7F7F5] border border-black/5 text-[#4A4A4A]">
                        {p.domain}
                      </span>
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-2">
                        <img
                          src={p.teamLead.avatar}
                          alt={p.teamLead.name}
                          className="w-6 h-6 rounded-full object-cover border border-black/10"
                        />
                        <div>
                          <span className="font-medium text-[#111111] block">{p.teamLead.name}</span>
                          <span className="text-[10px] text-[#737373] font-mono-code">{p.teamLead.rollNo}</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <span className="text-[#4A4A4A] block">{p.passport.facultyReviewer.name}</span>
                      <span className="text-[10px] text-[#737373]">{p.passport.facultyReviewer.designation}</span>
                    </td>
                    <td className="px-4 py-4">
                      <span className="font-mono-code font-bold text-sm text-[#111111]">
                        {p.passport.facultyReviewer.score}
                      </span>
                      <span className="text-[10px] text-[#737373]">/10</span>
                    </td>
                    <td className="px-4 py-4">
                      <span className={`text-[10px] font-mono-code px-2.5 py-1 rounded-full font-medium inline-flex items-center gap-1 ${
                        isSealed 
                          ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' 
                          : 'bg-amber-50 text-amber-800 border border-amber-200'
                      }`}>
                        {isSealed ? <Check className="w-3 h-3 text-emerald-600" /> : <Clock className="w-3 h-3 text-amber-600" />}
                        <span>{isSealed ? 'HOD Sealed' : 'Pending Seal'}</span>
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        {onSelectProject && (
                          <button
                            onClick={() => onSelectProject(p)}
                            className="px-2.5 py-1 rounded-lg bg-[#F7F7F5] hover:bg-[#EBEBE8] border border-black/8 text-[#111111] text-xs font-medium cursor-pointer"
                          >
                            Inspect
                          </button>
                        )}
                        <button
                          onClick={() => toggleInstitutionalSeal(p.id, p.title)}
                          className={`px-3 py-1 rounded-lg text-xs font-semibold transition-colors cursor-pointer shadow-xs ${
                            isSealed
                              ? 'bg-[#F7F7F5] hover:bg-rose-50 text-[#737373] hover:text-rose-700 border border-black/8'
                              : 'bg-emerald-700 hover:bg-emerald-800 text-white'
                          }`}
                        >
                          {isSealed ? 'Revoke Seal' : 'Grant Seal'}
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
