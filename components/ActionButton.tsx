import Link from "next/link";
import { LucideIcon } from "lucide-react";

interface ActionButtonProps {
  label: string;
  href?: string;           // Si tiene ruta, se comporta como un Link
  onClick?: () => void;    // Si no tiene ruta, se comporta como un botón normal
  icon?: LucideIcon;       // Icono opcional de Lucide
  showPlus?: boolean;      // El "+" que tienes en tu diseño
  variant?: "primary" | "secondary"; 
}

export default function ActionButton({ 
  label, 
  href, 
  onClick, 
  icon: Icon, 
  showPlus = false,
  variant = "primary" 
}: ActionButtonProps) {
  
  // Estilos base de "The Curator"
  const baseStyles = "px-8 py-4 rounded-2xl font-bold flex items-center gap-3 transition-all active:scale-95 cursor-pointer shadow-2xl";
  
  // Lógica de colores según el manual
  const variants = {
    primary: "bg-primary-gradient text-white shadow-primary/20 hover:brightness-110",
    secondary: "bg-surface-container-high text-on-surface shadow-on-surface/5 hover:bg-surface-container-highest"
  };

  const content = (
    <>
      {showPlus && <span className="text-2xl font-light leading-none">+</span>}
      {Icon && <Icon className="w-5 h-5" />}
      <span className="text-sm tracking-wide">{label}</span>
    </>
  );

  // Si el componente recibe un 'href', se renderiza como un Link de Next.js
  if (href) {
    return (
      <Link href={href} className={`${baseStyles} ${variants[variant]}`}>
        {content}
      </Link>
    );
  }

  // Si no hay href, se renderiza como un botón normal
  return (
    <button onClick={onClick} className={`${baseStyles} ${variants[variant]}`}>
      {content}
    </button>
  );
}