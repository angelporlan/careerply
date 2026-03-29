import Link from "next/link";
import { LucideIcon } from "lucide-react";

interface ActionButtonProps {
  label: string;
  href?: string;
  onClick?: () => void;
  icon?: LucideIcon;
  showPlus?: boolean;
  // Añadimos 'ghost' para el estilo de Cancel
  variant?: "primary" | "secondary" | "ghost"; 
  type?: "button" | "submit"; // Útil para formularios
}

export default function ActionButton({ 
  label, 
  href, 
  onClick, 
  icon: Icon, 
  showPlus = false,
  variant = "primary",
  type = "button"
}: ActionButtonProps) {
  
  // Estilos base
  const baseStyles = "px-8 py-4 rounded-full font-bold flex items-center gap-3 transition-all active:scale-95 cursor-pointer whitespace-nowrap";
  
  // Lógica de variantes según el manual de "The Curator"
  const variants = {
    // El botón azul con gradiente y sombra profunda
    primary: "bg-primary-gradient text-white shadow-2xl shadow-primary/30 hover:brightness-110",
    
    // Un botón gris suave para acciones secundarias
    secondary: "bg-surface-container-high text-on-surface hover:bg-surface-container-highest",
    
    // El botón "Cancel": Sin fondo, texto con opacidad, ideal para ir al lado del primary
    ghost: "bg-transparent text-on-surface/40 hover:text-on-surface px-4 shadow-none" 
  };

  const content = (
    <>
      {showPlus && <span className="text-xl font-light leading-none">+</span>}
      {Icon && <Icon className="w-5 h-5" />}
      <span className="text-sm tracking-wide">{label}</span>
    </>
  );

  if (href) {
    return (
      <Link href={href} className={`${baseStyles} ${variants[variant]}`}>
        {content}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} className={`${baseStyles} ${variants[variant]}`}>
      {content}
    </button>
  );
}