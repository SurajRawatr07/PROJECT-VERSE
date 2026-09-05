import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Search, 
  Filter, 
  Sparkles, 
  SlidersHorizontal, 
  Check, 
  X,
  Compass,
  ArrowRight
} from 'lucide-react';
import { ProjectItem, ProjectDomain } from '../types';
import { SAMPLE_PROJECTS, DOMAINS_LIST } from '../data/mockData';
import { ProjectCard } from './ProjectCard';

interface ProjectDiscoverySectionProps {
  onViewProject: (project: ProjectItem) => void;
  onJoinProject: (project: ProjectItem) => void;
  onBuildProjectClick: () => void;
}

export const ProjectDiscoverySection: React.FC<ProjectDiscoverySectionProps> = ({
  onViewProject,
  onJoinProject,
  onBuildProjectClick
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDomain, setSelectedDomain] = useState<ProjectDomain>('All');
  const [selectedStatus, setSelectedStatus] = useState<string>('All');
  const [selectedTech, setSelectedTech] = useState<string>('All');
  const [showFilters, setShowFilters] = useState(false);

  const allTechStacks = useMemo(() => {
    const set = new Set<string>();
    SAMPLE_PROJECTS.forEach(p => p.techStack.forEach(t => set.add(t)));
    return ['All', ...Array.from(set).slice(0, 8)];
  }, []);

  const filteredProjects = useMemo(() => {
    return SAMPLE_PROJECTS.filter(project => {
      const matchesSearch = 
        project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.institution.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.techStack.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesDomain = selectedDomain === 'All' || project.domain === selectedDomain;
      const matchesStatus = selectedStatus === 'All' || project.status === selectedStatus;
      const matchesTech = selectedTech === 'All' || project.techStack.includes(selectedTech);

      return matchesSearch && matchesDomain && matchesStatus && matchesTech;
    });
  }, [searchQuery, selectedDomain, selectedStatus, selectedTech]);

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedDomain('All');
    setSelectedStatus('All');
    setSelectedTech('All');
  };

  const hasActiveFilters = searchQuery !== '' || selectedDomain !== 'All' || selectedStatus !== 'All' || selectedTech !== 'All';

  return (
    <section id="discovery" className="relative w-full py-24 sm:py-32 px-4 sm:px-6 bg-[#040714] border-t border-white/5">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full liquid-glass text-xs font-mono-code text-indigo-300 mb-3">
              <Compass className="w-3.5 h-3.5 text-indigo-400" />
              <span>PROJECT DIRECTORY & HERITAGE INDEX</span>
            </div>
            <h2 className="font-display text-3xl sm:text-5xl md:text-6xl text-white font-normal leading-[1.1]">
              Find Work Worth Building On.
            </h2>
            <p className="text-slate-400 font-body text-sm sm:text-base mt-3 max-w-xl leading-relaxed">
              Explore cross-institutional engineering capstones, research archives, and live open-source roadmaps ready for batch inheritance.
            </p>
          </div>

          <button
            id="discovery-submit-capstone-btn"
            onClick={onBuildProjectClick}
            className="self-start md:self-end px-5 py-2.5 rounded-full bg-white/10 hover:bg-white/15 text-white text-xs sm:text-sm font-medium border border-white/20 transition-all flex items-center gap-2 cursor-pointer"
          >
            <span>Index Your Project</span>
            <ArrowRight className="w-4 h-4 text-indigo-300" />
          </button>
        </div>

        {/* Search Bar & Primary Filter Controls */}
        <div className="liquid-glass rounded-2xl p-4 sm:p-5 mb-8 border border-white/10">
          <div className="flex flex-col md:flex-row items-center gap-3.5">
            {/* Search Input */}
            <div className="relative w-full flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                id="project-search-input"
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search projects, technologies (e.g. PyTorch, Rust, ROS 2), institutions..."
                className="w-full pl-11 pr-4 py-3 rounded-xl bg-black/40 border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-indigo-400/70 transition-colors font-body"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Quick Filter Toggle Button */}
            <button
              id="filter-toggle-btn"
              onClick={() => setShowFilters(!showFilters)}
              className={`w-full md:w-auto px-4 py-3 rounded-xl flex items-center justify-center gap-2 text-xs sm:text-sm font-medium transition-all ${
                showFilters || hasActiveFilters
                  ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-400/40'
                  : 'bg-white/5 text-slate-300 hover:bg-white/10 border border-white/10'
              }`}
            >
              <SlidersHorizontal className="w-4 h-4" />
              <span>Filters</span>
              {hasActiveFilters && (
                <span className="w-2 h-2 rounded-full bg-indigo-400" />
              )}
            </button>
          </div>

          {/* Domain Tabs (Always visible scrollable strip) */}
          <div className="flex items-center gap-2 mt-4 overflow-x-auto pb-1 no-scrollbar text-xs font-body">
            {DOMAINS_LIST.map((domain) => (
              <button
                key={domain}
                id={`filter-domain-${domain.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
                onClick={() => setSelectedDomain(domain)}
                className={`whitespace-nowrap px-3.5 py-1.5 rounded-full transition-all cursor-pointer ${
                  selectedDomain === domain
                    ? 'bg-white text-slate-950 font-medium shadow-sm'
                    : 'bg-white/5 text-slate-400 hover:text-slate-200 hover:bg-white/10 border border-white/5'
                }`}
              >
                {domain}
              </button>
            ))}
          </div>

          {/* Collapsible Expanded Filters */}
          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-5 pt-5 border-t border-white/10 grid grid-cols-1 sm:grid-cols-3 gap-4"
              >
                {/* Status filter */}
                <div>
                  <label className="text-xs font-mono-code text-slate-400 block mb-2">
                    Verification Status
                  </label>
                  <select
                    id="filter-status-select"
                    value={selectedStatus}
                    onChange={(e) => setSelectedStatus(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-black/40 border border-white/10 text-slate-200 text-xs focus:outline-none focus:border-indigo-400"
                  >
                    <option value="All">All Statuses</option>
                    <option value="Verified">Verified Only</option>
                    <option value="Seeking Next Batch">Seeking Next Batch</option>
                    <option value="Active Development">Active Development</option>
                  </select>
                </div>

                {/* Tech filter */}
                <div>
                  <label className="text-xs font-mono-code text-slate-400 block mb-2">
                    Core Technology
                  </label>
                  <select
                    id="filter-tech-select"
                    value={selectedTech}
                    onChange={(e) => setSelectedTech(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-black/40 border border-white/10 text-slate-200 text-xs focus:outline-none focus:border-indigo-400"
                  >
                    {allTechStacks.map((t) => (
                      <option key={t} value={t}>{t}</option>
                    ))}
                  </select>
                </div>

                {/* Reset button */}
                <div className="flex items-end">
                  <button
                    id="filter-reset-btn"
                    onClick={resetFilters}
                    disabled={!hasActiveFilters}
                    className="w-full py-2 px-3 rounded-lg text-xs font-medium text-slate-400 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                  >
                    Reset All Filters
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Results Count Info */}
        <div className="flex items-center justify-between mb-6 text-xs text-slate-400 font-mono-code">
          <span>
            Showing <strong className="text-white">{filteredProjects.length}</strong> indexed academic project{filteredProjects.length !== 1 ? 's' : ''}
          </span>
          {hasActiveFilters && (
            <button
              onClick={resetFilters}
              className="text-indigo-400 hover:underline cursor-pointer"
            >
              Clear filters
            </button>
          )}
        </div>

        {/* Projects Grid */}
        {filteredProjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
            {filteredProjects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                onViewProject={onViewProject}
                onJoinProject={onJoinProject}
              />
            ))}
          </div>
        ) : (
          <div className="liquid-glass rounded-2xl p-12 text-center border border-white/10">
            <p className="text-slate-300 font-body text-base mb-3">
              No projects found matching your search parameters.
            </p>
            <p className="text-xs text-slate-500 mb-6">
              Try modifying your keywords, selecting "All Domains", or indexing a new project.
            </p>
            <button
              onClick={resetFilters}
              className="px-4 py-2 rounded-full bg-white/10 hover:bg-white/15 text-white text-xs font-medium transition-all"
            >
              Clear Filter Criteria
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
