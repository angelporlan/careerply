import { TrendingUp } from "lucide-react";

export default function EfficiencyCard() {
  return (
    <div className="bg-surface-container-lowest p-10 rounded-4xl shadow-sm flex flex-col justify-between h-full">
      <div className="flex justify-between items-start">
        <div className="p-3 bg-primary/5 rounded-xl text-primary">
          <TrendingUp className="w-6 h-6" />
        </div>
        <span className="text-[10px] font-bold text-on-surface/30 tracking-widest uppercase">Efficiency</span>
      </div>
      
      <div className="mt-8">
        <h2 className="text-6xl font-extrabold text-on-surface tracking-tightest">12%</h2>
        <p className="text-xl font-bold text-on-surface mt-2 tracking-tight">Response Rate</p>
        <p className="text-sm text-on-surface/40 mt-4 leading-relaxed">
          Up 2% from last week. Keep refining your CV summary.
        </p>
      </div>
    </div>
  );
}