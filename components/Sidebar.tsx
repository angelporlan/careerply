"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { signOutAction } from '@/app/(auth)/actions';
import { 
  LayoutGrid, 
  Briefcase, 
  FileText, 
  Settings, 
  HelpCircle, 
  LogOut 
} from 'lucide-react';

export default function Sidebar() {
  const pathname = usePathname();

  // Función mejorada para detectar si la ruta es activa o hija de una activa
  const isPathActive = (path: string) => {
    // Si estamos en la raíz del dashboard, comparación exacta
    if (path === '/dashboard') return pathname === '/dashboard';
    // Para el resto, si la ruta actual empieza con el path del link, está activo
    return pathname.startsWith(path);
  };

  const getLinkStyles = (path: string) => {
    const isActive = isPathActive(path);
    return `flex items-center gap-4 px-4 py-3 rounded-md font-semibold relative transition-all group
      ${isActive 
        ? 'text-primary bg-surface-container-lowest shadow-sm shadow-on-surface/5' 
        : 'text-on-surface/60 hover:text-on-surface hover:bg-surface-container-high'}`;
  };

  return (
    <aside className="w-[280px] h-screen flex flex-col bg-surface-container-low px-6 py-8 sticky top-0 border-none shrink-0">
      
      {/* Header / Logo */}
      <div className="mb-12">
        <h1 className="text-2xl font-extrabold text-on-surface tracking-tightest">
          The Curator
        </h1>
        <p className="text-[10px] font-bold text-on-surface/40 tracking-widest mt-1 uppercase">
          Premium Workspace
        </p>
      </div>

      {/* Navegación Principal */}
      <nav className="flex-1 space-y-2 relative">
        
        {/* Dashboard */}
        <Link href="/dashboard" className={getLinkStyles('/dashboard')}>
          <LayoutGrid className="w-5 h-5" />
          <span className="text-sm">Dashboard</span>
          {isPathActive('/dashboard') && (
            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-5 bg-primary rounded-r-full"></div>
          )}
        </Link>

        {/* Applications (Se mantendrá activo en /applications/new, etc.) */}
        <Link href="/applications" className={getLinkStyles('/applications')}>
          <Briefcase className="w-5 h-5" />
          <span className="text-sm">Applications</span>
          {isPathActive('/applications') && (
            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-5 bg-primary rounded-r-full"></div>
          )}
        </Link>

        {/* CV Library */}
        <Link href="/cv-library" className={getLinkStyles('/cv-library')}>
          <FileText className="w-5 h-5" />
          <span className="text-sm">CV Library</span>
          {isPathActive('/cv-library') && (
            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-5 bg-primary rounded-r-full"></div>
          )}
        </Link>

        {/* Settings */}
        <Link href="/settings" className={getLinkStyles('/settings')}>
          <Settings className="w-5 h-5" />
          <span className="text-sm">Settings</span>
          {isPathActive('/settings') && (
            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-5 bg-primary rounded-r-full"></div>
          )}
        </Link>
      </nav>

      {/* Sección Inferior */}
      <div className="mt-auto">
        <div className="space-y-1 mb-6">
          <Link 
            href="/help" 
            className="flex items-center gap-4 px-4 py-2 text-on-surface/50 hover:text-on-surface transition-colors"
          >
            <HelpCircle className="w-4 h-4" />
            <span className="text-xs font-medium uppercase tracking-widest">Help</span>
          </Link>
          <form action={signOutAction}>
            <button 
              type="submit"
              className="flex items-center gap-4 px-4 py-2 text-on-surface/50 hover:text-status-rejected-text transition-colors w-full text-left cursor-pointer"
            >
              <LogOut className="w-4 h-4" />
              <span className="text-xs font-medium uppercase tracking-widest">Sign Out</span>
            </button>
          </form>
        </div>

        {/* Tarjeta de Perfil */}
        <div className="flex items-center gap-3 p-3 bg-surface-container-lowest rounded-2xl shadow-sm border-none">
          <div className="w-10 h-10 rounded-xl bg-on-surface flex items-center justify-center text-surface-bright font-bold text-sm shrink-0">
            AS
          </div>
          <div className="overflow-hidden">
            <p className="text-sm font-bold text-on-surface truncate">Alex Sterling</p>
            <p className="text-[10px] font-bold text-on-surface/40 uppercase tracking-widest truncate">Pro Account</p>
          </div>
        </div>
      </div>

    </aside>
  );
}