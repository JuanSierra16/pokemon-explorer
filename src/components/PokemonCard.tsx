import type { Pokemon } from "../types/pokemon";

interface Props {
  pokemon: Pokemon;
}

export default function PokemonCard({ pokemon }: Props) {
  return (
    <div className="border-2 border-slate-600 rounded-xl p-4 shadow-lg shadow-slate-900/40 hover:shadow-2xl hover:shadow-slate-900/80 transition-all duration-300 relative cursor-pointer bg-slate-800 hover:scale-110 hover:border-blue-400 hover:-translate-y-2 active:scale-95 group">
      <span className="absolute top-2 left-3 text-xs font-bold text-slate-400 group-hover:text-blue-300 transition-colors duration-300">
        #{pokemon.id}
      </span>
      <img
        src={pokemon.sprites.front_default}
        alt={pokemon.name}
        className="mx-auto w-20 h-20 drop-shadow-lg group-hover:drop-shadow-2xl transition-all duration-300 group-hover:scale-110"
      />
      <p className="text-center mt-2 font-semibold capitalize text-gray-200 group-hover:text-white transition-colors duration-300">
        {pokemon.name}
      </p>
    </div>
  );
}
