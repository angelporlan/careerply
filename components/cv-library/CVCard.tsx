interface CVCardProps {
  fileName: string;
  date: string;
  usageCount: number;
}

export default function CVCard({ fileName, date, usageCount }: CVCardProps) {
  return (
    <div className="group bg-surface-container-low/40 p-4 rounded-4xl transition-all hover:bg-surface-container-low hover:shadow-xl cursor-pointer">
      {/* Document Preview Area */}
      <div className="bg-surface-container-lowest h-64 rounded-3xl mb-4 p-8 flex flex-col gap-3 shadow-sm group-hover:scale-[1.02] transition-transform">
        <div className="w-full h-2 bg-on-surface/5 rounded-full" />
        <div className="w-2/3 h-2 bg-on-surface/5 rounded-full" />
        <div className="w-full h-2 bg-on-surface/5 rounded-full mt-4" />
        <div className="w-full h-2 bg-on-surface/5 rounded-full" />
        <div className="w-full h-2 bg-on-surface/5 rounded-full" />
        <div className="w-1/2 h-2 bg-on-surface/10 rounded-full mt-12" />
      </div>

      {/* Info Area */}
      <div className="px-2">
        <h4 className="text-sm font-bold text-on-surface truncate mb-4">{fileName}</h4>
        <div className="flex justify-between items-center">
          <p className="text-[10px] font-extrabold text-on-surface/30 uppercase tracking-widest">{date}</p>
          <span className="bg-primary/5 text-primary text-[9px] font-extrabold px-3 py-1.5 rounded-lg uppercase tracking-widest">
            {usageCount} Apps
          </span>
        </div>
      </div>
    </div>
  );
}