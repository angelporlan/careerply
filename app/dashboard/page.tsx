import { Search, Send, Calendar, PartyPopper } from "lucide-react";
import StatCard from "@/components/dashboard/StatCard";
import RecentUpdateItem from "@/components/dashboard/RecentUpdateItem";

export default function DashboardPage() {
  return (
    <div className="p-10 max-w-[1400px] mx-auto">
      {/* 1. Buscador Superior */}
      <div className="relative mb-12 max-w-xl">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input 
          type="text" 
          placeholder="Search applications, companies, or roles..." 
          className="w-full pl-12 pr-4 py-3 rounded-xl bg-white border-none shadow-sm text-sm focus:ring-2 focus:ring-blue-500 outline-none"
        />
      </div>

      {/* 2. Header */}
      <div className="flex justify-between items-end mb-10">
        <div>
          <h1 className="text-4xl font-extrabold text-[#1a365d] mb-2">Workspace Dashboard</h1>
          <p className="text-gray-500 font-medium">Welcome back, Alex. Your career journey is looking promising today.</p>
        </div>
        <button className="bg-[#0052cc] hover:bg-blue-700 text-white px-8 py-4 rounded-2xl font-bold flex items-center gap-2 transition-all shadow-lg shadow-blue-200">
          <span className="text-xl">+</span> Add New Application
        </button>
      </div>

      <div className="grid grid-cols-12 gap-8">
        {/* LADO IZQUIERDO (Estadísticas y Gráfico) */}
        <div className="col-span-8 space-y-8">
          <div className="grid grid-cols-3 gap-6">
            <StatCard icon={Send} label="Total Applications" value="42" badgeText="MONTH: +12%" />
            <StatCard icon={Calendar} label="Pending Interviews" value="05" badgeText="ACTIVE" />
            <StatCard icon={PartyPopper} label="Offers Received" value="02" badgeText="WINS" badgeColor="bg-purple-50 text-purple-600" />
          </div>
          
          {/* Aquí iría el ActivityChart (puedes poner un div temporal) */}
          <div className="bg-white rounded-[2.5rem] p-8 h-[400px] shadow-sm border border-gray-50">
             <h3 className="font-bold text-[#1a365d]">Weekly Activity</h3>
             {/* Espacio para el gráfico */}
          </div>
        </div>

        {/* LADO DERECHO (Recent Updates) */}
        <div className="col-span-4 space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-bold text-[#1a365d]">Recent Updates</h3>
            <button className="text-[11px] font-bold text-blue-600 tracking-widest uppercase">View All</button>
          </div>
          
          <div className="space-y-4">
            <RecentUpdateItem company="Google" status="Interview" time="2 hours ago" iconBg="bg-teal-500" />
            <RecentUpdateItem company="Stripe" status="Applied" time="Yesterday" iconBg="bg-indigo-600" />
            <RecentUpdateItem company="Atlassian" status="Official Offer" time="3 days ago" iconBg="bg-slate-800" />
          </div>
        </div>
      </div>
      
      {/* 4. Banner Inferior */}
      <div className="mt-8 bg-[#0052cc] rounded-[2.5rem] p-10 text-white relative overflow-hidden">
         <span className="bg-blue-400/30 text-[10px] font-bold px-4 py-1.5 rounded-full tracking-widest uppercase">Upcoming Event</span>
         <h2 className="text-3xl font-bold mt-4">Final Interview with Figma</h2>
         {/* ... más detalles del evento */}
      </div>
    </div>
  );
}