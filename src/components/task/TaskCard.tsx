"use client";

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

  onDelete?: () => void;
  onEdit?: () => void;
};

export function TaskCard({
  id,
  title,
  description,
  priority,
  onDelete,
  onEdit,
}: TaskCardProps) {
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
    <div
      ref={setNodeRef}
      style={style}
      className="bg-slate-800 p-4 rounded-lg"
    >
      <div
        {...listeners}
        {...attributes}
        className="cursor-grab active:cursor-grabbing"
      >
        <div className="flex items-center justify-between gap-2">
          <h4 className="font-medium">
            {title}
          </h4>

          <span
            className={`text-xs px-2 py-1 rounded-full ${getPriorityColor()}`}
          >
            {getPriorityLabel()}
          </span>
        </div>

        <p className="text-sm text-slate-300 mt-2">
          {description}
        </p>
      </div>

      <div className="flex gap-2 mt-4">
        {onEdit && (
          <button
            onClick={onEdit}
            className="text-sm bg-yellow-600 hover:bg-yellow-500 px-3 py-2 rounded-lg"
          >
            Editar
          </button>
        )}

        {onDelete && (
          <button
            onClick={onDelete}
            className="text-sm bg-red-600 hover:bg-red-500 px-3 py-2 rounded-lg"
          >
            Excluir
          </button>
        )}
      </div>
    </div>
  );
}