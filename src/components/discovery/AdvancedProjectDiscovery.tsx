import React, { useState, useMemo } from 'react';
import { 
  Search, 
  Filter, 
  X, 
  RotateCcw, 
  CheckCircle2, 
  Heart, 
  Users, 
  FileCheck2, 
  ExternalLink,
  ChevronDown,
  SlidersHorizontal,
  FolderGit2,
  Sparkles
} from 'lucide-react';
import { ProjectItem } from '../../types';
import { ProjectStatusBadge } from '../common/ProjectStatusBadge';
import { isProjectSaved, toggleSaveProject } from '../../lib/bookmarkService';

interface AdvancedProjectDiscoveryProps {
  projects: ProjectItem[];
  onSelectProject: (project: ProjectItem) => void;
  onOpenPassport: (project: ProjectItem) => void;
  onOpenCollaborate: (project: ProjectItem) => void;
}

export const AdvancedProjectDiscovery: React.FC<AdvancedProjectDiscoveryProps> = ({
  projects,
  onSelectProject,
  onOpenPassport,
  onOpenCollaborate
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState<string>('ALL');
  const [selectedInstitution, setSelectedInstitution] = useState<string>('ALL');
  const [selectedTech, setSelectedTech] = useState<string>('ALL');
  const [selectedStatus, setSelectedStatus] = useState<string>('ALL');
  const [selectedBatch, setSelectedBatch] = useState<string>('ALL');
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

  // Derive unique options
  const departments = useMemo(() => {
    const set = new Set<string>();
    projects.forEach(p => { if (p.department) set.add(p.department); });
    return Array.from(set);
  }, [projects]);

  const institutions = useMemo(() => {
    const set = new Set<string>();
    projects.forEach(p => { if (p.institution) set.add(p.institution); });
    return Array.from(set);
  }, [projects]);

  const technologies = useMemo(() => {
    const set = new Set<string>();
    projects.forEach(p => p.techStack.forEach(t => set.add(t)));
    return Array.from(set);
  }, [projects]);

  const batches = useMemo(() => {
    const set = new Set<string>();
    projects.forEach(p => { if (p.academicYear) set.add(p.academicYear); });
    return Array.from(set);
  }, [projects]);

  // Filter logic
  const filteredProjects = useMemo(() => {
    return projects.filter(p => {
      // Search
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesTitle = p.title.toLowerCase().includes(q);
        const matchesDesc = p.description.toLowerCase().includes(q);
        const matchesTech = p.techStack.some(t => t.toLowerCase().includes(q));
        const matchesInst = p.institution.toLowerCase().includes(q);
        if (!matchesTitle && !matchesDesc && !matchesTech && !matchesInst) return false;
      }

      // Department
      if (selectedDepartment !== 'ALL' && p.department !== selectedDepartment) return false;

      // Institution
      if (selectedInstitution !== 'ALL' && p.institution !== selectedInstitution) return false;

      // Technology
      if (selectedTech !== 'ALL' && !p.techStack.includes(selectedTech)) return false;

      // Status
      if (selectedStatus !== 'ALL') {
        const norm = (p.status || 'APPROVED').toUpperCase().replace(/\s+/g, '_');
        if (norm !== selectedStatus) return false;
      }

      // Batch
      if (selectedBatch !== 'ALL' && p.academicYear !== selectedBatch) return false;

      // Verified only
      if (verifiedOnly && !p.verificationBadge) return false;

      return true;
    });
  }, [
    projects,
    searchQuery,
    selectedDepartment,
    selectedInstitution,
    selectedTech,
    selectedStatus,
    selectedBatch,
    verifiedOnly
  ]);

  const hasActiveFilters = 
    selectedDepartment !== 'ALL' ||
    selectedInstitution !== 'ALL' ||
    selectedTech !== 'ALL' ||
    selectedStatus !== 'ALL' ||
    selectedBatch !== 'ALL' ||
    verifiedOnly ||
    searchQuery.trim().length > 0;

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedDepartment('ALL');
    setSelectedInstitution('ALL');
    setSelectedTech('ALL');
    setSelectedStatus('ALL');
    setSelectedBatch('ALL');
    setVerifiedOnly(false);
  };

  return (
    <div className="space-y-6">
      {/* Search Header Bar */}
      <div className="p-4 sm:p-6 bg-white rounded-2xl border border-black/8 shadow-xs">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#737373]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search across project titles, tech stack, domains, or institutions..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#FBFBFA] border border-black/10 text-xs sm:text-sm font-body text-[#111111] focus:outline-none focus:border-black/30 placeholder:text-[#737373]"
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
              className="lg:hidden px-3 py-2.5 rounded-xl bg-[#F7F7F5] hover:bg-[#ECECE9] border border-black/10 text-xs font-semibold text-[#111111] flex items-center gap-1.5 cursor-pointer"
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>Filters {hasActiveFilters && '•'}</span>
            </button>

            {hasActiveFilters && (
              <button
                onClick={handleResetFilters}
                className="px-3 py-2.5 rounded-xl text-xs font-medium text-[#737373] hover:text-[#111111] flex items-center gap-1 cursor-pointer"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset</span>
              </button>
            )}
          </div>
        </div>

        {/* Active Filter Chips */}
        {hasActiveFilters && (
          <div className="flex flex-wrap items-center gap-1.5 mt-3 pt-3 border-t border-black/6">
            <span className="text-[11px] font-mono-code text-[#737373] mr-1">Active:</span>

            {selectedDepartment !== 'ALL' && (
              <span className="inline-flex items-center gap-1 text-[11px] font-mono-code px-2 py-0.5 rounded-lg bg-[#F7F7F5] border border-black/10 text-[#111111]">
                Dept: {selectedDepartment}
                <X className="w-3 h-3 cursor-pointer" onClick={() => setSelectedDepartment('ALL')} />
              </span>
            )}

            {selectedInstitution !== 'ALL' && (
              <span className="inline-flex items-center gap-1 text-[11px] font-mono-code px-2 py-0.5 rounded-lg bg-[#F7F7F5] border border-black/10 text-[#111111]">
                Inst: {selectedInstitution}
                <X className="w-3 h-3 cursor-pointer" onClick={() => setSelectedInstitution('ALL')} />
              </span>
            )}

            {selectedTech !== 'ALL' && (
              <span className="inline-flex items-center gap-1 text-[11px] font-mono-code px-2 py-0.5 rounded-lg bg-[#F7F7F5] border border-black/10 text-[#111111]">
                Tech: {selectedTech}
                <X className="w-3 h-3 cursor-pointer" onClick={() => setSelectedTech('ALL')} />
              </span>
            )}

            {selectedStatus !== 'ALL' && (
              <span className="inline-flex items-center gap-1 text-[11px] font-mono-code px-2 py-0.5 rounded-lg bg-[#F7F7F5] border border-black/10 text-[#111111]">
                Status: {selectedStatus}
                <X className="w-3 h-3 cursor-pointer" onClick={() => setSelectedStatus('ALL')} />
              </span>
            )}

            {verifiedOnly && (
              <span className="inline-flex items-center gap-1 text-[11px] font-mono-code px-2 py-0.5 rounded-lg bg-emerald-50 text-emerald-800 border border-emerald-200">
                Verified Only
                <X className="w-3 h-3 cursor-pointer" onClick={() => setVerifiedOnly(false)} />
              </span>
            )}

            <button
              onClick={handleResetFilters}
              className="text-[11px] font-mono-code text-rose-600 hover:underline ml-auto cursor-pointer"
            >
              Clear All
            </button>
          </div>
        )}
      </div>

      {/* Main Grid: Filters Sidebar + Projects List */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-start">
        {/* Filter Sidebar (Desktop & collapsible on mobile) */}
        <div
          className={`lg:block ${
            showMobileFilters ? 'block' : 'hidden'
          } p-5 bg-white rounded-2xl border border-black/8 shadow-xs space-y-4`}
        >
          <div className="flex items-center justify-between pb-2 border-b border-black/6">
            <div className="flex items-center gap-2">
              <Filter className="w-3.5 h-3.5 text-[#111111]" />
              <span className="text-xs font-mono-code uppercase font-bold text-[#111111]">
                Advanced Filters
              </span>
            </div>
            {hasActiveFilters && (
              <button
                onClick={handleResetFilters}
                className="text-[11px] font-mono-code text-[#737373] hover:text-[#111111] cursor-pointer"
              >
                Reset
              </button>
            )}
          </div>

          {/* Department Filter */}
          <div>
            <label className="block text-xs font-semibold text-[#111111] mb-1.5">
              Department
            </label>
            <select
              value={selectedDepartment}
              onChange={(e) => setSelectedDepartment(e.target.value)}
              className="w-full px-2.5 py-1.5 rounded-xl bg-[#FBFBFA] border border-black/10 text-xs font-body focus:outline-none"
            >
              <option value="ALL">All Departments</option>
              {departments.map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </select>
          </div>

          {/* Institution Filter */}
          <div>
            <label className="block text-xs font-semibold text-[#111111] mb-1.5">
              Institution
            </label>
            <select
              value={selectedInstitution}
              onChange={(e) => setSelectedInstitution(e.target.value)}
              className="w-full px-2.5 py-1.5 rounded-xl bg-[#FBFBFA] border border-black/10 text-xs font-body focus:outline-none"
            >
              <option value="ALL">All Institutions</option>
              {institutions.map((inst) => (
                <option key={inst} value={inst}>
                  {inst}
                </option>
              ))}
            </select>
          </div>

          {/* Technology Filter */}
          <div>
            <label className="block text-xs font-semibold text-[#111111] mb-1.5">
              Technology Stack
            </label>
            <select
              value={selectedTech}
              onChange={(e) => setSelectedTech(e.target.value)}
              className="w-full px-2.5 py-1.5 rounded-xl bg-[#FBFBFA] border border-black/10 text-xs font-body focus:outline-none"
            >
              <option value="ALL">All Technologies</option>
              {technologies.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </div>

          {/* Project Status */}
          <div>
            <label className="block text-xs font-semibold text-[#111111] mb-1.5">
              Project Status
            </label>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="w-full px-2.5 py-1.5 rounded-xl bg-[#FBFBFA] border border-black/10 text-xs font-body focus:outline-none"
            >
              <option value="ALL">All Lifecycle States</option>
              <option value="DRAFT">Draft</option>
              <option value="IN_PROGRESS">In Progress</option>
              <option value="UNDER_REVIEW">Under Review</option>
              <option value="APPROVED">Approved / Verified</option>
              <option value="COMPLETED">Completed</option>
            </select>
          </div>

          {/* Academic Batch */}
          <div>
            <label className="block text-xs font-semibold text-[#111111] mb-1.5">
              Academic Batch
            </label>
            <select
              value={selectedBatch}
              onChange={(e) => setSelectedBatch(e.target.value)}
              className="w-full px-2.5 py-1.5 rounded-xl bg-[#FBFBFA] border border-black/10 text-xs font-body focus:outline-none"
            >
              <option value="ALL">All Batches</option>
              {batches.map((b) => (
                <option key={b} value={b}>
                  {b}
                </option>
              ))}
            </select>
          </div>

          {/* Verified Only Checkbox */}
          <div className="pt-2 border-t border-black/6">
            <label className="flex items-center gap-2 text-xs font-medium text-[#111111] cursor-pointer">
              <input
                type="checkbox"
                checked={verifiedOnly}
                onChange={(e) => setVerifiedOnly(e.target.checked)}
                className="rounded text-[#111111] focus:ring-0"
              />
              <span className="flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                Verified Projects Only
              </span>
            </label>
          </div>
        </div>

        {/* Project Cards Grid */}
        <div className="lg:col-span-3 space-y-4">
          <div className="flex items-center justify-between text-xs text-[#737373] font-mono-code px-1">
            <span>Showing {filteredProjects.length} projects</span>
            <span>Sorted by: Institutional Rigor</span>
          </div>

          {filteredProjects.length === 0 ? (
            <div className="py-16 text-center bg-white rounded-2xl border border-black/8 p-8">
              <FolderGit2 className="w-10 h-10 text-[#737373] mx-auto mb-2 opacity-50" />
              <h3 className="text-sm font-semibold text-[#111111]">No Matching Projects</h3>
              <p className="text-xs text-[#737373] mt-1">Try relaxing some filters or resetting search parameters.</p>
              <button
                onClick={handleResetFilters}
                className="mt-4 px-4 py-2 rounded-xl bg-[#111111] text-white text-xs font-semibold cursor-pointer"
              >
                Reset All Filters
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
                      {/* Top Header */}
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <div className="flex flex-wrap items-center gap-1.5">
                          <ProjectStatusBadge status={project.status || 'APPROVED'} size="sm" />
                          {project.verificationBadge && (
                            <span className="inline-flex items-center gap-1 text-[10px] font-mono-code px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
                              <CheckCircle2 className="w-2.5 h-2.5" />
                              Verified
                            </span>
                          )}
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

                      <h3 className="text-base font-display font-semibold text-[#111111] group-hover:text-blue-600 transition-colors line-clamp-1">
                        {project.title}
                      </h3>
                      <p className="text-xs text-[#737373] font-mono-code mt-0.5 truncate">
                        {project.institution} • {project.department}
                      </p>
                      <p className="text-xs text-[#4A4A4A] mt-2 line-clamp-2 leading-relaxed">
                        {project.tagline || project.description}
                      </p>

                      {/* Tech stack badges */}
                      <div className="flex flex-wrap gap-1 mt-3">
                        {project.techStack.slice(0, 3).map((tech) => (
                          <span
                            key={tech}
                            className="px-2 py-0.5 rounded-md bg-[#F7F7F5] border border-black/8 text-[10px] font-mono-code text-[#111111]"
                          >
                            {tech}
                          </span>
                        ))}
                        {project.techStack.length > 3 && (
                          <span className="px-1.5 py-0.5 rounded-md bg-[#F0F0EE] text-[10px] font-mono-code text-[#737373]">
                            +{project.techStack.length - 3}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Bottom Action Footer */}
                    <div className="mt-4 pt-3 border-t border-black/6 flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onOpenPassport(project);
                          }}
                          className="px-2.5 py-1 rounded-lg bg-[#F7F7F5] hover:bg-[#EBEBE8] border border-black/8 text-[11px] font-semibold text-[#111111] flex items-center gap-1 transition-colors"
                        >
                          <FileCheck2 className="w-3 h-3 text-emerald-700" />
                          <span>Passport</span>
                        </button>

                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onOpenCollaborate(project);
                          }}
                          className="px-2.5 py-1 rounded-lg bg-[#111111] hover:bg-black text-white text-[11px] font-semibold flex items-center gap-1 transition-colors"
                        >
                          <Users className="w-3 h-3" />
                          <span>Collaborate</span>
                        </button>
                      </div>

                      <span className="text-[11px] font-mono-code font-bold text-blue-600 group-hover:translate-x-0.5 transition-transform">
                        Dashboard →
                      </span>
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
