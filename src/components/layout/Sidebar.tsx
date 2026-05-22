"use client";

import {
  LayoutDashboard,
} from "lucide-react";

export function Sidebar() {
  return (
    <aside className="w-72 min-h-screen bg-slate-950 border-r border-slate-800 flex flex-col">
      <div className="p-8 border-b border-slate-800">
        <h1 className="text-5xl font-bold text-blue-500">
          Kanvix
        </h1>

        <p className="text-slate-400 mt-3 text-lg">
          Gestão inteligente de tarefas
        </p>
      </div>

      <nav className="flex-1 p-5">
        <button
          className="w-full flex items-center gap-4 px-5 py-4 rounded-2xl bg-slate-800 text-white text-lg"
        >
          <LayoutDashboard size={24} />

          Dashboard
        </button>
      </nav>

      <div className="p-6 text-center text-sm text-slate-500">
        © 2026 Kanvix
      </div>
    </aside>
  );
}