import { ProjectItem } from '../types';

export const STORAGE_KEY_RECENT_PROJECTS = 'projectverse_recent_projects';

export interface RecentProjectItem {
  id: string;
  title: string;
  tagline: string;
  institution: string;
  techStack: string[];
  viewedAt: string;
}

const DEFAULT_RECENT: RecentProjectItem[] = [
  {
    id: 'proj-1',
    title: 'AeroSync: Edge-Neuromorphic Drone Swarm Guidance',
    tagline: 'Sub-millisecond visual-inertial odometry for search & rescue swarms.',
    institution: 'IIT Bombay • Dept of Computer Science',
    techStack: ['C++', 'ROS 2', 'PyTorch', 'CUDA'],
    viewedAt: new Date(Date.now() - 15 * 60 * 1000).toISOString()
  }
];

export function getRecentlyViewed(): RecentProjectItem[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_RECENT_PROJECTS);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY_RECENT_PROJECTS, JSON.stringify(DEFAULT_RECENT));
      return DEFAULT_RECENT;
    }
    return JSON.parse(raw);
  } catch (err) {
    console.error('Failed to read recently viewed projects', err);
    return DEFAULT_RECENT;
  }
}

export function recordProjectView(project: ProjectItem): RecentProjectItem[] {
  try {
    const list = getRecentlyViewed();
    const filtered = list.filter(item => item.id !== project.id);
    const newItem: RecentProjectItem = {
      id: project.id,
      title: project.title,
      tagline: project.tagline || project.description.slice(0, 100),
      institution: project.institution,
      techStack: project.techStack.slice(0, 4),
      viewedAt: new Date().toISOString()
    };
    const updated = [newItem, ...filtered].slice(0, 10);
    localStorage.setItem(STORAGE_KEY_RECENT_PROJECTS, JSON.stringify(updated));
    return updated;
  } catch (err) {
    console.error('Failed to record project view', err);
    return [];
  }
}

export function clearRecentlyViewed(): void {
  try {
    localStorage.removeItem(STORAGE_KEY_RECENT_PROJECTS);
  } catch (err) {
    console.error('Failed to clear recently viewed', err);
  }
}
