import DataTable, { type TableColumn } from "react-data-table-component";
import type { Pokemon } from "../types/pokemon";
import PokemonModal from "../components/PokemonModal";
import { useState, useEffect } from "react";

// Tema personalizado para DataTable en modo oscuro
const customStyles = {
  rows: {
    style: {
      backgroundColor: 'var(--table-row-bg)',
      color: 'var(--table-text-color)',
      '&:nth-of-type(odd)': {
        backgroundColor: 'var(--table-row-odd-bg)',
      },
      '&:hover': {
        backgroundColor: 'var(--table-row-hover-bg)',
      },
    },
  },
  headCells: {
    style: {
      backgroundColor: 'var(--table-header-bg)',
      color: 'var(--table-header-text)',
      fontWeight: 'bold',
    },
  },
  pagination: {
    style: {
      backgroundColor: 'var(--table-pagination-bg)',
      color: 'var(--table-pagination-text)',
    },
  },
};

interface TableViewProps {
  data: Pokemon[];
}

export default function TableView({ data }: TableViewProps) {
  const [selectedType, setSelectedType] = useState<string>("");
  const [selected, setSelected] = useState<Pokemon | null>(null);
  const [isDark, setIsDark] = useState<boolean>(false);

  // Detectar modo oscuro
  useEffect(() => {
    const checkDarkMode = () => {
      setIsDark(document.documentElement.classList.contains('dark'));
    };
    
    checkDarkMode();
    
    // Observar cambios en la clase dark
    const observer = new MutationObserver(checkDarkMode);
    observer.observe(document.documentElement, { 
      attributes: true, 
      attributeFilter: ['class'] 
    });
    
    return () => observer.disconnect();
  }, []);

  // Establecer variables CSS para el tema
  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.style.setProperty('--table-row-bg', '#1f2937');
      root.style.setProperty('--table-row-odd-bg', '#374151');
      root.style.setProperty('--table-row-hover-bg', '#4b5563');
      root.style.setProperty('--table-header-bg', '#111827');
      root.style.setProperty('--table-header-text', '#f9fafb');
      root.style.setProperty('--table-text-color', '#f9fafb');
      root.style.setProperty('--table-pagination-bg', '#1f2937');
      root.style.setProperty('--table-pagination-text', '#f9fafb');
    } else {
      root.style.setProperty('--table-row-bg', '#ffffff');
      root.style.setProperty('--table-row-odd-bg', '#f9fafb');
      root.style.setProperty('--table-row-hover-bg', '#f3f4f6');
      root.style.setProperty('--table-header-bg', '#f9fafb');
      root.style.setProperty('--table-header-text', '#1f2937');
      root.style.setProperty('--table-text-color', '#1f2937');
      root.style.setProperty('--table-pagination-bg', '#ffffff');
      root.style.setProperty('--table-pagination-text', '#1f2937');
    }
  }, [isDark]);

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
        <label className="font-semibold mr-2">Filtrar por tipo:</label>
        <select
          className="border p-2 rounded bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100 transition-colors"
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

      <PokemonModal pokemon={selected} onClose={() => setSelected(null)} />

    </div>
  );
}
