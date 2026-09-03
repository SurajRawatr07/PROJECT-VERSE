import { StudentNotification, AppNotificationType } from '../types';

export const STORAGE_KEY_NOTIFICATIONS = 'projectverse_notifications';
const LEGACY_STORAGE_KEY = 'projectverse_student_notifications';

const SEED_NOTIFICATIONS: StudentNotification[] = [
  {
    id: 'notif-1',
    type: 'FACULTY_FEEDBACK',
    title: 'Faculty Feedback',
    message: 'Dr. Anil Sharma added review feedback on AeroSync: "Please add latency benchmarks for ROS 2 nodes under packet drop scenarios."',
    projectId: 'proj-1',
    projectTitle: 'AeroSync: Edge-Neuromorphic Drone Swarm Guidance',
    relatedId: 'fb-seed-01',
    feedbackId: 'fb-seed-01',
    feedbackMessage: 'Please add latency benchmarks for ROS 2 nodes under packet drop scenarios and document power draw measurements.',
    facultyName: 'Dr. Anil Sharma',
    createdAt: new Date(Date.now() - 35 * 60 * 1000).toISOString(),
    read: false,
    userId: 'usr-student-01'
  },
  {
    id: 'notif-2',
    type: 'COLLABORATION_REQUEST',
    title: 'Collaboration Request',
    message: 'Aarohi Sen requested to collaborate as Edge AI Specialist on AeroSync.',
    projectId: 'proj-1',
    projectTitle: 'AeroSync: Edge-Neuromorphic Drone Swarm Guidance',
    relatedId: 'collab-req-01',
    senderName: 'Aarohi Sen',
    senderAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    createdAt: new Date(Date.now() - 3 * 3600 * 1000).toISOString(),
    read: false,
    userId: 'usr-student-01'
  },
  {
    id: 'notif-3',
    type: 'PROJECT_APPROVED',
    title: 'Project Approved',
    message: 'Institutional Capstone Review Board approved AeroSync with 9.6/10 Rigor score.',
    projectId: 'proj-1',
    projectTitle: 'AeroSync: Edge-Neuromorphic Drone Swarm Guidance',
    createdAt: new Date(Date.now() - 14 * 3600 * 1000).toISOString(),
    read: true,
    userId: 'usr-student-01'
  },
  {
    id: 'notif-4',
    type: 'REPOSITORY_UPDATE',
    title: 'Repository Update',
    message: 'GitHub webhook synchronized 12 new commits on branch main from devanshk-slam.',
    projectId: 'proj-1',
    projectTitle: 'AeroSync: Edge-Neuromorphic Drone Swarm Guidance',
    createdAt: new Date(Date.now() - 26 * 3600 * 1000).toISOString(),
    read: true,
    userId: 'usr-student-01'
  },
  {
    id: 'notif-5',
    type: 'PROJECT_STATUS_UPDATE',
    title: 'Project Status Update',
    message: 'Project status transitioned to UNDER_REVIEW following milestone submission.',
    projectId: 'proj-2',
    projectTitle: 'NeuroMesh: Decentralized Clinical EHR Intelligence',
    createdAt: new Date(Date.now() - 48 * 3600 * 1000).toISOString(),
    read: true,
    userId: 'usr-student-01'
  },
  {
    id: 'notif-6',
    type: 'TEAM_UPDATE',
    title: 'Team Update',
    message: 'Marcus Vance from BITS Pilani joined as PX4 Flight Control Integrator.',
    projectId: 'proj-1',
    projectTitle: 'AeroSync: Edge-Neuromorphic Drone Swarm Guidance',
    createdAt: new Date(Date.now() - 72 * 3600 * 1000).toISOString(),
    read: true,
    userId: 'usr-student-01'
  }
];

export function getAllNotifications(): StudentNotification[] {
  try {
    let raw = localStorage.getItem(STORAGE_KEY_NOTIFICATIONS);
    if (!raw) {
      // Check legacy storage key if present
      const legacy = localStorage.getItem(LEGACY_STORAGE_KEY);
      if (legacy) {
        try {
          const parsed = JSON.parse(legacy);
          localStorage.setItem(STORAGE_KEY_NOTIFICATIONS, JSON.stringify(parsed));
          return parsed;
        } catch {
          // fall through
        }
      }
      // Seed default notifications
      localStorage.setItem(STORAGE_KEY_NOTIFICATIONS, JSON.stringify(SEED_NOTIFICATIONS));
      return SEED_NOTIFICATIONS;
    }
    return JSON.parse(raw);
  } catch (err) {
    console.error('Failed to read notifications from localStorage', err);
    return SEED_NOTIFICATIONS;
  }
}

export function saveNotifications(notifications: StudentNotification[]): void {
  try {
    localStorage.setItem(STORAGE_KEY_NOTIFICATIONS, JSON.stringify(notifications));
  } catch (err) {
    console.error('Failed to save notifications to localStorage', err);
  }
}

export function getStudentNotifications(studentId?: string): StudentNotification[] {
  const all = getAllNotifications();
  if (!studentId) return all;
  return all.filter(n => !n.userId || n.userId === studentId);
}

export function getUnreadCount(studentId?: string): number {
  const notifs = getStudentNotifications(studentId);
  return notifs.filter(n => !n.read).length;
}

export function markNotificationAsRead(id: string): StudentNotification[] {
  const current = getAllNotifications();
  const updated = current.map(n => n.id === id ? { ...n, read: true } : n);
  saveNotifications(updated);
  return updated;
}

export function markAllNotificationsAsRead(studentId?: string): StudentNotification[] {
  const current = getAllNotifications();
  const updated = current.map(n => {
    if (!studentId || !n.userId || n.userId === studentId) {
      return { ...n, read: true };
    }
    return n;
  });
  saveNotifications(updated);
  return updated;
}

export function deleteNotification(id: string): StudentNotification[] {
  const current = getAllNotifications();
  const updated = current.filter(n => n.id !== id);
  saveNotifications(updated);
  return updated;
}

export function createNotification(params: {
  type: AppNotificationType;
  title: string;
  message: string;
  projectId?: string;
  projectTitle?: string;
  relatedId?: string;
  feedbackId?: string;
  feedbackMessage?: string;
  facultyName?: string;
  senderName?: string;
  senderAvatar?: string;
  userId?: string;
}): StudentNotification {
  const newNotif: StudentNotification = {
    id: `notif_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
    type: params.type,
    title: params.title,
    message: params.message,
    projectId: params.projectId,
    projectTitle: params.projectTitle,
    relatedId: params.relatedId,
    feedbackId: params.feedbackId,
    feedbackMessage: params.feedbackMessage,
    facultyName: params.facultyName,
    senderName: params.senderName,
    senderAvatar: params.senderAvatar,
    createdAt: new Date().toISOString(),
    read: false,
    userId: params.userId || 'usr-student-01'
  };

  const current = getAllNotifications();
  saveNotifications([newNotif, ...current]);
  return newNotif;
}
