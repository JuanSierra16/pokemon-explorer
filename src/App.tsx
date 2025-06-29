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
          <div className="flex gap-3">
            <button
              onClick={() => setView("table")}
              className={`px-5 py-2.5 rounded-xl font-semibold transition-all duration-300 transform border-2 cursor-pointer ${
                view === "table"
                  ? "bg-blue-600 text-white shadow-xl scale-105 border-blue-500 shadow-blue-500/30"
                  : "bg-slate-700 text-blue-300 border-slate-600 hover:bg-blue-600 hover:text-white hover:shadow-xl hover:scale-110 hover:-translate-y-1 hover:border-blue-400 hover:shadow-blue-500/50 active:scale-95"
              }`}
            >
              📊 Tabla
            </button>
            <button
              onClick={() => setView("grid")}
              className={`px-5 py-2.5 rounded-xl font-semibold transition-all duration-300 transform border-2 cursor-pointer ${
                view === "grid"
                  ? "bg-green-600 text-white shadow-xl scale-105 border-green-500 shadow-green-500/30"
                  : "bg-slate-700 text-green-300 border-slate-600 hover:bg-green-600 hover:text-white hover:shadow-xl hover:scale-110 hover:-translate-y-1 hover:border-green-400 hover:shadow-green-500/50 active:scale-95"
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
            className="px-4 py-2.5 border-2 border-slate-600 rounded-xl w-full max-w-sm bg-slate-800 text-gray-100 placeholder-slate-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-400 hover:border-slate-500 transition-all duration-300 focus:shadow-lg focus:shadow-blue-500/20"
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
