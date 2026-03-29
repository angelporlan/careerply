import SearchInput from "@/components/SearchInput";
import StatusFilter from "@/components/applications/StatusFilter";
import ApplicationRow from "@/components/applications/ApplicationRow";
import EfficiencyCard from "@/components/applications/EfficiencyCard";
import PromoBanner from "@/components/applications/PromoBanner";
import { CalendarDays } from "lucide-react";
import ActionButton from "@/components/ActionButton";

export default function ApplicationsPage() {
  return (
    <div className="p-10 max-w-[1440px] mx-auto bg-surface min-h-screen">
      
      {/* 1. Buscador Superior */}
      <SearchInput />

      {/* 2. Header & Filters */}
      <div className="flex justify-between items-start mb-12">
        <div>
          <h1 className="text-5xl font-extrabold text-on-surface tracking-tightest mb-4">
            Applications
          </h1>
          <p className="text-on-surface/50 font-medium text-lg">
            Managing 24 active recruitment processes.
          </p>
        </div>
        
        <div className="flex flex-col items-end gap-6">
          <div className="flex gap-4">
            <StatusFilter />
            <button className="flex items-center gap-3 bg-surface-container-low px-6 py-2.5 rounded-2xl text-[10px] font-extrabold text-on-surface/60 tracking-widest uppercase cursor-pointer hover:bg-surface-container-high transition-colors">
              <CalendarDays className="w-4 h-4" />
              Last 30 Days
            </button>
          </div>
        <ActionButton 
          label="Add New Application" 
          showPlus={true} 
          href="/applications/new"
        />
        </div>
      </div>

      {/* 3. Lista de Aplicaciones (Contenedor Editorial) */}
      <div className="bg-surface-container-low rounded-4xl p-6 mb-10 shadow-sm">
        {/* Header de la "Tabla" */}
        <div className="grid grid-cols-12 px-4 mb-4 text-[10px] font-extrabold text-on-surface/30 tracking-widest uppercase">
          <div className="col-span-4">Company</div>
          <div className="col-span-3">Position</div>
          <div className="col-span-2">Date</div>
          <div className="col-span-2">Status</div>
          <div className="col-span-1 text-right">Actions</div>
        </div>

        {/* Filas */}
        <div className="space-y-2">
          <ApplicationRow 
            company="Stellar Systems" location="Palo Alto, CA" 
            position="Senior Product Designer" type="Design • Full-time"
            date="Oct 24, 2023" status="OFFER" iconBg="bg-indigo-600"
          />
          <ApplicationRow 
            company="Lumina AI" location="Remote" 
            position="Frontend Lead" type="Engineering • Contract"
            date="Oct 22, 2023" status="INTERVIEW" iconBg="bg-blue-500"
          />
          <ApplicationRow 
            company="Cirrus Data" location="London, UK" 
            position="UX Researcher" type="Design • Full-time"
            date="Oct 20, 2023" status="SENT" iconBg="bg-teal-500"
          />
          <ApplicationRow 
            company="GreenRoot" location="Austin, TX" 
            position="Creative Director" type="Marketing • Full-time"
            date="Oct 18, 2023" status="REJECTED" iconBg="bg-rose-500"
          />
        </div>

        {/* Paginación Sencilla */}
        <div className="mt-8 flex justify-between items-center px-4">
          <p className="text-xs font-bold text-on-surface/30 uppercase tracking-widest">
            Showing <span className="text-on-surface">1-10</span> of 24 applications
          </p>
          <div className="flex gap-2">
            {[1, 2, 3].map(n => (
              <button key={n} className={`w-8 h-8 rounded-lg text-xs font-bold transition-all cursor-pointer ${n === 1 ? 'bg-primary text-white shadow-lg' : 'bg-surface-container-lowest text-on-surface/40 hover:bg-surface-container-high'}`}>
                {n}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 4. Footer Widgets */}
      <div className="grid grid-cols-12 gap-10 mt-10">
        <div className="col-span-4">
          <EfficiencyCard />
        </div>
        <div className="col-span-8">
          <PromoBanner />
        </div>
      </div>

    </div>
  );
}