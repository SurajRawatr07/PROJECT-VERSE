import React, { useState, useRef } from 'react';
import { 
  UploadCloud, 
  AlertCircle, 
  X, 
  ShieldCheck, 
  FileCheck2,
  FileText
} from 'lucide-react';
import { DocumentType } from '../../types';
import { validateAcademicDocument } from '../../lib/documentService';

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

  const processFile = (selectedFile: File) => {
    setInternalError(null);

    const validation = validateAcademicDocument(selectedFile);
    if (!validation.valid) {
      setInternalError(validation.error || 'Unsupported file type. Please upload PDF, JPG, JPEG or PNG.');
      return;
    }

    const formattedSize = validation.formattedSize || '100 KB';
    const fileName = selectedFile.name;

    // Immediately update local file state (instant Ready state, no network delay)
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

  return (
    <div className="space-y-4">
      {/* Document Type Selector */}
      <div>
        <label className="block text-[11px] font-mono-code text-[#4A4A4A] uppercase font-medium mb-1.5">
          Select Document Type *
        </label>
        <select
          value={selectedDocType}
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
          className="w-full px-3.5 py-2.5 rounded-xl bg-[#F7F7F5] border border-black/10 text-xs text-[#111111] focus:outline-none focus:border-black focus:bg-white transition-all cursor-pointer font-medium"
        >
          {docOptions.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      </div>

      {/* Upload Zone */}
      {!file ? (
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

          <p className="text-xs font-medium text-[#111111] mb-1">
            Drag & drop your document here, or <span className="underline text-black font-bold">browse</span>
          </p>
          <p className="text-[11px] text-[#737373] font-body max-w-sm mx-auto">
            Accepted formats: <strong>PDF, JPG, JPEG, PNG</strong> (Up to 10 MB)
          </p>

          <div className="mt-3 flex items-center justify-center gap-2 text-[10px] text-[#737373] font-mono-code flex-wrap">
            <span className="px-2 py-0.5 rounded bg-black/5">Student ID Card</span>
            <span className="px-2 py-0.5 rounded bg-black/5">Enrollment Letter</span>
            <span className="px-2 py-0.5 rounded bg-black/5">Degree Certificate</span>
          </div>
        </div>
      ) : (
        /* Selected File Card - READY State */
        <div className="p-4 rounded-2xl bg-[#F7F7F5] border border-black/10 flex items-center justify-between shadow-xs">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-10 h-10 rounded-xl bg-white border border-black/10 flex items-center justify-center text-[#111111] shrink-0">
              <FileCheck2 className="w-5 h-5 text-emerald-700" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs font-medium text-[#111111] truncate max-w-[200px] sm:max-w-[260px]">
                  {file?.name}
                </span>
                <span className="text-[10px] font-mono-code px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-200 font-medium">
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

      {/* Privacy Assurance */}
      <div className="p-3 rounded-xl bg-[#FBFBFA] border border-black/6 flex items-start gap-2 text-[11px] text-[#737373]">
        <ShieldCheck className="w-4 h-4 text-[#111111] shrink-0 mt-0.5" />
        <p className="leading-relaxed">
          <strong className="text-[#111111]">Privacy Assurance:</strong> Your document is processed locally in this MVP and is not published on your public profile.
        </p>
      </div>
    </div>
  );
};
