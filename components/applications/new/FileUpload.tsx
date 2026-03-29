"use client";

import { UploadCloud, FileText, X } from "lucide-react";
import { useRef, useState } from "react";

export default function FileUpload() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  // Abrir selector de archivos
  const handleClick = () => fileInputRef.current?.click();

  // Manejar selección normal
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) setFile(e.target.files[0]);
  };

  // --- Lógica de Drag & Drop ---
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => setIsDragging(false);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files?.[0]) setFile(e.dataTransfer.files[0]);
  };

  const removeFile = (e: React.MouseEvent) => {
    e.stopPropagation(); // Evita que se abra el selector al borrar
    setFile(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <div className="flex flex-col gap-2">
      <label className="text-[10px] font-extrabold text-on-surface/40 tracking-widest uppercase px-1">
        Resume/CV Upload
      </label>

      <div 
        onClick={file ? undefined : handleClick}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`
          relative border-2 border-dashed rounded-2xl p-10 
          flex flex-col items-center justify-center transition-all duration-200
          ${file ? 'border-primary/40 bg-surface-container-low' : 'border-primary/10 bg-surface-container-low/30 cursor-pointer hover:bg-surface-container-low'}
          ${isDragging ? 'border-primary bg-primary/5 scale-[1.01]' : ''}
        `}
      >
        <input 
          type="file"
          name="cv_file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept=".pdf,.docx"
          className="hidden" 
        />

        {/* ESTADO: ARCHIVO SELECCIONADO */}
        {file ? (
          <div className="flex items-center gap-4 w-full max-w-xs bg-surface-container-lowest p-4 rounded-xl shadow-sm animate-in fade-in zoom-in duration-200">
            <div className="p-2 bg-primary/10 rounded-lg text-primary">
              <FileText className="w-6 h-6" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold text-on-surface truncate">{file.name}</p>
              <p className="text-[10px] text-on-surface/40 uppercase font-bold tracking-wider">
                {(file.size / 1024 / 1024).toFixed(2)} MB
              </p>
            </div>
            <button 
              onClick={removeFile}
              className="p-1 hover:bg-status-rejected-bg hover:text-status-rejected-text rounded-md transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        ) : (
          /* ESTADO: VACÍO (LISTO PARA SUBIR) */
          <>
            <div className={`p-3 bg-surface-container-lowest rounded-xl shadow-sm mb-4 transition-transform ${isDragging ? 'scale-110' : 'group-hover:scale-110'}`}>
              <UploadCloud className={`w-6 h-6 ${isDragging ? 'text-primary' : 'text-primary/60'}`} />
            </div>
            
            <p className="text-sm font-bold text-on-surface tracking-tight text-center">
              {isDragging ? "Drop to upload" : "Drop your CV here or "}
              {!isDragging && <span className="text-primary">click to browse</span>}
            </p>
            
            <p className="text-[10px] text-on-surface/40 mt-1 font-medium uppercase tracking-wider">
              PDF, DOCX up to 10MB
            </p>
          </>
        )}
      </div>
    </div>
  );
}