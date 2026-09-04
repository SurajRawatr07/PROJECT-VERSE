import { DocumentType } from '../types';

export interface UploadAcademicDocumentResponse {
  success: boolean;
  documentId?: string;
  fileName?: string;
  fileSize?: string;
  documentType?: DocumentType;
  uploadedAt?: string;
  error?: string;
}

export const ALLOWED_DOCUMENT_EXTENSIONS = ['pdf', 'jpg', 'jpeg', 'png'];
export const ALLOWED_DOCUMENT_MIME_TYPES = [
  'application/pdf',
  'image/jpeg',
  'image/jpg',
  'image/png'
];
export const MAX_DOCUMENT_SIZE_BYTES = 10 * 1024 * 1024; // 10 MB

export function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export interface FileValidationResult {
  valid: boolean;
  error?: string;
  formattedSize?: string;
}

/**
 * Frontend-only document validator
 */
export function validateAcademicDocument(file: File): FileValidationResult {
  if (!file || file.size <= 0) {
    return {
      valid: false,
      error: 'The selected file is empty. Please select a valid document.'
    };
  }

  const ext = file.name.split('.').pop()?.toLowerCase() || '';
  if (!ALLOWED_DOCUMENT_EXTENSIONS.includes(ext)) {
    return {
      valid: false,
      error: 'Unsupported file type. Please upload PDF, JPG, JPEG or PNG.'
    };
  }

  // Validate browser MIME type when available
  if (file.type && !ALLOWED_DOCUMENT_MIME_TYPES.includes(file.type.toLowerCase())) {
    return {
      valid: false,
      error: 'Unsupported file type. Please upload PDF, JPG, JPEG or PNG.'
    };
  }

  if (file.size > MAX_DOCUMENT_SIZE_BYTES) {
    return {
      valid: false,
      error: 'File is too large. Maximum size is 10 MB.'
    };
  }

  return {
    valid: true,
    formattedSize: formatFileSize(file.size)
  };
}

/**
 * Frontend MVP document registration helper
 * Immediately processes document metadata on client without backend upload request
 */
export async function uploadAcademicDocument(
  _formDataOrFile: FormData | File,
  _authToken?: string
): Promise<UploadAcademicDocumentResponse> {
  // Purely client-side MVP flow: No network request, no 404
  const documentId = `doc_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`;
  return {
    success: true,
    documentId,
    uploadedAt: 'Just now'
  };
}

/**
 * Fetch document metadata (Client-side MVP)
 */
export async function fetchDocumentMetadata(documentId: string): Promise<UploadAcademicDocumentResponse> {
  return {
    success: true,
    documentId,
    uploadedAt: 'Just now'
  };
}

