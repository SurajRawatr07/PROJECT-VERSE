import React, { useState, useMemo } from 'react';
import { 
  Search, 
  Filter, 
  X, 
  RotateCcw, 
  CheckCircle2, 
  Heart, 
  FileCheck2, 
  ArrowRight,
  SlidersHorizontal,
  FolderGit2
} from 'lucide-react';
import { ProjectItem } from '../../types';
import { ProjectStatusBadge } from '../common/ProjectStatusBadge';
import { toggleSaveProject } from '../../lib/bookmarkService';

interface AdvancedProjectDiscoveryProps {
  projects: ProjectItem[];
  onSelectProject: (project: ProjectItem) => void;
  onOpenPassport: (project: ProjectItem) => void;
  onOpenCollaborate?: (project: ProjectItem) => void;
}

export const AdvancedProjectDiscovery: React.FC<AdvancedProjectDiscoveryProps> = ({
  projects,
  onSelectProject,
  onOpenPassport,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedInstitution, setSelectedInstitution] = useState<string>('ALL');
  const [selectedDepartment, setSelectedDepartment] = useState<string>('ALL');
  const [selectedTech, setSelectedTech] = useState<string>('ALL');
  const [selectedDomain, setSelectedDomain] = useState<string>('ALL');
  const [selectedBatch, setSelectedBatch] = useState<string>('ALL');
  const [selectedStatus, setSelectedStatus] = useState<string>('ALL');
  const [verifiedOnly, setVerifiedOnly] = useState<boolean>(false);
  const [showMobileFilters, setShowMobileFilters] = useState<boolean>(false);
  const [savedIds, setSavedIds] = useState<string[]>(() => {
    try {
      const raw = localStorage.getItem('projectverse_saved_projects');
      return raw ? JSON.parse(raw) : ['proj-1'];
    } catch {
      return ['proj-1'];
    }
  });

  const handleToggleSave = (projectId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const isSaved = toggleSaveProject(projectId);
    setSavedIds(prev => isSaved ? [...prev, projectId] : prev.filter(id => id !== projectId));
  };

  // Derive unique filter options
  const institutions = useMemo(() => {
    const set = new Set<string>();
    projects.forEach(p => { if (p.institution) set.add(p.institution); });
    return Array.from(set).sort();
  }, [projects]);

  const departments = useMemo(() => {
    const set = new Set<string>();
    projects.forEach(p => { if (p.department) set.add(p.department); });
    return Array.from(set).sort();
  }, [projects]);

  const technologies = useMemo(() => {
    const set = new Set<string>();
    projects.forEach(p => p.techStack?.forEach(t => set.add(t)));
    return Array.from(set).sort();
  }, [projects]);

  const domains = useMemo(() => {
    const set = new Set<string>();
    projects.forEach(p => { if (p.domain) set.add(p.domain); });
    return Array.from(set).sort();
  }, [projects]);

  const batches = useMemo(() => {
    const set = new Set<string>();
    projects.forEach(p => { if (p.academicYear) set.add(p.academicYear); });
    return Array.from(set).sort().reverse();
  }, [projects]);

  // Filtering
  const filteredProjects = useMemo(() => {
    return projects.filter(p => {
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesText = 
          p.title.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          (p.tagline && p.tagline.toLowerCase().includes(q)) ||
          p.institution.toLowerCase().includes(q) ||
          p.techStack.some(t => t.toLowerCase().includes(q));
        if (!matchesText) return false;
      }

      if (selectedInstitution !== 'ALL' && p.institution !== selectedInstitution) return false;
      if (selectedDepartment !== 'ALL' && p.department !== selectedDepartment) return false;
      if (selectedTech !== 'ALL' && !p.techStack.includes(selectedTech)) return false;
      if (selectedDomain !== 'ALL' && p.domain !== selectedDomain) return false;
      if (selectedBatch !== 'ALL' && p.academicYear !== selectedBatch) return false;
      if (selectedStatus !== 'ALL') {
        const norm = (p.status || 'APPROVED').toUpperCase().replace(/\s+/g, '_');
        if (norm !== selectedStatus) return false;
      }
      if (verifiedOnly && !p.verificationBadge) return false;

      return true;
    });
  }, [
    projects,
    searchQuery,
    selectedInstitution,
    selectedDepartment,
    selectedTech,
    selectedDomain,
    selectedBatch,
    selectedStatus,
    verifiedOnly
  ]);

  const hasActiveFilters = 
    selectedInstitution !== 'ALL' ||
    selectedDepartment !== 'ALL' ||
    selectedTech !== 'ALL' ||
    selectedDomain !== 'ALL' ||
    selectedBatch !== 'ALL' ||
    selectedStatus !== 'ALL' ||
    verifiedOnly ||
    searchQuery.trim().length > 0;

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedInstitution('ALL');
    setSelectedDepartment('ALL');
    setSelectedTech('ALL');
    setSelectedDomain('ALL');
    setSelectedBatch('ALL');
    setSelectedStatus('ALL');
    setVerifiedOnly(false);
  };

  return (
    <div className="space-y-6 font-serif">
      {/* 1. Clear Page Heading & Description */}
      <div className="border-b border-black/8 pb-5">
        <h1 className="text-[28px] sm:text-[34px] font-bold text-[#111111] tracking-tight uppercase">
          Discover Projects
        </h1>
        <p className="text-[15px] sm:text-[16px] text-[#4A4A4A] mt-1 tracking-wide">
          Find academic work worth exploring.
        </p>
      </div>

      {/* Search Input Bar */}
      <div className="p-4 sm:p-5 bg-white rounded-2xl border border-black/8 shadow-xs">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#737373]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search across project titles, technologies, or institutions..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#FBFBFA] border border-black/10 text-xs sm:text-sm font-serif text-[#111111] focus:outline-none focus:border-black/30 placeholder:text-[#737373]"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#737373] hover:text-[#111111]"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowMobileFilters(!showMobileFilters)}
              className="lg:hidden px-3.5 py-2.5 rounded-xl bg-[#F7F7F5] hover:bg-[#ECECE9] border border-black/10 text-xs font-semibold text-[#111111] flex items-center gap-1.5 cursor-pointer font-serif"
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>Filters {hasActiveFilters && '•'}</span>
            </button>

            {hasActiveFilters && (
              <button
                onClick={handleResetFilters}
                className="px-3 py-2.5 rounded-xl text-xs font-medium text-[#737373] hover:text-[#111111] flex items-center gap-1 cursor-pointer font-serif"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Main Grid: Compact Filters + Project Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-start">
        {/* Compact Filters Sidebar */}
        <div
          className={`lg:block ${
            showMobileFilters ? 'block' : 'hidden'
          } p-5 bg-white rounded-2xl border border-black/8 shadow-xs space-y-3.5`}
        >
          <div className="flex items-center justify-between pb-2 border-b border-black/6">
            <div className="flex items-center gap-2">
              <Filter className="w-3.5 h-3.5 text-[#111111]" />
              <span className="text-xs font-bold text-[#111111] uppercase tracking-wider">
                Filters
              </span>
            </div>
            {hasActiveFilters && (
              <button
                onClick={handleResetFilters}
                className="text-[11px] text-[#737373] hover:text-[#111111] cursor-pointer"
              >
                Reset
              </button>
            )}
          </div>

          {/* College (Institution) */}
          <div>
            <label className="block text-xs font-bold text-[#111111] mb-1">
              College
            </label>
            <select
              value={selectedInstitution}
              onChange={(e) => setSelectedInstitution(e.target.value)}
              className="w-full px-2.5 py-1.5 rounded-xl bg-[#FBFBFA] border border-black/10 text-xs font-serif focus:outline-none"
            >
              <option value="ALL">All Colleges</option>
              {institutions.map((inst) => (
                <option key={inst} value={inst}>
                  {inst}
                </option>
              ))}
            </select>
          </div>

          {/* Department */}
          <div>
            <label className="block text-xs font-bold text-[#111111] mb-1">
              Department
            </label>
            <select
              value={selectedDepartment}
              onChange={(e) => setSelectedDepartment(e.target.value)}
              className="w-full px-2.5 py-1.5 rounded-xl bg-[#FBFBFA] border border-black/10 text-xs font-serif focus:outline-none"
            >
              <option value="ALL">All Departments</option>
              {departments.map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </select>
          </div>

          {/* Technology */}
          <div>
            <label className="block text-xs font-bold text-[#111111] mb-1">
              Technology
            </label>
            <select
              value={selectedTech}
              onChange={(e) => setSelectedTech(e.target.value)}
              className="w-full px-2.5 py-1.5 rounded-xl bg-[#FBFBFA] border border-black/10 text-xs font-serif focus:outline-none"
            >
              <option value="ALL">All Technologies</option>
              {technologies.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </div>

          {/* Project Type / Domain */}
          <div>
            <label className="block text-xs font-bold text-[#111111] mb-1">
              Project Type
            </label>
            <select
              value={selectedDomain}
              onChange={(e) => setSelectedDomain(e.target.value)}
              className="w-full px-2.5 py-1.5 rounded-xl bg-[#FBFBFA] border border-black/10 text-xs font-serif focus:outline-none"
            >
              <option value="ALL">All Types</option>
              {domains.map((dom) => (
                <option key={dom} value={dom}>
                  {dom}
                </option>
              ))}
            </select>
          </div>

          {/* Batch */}
          <div>
            <label className="block text-xs font-bold text-[#111111] mb-1">
              Batch
            </label>
            <select
              value={selectedBatch}
              onChange={(e) => setSelectedBatch(e.target.value)}
              className="w-full px-2.5 py-1.5 rounded-xl bg-[#FBFBFA] border border-black/10 text-xs font-serif focus:outline-none"
            >
              <option value="ALL">All Batches</option>
              {batches.map((b) => (
                <option key={b} value={b}>
                  {b}
                </option>
              ))}
            </select>
          </div>

          {/* Status */}
          <div>
            <label className="block text-xs font-bold text-[#111111] mb-1">
              Status
            </label>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="w-full px-2.5 py-1.5 rounded-xl bg-[#FBFBFA] border border-black/10 text-xs font-serif focus:outline-none"
            >
              <option value="ALL">All Statuses</option>
              <option value="APPROVED">Approved / Verified</option>
              <option value="IN_PROGRESS">In Progress</option>
              <option value="UNDER_REVIEW">Under Review</option>
              <option value="COMPLETED">Completed</option>
            </select>
          </div>

          {/* Verified Only */}
          <div className="pt-2 border-t border-black/6">
            <label className="flex items-center gap-2 text-xs font-medium text-[#111111] cursor-pointer">
              <input
                type="checkbox"
                checked={verifiedOnly}
                onChange={(e) => setVerifiedOnly(e.target.checked)}
                className="rounded text-[#111111] focus:ring-0"
              />
              <span className="flex items-center gap-1 font-serif">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                Verified Only
              </span>
            </label>
          </div>
        </div>

        {/* Clean Project Cards */}
        <div className="lg:col-span-3 space-y-4">
          <div className="flex items-center justify-between text-xs text-[#737373] px-1">
            <span>Showing {filteredProjects.length} academic projects</span>
          </div>

          {filteredProjects.length === 0 ? (
            <div className="py-14 text-center bg-white rounded-2xl border border-black/8 p-8">
              <FolderGit2 className="w-9 h-9 text-[#737373] mx-auto mb-2 opacity-50" />
              <h3 className="text-sm font-bold text-[#111111]">No Matching Projects</h3>
              <p className="text-xs text-[#737373] mt-1">Try resetting filters to explore more work.</p>
              <button
                onClick={handleResetFilters}
                className="mt-3.5 px-4 py-2 rounded-xl bg-[#111111] text-white text-xs font-medium cursor-pointer"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredProjects.map((project) => {
                const isSaved = savedIds.includes(project.id);

                return (
                  <div
                    key={project.id}
                    onClick={() => onSelectProject(project)}
                    className="p-5 bg-white rounded-2xl border border-black/8 hover:border-black/20 shadow-xs transition-all flex flex-col justify-between cursor-pointer group"
                  >
                    <div>
                      {/* Top Row: Verification + Save */}
                      <div className="flex items-start justify-between gap-2 mb-2.5">
                        <div className="flex flex-wrap items-center gap-1.5">
                          {project.verificationBadge ? (
                            <span className="inline-flex items-center gap-1 text-[11px] px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 font-medium">
                              <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                              Verified
                            </span>
                          ) : (
                            <ProjectStatusBadge status={project.status || 'APPROVED'} size="sm" />
                          )}
                          <span className="text-[11px] px-2 py-0.5 rounded-full bg-[#F5F5F3] border border-black/6 text-[#4A4A4A]">
                            Batch {project.academicYear}
                          </span>
                        </div>

                        <button
                          onClick={(e) => handleToggleSave(project.id, e)}
                          className={`p-1.5 rounded-lg border text-xs transition-colors cursor-pointer ${
                            isSaved
                              ? 'bg-rose-50 text-rose-600 border-rose-200'
                              : 'bg-[#F7F7F5] hover:bg-[#EBEBE8] text-[#737373] border-black/8'
                          }`}
                          title={isSaved ? 'Remove from Saved' : 'Save Project'}
                        >
                          <Heart className={`w-3.5 h-3.5 ${isSaved ? 'fill-rose-600' : ''}`} />
                        </button>
                      </div>

                      {/* Project Name */}
                      <h3 className="text-[18px] font-bold text-[#111111] group-hover:text-black transition-colors line-clamp-1">
                        {project.title}
                      </h3>

                      {/* Institution */}
                      <p className="text-xs text-[#737373] mt-0.5 truncate">
                        {project.institution}
                      </p>

                      {/* Short Description */}
                      <p className="text-[13px] text-[#4A4A4A] mt-2 line-clamp-2 leading-relaxed">
                        {project.tagline || project.description}
                      </p>

                      {/* Technologies */}
                      <div className="flex flex-wrap gap-1 mt-3">
                        {project.techStack.slice(0, 3).map((tech) => (
                          <span
                            key={tech}
                            className="px-2 py-0.5 rounded-md bg-[#F7F7F5] border border-black/8 text-[11px] text-[#111111]"
                          >
                            {tech}
                          </span>
                        ))}
                        {project.techStack.length > 3 && (
                          <span className="px-1.5 py-0.5 rounded-md bg-[#F0F0EE] text-[11px] text-[#737373]">
                            +{project.techStack.length - 3}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Bottom Row: Actions */}
                    <div className="mt-4 pt-3 border-t border-black/6 flex items-center justify-between gap-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onOpenPassport(project);
                        }}
                        className="px-2.5 py-1 rounded-lg bg-[#F7F7F5] hover:bg-[#EBEBE8] border border-black/8 text-[11.5px] font-medium text-[#111111] flex items-center gap-1 transition-colors"
                      >
                        <FileCheck2 className="w-3 h-3 text-emerald-700" />
                        <span>Passport</span>
                      </button>

                      <button
                        onClick={() => onSelectProject(project)}
                        className="px-3 py-1 rounded-lg bg-[#111111] hover:bg-black text-white text-[11.5px] font-medium flex items-center gap-1 transition-colors"
                      >
                        <span>View Project</span>
                        <ArrowRight className="w-3 h-3 text-white" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdvancedProjectDiscovery;
