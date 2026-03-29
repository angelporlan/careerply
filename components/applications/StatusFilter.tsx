export default function StatusFilter() {
  const filters = ["SENT", "INTERVIEW", "OFFER", "REJECTED"];
  
  return (
    <div className="flex items-center gap-3 bg-surface-container-low p-1.5 rounded-2xl w-fit">
      {filters.map((filter) => (
        <button 
          key={filter}
          className={`px-6 py-2.5 rounded-xl text-[10px] font-extrabold tracking-widest transition-all cursor-pointer
            ${filter === 'SENT' 
              ? 'bg-surface-container-lowest text-primary shadow-sm' 
              : 'text-on-surface/40 hover:text-on-surface'}`}
        >
          {filter}
        </button>
      ))}
    </div>
  );
}