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
    <div>
      <h2 className="text-xl font-bold mb-4">Vista en Cuadrícula</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {data.map((pokemon) => (
          <div key={pokemon.id} onClick={() => setSelected(pokemon)}>
            <PokemonCard pokemon={pokemon} />
          </div>
        ))}
      </div>

      <PokemonModal pokemon={selected} onClose={() => setSelected(null)} />
    </div>
  );
}
