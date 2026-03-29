import { LucideIcon } from "lucide-react";

interface LibraryStatProps {
  label: string;
  value: string;
  subValue?: string;
  icon: LucideIcon;
}

export default function LibraryStatCard({ label, value, subValue, icon: Icon }: LibraryStatProps) {
  return (
    <div className="bg-surface-container-low/40 p-8 rounded-4xl flex items-center gap-6">
      <div className="w-14 h-14 bg-primary/5 rounded-2xl flex items-center justify-center text-primary">
        <Icon className="w-6 h-6" />
      </div>
      <div>
        <p className="text-[10px] font-extrabold text-on-surface/30 uppercase tracking-widest mb-1">{label}</p>
        <div className="flex items-baseline gap-2">
          <h2 className="text-3xl font-extrabold text-on-surface tracking-tightest">{value}</h2>
          {subValue && <span className="text-sm font-bold text-on-surface/60">{subValue}</span>}
        </div>
      </div>
    </div>
  );
}