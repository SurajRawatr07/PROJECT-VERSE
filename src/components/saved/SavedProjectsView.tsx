import React, { useState, useEffect } from 'react';
import { Bookmark, Heart, ExternalLink, FileCheck2, Trash2, FolderGit2 } from 'lucide-react';
import { ProjectItem } from '../../types';
import { getSavedProjectIds, toggleSaveProject } from '../../lib/bookmarkService';
import { ProjectStatusBadge } from '../common/ProjectStatusBadge';

interface SavedProjectsViewProps {
  allProjects: ProjectItem[];
  onSelectProject: (project: ProjectItem) => void;
  onOpenPassport: (project: ProjectItem) => void;
}

export const SavedProjectsView: React.FC<SavedProjectsViewProps> = ({
  allProjects,
  onSelectProject,
  onOpenPassport
}) => {
  const [savedIds, setSavedIds] = useState<string[]>([]);

  useEffect(() => {
    setSavedIds(getSavedProjectIds());
  }, []);

  const savedProjects = allProjects.filter(p => savedIds.includes(p.id));

  const handleRemove = (projectId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    toggleSaveProject(projectId);
    setSavedIds(prev => prev.filter(id => id !== projectId));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="p-5 sm:p-6 bg-white rounded-2xl border border-black/8 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <Heart className="w-5 h-5 text-rose-600 fill-rose-600" />
            <h2 className="text-xl sm:text-2xl font-display font-bold text-[#111111]">
              Saved & Bookmarked Projects
            </h2>
            <span className="px-2 py-0.5 rounded-full text-xs font-mono-code font-bold bg-[#F7F7F5] border border-black/10 text-[#111111]">
              {savedProjects.length}
            </span>
          </div>
          <p className="text-xs text-[#4A4A4A] mt-1">
            Projects you've pinned for future reference, literature analysis, or peer collaboration.
          </p>
        </div>
      </div>

      {savedProjects.length === 0 ? (
        <div className="py-16 text-center bg-white rounded-2xl border border-black/8 p-8">
          <Heart className="w-10 h-10 text-[#737373] mx-auto mb-3 opacity-40" />
          <h3 className="text-sm font-bold text-[#111111]">No Saved Projects Yet</h3>
          <p className="text-xs text-[#737373] mt-1 max-w-sm mx-auto">
            Click the heart / save button on any project card in Discovery or AI Matching to bookmark it here.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {savedProjects.map(project => (
            <div
              key={project.id}
              onClick={() => onSelectProject(project)}
              className="p-5 bg-white rounded-2xl border border-black/8 hover:border-black/20 shadow-xs transition-all flex flex-col justify-between cursor-pointer group"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <ProjectStatusBadge status={project.status || 'APPROVED'} size="sm" />
                  <button
                    onClick={(e) => handleRemove(project.id, e)}
                    className="p-1.5 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-600 border border-rose-200 text-xs transition-colors cursor-pointer"
                    title="Remove from bookmarks"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>

                <h3 className="text-base font-display font-bold text-[#111111] group-hover:text-blue-600 transition-colors line-clamp-1">
                  {project.title}
                </h3>
                <p className="text-xs text-[#737373] font-mono-code mt-0.5 truncate">
                  {project.institution}
                </p>
                <p className="text-xs text-[#4A4A4A] mt-2 line-clamp-2 leading-relaxed">
                  {project.tagline || project.description}
                </p>

                <div className="flex flex-wrap gap-1 mt-3">
                  {project.techStack.slice(0, 3).map(tech => (
                    <span
                      key={tech}
                      className="px-2 py-0.5 rounded-md bg-[#F7F7F5] border border-black/8 text-[10px] font-mono-code text-[#111111]"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-black/6 flex items-center justify-between">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onOpenPassport(project);
                  }}
                  className="px-2.5 py-1 rounded-lg bg-[#F7F7F5] hover:bg-[#EBEBE8] border border-black/8 text-[11px] font-medium text-[#111111] flex items-center gap-1"
                >
                  <FileCheck2 className="w-3 h-3 text-emerald-700" />
                  <span>Passport</span>
                </button>

                <span className="text-[11px] font-mono-code font-bold text-blue-600 group-hover:translate-x-0.5 transition-transform">
                  Open Project →
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
