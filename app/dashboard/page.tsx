export default function DashboardPage() {
  return (
    <div className="p-8">
      <div className="max-w-6xl mx-auto">
        
        {/* Cabecera del Dashboard */}
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-[#1a365d] mb-2">
              Workspace Dashboard
            </h1>
            <p className="text-gray-500">
              Welcome back, Alex. Your career journey is looking promising today.
            </p>
          </div>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-lg font-medium transition-colors">
            + Add New Application
          </button>
        </div>
        
        {/* Caja de prueba */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <p className="text-gray-600">
            ¡El layout está funcionando! A la izquierda tienes el Sidebar y aquí irá el contenido principal de tu Job Tracker.
          </p>
        </div>

      </div>
    </div>
  );
}