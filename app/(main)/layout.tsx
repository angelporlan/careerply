import Sidebar from "@/components/Sidebar";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-surface">
      {/* Sidebar fijo: Se mantiene siempre visible al navegar */}
      <Sidebar />
      
      {/* Contenido dinámico: Aquí se renderizará Dashboard o Applications */}
      <main className="flex-1 overflow-y-auto overflow-x-hidden">
        {children}
      </main>
    </div>
  );
}