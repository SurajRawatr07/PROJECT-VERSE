import { ProjectFeedback, StudentNotification } from '../types';
import { createNotification, getAllNotifications, saveNotifications } from './notificationService';
import { addProjectActivity } from './activityService';

export const STORAGE_KEY_FEEDBACK = 'projectverse_faculty_feedback';

export interface SubmitFeedbackResult {
  success: boolean;
  feedback?: ProjectFeedback;
  notification?: StudentNotification;
  error?: string;
}

/**
 * Retrieve all faculty feedback stored in browser localStorage
 */
export function getAllFeedbacks(): ProjectFeedback[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_FEEDBACK);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch (err) {
    console.error('Error reading localStorage feedback:', err);
    return [];
  }
}

/**
 * Persist feedbacks to browser localStorage
 */
function saveFeedbacks(feedbacks: ProjectFeedback[]): void {
  try {
    localStorage.setItem(STORAGE_KEY_FEEDBACK, JSON.stringify(feedbacks));
  } catch (err) {
    console.error('Error saving feedback to localStorage:', err);
  }
}

/**
 * Submit faculty feedback for a student project (100% Frontend-Only)
 */
export function submitProjectFeedbackFrontend(params: {
  projectId: string;
  projectTitle?: string;
  studentId: string;
  facultyId: string;
  facultyName?: string;
  facultyDesignation?: string;
  facultyAvatar?: string;
  message: string;
}): SubmitFeedbackResult {
  const trimmed = (params.message || '').trim();

  // Validation
  if (!trimmed) {
    return {
      success: false,
      error: 'Feedback cannot be empty.'
    };
  }

  if (trimmed.length > 2000) {
    return {
      success: false,
      error: 'Feedback cannot exceed 2000 characters.'
    };
  }

  const feedbackId = `fb_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`;
  const now = new Date().toISOString();

  // Create feedback object adhering to the specified schema:
  // { id, projectId, studentId, facultyId, message, createdAt, read }
  const newFeedback: ProjectFeedback = {
    id: feedbackId,
    feedbackId: feedbackId,
    projectId: params.projectId,
    projectTitle: params.projectTitle || 'Capstone Project',
    studentId: params.studentId,
    facultyId: params.facultyId,
    facultyName: params.facultyName || 'Faculty Advisor',
    facultyDesignation: params.facultyDesignation,
    facultyAvatar: params.facultyAvatar,
    message: trimmed,
    createdAt: now,
    read: false
  };

  // Save to frontend persistence
  const currentFeedbacks = getAllFeedbacks();
  saveFeedbacks([newFeedback, ...currentFeedbacks]);

  // Create corresponding student notification
  const newNotification = createNotification({
    type: 'FACULTY_FEEDBACK',
    title: 'Faculty Feedback',
    message: `Your faculty has added feedback to ${params.projectTitle || 'your project'}.`,
    projectId: params.projectId,
    projectTitle: params.projectTitle || 'Capstone Project',
    relatedId: feedbackId,
    feedbackId: feedbackId,
    feedbackMessage: trimmed,
    facultyName: params.facultyName || 'Faculty Advisor',
    userId: params.studentId
  });

  // Log activity on the project
  addProjectActivity(params.projectId, {
    type: 'FEEDBACK_RECEIVED',
    title: 'Feedback Received',
    description: `${params.facultyName || 'Faculty Advisor'} provided review guidance: "${trimmed.slice(0, 100)}${trimmed.length > 100 ? '...' : ''}"`,
    actorName: params.facultyName || 'Faculty Advisor',
    actorRole: params.facultyDesignation || 'Faculty Reviewer',
    actorAvatar: params.facultyAvatar,
    statusIndicator: 'verified'
  });

  return {
    success: true,
    feedback: newFeedback,
    notification: newNotification
  };
}

/**
 * Get feedback items for a specific project
 */
export function getFeedbacksForProject(projectId: string): ProjectFeedback[] {
  const all = getAllFeedbacks();
  return all.filter((fb) => fb.projectId === projectId);
}

/**
 * Get notifications for a specific student
 * Respects Data Isolation (only shows feedback belonging to that student)
 */
export function getNotificationsForStudent(studentId: string): StudentNotification[] {
  const all = getAllNotifications();
  return all.filter((n) => !n.userId || n.userId === studentId);
}

/**
 * Mark a notification as read in frontend persistence
 */
export function markNotificationAsReadFrontend(notificationId: string): {
  success: boolean;
  notification?: StudentNotification;
} {
  const notifications = getAllNotifications();
  let updatedNotif: StudentNotification | undefined;

  const updatedNotifications = notifications.map((n) => {
    if (n.id === notificationId) {
      updatedNotif = { ...n, read: true };
      return updatedNotif;
    }
    return n;
  });

  saveNotifications(updatedNotifications);

  // If associated with a feedback item, also mark the feedback as read
  if (updatedNotif?.feedbackId) {
    const feedbacks = getAllFeedbacks();
    const updatedFeedbacks = feedbacks.map((fb) => {
      if (fb.id === updatedNotif!.feedbackId || fb.feedbackId === updatedNotif!.feedbackId) {
        return { ...fb, read: true };
      }
      return fb;
    });
    saveFeedbacks(updatedFeedbacks);
  }

  return {
    success: true,
    notification: updatedNotif
  };
}

/**
 * Find a specific feedback item by ID
 */
export function getFeedbackById(feedbackId: string): ProjectFeedback | null {
  const feedbacks = getAllFeedbacks();
  return feedbacks.find((fb) => fb.id === feedbackId || fb.feedbackId === feedbackId) || null;
}

// Convenient export aliases
export const submitProjectFeedback = submitProjectFeedbackFrontend;
export const getProjectFeedbacks = getFeedbacksForProject;
export const getStudentNotifications = getNotificationsForStudent;
export const markNotificationAsRead = markNotificationAsReadFrontend;

