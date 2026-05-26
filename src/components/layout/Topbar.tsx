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