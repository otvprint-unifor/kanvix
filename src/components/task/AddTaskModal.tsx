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
    if (!title) return;

    onAdd(title, description, priority);

    setTitle("");
    setDescription("");
    setPriority("medium");

    onClose();
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-slate-900 p-6 rounded-xl w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6">
          {isEditing
            ? "Editar tarefa"
            : "Nova tarefa"}
        </h2>

        <div className="space-y-4">
          <input
            type="text"
            placeholder="Título"
            value={title}
            onChange={(e) =>
              setTitle(e.target.value)
            }
            className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 outline-none text-white"
          />

          <textarea
            placeholder="Descrição"
            value={description}
            onChange={(e) =>
              setDescription(e.target.value)
            }
            className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 outline-none h-32 resize-none text-white"
          />

          <select
            value={priority}
            onChange={(e) =>
              setPriority(
                e.target.value as TaskPriority
              )
            }
            className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 outline-none text-white"
          >
            <option value="low">
              Baixa prioridade
            </option>

            <option value="medium">
              Média prioridade
            </option>

            <option value="high">
              Alta prioridade
            </option>
          </select>

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