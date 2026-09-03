import React from 'react';
import { 
  FolderPlus, 
  Users, 
  GitFork, 
  ShieldCheck, 
  MessageSquare, 
  RefreshCw, 
  Clock, 
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { ProjectActivityItem } from '../../types';

interface ProjectActivityTimelineProps {
  activities: ProjectActivityItem[];
  className?: string;
}

export const ProjectActivityTimeline: React.FC<ProjectActivityTimelineProps> = ({
  activities,
  className = ''
}) => {
  if (!activities || activities.length === 0) {
    return (
      <div className="py-8 text-center bg-[#FBFBFA] rounded-2xl border border-black/8 p-6">
        <Clock className="w-8 h-8 text-[#737373] mx-auto mb-2" />
        <p className="text-xs font-semibold text-[#111111]">No Activity Logged Yet</p>
        <p className="text-[11px] text-[#737373] mt-1">Project activity stream will record commits, reviews, and team milestones automatically.</p>
      </div>
    );
  }

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'CREATED':
        return <FolderPlus className="w-3.5 h-3.5 text-blue-600" />;
      case 'TEAM_ADDED':
        return <Users className="w-3.5 h-3.5 text-indigo-600" />;
      case 'REPO_CONNECTED':
        return <GitFork className="w-3.5 h-3.5 text-emerald-600" />;
      case 'FACULTY_REVIEW':
        return <ShieldCheck className="w-3.5 h-3.5 text-purple-600" />;
      case 'FEEDBACK_RECEIVED':
        return <MessageSquare className="w-3.5 h-3.5 text-amber-600" />;
      case 'PROJECT_UPDATED':
      case 'STATUS_CHANGED':
      default:
        return <RefreshCw className="w-3.5 h-3.5 text-slate-700" />;
    }
  };

  const formatTimestamp = (iso: string) => {
    try {
      const date = new Date(iso);
      return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch {
      return iso;
    }
  };

  return (
    <div className={`relative pl-3 sm:pl-4 ${className}`}>
      {/* Continuous vertical timeline connector line */}
      <div className="absolute left-[19px] sm:left-[23px] top-4 bottom-4 w-[1.5px] bg-black/10" />

      <div className="space-y-4 sm:space-y-6">
        {activities.map((item, index) => {
          const isLatest = index === 0;

          return (
            <div key={item.id || index} className="relative flex items-start gap-3 sm:gap-4 group">
              {/* Icon Node */}
              <div 
                className={`relative z-10 w-8 h-8 sm:w-9 sm:h-9 rounded-xl border flex items-center justify-center shrink-0 transition-all ${
                  isLatest 
                    ? 'bg-white border-black/20 shadow-xs ring-2 ring-black/5' 
                    : 'bg-[#F7F7F5] border-black/8 group-hover:border-black/20'
                }`}
              >
                {getActivityIcon(item.type)}
              </div>

              {/* Content Card */}
              <div className="flex-1 min-w-0 bg-white p-3.5 sm:p-4 rounded-xl border border-black/8 shadow-xs hover:border-black/15 transition-all">
                <div className="flex flex-wrap items-center justify-between gap-1.5 mb-1">
                  <div className="flex items-center gap-2 min-w-0">
                    <h4 className="text-xs sm:text-sm font-semibold text-[#111111] truncate">
                      {item.title}
                    </h4>
                    {item.statusIndicator === 'verified' && (
                      <span className="inline-flex items-center gap-1 text-[10px] font-mono-code px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
                        <CheckCircle2 className="w-2.5 h-2.5" />
                        Verified
                      </span>
                    )}
                    {item.statusIndicator === 'completed' && (
                      <span className="inline-flex items-center text-[10px] font-mono-code px-1.5 py-0.2 rounded bg-neutral-100 text-neutral-600">
                        Done
                      </span>
                    )}
                  </div>

                  <span className="text-[10px] sm:text-[11px] font-mono-code text-[#737373] shrink-0">
                    {formatTimestamp(item.createdAt)}
                  </span>
                </div>

                <p className="text-xs text-[#4A4A4A] leading-relaxed break-words">
                  {item.description}
                </p>

                {item.actorName && (
                  <div className="mt-2.5 pt-2 border-t border-black/6 flex items-center gap-2">
                    {item.actorAvatar ? (
                      <img 
                        src={item.actorAvatar} 
                        alt={item.actorName} 
                        className="w-4 h-4 rounded-full object-cover border border-black/10" 
                      />
                    ) : (
                      <div className="w-4 h-4 rounded-full bg-[#EBEBE8] text-[9px] font-mono-code flex items-center justify-center font-bold text-[#111111]">
                        {item.actorName[0]}
                      </div>
                    )}
                    <span className="text-[11px] font-medium text-[#111111]">
                      {item.actorName}
                    </span>
                    {item.actorRole && (
                      <>
                        <span className="text-[10px] text-[#737373]">•</span>
                        <span className="text-[10px] text-[#737373] font-mono-code">
                          {item.actorRole}
                        </span>
                      </>
                    )}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
