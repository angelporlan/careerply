interface InfoCardProps {
  title: string;
  children: React.ReactNode;
  icon?: React.ReactNode;
}

export default function InfoCard({ title, children, icon }: InfoCardProps) {
  return (
    <div className="bg-surface-container-low/50 p-6 rounded-3xl border-none">
      <div className="flex items-center gap-3 mb-4">
        {icon && <div className="text-on-surface">{icon}</div>}
        <h3 className="text-sm font-bold text-on-surface tracking-tight">{title}</h3>
      </div>
      <div className="text-sm text-on-surface/60 leading-relaxed font-medium">
        {children}
      </div>
    </div>
  );
}