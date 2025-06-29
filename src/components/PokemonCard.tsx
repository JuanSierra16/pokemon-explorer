import type { Pokemon } from "../types/pokemon";

interface Props {
  pokemon: Pokemon;
}

export default function PokemonCard({ pokemon }: Props) {
  return (
    <div className="border border-slate-600 rounded-lg p-4 shadow-lg shadow-slate-900/40 hover:shadow-xl hover:shadow-slate-900/60 transition-all duration-300 relative cursor-pointer bg-slate-800 hover:scale-105 hover:border-slate-500">
      <span className="absolute top-2 left-3 text-xs font-bold text-slate-400">
        #{pokemon.id}
      </span>
      <img
        src={pokemon.sprites.front_default}
        alt={pokemon.name}
        className="mx-auto w-20 h-20 drop-shadow-lg"
      />
      <p className="text-center mt-2 font-semibold capitalize text-gray-200">
        {pokemon.name}
      </p>
    </div>
  );
}
