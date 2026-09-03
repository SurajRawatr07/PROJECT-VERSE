import { ProjectFeedback, StudentNotification } from '../types';
import { getCurrentSession } from './authService';

export interface SubmitFeedbackResponse {
  success: boolean;
  feedback?: ProjectFeedback;
  notification?: StudentNotification;
  error?: string;
}

export interface GetFeedbacksResponse {
  success: boolean;
  feedbacks: ProjectFeedback[];
  error?: string;
}

export interface GetNotificationsResponse {
  success: boolean;
  notifications: StudentNotification[];
  error?: string;
}

export interface MarkNotificationResponse {
  success: boolean;
  notification?: StudentNotification;
  error?: string;
}

/**
 * Synchronize the current client session with the backend session registry
 */
export async function syncSessionWithBackend(): Promise<boolean> {
  try {
    const session = getCurrentSession();
    if (!session || !session.token || !session.user) {
      return false;
    }

    const response = await fetch('/api/auth/session/sync', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        token: session.token,
        user: session.user
      })
    });

    return response.ok;
  } catch (err) {
    console.warn('Failed to sync session to backend:', err);
    return false;
  }
}

/**
 * Submit faculty feedback for a student's capstone project
 * Strictly authenticated via backend session bearer token
 */
export async function submitProjectFeedback(
  projectId: string,
  message: string
): Promise<SubmitFeedbackResponse> {
  try {
    const cleanMessage = (message || '').trim();
    if (!cleanMessage) {
      return {
        success: false,
        error: 'Feedback message cannot be empty.'
      };
    }

    if (cleanMessage.length > 2000) {
      return {
        success: false,
        error: 'Feedback message exceeds the maximum limit of 2000 characters.'
      };
    }

    const session = getCurrentSession();
    if (!session || !session.token) {
      return {
        success: false,
        error: 'Authentication required. Please sign in as a faculty member.'
      };
    }

    // Ensure session is synchronized before submitting
    await syncSessionWithBackend();

    const response = await fetch(`/api/projects/${encodeURIComponent(projectId)}/feedback`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${session.token}`
      },
      body: JSON.stringify({
        message: cleanMessage
      })
    });

    const data = await response.json().catch(() => null);

    if (!response.ok) {
      return {
        success: false,
        error: data?.error || `Submission failed (${response.status}). Please try again.`
      };
    }

    if (!data || !data.success) {
      return {
        success: false,
        error: data?.error || 'Failed to submit faculty feedback.'
      };
    }

    return {
      success: true,
      feedback: data.feedback,
      notification: data.notification
    };
  } catch (err: any) {
    return {
      success: false,
      error: err?.message || 'Network error while submitting faculty feedback.'
    };
  }
}

/**
 * Fetch all faculty feedback items for a project
 */
export async function getProjectFeedbacks(projectId: string): Promise<GetFeedbacksResponse> {
  try {
    const session = getCurrentSession();
    const headers: Record<string, string> = {};
    if (session?.token) {
      headers['Authorization'] = `Bearer ${session.token}`;
    }

    const response = await fetch(`/api/projects/${encodeURIComponent(projectId)}/feedback`, {
      method: 'GET',
      headers
    });

    const data = await response.json().catch(() => null);

    if (!response.ok || !data?.success) {
      return {
        success: false,
        feedbacks: [],
        error: data?.error || 'Failed to load project feedback.'
      };
    }

    return {
      success: true,
      feedbacks: data.feedbacks || []
    };
  } catch (err: any) {
    return {
      success: false,
      feedbacks: [],
      error: err?.message || 'Network error fetching project feedback.'
    };
  }
}

/**
 * Fetch notifications for the currently logged-in user
 */
export async function getStudentNotifications(): Promise<GetNotificationsResponse> {
  try {
    const session = getCurrentSession();
    const headers: Record<string, string> = {};
    if (session?.token) {
      headers['Authorization'] = `Bearer ${session.token}`;
    }

    const response = await fetch('/api/notifications', {
      method: 'GET',
      headers
    });

    const data = await response.json().catch(() => null);

    if (!response.ok || !data?.success) {
      return {
        success: false,
        notifications: [],
        error: data?.error || 'Failed to load notifications.'
      };
    }

    return {
      success: true,
      notifications: data.notifications || []
    };
  } catch (err: any) {
    return {
      success: false,
      notifications: [],
      error: err?.message || 'Network error loading notifications.'
    };
  }
}

/**
 * Mark a notification as read
 */
export async function markNotificationAsRead(
  notificationId: string
): Promise<MarkNotificationResponse> {
  try {
    const session = getCurrentSession();
    const headers: Record<string, string> = {};
    if (session?.token) {
      headers['Authorization'] = `Bearer ${session.token}`;
    }

    const response = await fetch(`/api/notifications/${encodeURIComponent(notificationId)}/read`, {
      method: 'PATCH',
      headers
    });

    const data = await response.json().catch(() => null);

    if (!response.ok || !data?.success) {
      return {
        success: false,
        error: data?.error || 'Failed to mark notification as read.'
      };
    }

    return {
      success: true,
      notification: data.notification
    };
  } catch (err: any) {
    return {
      success: false,
      error: err?.message || 'Network error updating notification.'
    };
  }
}
