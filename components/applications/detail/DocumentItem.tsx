import { FileText, Download } from "lucide-react";

interface DocumentItemProps {
  name: string;
  date: string;
}

export default function DocumentItem({ name, date }: DocumentItemProps) {
  return (
    <div className="bg-surface-container-lowest p-4 rounded-2xl flex items-center gap-4 group hover:shadow-md transition-all cursor-pointer border border-transparent hover:border-primary/5">
      <div className="p-2 bg-status-rejected-bg/30 text-status-rejected-text rounded-lg">
        <FileText className="w-5 h-5" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-bold text-on-surface truncate tracking-tight">{name}</p>
        <p className="text-[9px] text-on-surface/30 font-extrabold uppercase tracking-widest mt-0.5">
          Modified: {date}
        </p>
      </div>
      <button className="p-2 text-on-surface/20 group-hover:text-primary transition-colors">
        <Download className="w-4 h-4" />
      </button>
    </div>
  );
}