"use client";

import { useDraggable } from "@dnd-kit/core";

type TaskCardProps = {
  id: number;
  title: string;
  description: string;
  onDelete?: () => void;
  onEdit?: () => void;
};

export function TaskCard({
  id,
  title,
  description,
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
        <h4 className="font-medium">
          {title}
        </h4>

        <p className="text-sm text-slate-300 mt-2">
          {description}
        </p>
      </div>

      <div className="flex gap-2 mt-4">
        {onEdit && (
          <button
            type="button"
            onClick={onEdit}
            className="text-sm bg-yellow-600 hover:bg-yellow-500 px-3 py-2 rounded-lg"
          >
            Editar
          </button>
        )}

        {onDelete && (
          <button
            type="button"
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