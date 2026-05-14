"use client";

import { useDraggable } from "@dnd-kit/core";

type TaskCardProps = {
  id: number;
  title: string;
  description: string;
  onDelete?: () => void;
};

export function TaskCard({
  id,
  title,
  description,
  onDelete,
}: TaskCardProps) {
  const { attributes, listeners, setNodeRef, transform } =
    useDraggable({
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
      {...listeners}
      {...attributes}
      className="bg-slate-800 p-4 rounded-lg cursor-grab active:cursor-grabbing"
    >
      <h4 className="font-medium">
        {title}
      </h4>

      <p className="text-sm text-slate-400 mt-2">
        {description}
      </p>

      {onDelete && (
        <button
          onClick={onDelete}
          className="mt-4 text-sm bg-red-600 hover:bg-red-500 px-3 py-2 rounded-lg"
        >
          Excluir
        </button>
      )}
    </div>
  );
}