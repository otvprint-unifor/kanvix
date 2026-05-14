"use client";

import { ReactNode } from "react";
import { useDroppable } from "@dnd-kit/core";

type BoardColumnProps = {
  id: string;
  title: string;
  children: ReactNode;
};

export function BoardColumn({
  id,
  title,
  children,
}: BoardColumnProps) {
  const { setNodeRef } = useDroppable({
    id,
  });

  return (
    <div
      ref={setNodeRef}
      className="bg-slate-900 rounded-xl p-4 min-h-[500px]"
    >
      <h3 className="font-semibold mb-4 text-lg">
        {title}
      </h3>

      <div className="space-y-4">
        {children}
      </div>
    </div>
  );
}