"use client";

import SearchInput from "@/components/SearchInput";
import ActionButton from "@/components/ActionButton";
import LibraryStatCard from "@/components/cv-library/LibraryStatCard";
import CVCard from "@/components/cv-library/CVCard";
import { FileText, Activity, History, Plus } from "lucide-react";

export default function CVLibraryPage() {
  return (
    <div className="p-10 max-w-[1440px] mx-auto bg-surface min-h-screen">
          <SearchInput />
      
      {/* Header Section */}
      <div className="flex justify-between items-start mb-12">
        <div>
          <h1 className="text-5xl font-extrabold text-on-surface tracking-tightest mb-4">CV Library</h1>
          <p className="text-on-surface/50 font-medium text-lg max-w-xl">
            Manage your professional identities. Tailor your narrative for every opportunity in your curated collection.
          </p>
        </div>
        
        <div className="flex flex-col items-end gap-6">
          {/* Usamos el ActionButton que creamos antes con estilo personalizado */}
          <ActionButton label="Upload New CV" showPlus variant="primary" />
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-3 gap-8 mb-16">
        <LibraryStatCard label="Total Documents" value="08" icon={FileText} />
        <LibraryStatCard label="Active Usage" value="42" subValue="Applications" icon={Activity} />
        <LibraryStatCard label="Last Uploaded" value="2 Days Ago" icon={History} />
      </div>

      {/* CV Grid */}
      <div className="grid grid-cols-4 gap-8">
        <CVCard fileName="Senior_UI_Designer_C..." date="Oct 12, 2023" usageCount={12} />
        <CVCard fileName="Product_Strategist_Re..." date="Sep 28, 2023" usageCount={5} />
        <CVCard fileName="UX_Researcher_V2.pdf" date="Aug 15, 2023" usageCount={21} />
        <CVCard fileName="Marketing_Lead_Exec..." date="Jul 02, 2023" usageCount={0} />
        {/* Más tarjetas... */}
      </div>

    </div>
  );
}