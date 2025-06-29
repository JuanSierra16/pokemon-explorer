import type { Pokemon } from "../types/pokemon";

interface Props {
  pokemon: Pokemon;
}

export default function PokemonCard({ pokemon }: Props) {
  return (
    <div className="border rounded-lg p-2 shadow hover:shadow-lg transition relative cursor-pointer">
      <span className="absolute top-1 left-2 text-xs font-bold text-gray-500">#{pokemon.id}</span>
      <img
        src={pokemon.sprites.front_default}
        alt={pokemon.name}
        className="mx-auto w-20 h-20"
      />
      <p className="text-center mt-2 font-semibold capitalize">{pokemon.name}</p>
    </div>
  );
}
