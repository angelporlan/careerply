"use client";

import ActionButton from "@/components/ActionButton";
import TimelineItem from "@/components/applications/detail/TimelineItem";
import ApplicationNotes from "@/components/applications/detail/ApplicationNotes";
import DocumentItem from "@/components/applications/detail/DocumentItem";
import { Edit3, RefreshCw, Plus, FileText } from "lucide-react";

export default function ApplicationDetailPage() {
  return (
    <div className="p-10 max-w-[1440px] mx-auto bg-surface min-h-screen">
      
      {/* Header de la Aplicación */}
      <div className="flex justify-between items-start mb-8">
        <div>
          <div className="flex items-center gap-4 mb-6">
            <span className="bg-status-interview-bg text-status-interview-text text-[10px] font-bold px-4 py-1.5 rounded-full uppercase tracking-widest shadow-sm">
              Interview Stage
            </span>
            <span className="text-[10px] font-bold text-on-surface/30 uppercase tracking-widest">
              Applied 14 days ago
            </span>
          </div>
          <h1 className="text-8xl font-extrabold text-on-surface tracking-tightest leading-none">
            Linear
          </h1>
          <p className="text-2xl font-bold text-on-surface/40 mt-4 tracking-tight">
            Lead Product Designer
          </p>
        </div>

        <div className="flex gap-4">
          <ActionButton label="Edit Application" variant="secondary" icon={Edit3} />
          <ActionButton label="Change Status" variant="primary" icon={RefreshCw} />
        </div>
      </div>

      <div className="grid grid-cols-12 gap-12">
        
        {/* COLUMNA IZQUIERDA: Journey */}
        <div className="col-span-8 bg-surface-bright rounded-4xl p-12">
          <div className="flex justify-between items-center mb-12">
            <h3 className="text-[10px] font-extrabold text-on-surface/20 uppercase tracking-widest">Application Journey</h3>
            <button className="text-[10px] font-bold text-primary uppercase tracking-widest hover:brightness-125 cursor-pointer">
              Add Milestone
            </button>
          </div>

          <div className="space-y-2">
            <TimelineItem 
              date="Nov 10, 2023" 
              title="Application Sent"
              description="Submitted portfolio and tailored CV via the internal referral link."
            />
            <TimelineItem 
              date="Nov 15, 2023" 
              title="HR Screening"
              description="30-minute call with Sarah regarding culture fit and salary expectations."
            />
            <TimelineItem 
              date="Nov 20, 2023" 
              title="Technical Interview" 
              isActive
              description="Deep dive into design systems and interaction patterns with the lead engineer."
              meetingInfo={{ person: "Marcus Chen", link: "meet.google.com/xyz-abc" }}
              isLast
            />
          </div>
        </div>

        {/* COLUMNA DERECHA: Notas y Documentos */}
        <div className="col-span-4 space-y-10">
          
          {/* Notas */}
          <ApplicationNotes />

          {/* Documentos */}
          <div className="bg-surface-container-low/30 p-8 rounded-4xl">
            <div className="flex items-center gap-3 mb-8 text-primary">
              <FileText className="w-4 h-4" />
              <h3 className="text-[10px] font-extrabold uppercase tracking-widest">Documents</h3>
            </div>
            
            <div className="space-y-3 mb-8">
              <DocumentItem name="Resume_V1.pdf" date="Oct 28" />
              <DocumentItem name="Cover_Letter_Linear.pdf" date="Nov 10" />
            </div>

            <button className="w-full border-2 border-dashed border-primary/10 rounded-2xl p-5 text-[10px] font-extrabold text-primary/40 uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-surface-container-low transition-all cursor-pointer group">
              <Plus className="w-4 h-4 group-hover:scale-110 transition-transform" /> 
              Upload New File
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}