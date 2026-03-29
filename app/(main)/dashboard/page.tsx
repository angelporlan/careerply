import { Send, Calendar, PartyPopper } from "lucide-react";
import StatCard from "@/components/dashboard/StatCard";
import RecentUpdateItem from "@/components/dashboard/RecentUpdateItem";
import SearchInput from "@/components/SearchInput";

export default function DashboardPage() {
  return (
    /* Surface: fondo base de la app */
    <div className="p-10 max-w-360 mx-auto bg-surface min-h-screen">
      
      <SearchInput />
    
      {/* 2. Header (Embrace Asymmetry) */}
      <div className="flex justify-between items-end mb-12">
        <div>
          {/* Display-LG con tracking tightest */}
          <h1 className="text-5xl font-extrabold text-on-surface tracking-tightest mb-3">
            Workspace Dashboard
          </h1>
          <p className="text-on-surface/50 font-medium text-lg">
            Welcome back, Alex. Your career journey is looking promising today.
          </p>
        </div>
        
        {/* Botón con Signature Texture (Gradient + Shadow) */}
        <button className="bg-primary-gradient hover:brightness-110 text-white px-10 py-5 rounded-2xl font-bold flex items-center gap-3 transition-all shadow-2xl shadow-primary/20 active:scale-95">
          <span className="text-2xl font-light">+</span> 
          <span className="text-sm tracking-wide">Add New Application</span>
        </button>
      </div>

      <div className="grid grid-cols-12 gap-10">
        
        {/* LADO IZQUIERDO: Estadísticas y Actividad */}
        <div className="col-span-8 space-y-10">
          <div className="grid grid-cols-3 gap-8">
            <StatCard 
              icon={Send} 
              label="Total Applications" 
              value="42" 
              badgeText="MONTH: +12%" 
            />
            <StatCard 
              icon={Calendar} 
              label="Pending Interviews" 
              value="05" 
              badgeText="ACTIVE" 
            />
            <StatCard 
              icon={PartyPopper} 
              label="Offers Received" 
              value="02" 
              badgeText="WINS" 
              badgeColor="bg-status-offer-bg text-status-offer-text" 
            />
          </div>
          
          {/* Activity Chart Container (Surface Container Low) */}
          <div className="bg-surface-container-low rounded-4xl p-10 h-112.5 relative overflow-hidden shadow-sm">
             <div className="flex justify-between items-center mb-8">
                <h3 className="font-bold text-on-surface text-xl tracking-tight">Weekly Activity</h3>
                <div className="flex gap-4 items-center">
                   <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-primary"></div>
                      <span className="text-[10px] font-bold text-on-surface/40 uppercase tracking-widest">Applications</span>
                   </div>
                </div>
             </div>
             {/* Aquí inyectaremos el gráfico de Recharts pronto */}
             <div className="absolute inset-0 flex items-center justify-center text-on-surface/10 font-bold text-lg">
                Chart Visualization Space
             </div>
          </div>
        </div>

        {/* LADO DERECHO: Recent Updates */}
        <div className="col-span-4 space-y-8">
          <div className="flex justify-between items-center px-2">
            <h3 className="text-xl font-bold text-on-surface tracking-tight">Recent Updates</h3>
            <button className="text-[10px] font-extrabold text-primary tracking-widest uppercase hover:underline underline-offset-4">
               View All
            </button>
          </div>
          
          <div className="space-y-5">
            <RecentUpdateItem company="Google" status="Interview" time="2 hours ago" iconBg="bg-[#4285F4]" />
            <RecentUpdateItem company="Stripe" status="Applied" time="Yesterday" iconBg="bg-[#635BFF]" />
            <RecentUpdateItem company="Atlassian" status="Official Offer" time="3 days ago" iconBg="bg-on-surface" />
          </div>
        </div>
      </div>
      
      {/* 4. Upcoming Event Banner (The Glass & Gradient Rule) */}
      <div className="mt-12 bg-primary-gradient rounded-4xl p-12 text-white relative overflow-hidden shadow-2xl shadow-primary/30">
         {/* Decoración abstracta de fondo */}
         <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full -mr-20 -mt-20 blur-3xl"></div>
         
         <div className="relative z-10 flex justify-between items-center">
            <div>
               <span className="bg-white/20 backdrop-blur-md text-[10px] font-bold px-5 py-2 rounded-full tracking-widest uppercase border border-white/10">
                  Upcoming Event
               </span>
               <h2 className="text-4xl font-extrabold mt-6 tracking-tightest">Final Interview with Figma</h2>
               <p className="text-white/70 mt-2 font-medium">Design Systems Team • March 30, 2026 at 10:00 AM</p>
            </div>
            <button className="bg-white text-primary px-8 py-4 rounded-2xl font-bold hover:bg-surface transition-colors shadow-xl">
               Prepare Notes
            </button>
         </div>
      </div>
    </div>
  );
}