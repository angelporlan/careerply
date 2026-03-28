import Sidebar from "@/components/Sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-[#f8fafc]">
      {/* Sidebar fijo */}
      <Sidebar />
      
      {/* Contenido dinámico */}
      <main className="flex-1 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}