import { Check, Play } from "lucide-react";

interface TimelineItemProps {
  date: string;
  title: string;
  description: string;
  isLast?: boolean;
  isActive?: boolean;
  meetingInfo?: { person: string, link: string };
}

export default function TimelineItem({ date, title, description, isLast, isActive, meetingInfo }: TimelineItemProps) {
  return (
    <div className="flex gap-6 min-h-[100px]">
      {/* Línea y Círculo */}
      <div className="flex flex-col items-center">
        <div className={`w-8 h-8 rounded-full flex items-center justify-center z-10 
          ${isActive ? 'bg-primary text-white shadow-lg shadow-primary/30' : 'bg-primary/20 text-primary'}`}>
          {isActive ? <Play className="w-3 h-3 fill-current" /> : <div className="w-2 h-2 bg-primary rounded-full" />}
        </div>
        {!isLast && <div className="w-0.5 flex-1 bg-primary/10 -mt-1 -mb-1" />}
      </div>

      {/* Contenido */}
      <div className="pb-10 flex-1">
        <p className="text-[10px] font-extrabold text-on-surface/30 uppercase tracking-widest mb-1">{date}</p>
        <h4 className="text-md font-bold text-on-surface mb-2">{title}</h4>
        <p className="text-sm text-on-surface/60 leading-relaxed max-w-md">{description}</p>
        
        {meetingInfo && (
          <div className="mt-4 bg-surface-container-lowest p-3 rounded-xl shadow-sm flex items-center gap-3 border border-on-surface/5 w-fit">
            <div className="w-8 h-8 rounded-lg bg-on-surface/5 flex items-center justify-center">
              <div className="w-6 h-6 rounded-full bg-slate-300" /> {/* Placeholder para avatar */}
            </div>
            <div className="text-[10px] font-bold">
              <p className="text-on-surface">Interview with {meetingInfo.person}</p>
              <a href="#" className="text-primary hover:underline">{meetingInfo.link}</a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}