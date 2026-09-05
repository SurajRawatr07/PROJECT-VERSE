import React, { useState, useEffect } from 'react';
import { Clock, Trash2, ArrowRight, FolderGit2 } from 'lucide-react';
import { getRecentlyViewed, clearRecentlyViewed, RecentProjectItem } from '../../lib/recentlyViewedService';
import { ProjectItem } from '../../types';

interface RecentlyViewedSectionProps {
  allProjects: ProjectItem[];
  onSelectProject: (project: ProjectItem) => void;
  className?: string;
}

export const RecentlyViewedSection: React.FC<RecentlyViewedSectionProps> = ({
  allProjects,
  onSelectProject,
  className = ''
}) => {
  const [recents, setRecents] = useState<RecentProjectItem[]>([]);

  useEffect(() => {
    setRecents(getRecentlyViewed());
  }, []);

  const handleClear = () => {
    clearRecentlyViewed();
    setRecents([]);
  };

  if (recents.length === 0) return null;

  return (
    <div className={`p-4 sm:p-5 bg-white rounded-2xl border border-black/8 shadow-xs ${className}`}>
      <div className="flex items-center justify-between pb-3 mb-3 border-b border-black/6">
        <div className="flex items-center gap-2">
          <Clock className="w-3.5 h-3.5 text-[#111111]" />
          <h3 className="text-xs font-mono-code uppercase font-bold text-[#111111]">
            Recently Viewed
          </h3>
          <span className="text-[10px] font-mono-code px-1.5 py-0.2 rounded bg-neutral-100 text-neutral-600">
            {recents.length}
          </span>
        </div>

        <button
          onClick={handleClear}
          className="text-[11px] font-mono-code text-[#737373] hover:text-rose-600 flex items-center gap-1 cursor-pointer transition-colors"
        >
          <Trash2 className="w-3 h-3" />
          <span>Clear History</span>
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
        {recents.slice(0, 4).map((r) => {
          const fullProject = allProjects.find(p => p.id === r.id);

          return (
            <div
              key={r.id}
              onClick={() => {
                if (fullProject) {
                  onSelectProject(fullProject);
                }
              }}
              className="p-3 bg-[#FBFBFA] hover:bg-[#F5F5F3] rounded-xl border border-black/6 hover:border-black/15 transition-all cursor-pointer flex flex-col justify-between group"
            >
              <div>
                <p className="text-xs font-medium text-[#111111] group-hover:text-blue-600 truncate">
                  {r.title}
                </p>
                <p className="text-[10px] text-[#737373] font-mono-code truncate mt-0.5">
                  {r.institution.split('•')[0]}
                </p>

                <div className="flex flex-wrap gap-1 mt-2">
                  {r.techStack.slice(0, 2).map((t) => (
                    <span key={t} className="px-1.5 py-0.2 rounded text-[9px] font-mono-code bg-white border border-black/8 text-[#111111]">
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-2.5 pt-2 border-t border-black/6 flex items-center justify-between text-[10px] font-mono-code text-[#737373]">
                <span>{new Date(r.viewedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                <ArrowRight className="w-3 h-3 text-[#737373] group-hover:text-blue-600 group-hover:translate-x-0.5 transition-all" />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
