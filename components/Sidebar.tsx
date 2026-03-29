import Link from 'next/link';
import { 
  LayoutGrid, 
  Briefcase, 
  FileText, 
  Settings, 
  HelpCircle, 
  LogOut 
} from 'lucide-react';

export default function Sidebar() {
  return (
    <aside className="w-[280px] h-screen flex flex-col bg-surface px-6 py-8 sticky top-0 border-none">
      
      {/* Header / Logo - Siguiendo "Editorial Authority" */}
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
        {/* Item Activo - Usando Surface Hierarchy */}
        <Link 
          href="/dashboard" 
          className="flex items-center gap-4 px-4 py-3 text-primary bg-surface-container-lowest rounded-md font-semibold relative shadow-sm shadow-on-surface/5"
        >
          <LayoutGrid className="w-5 h-5" />
          <span className="text-sm">Dashboard</span>
          {/* Indicador sutil lateral sin ser una línea agresiva */}
          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-5 bg-primary rounded-r-full"></div>
        </Link>

        {/* Items Inactivos - Usando On-Surface con Opacidad */}
        <Link 
          href="/applications" 
          className="flex items-center gap-4 px-4 py-3 text-on-surface/60 hover:text-on-surface hover:bg-surface-container-high rounded-md transition-all group"
        >
          <Briefcase className="w-5 h-5 group-hover:scale-110 transition-transform" />
          <span className="text-sm font-medium">Applications</span>
        </Link>

        <Link 
          href="/cv-library" 
          className="flex items-center gap-4 px-4 py-3 text-on-surface/60 hover:text-on-surface hover:bg-surface-container-high rounded-md transition-all group"
        >
          <FileText className="w-5 h-5 group-hover:scale-110 transition-transform" />
          <span className="text-sm font-medium">CV Library</span>
        </Link>

        <Link 
          href="/settings" 
          className="flex items-center gap-4 px-4 py-3 text-on-surface/60 hover:text-on-surface hover:bg-surface-container-high rounded-md transition-all group"
        >
          <Settings className="w-5 h-5 group-hover:scale-110 transition-transform" />
          <span className="text-sm font-medium">Settings</span>
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
          <button 
            className="flex items-center gap-4 px-4 py-2 text-on-surface/50 hover:text-status-rejected-text transition-colors w-full text-left"
          >
            <LogOut className="w-4 h-4" />
            <span className="text-xs font-medium uppercase tracking-widest">Sign Out</span>
          </button>
        </div>

        {/* Tarjeta de Perfil - Estilo "Sheet of Fine Paper" */}
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