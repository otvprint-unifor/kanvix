"use client";

import {
  LayoutDashboard,
  Menu,
} from "lucide-react";

import { useState } from "react";

export function Sidebar() {
  const [isOpen, setIsOpen] =
    useState(false);

  return (
    <>
      {/* Botão Mobile */}
      <button
        onClick={() =>
          setIsOpen(!isOpen)
        }
        className="fixed top-4 left-4 z-50 flex md:hidden items-center justify-center w-12 h-12 rounded-xl bg-slate-900 border border-slate-700 text-white shadow-lg"
        aria-label="Abrir menu"
      >
        <Menu size={24} />
      </button>

      {/* Overlay Mobile */}
      {isOpen && (
        <div
          onClick={() =>
            setIsOpen(false)
          }
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed md:relative z-50
          w-72 min-h-screen
          bg-slate-950
          border-r border-slate-800
          flex flex-col
          transition-transform duration-300

          ${
            isOpen
              ? "translate-x-0"
              : "-translate-x-full"
          }

          md:translate-x-0
        `}
      >
        <div className="p-6 md:p-8 border-b border-slate-800">
          <h1 className="text-4xl md:text-5xl font-bold text-blue-500">
            Kanvix
          </h1>

          <p className="text-slate-400 mt-3 text-base md:text-lg">
            Gestão inteligente de
            tarefas
          </p>
        </div>

        <nav className="flex-1 p-4 md:p-5">
          <button
            className="w-full flex items-center gap-4 px-5 py-4 rounded-2xl bg-slate-800 hover:bg-slate-700 transition text-white text-base md:text-lg"
          >
            <LayoutDashboard
              size={24}
            />

            Dashboard
          </button>
        </nav>

        <div className="p-6 text-center text-sm text-slate-500">
          © 2026 Kanvix
        </div>
      </aside>
    </>
  );
}