import { useEffect, useState } from "react";
import axios from "axios";
import type { Pokemon } from "../types/pokemon";

export default function usePokemonData() {
  const [pokemonList, setPokemonList] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("https://pokeapi.co/api/v2/pokemon?limit=151");
        const urls = res.data.results.map((p: { url: string }) => p.url);
        const responses = await Promise.all(urls.map((url: string) => axios.get(url)));
        setPokemonList(responses.map((r) => r.data));
      } catch (error) {
        console.error("Error al cargar Pokémon:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { pokemonList, loading };
}
