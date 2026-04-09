"use client";

import { UploadCloud } from "lucide-react";
import { useRef, useState } from "react";
import { useFormStatus } from "react-dom";

interface CvUploadDropzoneProps {
  uploadAction: (formData: FormData) => void;
}

function SubmitStatus() {
  const { pending } = useFormStatus();

  return (
    <p className="text-[10px] text-on-surface/40 mt-2 font-medium uppercase tracking-wider text-center">
      {pending ? "Uploading..." : "PDF, DOCX up to 10MB"}
    </p>
  );
}

export default function CvUploadDropzone({ uploadAction }: CvUploadDropzoneProps) {
  const formRef = useRef<HTMLFormElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  return (
    <form ref={formRef} action={uploadAction} className="w-full">
      <label
        htmlFor="cv-detail-upload"
        onDragOver={(event) => {
          event.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={() => setIsDragging(false)}
        className={`relative w-full border-2 border-dashed rounded-2xl p-5 text-[10px] font-extrabold uppercase tracking-widest flex flex-col items-center justify-center gap-2 transition-all cursor-pointer group ${
          isDragging
            ? "border-primary/40 bg-primary/5 text-primary"
            : "border-primary/10 text-primary/40 hover:bg-surface-container-low"
        }`}
      >
        <UploadCloud className="w-4 h-4 group-hover:scale-110 transition-transform" />
        <span>Upload New File</span>
        <input
          id="cv-detail-upload"
          type="file"
          name="cv_file"
          accept=".pdf,.docx"
          className="absolute inset-0 opacity-0 cursor-pointer"
          onChange={(event) => {
            if (event.currentTarget.files?.[0]) {
              formRef.current?.requestSubmit();
            }
          }}
        />
      </label>
      <SubmitStatus />
    </form>
  );
}
