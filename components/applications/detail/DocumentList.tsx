import { FileText, Download, Plus } from "lucide-react";

export default function DocumentList() {
  const docs = [
    { name: "Resume_V1.pdf", date: "OCT 28" },
    { name: "Cover_Letter_Linear.pdf", date: "NOV 10" }
  ];

  return (
    <div className="bg-surface-container-low/30 p-8 rounded-4xl space-y-4">
      <div className="flex items-center gap-2 mb-2 text-primary">
        <FileText className="w-4 h-4" />
        <h3 className="text-xs font-extrabold uppercase tracking-widest">Documents</h3>
      </div>
      
      {docs.map((doc) => (
        <div key={doc.name} className="bg-surface-container-lowest p-4 rounded-2xl flex items-center gap-4 group hover:shadow-md transition-all cursor-pointer">
          <div className="p-2 bg-rose-50 text-rose-500 rounded-lg">
            <FileText className="w-5 h-5" />
          </div>
          <div className="flex-1 overflow-hidden">
            <p className="text-sm font-bold text-on-surface truncate">{doc.name}</p>
            <p className="text-[9px] text-on-surface/30 font-bold uppercase tracking-tighter">Modified: {doc.date}</p>
          </div>
          <Download className="w-4 h-4 text-on-surface/20 group-hover:text-primary" />
        </div>
      ))}

      <button className="w-full border-2 border-dashed border-primary/10 rounded-2xl p-4 text-[10px] font-bold text-primary/40 uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-white hover:text-primary transition-all">
        <Plus className="w-4 h-4" /> Upload New File
      </button>
    </div>
  );
}