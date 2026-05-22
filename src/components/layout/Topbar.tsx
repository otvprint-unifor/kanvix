"use client";

import {
  Plus,
  Search,
} from "lucide-react";

type TopbarProps = {
  onAddTask: () => void;
};

export function Topbar({
  onAddTask,
}: TopbarProps) {
  return (
    <header className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-8">
      <div>
        <h2 className="text-3xl font-bold text-white">
          Dashboard
        </h2>

        <p className="text-slate-400 mt-1">
          Gerencie tarefas da equipe
          em tempo real
        </p>
      </div>

      <div className="flex items-center gap-3">
        <div className="relative">
          <Search
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
          />

          <input
            type="text"
            placeholder="Buscar..."
            className="bg-slate-800 border border-slate-700 rounded-xl pl-11 pr-4 py-3 w-64 outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button
          onClick={onAddTask}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 px-5 py-3 rounded-xl font-medium transition"
        >
          <Plus size={20} />

          Nova tarefa
        </button>
      </div>
    </header>
  );
}