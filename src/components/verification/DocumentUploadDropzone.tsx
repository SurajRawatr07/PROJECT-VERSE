import React, { useState, useRef } from 'react';
import { 
  UploadCloud, 
  AlertCircle, 
  X, 
  ShieldCheck, 
  FileCheck2,
  Loader2
} from 'lucide-react';
import { DocumentType } from '../../types';

interface DocumentUploadDropzoneProps {
  studentType?: 'CURRENT_STUDENT' | 'ALUMNI';
  onFileSelected: (docData: {
    documentType: DocumentType;
    fileName: string;
    fileSize: string;
    rawFile?: File;
  }) => void;
  onFileRemoved?: () => void;
  initialDocument?: {
    documentType: DocumentType;
    fileName: string;
    fileSize: string;
  };
  isUploading?: boolean;
  uploadProgress?: number;
  externalError?: string | null;
}

export const DocumentUploadDropzone: React.FC<DocumentUploadDropzoneProps> = ({
  studentType = 'CURRENT_STUDENT',
  onFileSelected,
  onFileRemoved,
  initialDocument,
  isUploading: externalIsUploading,
  uploadProgress: externalProgress,
  externalError
}) => {
  const [selectedDocType, setSelectedDocType] = useState<DocumentType>(
    initialDocument?.documentType || (studentType === 'ALUMNI' ? 'Degree Certificate / Marksheet' : 'Student ID Card')
  );
  const [file, setFile] = useState<{ name: string; size: string; rawFile?: File } | null>(
    initialDocument ? { name: initialDocument.fileName, size: initialDocument.fileSize } : null
  );
  const [isDragging, setIsDragging] = useState(false);
  const [internalError, setInternalError] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const allowedExtensions = ['pdf', 'jpg', 'jpeg', 'png'];
  const allowedMimeTypes = ['application/pdf', 'image/jpeg', 'image/jpg', 'image/png'];
  const disallowedExtensions = ['exe', 'js', 'zip', 'rar', 'bat', 'sh', 'apk', 'dmg'];
  const maxSizeBytes = 10 * 1024 * 1024; // 10MB strict limit

  const studentDocOptions: DocumentType[] = [
    'Student ID Card',
    'Enrollment Letter',
    'Admission / Enrollment Proof',
    'Official Academic Document'
  ];

  const alumniDocOptions: DocumentType[] = [
    'Degree Certificate / Marksheet',
    'Student ID Card',
    'Official Academic Document'
  ];

  const docOptions = studentType === 'ALUMNI' ? alumniDocOptions : studentDocOptions;

  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  const processFile = (selectedFile: File) => {
    setInternalError(null);

    // Validate non-empty file
    if (!selectedFile || selectedFile.size <= 0) {
      setInternalError('The selected file is empty. Please select a valid document.');
      return;
    }

    const ext = selectedFile.name.split('.').pop()?.toLowerCase() || '';

    // Check disallowed extensions explicitly
    if (disallowedExtensions.includes(ext)) {
      setInternalError(`Executable and archive files (.${ext}) are strictly disallowed for security.`);
      return;
    }

    // Check allowed extensions
    if (!allowedExtensions.includes(ext)) {
      setInternalError(`Invalid file format (.${ext || 'unknown'}). Please upload a PDF, JPG, JPEG, or PNG document.`);
      return;
    }

    // Validate MIME type if provided by browser
    if (selectedFile.type && !allowedMimeTypes.includes(selectedFile.type.toLowerCase())) {
      setInternalError(`Invalid file type (${selectedFile.type}). Only PDF, JPG, JPEG, and PNG are allowed.`);
      return;
    }

    // Check size limit (10 MB max)
    if (selectedFile.size > maxSizeBytes) {
      setInternalError(`File is too large (${formatFileSize(selectedFile.size)}). Maximum allowed size is 10 MB.`);
      return;
    }

    const formattedSize = formatFileSize(selectedFile.size);
    const fileName = selectedFile.name;

    // Immediately update local file state and pass raw File object to parent
    setFile({ name: fileName, size: formattedSize, rawFile: selectedFile });
    onFileSelected({
      documentType: selectedDocType,
      fileName,
      fileSize: formattedSize,
      rawFile: selectedFile
    });
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const droppedFile = e.dataTransfer.files[0];
      processFile(droppedFile);
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const chosenFile = e.target.files[0];
      processFile(chosenFile);
    }
  };

  const handleRemoveFile = () => {
    setFile(null);
    setInternalError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    if (onFileRemoved) {
      onFileRemoved();
    }
  };

  const activeError = externalError || internalError;
  const isUploading = Boolean(externalIsUploading);

  return (
    <div className="space-y-4">
      {/* Document Type Selector */}
      <div>
        <label className="block text-[11px] font-mono-code text-[#4A4A4A] uppercase font-semibold mb-1.5">
          Select Document Type *
        </label>
        <select
          value={selectedDocType}
          disabled={isUploading}
          onChange={(e) => {
            const newType = e.target.value as DocumentType;
            setSelectedDocType(newType);
            if (file) {
              onFileSelected({
                documentType: newType,
                fileName: file.name,
                fileSize: file.size,
                rawFile: file.rawFile
              });
            }
          }}
          className="w-full px-3.5 py-2.5 rounded-xl bg-[#F7F7F5] border border-black/10 text-xs text-[#111111] focus:outline-none focus:border-black focus:bg-white transition-all cursor-pointer font-medium disabled:opacity-60"
        >
          {docOptions.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      </div>

      {/* Upload Zone */}
      {!file && !isUploading ? (
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`relative rounded-2xl border-2 border-dashed p-6 text-center transition-all cursor-pointer ${
            isDragging
              ? 'border-[#111111] bg-[#F2F2EF]'
              : 'border-black/15 bg-[#FBFBFA] hover:bg-[#F5F5F3] hover:border-black/30'
          }`}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept=".pdf,.jpg,.jpeg,.png"
            onChange={handleFileInputChange}
            className="hidden"
          />

          <div className="w-12 h-12 rounded-2xl bg-white border border-black/10 flex items-center justify-center mx-auto mb-3 shadow-xs">
            <UploadCloud className="w-6 h-6 text-[#111111]" />
          </div>

          <p className="text-xs font-semibold text-[#111111] mb-1">
            Drag & drop your document here, or <span className="underline text-black font-bold">browse</span>
          </p>
          <p className="text-[11px] text-[#737373] font-body max-w-sm mx-auto">
            Accepted formats: <strong>PDF, JPG, JPEG, PNG</strong> (Up to 10 MB)
          </p>

          <div className="mt-3 flex items-center justify-center gap-2 text-[10px] text-[#737373] font-mono-code">
            <span className="px-2 py-0.5 rounded bg-black/5">Student ID</span>
            <span className="px-2 py-0.5 rounded bg-black/5">Enrollment Letter</span>
            <span className="px-2 py-0.5 rounded bg-black/5">Degree Certificate</span>
          </div>
        </div>
      ) : isUploading ? (
        <div className="p-5 rounded-2xl bg-[#F7F7F5] border border-black/10 text-center space-y-3">
          <div className="flex items-center justify-center gap-2 text-xs font-medium text-[#111111]">
            <Loader2 className="w-4 h-4 animate-spin text-black" />
            <span>
              Uploading document to secure server
              {typeof externalProgress === 'number' && externalProgress > 0 ? ` (${externalProgress}%)` : '...'}
            </span>
          </div>
          <div className="w-full bg-black/10 h-1.5 rounded-full overflow-hidden">
            <div
              className="bg-[#111111] h-full transition-all duration-200"
              style={{ width: `${typeof externalProgress === 'number' && externalProgress > 0 ? externalProgress : 100}%` }}
            />
          </div>
        </div>
      ) : (
        /* Selected File Card */
        <div className="p-4 rounded-2xl bg-[#F7F7F5] border border-black/10 flex items-center justify-between shadow-xs">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-10 h-10 rounded-xl bg-white border border-black/10 flex items-center justify-center text-[#111111] shrink-0">
              <FileCheck2 className="w-5 h-5 text-emerald-700" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-semibold text-[#111111] truncate">{file?.name}</span>
                <span className="text-[10px] font-mono-code px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-200 font-medium">
                  Ready
                </span>
              </div>
              <p className="text-[11px] text-[#737373] font-mono-code mt-0.5">
                {selectedDocType} • {file?.size}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleRemoveFile}
            className="w-7 h-7 rounded-full bg-white hover:bg-red-50 border border-black/10 flex items-center justify-center text-[#737373] hover:text-red-700 transition-colors shrink-0 ml-3 cursor-pointer"
            title="Remove and replace file"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Upload Error */}
      {activeError && (
        <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-xs text-red-800 flex items-start gap-2">
          <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
          <span>{activeError}</span>
        </div>
      )}

      {/* Security and Privacy Assurance */}
      <div className="p-3 rounded-xl bg-[#FBFBFA] border border-black/6 flex items-start gap-2 text-[11px] text-[#737373]">
        <ShieldCheck className="w-4 h-4 text-[#111111] shrink-0 mt-0.5" />
        <p className="leading-relaxed">
          <strong className="text-[#111111]">Privacy Assurance:</strong> Academic documents are sensitive. Uploaded files are stored in private encrypted storage and are never exposed on your public profile.
        </p>
      </div>
    </div>
  );
};
