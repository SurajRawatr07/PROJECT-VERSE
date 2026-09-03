import React from 'react';
import { ProjectLifecycleStatus } from '../../types';

interface ProjectStatusBadgeProps {
  status: ProjectLifecycleStatus | string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const ProjectStatusBadge: React.FC<ProjectStatusBadgeProps> = ({
  status,
  size = 'md',
  className = ''
}) => {
  const norm = (status || 'IN_PROGRESS').toUpperCase().replace(/\s+/g, '_');

  let style = {
    bg: 'bg-blue-50 text-blue-800 border-blue-200',
    dot: 'bg-blue-500',
    label: 'In Progress'
  };

  switch (norm) {
    case 'DRAFT':
      style = {
        bg: 'bg-neutral-100 text-neutral-700 border-neutral-200',
        dot: 'bg-neutral-400',
        label: 'Draft'
      };
      break;
    case 'IN_PROGRESS':
    case 'ACTIVE_DEVELOPMENT':
      style = {
        bg: 'bg-sky-50 text-sky-800 border-sky-200',
        dot: 'bg-sky-500',
        label: 'In Progress'
      };
      break;
    case 'UNDER_REVIEW':
      style = {
        bg: 'bg-amber-50 text-amber-800 border-amber-200',
        dot: 'bg-amber-500',
        label: 'Under Review'
      };
      break;
    case 'CHANGES_REQUIRED':
      style = {
        bg: 'bg-orange-50 text-orange-800 border-orange-200',
        dot: 'bg-orange-500',
        label: 'Changes Required'
      };
      break;
    case 'APPROVED':
    case 'VERIFIED':
      style = {
        bg: 'bg-emerald-50 text-emerald-800 border-emerald-200',
        dot: 'bg-emerald-500',
        label: 'Approved'
      };
      break;
    case 'REJECTED':
      style = {
        bg: 'bg-rose-50 text-rose-800 border-rose-200',
        dot: 'bg-rose-500',
        label: 'Rejected'
      };
      break;
    case 'COMPLETED':
      style = {
        bg: 'bg-purple-50 text-purple-800 border-purple-200',
        dot: 'bg-purple-500',
        label: 'Completed'
      };
      break;
    default:
      style = {
        bg: 'bg-neutral-100 text-neutral-800 border-neutral-200',
        dot: 'bg-neutral-500',
        label: status
      };
  }

  const sizeClasses = {
    sm: 'text-[10px] px-2 py-0.5 gap-1.5',
    md: 'text-xs px-2.5 py-0.5 gap-1.5',
    lg: 'text-xs sm:text-sm px-3 py-1 gap-2'
  }[size];

  return (
    <span
      className={`inline-flex items-center font-medium font-mono-code rounded-full border ${style.bg} ${sizeClasses} ${className}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${style.dot} shrink-0`} />
      <span className="truncate">{style.label}</span>
    </span>
  );
};
