import { CollaborationRequest, CollaborationStatus } from '../types';
import { createNotification } from './notificationService';
import { addProjectActivity } from './activityService';

export const STORAGE_KEY_COLLABORATION = 'projectverse_collaboration_requests';

const SEED_COLLABORATION_REQUESTS: CollaborationRequest[] = [
  {
    id: 'collab-req-01',
    projectId: 'proj-1',
    projectTitle: 'AeroSync: Edge-Neuromorphic Drone Swarm Guidance',
    studentId: 'usr-student-02',
    studentName: 'Aarohi Sen',
    studentAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    studentInstitution: 'IIIT Hyderabad',
    roleInterest: 'Edge AI & Spiking Neural Nets',
    message: 'I would like to contribute to the visual odometry pipeline on Jetson Orin and deploy event-based neuromorphic camera integration.',
    status: 'PENDING',
    createdAt: new Date(Date.now() - 3 * 3600 * 1000).toISOString(),
    targetOwnerId: 'usr-student-01'
  },
  {
    id: 'collab-req-02',
    projectId: 'proj-2',
    projectTitle: 'NeuroMesh: Decentralized Clinical EHR Intelligence',
    studentId: 'usr-student-01',
    studentName: 'Suraj Rawat',
    studentAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    studentInstitution: 'Graphic Era Hill University',
    roleInterest: 'Frontend & Smart Contract Integration',
    message: 'I would like to build the patient access portal with zero-knowledge proof verification and clean responsive UI.',
    status: 'PENDING',
    createdAt: new Date(Date.now() - 24 * 3600 * 1000).toISOString(),
    targetOwnerId: 'usr-student-lead-02'
  }
];

export function getAllCollaborationRequests(): CollaborationRequest[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_COLLABORATION);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY_COLLABORATION, JSON.stringify(SEED_COLLABORATION_REQUESTS));
      return SEED_COLLABORATION_REQUESTS;
    }
    return JSON.parse(raw);
  } catch (err) {
    console.error('Failed to read collaboration requests from localStorage', err);
    return SEED_COLLABORATION_REQUESTS;
  }
}

export function saveAllCollaborationRequests(requests: CollaborationRequest[]): void {
  try {
    localStorage.setItem(STORAGE_KEY_COLLABORATION, JSON.stringify(requests));
  } catch (err) {
    console.error('Failed to save collaboration requests to localStorage', err);
  }
}

export function sendCollaborationRequest(params: {
  projectId: string;
  projectTitle: string;
  studentId: string;
  studentName: string;
  studentAvatar?: string;
  studentInstitution?: string;
  roleInterest: string;
  message: string;
  targetOwnerId?: string;
}): CollaborationRequest {
  const newRequest: CollaborationRequest = {
    id: `collab_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
    projectId: params.projectId,
    projectTitle: params.projectTitle,
    studentId: params.studentId,
    studentName: params.studentName,
    studentAvatar: params.studentAvatar,
    studentInstitution: params.studentInstitution,
    roleInterest: params.roleInterest,
    message: params.message,
    status: 'PENDING',
    createdAt: new Date().toISOString(),
    targetOwnerId: params.targetOwnerId || 'usr-student-01'
  };

  const all = getAllCollaborationRequests();
  const updated = [newRequest, ...all];
  saveAllCollaborationRequests(updated);

  // Trigger notification for project team
  createNotification({
    type: 'COLLABORATION_REQUEST',
    title: 'New Collaboration Request',
    message: `${params.studentName} requested to join "${params.projectTitle}" as ${params.roleInterest}.`,
    projectId: params.projectId,
    projectTitle: params.projectTitle,
    relatedId: newRequest.id,
    senderName: params.studentName,
    senderAvatar: params.studentAvatar,
    userId: params.targetOwnerId || 'usr-student-01'
  });

  return newRequest;
}

export function updateCollaborationRequestStatus(
  requestId: string,
  status: CollaborationStatus,
  reviewerName: string = 'Team Lead'
): CollaborationRequest | null {
  const all = getAllCollaborationRequests();
  const index = all.findIndex(r => r.id === requestId);
  if (index === -1) return null;

  const req = all[index];
  const updatedReq: CollaborationRequest = {
    ...req,
    status,
    reviewedAt: new Date().toISOString()
  };

  all[index] = updatedReq;
  saveAllCollaborationRequests(all);

  // Notify student of decision
  const title = status === 'ACCEPTED' ? 'Collaboration Request Accepted' : 'Collaboration Request Declined';
  const message = status === 'ACCEPTED'
    ? `Your request to join "${req.projectTitle}" as ${req.roleInterest} was accepted!`
    : `Your request to join "${req.projectTitle}" was not accepted at this time.`;

  createNotification({
    type: status === 'ACCEPTED' ? 'TEAM_UPDATE' : 'SYSTEM',
    title,
    message,
    projectId: req.projectId,
    projectTitle: req.projectTitle,
    relatedId: req.id,
    userId: req.studentId
  });

  // Log activity on project if accepted
  if (status === 'ACCEPTED') {
    addProjectActivity(req.projectId, {
      type: 'TEAM_ADDED',
      title: 'Team Member Added',
      description: `${req.studentName} joined the project as ${req.roleInterest}.`,
      actorName: reviewerName,
      actorRole: 'Project Lead',
      statusIndicator: 'completed'
    });
  }

  return updatedReq;
}
