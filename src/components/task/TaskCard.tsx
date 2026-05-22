"use client";

import {
  useEffect,
  useRef,
  useState,
} from "react";

import { useDraggable } from "@dnd-kit/core";

type TaskCardProps = {
  id: number;
  title: string;
  description: string;
  priority: "low" | "medium" | "high";
  assignee: string;
  dueDate: string;
  onEdit: () => void;
  onDelete: () => void;
  isDark: boolean;
};

export function TaskCard({
  id,
  title,
  description,
  priority,
  assignee,
  dueDate,
  onEdit,
  onDelete,
  isDark,
}: TaskCardProps) {
  const [menuOpen, setMenuOpen] =
    useState(false);

  const menuRef =
    useRef<HTMLDivElement>(null);

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
  } = useDraggable({
    id: id.toString(),
  });

  const style = transform
    ? {
        transform: `translate(${transform.x}px, ${transform.y}px)`,
      }
    : undefined;

  useEffect(() => {
    function handleClickOutside(
      event: MouseEvent
    ) {
      if (
        menuRef.current &&
        !menuRef.current.contains(
          event.target as Node
        )
      ) {
        setMenuOpen(false);
      }
    }

    document.addEventListener(
      "mousedown",
      handleClickOutside
    );

    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
    };
  }, []);

  function getPriorityLabel() {
    if (priority === "high") {
      return "Alta";
    }

    if (priority === "medium") {
      return "Média";
    }

    return "Baixa";
  }

  function getPriorityColor() {
    if (priority === "high") {
      return isDark
        ? "bg-red-500/20 text-red-300"
        : "bg-red-100 text-red-700";
    }

    if (priority === "medium") {
      return isDark
        ? "bg-yellow-500/20 text-yellow-300"
        : "bg-yellow-100 text-yellow-700";
    }

    return isDark
      ? "bg-green-500/20 text-green-300"
      : "bg-green-100 text-green-700";
  }

  return (
    <article
      ref={setNodeRef}
      style={style}
      className={`p-4 rounded-xl border transition shadow-sm ${
        isDark
          ? "bg-slate-800 border-slate-700 hover:border-slate-600"
          : "bg-white border-slate-300 hover:border-slate-400"
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        <div
          {...listeners}
          {...attributes}
          className="flex-1 cursor-grab active:cursor-grabbing"
        >
          <div className="flex items-center gap-2 flex-wrap">
            <h4
              className={`font-semibold ${
                isDark
                  ? "text-white"
                  : "text-slate-900"
              }`}
            >
              {title}
            </h4>

            <span
              className={`text-xs px-2 py-1 rounded-full font-medium ${getPriorityColor()}`}
            >
              {getPriorityLabel()}
            </span>
          </div>

          <p
            className={`text-sm mt-3 ${
              isDark
                ? "text-slate-300"
                : "text-slate-600"
            }`}
          >
            {description}
          </p>

          {assignee && (
            <div className="flex items-center gap-2 mt-4">
              <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-sm font-bold text-white">
                {assignee.charAt(0)}
              </div>

              <div>
                <p
                  className={`text-xs ${
                    isDark
                      ? "text-slate-400"
                      : "text-slate-500"
                  }`}
                >
                  Responsável
                </p>

                <p
                  className={`text-sm font-medium ${
                    isDark
                      ? "text-white"
                      : "text-slate-900"
                  }`}
                >
                  {assignee}
                </p>
              </div>
            </div>
          )}

          {dueDate && (
            <div className="mt-4">
              <p
                className={`text-xs ${
                  isDark
                    ? "text-slate-400"
                    : "text-slate-500"
                }`}
              >
                Prazo
              </p>

              <p
                className={`text-sm font-medium ${
                  isDark
                    ? "text-white"
                    : "text-slate-900"
                }`}
              >
                {dueDate}
              </p>
            </div>
          )}
        </div>

        <div
          className="relative"
          ref={menuRef}
        >
          <button
            onClick={() =>
              setMenuOpen((prev) => !prev)
            }
            aria-label="Abrir menu da tarefa"
            className={`w-9 h-9 rounded-lg flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-blue-500 transition ${
              isDark
                ? "hover:bg-slate-700 text-white"
                : "hover:bg-slate-200 text-slate-700"
            }`}
          >
            ⋮
          </button>

          {menuOpen && (
            <div
              className={`absolute right-0 mt-2 w-40 rounded-xl shadow-xl overflow-hidden z-50 border ${
                isDark
                  ? "bg-slate-900 border-slate-700"
                  : "bg-white border-slate-300"
              }`}
            >
              {onEdit && (
                <button
                  onClick={() => {
                    onEdit();
                    setMenuOpen(false);
                  }}
                  className={`w-full text-left px-4 py-3 text-sm transition ${
                    isDark
                      ? "hover:bg-slate-800 text-white"
                      : "hover:bg-slate-100 text-slate-800"
                  }`}
                >
                  Editar
                </button>
              )}

              {onDelete && (
                <button
                  onClick={() => {
                    onDelete();
                    setMenuOpen(false);
                  }}
                  className={`w-full text-left px-4 py-3 text-sm transition ${
                    isDark
                      ? "hover:bg-slate-800 text-red-400"
                      : "hover:bg-red-50 text-red-600"
                  }`}
                >
                  Excluir
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </article>
  );
}