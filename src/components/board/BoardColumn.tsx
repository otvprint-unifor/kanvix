"use client";

import React, { ReactNode } from "react";

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
    <section
      ref={setNodeRef}
      aria-label={`Coluna ${title}`}
      className="bg-slate-900 rounded-xl p-4 min-h-[500px] border border-slate-800"
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-lg">
          {title}
        </h3>

        <span className="text-sm bg-slate-800 px-2 py-1 rounded-md text-slate-300">
          {React.Children.count(children)}
        </span>
      </div>

      <div className="space-y-4">
        {children}
      </div>
    </section>
  );
}