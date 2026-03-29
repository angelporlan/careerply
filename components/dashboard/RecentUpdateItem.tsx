interface UpdateProps {
  company: string;
  status: string;
  time: string;
  iconBg: string; // Ejemplo: "bg-primary" o "bg-on-surface"
}

export default function RecentUpdateItem({ company, status, time, iconBg }: UpdateProps) {
  return (
    /* Surface: Container Lowest (Purity contrast) */
    <div className="flex items-center gap-5 p-5 bg-surface-container-lowest rounded-2xl transition-all border-none hover:shadow-lg hover:shadow-on-surface/5 group">
      {/* Icono de Empresa */}
      <div className={`w-12 h-12 rounded-xl ${iconBg} flex items-center justify-center text-surface-bright font-bold shadow-sm shrink-0 transition-transform group-hover:scale-110`}>
        {company[0]}
      </div>
      
      <div className="flex-1 min-w-0">
        {/* Headline-SM para nombre de empresa */}
        <h4 className="text-sm font-bold text-on-surface truncate tracking-tight">
          {company}
        </h4>
        {/* Body-MD para descripción */}
        <p className="text-xs text-on-surface/60 mt-0.5">
          Status moved to <span className="text-primary font-bold">{status}</span>
        </p>
        {/* Label-SM para el tiempo */}
        <p className="text-[9px] text-on-surface/30 mt-2 uppercase font-extrabold tracking-widest">
          {time}
        </p>
      </div>
    </div>
  );
}