"use client";

import { useState } from "react";

import { useDraggable } from "@dnd-kit/core";

type TaskPriority =
  | "low"
  | "medium"
  | "high";

type TaskCardProps = {
  id: number;
  title: string;
  description: string;
  priority: TaskPriority;

  assignee?: string;

  onDelete?: () => void;
  onEdit?: () => void;
};

export function TaskCard({
  id,
  title,
  description,
  priority,
  assignee,
  onDelete,
  onEdit,
}: TaskCardProps) {
  const [menuOpen, setMenuOpen] =
    useState(false);

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
      return "bg-red-500/20 text-red-400";
    }

    if (priority === "medium") {
      return "bg-yellow-500/20 text-yellow-400";
    }

    return "bg-green-500/20 text-green-400";
  }

  return (
    <article
      ref={setNodeRef}
      style={style}
      className="bg-slate-800 p-4 rounded-xl border border-slate-700 hover:border-slate-600 transition"
    >
      <div className="flex items-start justify-between gap-3">
        <div
          {...listeners}
          {...attributes}
          className="flex-1 cursor-grab active:cursor-grabbing"
        >
          <div className="flex items-center gap-2 flex-wrap">
            <h4 className="font-semibold text-white">
              {title}
            </h4>

            <span
              className={`text-xs px-2 py-1 rounded-full ${getPriorityColor()}`}
            >
              {getPriorityLabel()}
            </span>
          </div>

          <p className="text-sm text-slate-300 mt-3">
            {description}
          </p>

          {assignee && (
            <div className="flex items-center gap-2 mt-4">
              <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-sm font-bold">
                {assignee.charAt(0)}
              </div>

              <div>
                <p className="text-xs text-slate-400">
                  Responsável
                </p>

                <p className="text-sm text-white">
                  {assignee}
                </p>
              </div>
            </div>
          )}
        </div>

        <div className="relative">
          <button
            onClick={() =>
              setMenuOpen(!menuOpen)
            }
            aria-label="Abrir menu da tarefa"
            className="w-9 h-9 rounded-lg hover:bg-slate-700 flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            ⋮
          </button>

          {menuOpen && (
            <div className="absolute right-0 mt-2 w-40 bg-slate-900 border border-slate-700 rounded-xl shadow-lg overflow-hidden z-50">
              {onEdit && (
                <button
                  onClick={() => {
                    onEdit();
                    setMenuOpen(false);
                  }}
                  className="w-full text-left px-4 py-3 hover:bg-slate-800 text-sm transition"
                >
                  Editar
                </button>
              )}

              {onDelete && (
                <button
                  onClick={() => {
                    const confirmed =
                      confirm(
                        "Deseja realmente excluir esta tarefa?"
                      );

                    if (confirmed) {
                      onDelete();
                    }

                    setMenuOpen(false);
                  }}
                  className="w-full text-left px-4 py-3 hover:bg-slate-800 text-sm text-red-400 transition"
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