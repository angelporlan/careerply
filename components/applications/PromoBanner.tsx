export default function PromoBanner() {
  return (
    <div className="bg-on-surface rounded-4xl overflow-hidden relative h-full flex items-center p-12 text-white">
      {/* Imagen de fondo abstracta o decorativa */}
      <div className="absolute right-0 top-0 h-full w-1/2 bg-gradient-to-l from-primary/20 to-transparent"></div>
      
      <div className="relative z-10 max-w-md">
        <h2 className="text-4xl font-extrabold tracking-tightest leading-tight">
          Maximize your search with The Curator AI.
        </h2>
        <p className="text-white/60 mt-4 font-medium">
          Unlock personalized insights and tailored application strategies with our Pro Workspace tools.
        </p>
        <button className="mt-8 bg-white text-on-surface px-8 py-4 rounded-xl font-bold text-sm tracking-wide shadow-xl hover:bg-surface transition-colors cursor-pointer uppercase">
          Upgrade Now
        </button>
      </div>
    </div>
  );
}