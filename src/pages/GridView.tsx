import { useState } from "react";
import type { Pokemon } from "../types/pokemon";
import PokemonCard from "../components/PokemonCard";
import PokemonModal from "../components/PokemonModal";

interface GridViewProps {
  data: Pokemon[];
}

export default function GridView({ data }: GridViewProps) {
  const [selected, setSelected] = useState<Pokemon | null>(null);

  return (
    <div className="w-full">
      <h2 className="text-xl font-bold mb-6 text-white">
        Vista en Cuadrícula
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
        {data.map((pokemon) => (
          <div key={pokemon.id} onClick={() => setSelected(pokemon)} className="cursor-pointer">
            <PokemonCard pokemon={pokemon} />
          </div>
        ))}
      </div>

      {data.length === 0 && (
        <div className="text-center py-12">
          <p className="text-slate-400 text-lg">
            No se encontraron pokémon 😕
          </p>
        </div>
      )}

      <PokemonModal pokemon={selected} onClose={() => setSelected(null)} />
    </div>
  );
}
