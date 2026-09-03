import { DocumentType } from '../types';

export interface UploadAcademicDocumentResponse {
  success: boolean;
  documentId?: string;
  fileName?: string;
  fileSize?: string;
  documentType?: DocumentType;
  sha256Hash?: string;
  uploadedAt?: string;
  error?: string;
}

/**
 * Upload academic document proof using real multipart/form-data
 * IMPORTANT:
 * - Do NOT manually set Content-Type header when using browser FormData.
 *   The browser must automatically assign multipart/form-data along with the unique boundary.
 */
export async function uploadAcademicDocument(
  formData: FormData,
  authToken?: string
): Promise<UploadAcademicDocumentResponse> {
  try {
    const headers: Record<string, string> = {};
    if (authToken) {
      headers['Authorization'] = `Bearer ${authToken}`;
    }

    const response = await fetch('/api/documents/upload', {
      method: 'POST',
      headers,
      body: formData
    });

    const data = await response.json().catch(() => null);

    if (!response.ok) {
      return {
        success: false,
        error: data?.error || `Upload failed with status ${response.status}. Please retry.`
      };
    }

    if (!data || !data.success) {
      return {
        success: false,
        error: data?.error || 'Server rejected the academic document proof.'
      };
    }

    return {
      success: true,
      documentId: data.documentId,
      fileName: data.fileName,
      fileSize: data.fileSize,
      documentType: data.documentType,
      sha256Hash: data.sha256Hash,
      uploadedAt: data.uploadedAt
    };
  } catch (err: any) {
    return {
      success: false,
      error: err?.message || 'Network error communicating with document upload server. Please verify connection and retry.'
    };
  }
}

/**
 * Fetch document metadata
 */
export async function fetchDocumentMetadata(documentId: string): Promise<UploadAcademicDocumentResponse> {
  try {
    const response = await fetch(`/api/documents/${encodeURIComponent(documentId)}/meta`);
    const data = await response.json().catch(() => null);
    if (!response.ok || !data?.success) {
      return {
        success: false,
        error: data?.error || 'Could not retrieve document details.'
      };
    }
    return data;
  } catch (err: any) {
    return {
      success: false,
      error: err?.message || 'Network error fetching document metadata.'
    };
  }
}
