"use client";

import { useState } from "react";

type AddTaskModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (title: string, description: string) => void;
};

export function AddTaskModal({
  isOpen,
  onClose,
  onAdd,
}: AddTaskModalProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  if (!isOpen) return null;

  function handleSubmit() {
    if (!title) return;

    onAdd(title, description);

    setTitle("");
    setDescription("");

    onClose();
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-slate-900 p-6 rounded-xl w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6">
          Nova tarefa
        </h2>

        <div className="space-y-4">
          <input
            type="text"
            placeholder="Título"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 outline-none"
          />

          <textarea
            placeholder="Descrição"
            value={description}
            onChange={(e) =>
              setDescription(e.target.value)
            }
            className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 outline-none h-32 resize-none"
          />

          <div className="flex justify-end gap-3 pt-4">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-lg bg-slate-700 hover:bg-slate-600"
            >
              Cancelar
            </button>

            <button
              onClick={handleSubmit}
              className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500"
            >
              Criar tarefa
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}