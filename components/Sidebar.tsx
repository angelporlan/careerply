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
    <aside className="w-[280px] h-screen flex flex-col bg-[#fcfdfd] border-r border-gray-100 px-6 py-8 sticky top-0">
      
      {/* Header / Logo */}
      <div className="mb-12">
        <h1 className="text-2xl font-extrabold text-[#1a365d] tracking-tight">
          The Curator
        </h1>
        <p className="text-[11px] font-bold text-gray-400 tracking-widest mt-1">
          PREMIUM WORKSPACE
        </p>
      </div>

      {/* Navegación Principal */}
      <nav className="flex-1 space-y-2 relative">
        {/* Item Activo */}
        <Link 
          href="/dashboard" 
          className="flex items-center gap-4 px-3 py-3 text-blue-600 bg-blue-50/50 rounded-lg font-semibold relative"
        >
          <LayoutGrid className="w-5 h-5" />
          Dashboard
          {/* Indicador curvo derecho del item activo */}
          <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-blue-600 rounded-l-full"></div>
        </Link>

        {/* Items Inactivos */}
        <Link 
          href="/applications" 
          className="flex items-center gap-4 px-3 py-3 text-gray-500 hover:text-gray-900 hover:bg-gray-50 rounded-lg font-medium transition-colors"
        >
          <Briefcase className="w-5 h-5" />
          Applications
        </Link>

        <Link 
          href="/cv-library" 
          className="flex items-center gap-4 px-3 py-3 text-gray-500 hover:text-gray-900 hover:bg-gray-50 rounded-lg font-medium transition-colors"
        >
          <FileText className="w-5 h-5" />
          CV Library
        </Link>

        <Link 
          href="/settings" 
          className="flex items-center gap-4 px-3 py-3 text-gray-500 hover:text-gray-900 hover:bg-gray-50 rounded-lg font-medium transition-colors"
        >
          <Settings className="w-5 h-5" />
          Settings
        </Link>
      </nav>

      {/* Sección Inferior */}
      <div className="mt-auto">
        <div className="space-y-1 mb-6">
          <Link 
            href="/help" 
            className="flex items-center gap-4 px-3 py-2 text-gray-500 hover:text-gray-900 font-medium transition-colors"
          >
            <HelpCircle className="w-5 h-5" />
            Help
          </Link>
          <button 
            className="flex items-center gap-4 px-3 py-2 text-gray-500 hover:text-gray-900 font-medium transition-colors w-full text-left"
          >
            <LogOut className="w-5 h-5" />
            Sign Out
          </button>
        </div>

        {/* Tarjeta de Perfil de Usuario */}
        <div className="flex items-center gap-3 p-3 bg-white rounded-2xl shadow-[0_2px_10px_-3px_rgba(6,81,237,0.1)] border border-gray-50">
          {/* Avatar genérico (puedes cambiarlo por una etiqueta <Image> de Next.js luego) */}
          <div className="w-10 h-10 rounded-full bg-slate-900 flex items-center justify-center text-white font-bold text-sm shrink-0">
            AS
          </div>
          <div className="overflow-hidden">
            <p className="text-sm font-bold text-slate-900 truncate">Alex Sterling</p>
            <p className="text-[10px] font-medium text-gray-400 truncate">Curator Pro Account</p>
          </div>
        </div>
      </div>

    </aside>
  );
}