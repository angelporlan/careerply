"use client";

import { MessageSquare } from "lucide-react";
import { useEffect, useRef } from "react";

interface ApplicationNotesProps {
  initialNotes?: string | null;
  lastSavedAtLabel?: string;
}

export default function ApplicationNotes({ initialNotes, lastSavedAtLabel = "unknown" }: ApplicationNotesProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Función para ajustar la altura automáticamente, pero limitándola
  const adjustHeight = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      // Importante: No forzar el crecimiento indefinido
      // simplemente asegurar que no sea más pequeño que su contenido
      textarea.style.height = "auto";
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  };

  useEffect(() => {
    adjustHeight();
  }, []);

  return (
    // Quitamos 'h-full' y 'flex flex-col' de aquí
    <div className="bg-surface-container-low/50 p-8 rounded-4xl">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6 text-primary shrink-0">
        <MessageSquare className="w-4 h-4" />
        <h3 className="text-[10px] font-extrabold uppercase tracking-widest">
          Application Notes
        </h3>
      </div>
      
      {/* Contenedor "Hoja de Papel" con ALTURA FIJA y SCROLL */}
      <div className="bg-surface-container-lowest p-8 rounded-3xl shadow-sm border border-on-surface/5 relative group h-75 flex flex-col">
        <textarea 
          ref={textareaRef}
          onChange={adjustHeight}
          className="
            w-full flex-1 bg-transparent border-none outline-none 
            text-base text-on-surface/70 leading-relaxed font-medium 
            scrollbar-thin scrollbar-thumb-primary/10 scrollbar-track-transparent
            overflow-y-auto pr-2
          "
          placeholder="Start typing your interview prep or company research..."
          defaultValue={initialNotes ?? ""}
        />
        
        {/* Footer de guardado con mejor posicionamiento y sin ocupar espacio */}
        <div className="absolute bottom-4 right-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
          <span className="text-[9px] font-bold text-on-surface/20 uppercase tracking-widest">
            Last saved: {lastSavedAtLabel}
          </span>
        </div>
      </div>
    </div>
  );
}