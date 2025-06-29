import { useState, useEffect } from "react";
import usePokemonData from "./hooks/usePokemonData";
import GridView from "./pages/GridView";
import TableView from "./pages/TableView";

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
    <div className="min-h-screen bg-slate-900 text-gray-100">
      <div className="p-4 max-w-none mx-auto px-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-white">
            Pokémon Explorer
          </h1>
        </div>

        <div className="mb-6 flex flex-col sm:flex-row gap-4 items-start sm:items-center">
          <div className="flex gap-2">
            <button
              onClick={() => setView("table")}
              className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                view === "table"
                  ? "bg-blue-600 text-white shadow-md"
                  : "bg-slate-700 text-blue-300 hover:bg-slate-600"
              }`}
            >
              📊 Tabla
            </button>
            <button
              onClick={() => setView("grid")}
              className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                view === "grid"
                  ? "bg-green-600 text-white shadow-md"
                  : "bg-slate-700 text-green-300 hover:bg-slate-600"
              }`}
            >
              🎯 Cuadrícula
            </button>
          </div>

          <input
            type="text"
            placeholder="🔍 Buscar pokémon..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="px-4 py-2 border border-slate-600 rounded-lg w-full max-w-sm bg-slate-800 text-gray-100 placeholder-slate-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
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
