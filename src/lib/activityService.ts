import { ProjectActivityItem } from '../types';

export const STORAGE_KEY_ACTIVITY = 'projectverse_activity';

const DEFAULT_PROJECT_ACTIVITIES: Record<string, ProjectActivityItem[]> = {
  'proj-1': [
    {
      id: 'act-1-6',
      projectId: 'proj-1',
      type: 'PROJECT_UPDATED',
      title: 'Project Updated',
      description: 'Synced ROS 2 Jazzy node architecture and published benchmark release v1.4.0.',
      actorName: 'Devansh Kulkarni',
      actorRole: 'Team Lead',
      createdAt: new Date(Date.now() - 40 * 60 * 1000).toISOString(),
      statusIndicator: 'completed'
    },
    {
      id: 'act-1-5',
      projectId: 'proj-1',
      type: 'FEEDBACK_RECEIVED',
      title: 'Feedback Received',
      description: 'Dr. Anil Sharma requested latency metrics under simulated 15% UDP packet drop scenarios.',
      actorName: 'Dr. Anil Sharma',
      actorRole: 'Faculty Advisor',
      createdAt: new Date(Date.now() - 2 * 3600 * 1000).toISOString(),
      statusIndicator: 'verified'
    },
    {
      id: 'act-1-4',
      projectId: 'proj-1',
      type: 'FACULTY_REVIEW',
      title: 'Faculty Review',
      description: 'Formal milestone audit completed with 9.6/10 Rigor evaluation score.',
      actorName: 'Dr. Anil Sharma',
      actorRole: 'Associate Professor',
      createdAt: new Date(Date.now() - 24 * 3600 * 1000).toISOString(),
      statusIndicator: 'completed'
    },
    {
      id: 'act-1-3',
      projectId: 'proj-1',
      type: 'REPO_CONNECTED',
      title: 'Repository Connected',
      description: 'Verified repository github.com/aerosync/guidance-core with automated branch protection.',
      actorName: 'Devansh Kulkarni',
      actorRole: 'Team Lead',
      createdAt: new Date(Date.now() - 4 * 24 * 3600 * 1000).toISOString(),
      statusIndicator: 'completed'
    },
    {
      id: 'act-1-2',
      projectId: 'proj-1',
      type: 'TEAM_ADDED',
      title: 'Team Added',
      description: 'Onboarded Aarohi Sen (IIIT-H) and Marcus Vance (BITS Pilani) to the research team.',
      actorName: 'Devansh Kulkarni',
      actorRole: 'Project Founder',
      createdAt: new Date(Date.now() - 7 * 24 * 3600 * 1000).toISOString(),
      statusIndicator: 'completed'
    },
    {
      id: 'act-1-1',
      projectId: 'proj-1',
      type: 'CREATED',
      title: 'Project Created',
      description: 'Registered Capstone Project with cryptographic Project Passport PV-2025-IITB-CS089.',
      actorName: 'Devansh Kulkarni',
      actorRole: 'Lead Researcher',
      createdAt: new Date(Date.now() - 14 * 24 * 3600 * 1000).toISOString(),
      statusIndicator: 'completed'
    }
  ]
};

export function getAllProjectActivities(): Record<string, ProjectActivityItem[]> {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_ACTIVITY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY_ACTIVITY, JSON.stringify(DEFAULT_PROJECT_ACTIVITIES));
      return DEFAULT_PROJECT_ACTIVITIES;
    }
    return JSON.parse(raw);
  } catch (err) {
    console.error('Failed to read activities from localStorage', err);
    return DEFAULT_PROJECT_ACTIVITIES;
  }
}

export function saveAllActivities(data: Record<string, ProjectActivityItem[]>): void {
  try {
    localStorage.setItem(STORAGE_KEY_ACTIVITY, JSON.stringify(data));
  } catch (err) {
    console.error('Failed to save activities to localStorage', err);
  }
}

export function getProjectActivities(projectId: string): ProjectActivityItem[] {
  const all = getAllProjectActivities();
  if (all[projectId] && all[projectId].length > 0) {
    return all[projectId];
  }

  // Generate a standard procedural baseline if none exists yet
  const defaultList: ProjectActivityItem[] = [
    {
      id: `act-${projectId}-3`,
      projectId,
      type: 'REPO_CONNECTED',
      title: 'Repository Connected',
      description: 'GitHub repository linked and synced with ProjectVerse code health analyzer.',
      actorName: 'Lead Contributor',
      actorRole: 'Maintainer',
      createdAt: new Date(Date.now() - 3 * 24 * 3600 * 1000).toISOString(),
      statusIndicator: 'completed'
    },
    {
      id: `act-${projectId}-2`,
      projectId,
      type: 'TEAM_ADDED',
      title: 'Team Added',
      description: 'Capstone team contributors registered with institutional email verification.',
      actorName: 'Project Creator',
      actorRole: 'Student Lead',
      createdAt: new Date(Date.now() - 6 * 24 * 3600 * 1000).toISOString(),
      statusIndicator: 'completed'
    },
    {
      id: `act-${projectId}-1`,
      projectId,
      type: 'CREATED',
      title: 'Project Created',
      description: 'Academic charter submitted and cryptographic passport generated.',
      actorName: 'Academic Registrar',
      actorRole: 'System',
      createdAt: new Date(Date.now() - 10 * 24 * 3600 * 1000).toISOString(),
      statusIndicator: 'completed'
    }
  ];

  return defaultList;
}

export function addProjectActivity(projectId: string, activity: Omit<ProjectActivityItem, 'id' | 'projectId' | 'createdAt'>): ProjectActivityItem {
  const all = getAllProjectActivities();
  const currentList = all[projectId] || getProjectActivities(projectId);

  const newItem: ProjectActivityItem = {
    ...activity,
    id: `act_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
    projectId,
    createdAt: new Date().toISOString()
  };

  all[projectId] = [newItem, ...currentList];
  saveAllActivities(all);
  return newItem;
}
