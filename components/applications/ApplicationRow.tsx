import { MoreVertical } from "lucide-react";
import StatusBadge from "./StatusBadge";

interface AppRowProps {
  company: string;
  location: string;
  position: string;
  type: string;
  date: string;
  status: any;
  iconBg: string;
}

export default function ApplicationRow({ company, location, position, type, date, status, iconBg }: AppRowProps) {
  return (
    <div className="grid grid-cols-12 items-center gap-4 py-6 px-4 hover:bg-surface-container-lowest rounded-2xl transition-all group">
      {/* Company Info */}
      <div className="col-span-4 flex items-center gap-4">
        <div className={`w-12 h-12 rounded-xl ${iconBg} flex items-center justify-center text-white font-bold shrink-0`}>
          {company[0]}
        </div>
        <div>
          <h4 className="text-sm font-bold text-on-surface tracking-tight">{company}</h4>
          <p className="text-[11px] text-on-surface/40 font-medium">{location}</p>
        </div>
      </div>

      {/* Position Info */}
      <div className="col-span-3">
        <h4 className="text-sm font-bold text-on-surface tracking-tight">{position}</h4>
        <p className="text-[11px] text-on-surface/40 font-medium">{type}</p>
      </div>

      {/* Date */}
      <div className="col-span-2 text-sm text-on-surface/60 font-medium">
        {date}
      </div>

      {/* Status */}
      <div className="col-span-2">
        <StatusBadge status={status} />
      </div>

      {/* Actions */}
      <div className="col-span-1 flex justify-end">
        <button className="p-2 text-on-surface/20 hover:text-on-surface transition-colors cursor-pointer">
          <MoreVertical className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}