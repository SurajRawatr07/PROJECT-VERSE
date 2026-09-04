import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  CheckCircle2,
  Building2,
  Download,
  Search,
  Filter,
  Users,
  GitFork
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
  const [sealedProjects, setSealedProjects] = useState<string[]>(['proj-1', 'proj-3']);
  const [actionToast, setActionToast] = useState<string | null>(null);

  const toggleInstitutionalSeal = (projectId: string, title: string) => {
    if (sealedProjects.includes(projectId)) {
      setSealedProjects(prev => prev.filter(id => id !== projectId));
      setActionToast(`Seal removed for "${title}".`);
    } else {
      setSealedProjects(prev => [...prev, projectId]);
      setActionToast(`Institutional Seal applied to "${title}".`);
    }
    setTimeout(() => setActionToast(null), 3000);
  };

  const filteredProjects = projects.filter(p => {
    return p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.institution.toLowerCase().includes(searchQuery.toLowerCase());
  });

  // HOD Statistics explicitly matching requirements
  const stats = [
    { label: 'Department Projects', value: `${projects.length || 18}`, note: 'Active capstones' },
    { label: 'Active Batches', value: '3', note: '2024, 2025, 2026' },
    { label: 'Faculty Guides', value: '12', note: 'Assigned reviewers' },
    { label: 'Continuity Rate', value: '84%', note: 'Multi-batch progression' }
  ];

  return (
    <div className="space-y-6 font-serif">
      {/* Toast Notification */}
      <AnimatePresence>
        {actionToast && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs font-medium flex items-center gap-2"
          >
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>{actionToast}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Page Header */}
      <div className="border-b border-black/8 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-[26px] sm:text-[32px] font-bold text-[#111111] uppercase tracking-tight">
            HOD Department Dashboard
          </h1>
          <p className="text-[14px] sm:text-[15px] text-[#4A4A4A] mt-1">
            Departmental oversight, institutional seals, and batch governance.
          </p>
        </div>

        <button
          onClick={() => {
            setActionToast('Department audit dossier exported.');
            setTimeout(() => setActionToast(null), 2500);
          }}
          className="px-4 py-2 rounded-xl bg-[#F7F7F5] hover:bg-[#ECECE9] border border-black/10 text-xs font-medium text-[#111111] inline-flex items-center gap-1.5 cursor-pointer self-start sm:self-auto"
        >
          <Download className="w-3.5 h-3.5" />
          <span>Export Audit Dossier</span>
        </button>
      </div>

      {/* 4 Stats Cards: Department Projects • Active Batches • Faculty Guides • Continuity Rate */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((st, idx) => (
          <div key={idx} className="card-white p-5 border border-black/8">
            <span className="text-xs font-bold text-[#737373] uppercase tracking-wider block">
              {st.label}
            </span>
            <p className="text-[32px] font-bold text-[#111111] leading-none my-2">
              {st.value}
            </p>
            <span className="text-xs text-[#737373]">
              {st.note}
            </span>
          </div>
        ))}
      </div>

      {/* Department Projects Table/List */}
      <div className="card-white p-6 border border-black/8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 pb-3 border-b border-black/6">
          <h2 className="text-[18px] font-bold text-[#111111]">
            Department Projects ({filteredProjects.length})
          </h2>

          <div className="relative w-full sm:w-64">
            <Search className="w-3.5 h-3.5 text-[#737373] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search projects..."
              className="w-full pl-9 pr-3 py-1.5 text-xs rounded-xl bg-[#FBFBFA] border border-black/10 text-[#111111] font-serif focus:outline-none"
            />
          </div>
        </div>

        <div className="space-y-3">
          {filteredProjects.map((p) => {
            const isSealed = sealedProjects.includes(p.id);

            return (
              <div
                key={p.id}
                className="p-4 rounded-xl bg-[#FBFBFA] border border-black/6 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] px-2 py-0.5 rounded-full bg-black/5 text-[#4A4A4A] font-medium">
                      Batch {p.academicYear}
                    </span>
                    {isSealed && (
                      <span className="text-[11px] px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 font-medium inline-flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                        Sealed
                      </span>
                    )}
                  </div>
                  <h3 className="text-[16px] font-bold text-[#111111] mt-1">
                    {p.title}
                  </h3>
                  <p className="text-xs text-[#737373] mt-0.5">
                    {p.institution} • {p.department}
                  </p>
                </div>

                <div className="flex items-center gap-2 self-end sm:self-auto shrink-0">
                  <button
                    onClick={() => toggleInstitutionalSeal(p.id, p.title)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-medium cursor-pointer transition-colors ${
                      isSealed
                        ? 'bg-rose-50 text-rose-700 border border-rose-200 hover:bg-rose-100'
                        : 'bg-[#111111] text-white hover:bg-black'
                    }`}
                  >
                    {isSealed ? 'Revoke Seal' : 'Affix Seal'}
                  </button>

                  {onSelectProject && (
                    <button
                      onClick={() => onSelectProject(p)}
                      className="px-3 py-1.5 rounded-xl bg-white border border-black/10 hover:bg-[#F5F5F3] text-xs font-medium text-[#111111] cursor-pointer"
                    >
                      View
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default HODDepartmentDashboard;
