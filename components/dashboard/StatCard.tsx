import { LucideIcon } from "lucide-react";

interface StatCardProps {
  icon: LucideIcon;
  label: string;
  value: string | number;
  badgeText: string;
  badgeColor?: string; // Ahora usaremos clases de nuestro status system
}

export default function StatCard({ 
  icon: Icon, 
  label, 
  value, 
  badgeText, 
  badgeColor = "bg-status-interview-bg text-status-interview-text" 
}: StatCardProps) {
  return (
    /* Surface Hierarchy: surface-container-lowest (Blanco Puro) sobre el fondo surface */
    <div className="bg-surface-container-lowest p-8 rounded-4xl shadow-sm border-none flex flex-col gap-6 relative overflow-hidden transition-transform hover:scale-[1.02]">
      <div className="flex justify-between items-start">
        {/* Icono con fondo tonal suave */}
        <div className="p-3 bg-surface-container-low rounded-xl text-primary">
          <Icon className="w-6 h-6" />
        </div>
        {/* Badge siguiendo las Labels del manual */}
        <span className={`text-[10px] font-bold px-3 py-1 rounded-full tracking-widest uppercase ${badgeColor}`}>
          {badgeText}
        </span>
      </div>
      
      <div>
        {/* Labels: All-caps con tracking widest */}
        <p className="text-[10px] font-bold text-on-surface/40 tracking-widest uppercase">
          {label}
        </p>
        {/* Display: Big Numbers con tracking tightest */}
        <p className="text-6xl font-extrabold text-on-surface tracking-tightest mt-1">
          {value}
        </p>
      </div>
    </div>
  );
}