import DataTable, { type TableColumn } from "react-data-table-component";
import type { Pokemon } from "../types/pokemon";
import PokemonModal from "../components/PokemonModal";
import { useState } from "react";

// Tema oscuro fijo para DataTable
const customStyles = {
  rows: {
    style: {
      backgroundColor: '#334155',
      color: '#f1f5f9',
      '&:nth-of-type(odd)': {
        backgroundColor: '#475569',
      },
      '&:hover': {
        backgroundColor: '#64748b',
      },
    },
  },
  headCells: {
    style: {
      backgroundColor: '#1e293b',
      color: '#f1f5f9',
      fontWeight: 'bold',
    },
  },
  pagination: {
    style: {
      backgroundColor: '#334155',
      color: '#f1f5f9',
    },
  },
};

interface TableViewProps {
  data: Pokemon[];
}

export default function TableView({ data }: TableViewProps) {
  const [selectedType, setSelectedType] = useState<string>("");
  const [selected, setSelected] = useState<Pokemon | null>(null);

  const allTypes = Array.from(
    new Set(data.flatMap((p) => p.types.map((t) => t.type.name)))
  );

  const filteredData = selectedType
    ? data.filter((p) => p.types.some((t) => t.type.name === selectedType))
    : data;

  const columns: TableColumn<Pokemon>[] = [
    {
      name: "Imagen",
      cell: (row) => (
        <img src={row.sprites.front_default} alt={row.name} width={40} />
      ),
      sortable: false,
    },
    {
      name: "Nombre",
      selector: (row) => row.name,
      sortable: true,
      format: (row) => row.name.charAt(0).toUpperCase() + row.name.slice(1),
    },
    {
      name: "Tipo",
      selector: (row) => row.types.map((t) => t.type.name).join(", "),
      sortable: true,
    },
    {
      name: "Peso (kg)",
      selector: (row) => row.weight / 10,
      sortable: true,
    },
    {
      name: "Altura (m)",
      selector: (row) => row.height / 10,
      sortable: true,
    },
    {
      name: "Salud base",
      selector: (row) => row.stats[0].base_stat,
      sortable: true,
    },
    {
      name: "Exp base",
      selector: (row) => row.base_experience,
      sortable: true,
    },
    {
      name: "Ataque",
      selector: (row) => row.stats[1].base_stat,
      sortable: true,
    },
    {
      name: "Defensa",
      selector: (row) => row.stats[2].base_stat,
      sortable: true,
    },
    {
      name: "Atq Esp",
      selector: (row) => row.stats[3].base_stat,
      sortable: true,
    },
    {
      name: "Def Esp",
      selector: (row) => row.stats[4].base_stat,
      sortable: true,
    },
    {
      name: "Velocidad",
      selector: (row) => row.stats[5].base_stat,
      sortable: true,
    },
    {
      name: "Detalles",
      cell: (row) => (
          <button
            onClick={() => setSelected(row)}
            className="px-2 py-1 bg-blue-500 text-white rounded text-xs"
          >
            Ver detalles
          </button>
      ), 
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    },
  ];

  return (
    <div>
      <div className="mb-4">
        <label className="font-semibold mr-2 text-white">Filtrar por tipo:</label>
        <select
          className="border border-slate-600 p-2 rounded bg-slate-800 text-gray-100 transition-colors"
          value={selectedType}
          onChange={(e) => setSelectedType(e.target.value)}
        >
          <option value="">Todos</option>
          {allTypes.sort().map((type) => (
            <option key={type} value={type}>
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </option>
          ))}
        </select>
      </div>

      <div className="bg-slate-800 rounded-lg shadow-lg border border-slate-600 overflow-hidden">
        <DataTable
          columns={columns}
          data={filteredData}
          pagination
          paginationPerPage={10}
          highlightOnHover
          responsive
          dense
          customStyles={customStyles}
        />
      </div>

      <PokemonModal pokemon={selected} onClose={() => setSelected(null)} />
    </div>
  );
}
