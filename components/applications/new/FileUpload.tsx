import { UploadCloud } from "lucide-react";

export default function FileUpload() {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-[10px] font-extrabold text-on-surface/40 tracking-widest uppercase px-1">
        Resume/CV Upload
      </label>
      <div className="border-2 border-dashed border-primary/10 rounded-2xl p-10 flex flex-col items-center justify-center bg-surface-container-low/30 hover:bg-surface-container-low transition-colors cursor-pointer group">
        <div className="p-3 bg-white rounded-xl shadow-sm mb-4 group-hover:scale-110 transition-transform">
          <UploadCloud className="w-6 h-6 text-primary" />
        </div>
        <p className="text-sm font-bold text-on-surface tracking-tight">
          Drop your CV here or <span className="text-primary">click to browse</span>
        </p>
        <p className="text-[10px] text-on-surface/40 mt-1 font-medium uppercase tracking-wider">
          PDF, DOCX up to 10MB
        </p>
      </div>
    </div>
  );
}