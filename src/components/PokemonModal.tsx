import type { Pokemon } from "../types/pokemon";

interface Props {
  pokemon: Pokemon | null;
  onClose: () => void;
}

export default function PokemonModal({ pokemon, onClose }: Props) {
  if (!pokemon) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-lg p-6 w-[90%] max-w-md relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-black"
        >
          ✖
        </button>
        <div className="text-center">
          <img
            src={pokemon.sprites.front_default}
            alt={pokemon.name}
            className="mx-auto w-24 h-24"
          />
          <h2 className="text-2xl font-bold capitalize mt-2">{pokemon.name}</h2>
          <p className="text-sm text-gray-600">ID: {pokemon.id}</p>
          <p className="text-sm mb-2">Tipo: {pokemon.types.map(t => t.type.name).join(", ")}</p>

          <p className="text-sm">Altura: {pokemon.height / 10} m</p>
          <p className="text-sm mb-4">Peso: {pokemon.weight / 10} kg</p>

          <div className="grid grid-cols-2 gap-2 text-sm">
            {pokemon.stats.map((stat) => {
              const value = stat.base_stat;
              const isHigh = value >= 100;
              const isLow = value <= 40;

              let color = "bg-gray-200";
              if (isHigh) color = "bg-green-300";
              else if (isLow) color = "bg-red-300";

              return (
                <div
                  key={stat.stat.name}
                  className={`rounded p-2 font-semibold text-center ${color}`}
                >
                  {stat.stat.name.toUpperCase()}: {value}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
