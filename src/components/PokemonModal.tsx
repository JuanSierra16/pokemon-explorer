import type { Pokemon } from "../types/pokemon";

interface Props {
  pokemon: Pokemon | null;
  onClose: () => void;
}

export default function PokemonModal({ pokemon, onClose }: Props) {
  if (!pokemon) return null;

  return (
    <div 
      className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div 
        className="bg-slate-800 rounded-xl shadow-2xl p-6 w-full max-w-md relative border border-slate-600 transition-all duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center text-slate-400 hover:text-white hover:bg-slate-700 rounded-full transition-colors"
        >
          ✖
        </button>
        <div className="text-center">
          <img
            src={pokemon.sprites.front_default}
            alt={pokemon.name}
            className="mx-auto w-28 h-28 drop-shadow-lg"
          />
          <h2 className="text-2xl font-bold capitalize mt-3 text-white">
            {pokemon.name}
          </h2>
          <p className="text-sm text-slate-400 mb-1">
            ID: #{pokemon.id}
          </p>
          <div className="flex justify-center gap-2 mb-4">
            {pokemon.types.map(t => (
              <span 
                key={t.type.name}
                className="px-3 py-1 rounded-full text-xs font-medium bg-blue-900/40 text-blue-300 border border-blue-800"
              >
                {t.type.name}
              </span>
            ))}
          </div>

          <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
            <div className="bg-slate-700 rounded-lg p-3">
              <p className="font-medium text-slate-300">Altura</p>
              <p className="text-lg font-bold text-white">
                {pokemon.height / 10} m
              </p>
            </div>
            <div className="bg-slate-700 rounded-lg p-3">
              <p className="font-medium text-slate-300">Peso</p>
              <p className="text-lg font-bold text-white">
                {pokemon.weight / 10} kg
              </p>
            </div>
          </div>

          <h3 className="text-lg font-semibold mb-3 text-white">
            Estadísticas Base
          </h3>
          <div className="grid grid-cols-2 gap-2 text-sm">
            {pokemon.stats.map((stat) => {
              const value = stat.base_stat;
              const isHigh = value >= 100;
              const isLow = value <= 40;

              let colorClasses = "bg-slate-600 text-slate-300";
              if (isHigh) colorClasses = "bg-green-900/40 text-green-300";
              else if (isLow) colorClasses = "bg-red-900/40 text-red-300";

              return (
                <div
                  key={stat.stat.name}
                  className={`rounded-lg p-2 font-semibold text-center transition-colors ${colorClasses}`}
                >
                  <div className="text-xs opacity-75 mb-1">
                    {stat.stat.name.replace('-', ' ').toUpperCase()}
                  </div>
                  <div className="text-lg font-bold">{value}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
