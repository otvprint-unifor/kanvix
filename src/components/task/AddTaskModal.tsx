"use client";

import { useEffect, useState } from "react";

type TaskPriority =
  | "low"
  | "medium"
  | "high";

type AddTaskModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (
    title: string,
    description: string,
    priority: TaskPriority
  ) => void;

  initialTitle?: string;
  initialDescription?: string;
  initialPriority?: TaskPriority;

  isEditing?: boolean;
};

export function AddTaskModal({
  isOpen,
  onClose,
  onAdd,
  initialTitle = "",
  initialDescription = "",
  initialPriority = "medium",
  isEditing = false,
}: AddTaskModalProps) {
  const [title, setTitle] = useState("");
  
  const [description, setDescription] =
    useState("");

  const [priority, setPriority] =
    useState<TaskPriority>("medium");

  useEffect(() => {
    setTitle(initialTitle);

    setDescription(initialDescription);

    setPriority(initialPriority);
  }, [
    initialTitle,
    initialDescription,
    initialPriority,
  ]);

  if (!isOpen) return null;

  function handleSubmit() {
    if (!title.trim()) return;

    onAdd(title, description, priority);

    setTitle("");
    setDescription("");
    setPriority("medium");

    onClose();
  }

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div className="bg-slate-900 p-6 rounded-xl w-full max-w-md border border-slate-700">
        
        <h2
          id="modal-title"
          className="text-2xl font-bold mb-6"
        >
          {isEditing
            ? "Editar tarefa"
            : "Nova tarefa"}
        </h2>

        <div className="space-y-4">

          <div>
            <label
              htmlFor="title"
              className="block text-sm text-slate-200 mb-2"
            >
              Título da tarefa
            </label>

            <input
              id="title"
              type="text"
              placeholder="Digite o título"
              value={title}
              onChange={(e) =>
                setTitle(e.target.value)
              }
              className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 outline-none text-white focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div>
            <label
              htmlFor="description"
              className="block text-sm text-slate-200 mb-2"
            >
              Descrição da tarefa
            </label>

            <textarea
              id="description"
              placeholder="Digite a descrição"
              value={description}
              onChange={(e) =>
                setDescription(e.target.value)
              }
              className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 outline-none h-32 resize-none text-white focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div>
            <label
              htmlFor="priority"
              className="block text-sm text-slate-200 mb-2"
            >
              Prioridade
            </label>

            <select
              id="priority"
              value={priority}
              onChange={(e) =>
                setPriority(
                  e.target.value as TaskPriority
                )
              }
              className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 outline-none text-white focus:ring-2 focus:ring-blue-400"
            >
              <option value="high">
                Alta
              </option>

              <option value="medium">
                Média
              </option>

              <option value="low">
                Baixa
              </option>
            </select>
          </div>

          <div className="flex justify-end gap-3 pt-4">
            
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-lg bg-slate-700 hover:bg-slate-600 focus:outline-none focus:ring-2 focus:ring-slate-400"
            >
              Cancelar
            </button>

            <button
              onClick={handleSubmit}
              aria-label={
                isEditing
                  ? "Salvar tarefa"
                  : "Criar nova tarefa"
              }
              className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              {isEditing
                ? "Salvar"
                : "Criar tarefa"}
            </button>

          </div>
        </div>
      </div>
    </div>
  );
}