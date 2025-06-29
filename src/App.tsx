import { useState, useEffect } from "react";
import usePokemonData from "./hooks/usePokemonData";
import GridView from "./pages/GridView";
import TableView from "./pages/TableView";
import ThemeToggle from "./components/ThemeToggle";

function App() {
  const { pokemonList, loading } = usePokemonData();
  const [view, setView] = useState<"grid" | "table">(() => {
    return (localStorage.getItem("pokemon_view") as "grid" | "table") || "grid";
  });
  const [searchTerm, setSearchTerm] = useState<string>("");

  useEffect(() => {
    localStorage.setItem("pokemon_view", view);
  }, [view]);

  if (loading) return <p className="p-4 text-lg">Cargando Pokémon...</p>;

  const filteredList = pokemonList.filter((pokemon) =>
    pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">
      <div className="p-4">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">Pokémon Explorer</h1>
          <ThemeToggle />
        </div>

        <div className="mb-4 space-x-2">
          <button
            onClick={() => setView("table")}
            className={`px-4 py-2 rounded transition-colors ${
              view === "table"
                ? "bg-blue-600 text-white dark:bg-blue-500"
                : "bg-blue-200 dark:bg-blue-800 text-blue-800 dark:text-blue-200"
            }`}
          >
            Tabla
          </button>
          <button
            onClick={() => setView("grid")}
            className={`px-4 py-2 rounded transition-colors ${
              view === "grid"
                ? "bg-green-600 text-white dark:bg-green-500"
                : "bg-green-200 dark:bg-green-800 text-green-800 dark:text-green-200"
            }`}
          >
            Cuadrícula
          </button>

          <input
            type="text"
            placeholder="Buscar por nombre..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="px-3 py-2 border rounded w-full max-w-sm bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 transition-colors"
          />
        </div>

        {view === "grid" ? (
          <GridView data={filteredList} />
        ) : (
          <TableView data={filteredList} />
        )}
      </div>
    </div>
  );
}

export default App;
