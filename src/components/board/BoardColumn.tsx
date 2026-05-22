"use client";

import React, { ReactNode } from "react";

import { useDroppable } from "@dnd-kit/core";

type BoardColumnProps = {
  id: string;
  title: string;
  children: ReactNode;
  isDark?: boolean;
};

export function BoardColumn({
  id,
  title,
  children,
  isDark = true,
}: BoardColumnProps) {
  const { setNodeRef } = useDroppable({
    id,
  });

  return (
    <section
      ref={setNodeRef}
      aria-label={`Coluna ${title}`}
      className={`rounded-2xl p-4 min-h-[500px] border transition-all ${
        isDark
          ? "bg-slate-900 border-slate-800"
          : "bg-white border-slate-200 shadow-sm"
      }`}
    >
      <div className="flex items-center justify-between mb-4">
        <h3
          className={`font-semibold text-lg ${
            isDark
              ? "text-white"
              : "text-slate-900"
          }`}
        >
          {title}
        </h3>

        <span
          className={`text-sm px-3 py-1 rounded-lg font-medium ${
            isDark
              ? "bg-slate-800 text-slate-300"
              : "bg-slate-100 text-slate-700"
          }`}
        >
          {React.Children.count(children)}
        </span>
      </div>

      <div className="space-y-4">
        {children}
      </div>
    </section>
  );
}