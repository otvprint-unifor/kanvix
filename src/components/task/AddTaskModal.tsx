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
    priority: TaskPriority,
    assignee: string
  ) => void;

  initialTitle?: string;
  initialDescription?: string;

  initialPriority?: TaskPriority;

  initialAssignee?: string;

  isEditing?: boolean;
};

export function AddTaskModal({
  isOpen,
  onClose,
  onAdd,

  initialTitle = "",
  initialDescription = "",

  initialPriority = "medium",

  initialAssignee = "",

  isEditing = false,
}: AddTaskModalProps) {
  const [title, setTitle] = useState("");

  const [description, setDescription] =
    useState("");

  const [priority, setPriority] =
    useState<TaskPriority>("medium");

  const [assignee, setAssignee] =
    useState("");

  useEffect(() => {
    setTitle(initialTitle);

    setDescription(initialDescription);

    setPriority(initialPriority);

    setAssignee(initialAssignee);
  }, [
    initialTitle,
    initialDescription,
    initialPriority,
    initialAssignee,
  ]);

  if (!isOpen) return null;

  function handleSubmit() {
    if (!title.trim()) return;

    onAdd(
      title,
      description,
      priority,
      assignee
    );

    setTitle("");
    setDescription("");
    setPriority("medium");
    setAssignee("");

    onClose();
  }

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
      <div className="bg-slate-900 w-full max-w-md rounded-2xl border border-slate-700 p-6">
        <h2 className="text-2xl font-bold mb-6">
          {isEditing
            ? "Editar tarefa"
            : "Nova tarefa"}
        </h2>

        <div className="space-y-4">
          <div>
            <label className="block text-sm mb-2 text-slate-300">
              Título
            </label>

            <input
              type="text"
              placeholder="Digite o título"
              value={title}
              onChange={(e) =>
                setTitle(e.target.value)
              }
              className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm mb-2 text-slate-300">
              Descrição
            </label>

            <textarea
              placeholder="Digite a descrição"
              value={description}
              onChange={(e) =>
                setDescription(e.target.value)
              }
              className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 h-28 resize-none outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm mb-2 text-slate-300">
              Prioridade
            </label>

            <select
              value={priority}
              onChange={(e) =>
                setPriority(
                  e.target.value as TaskPriority
                )
              }
              className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
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

          <div>
            <label className="block text-sm mb-2 text-slate-300">
              Responsável
            </label>

            <input
              type="text"
              placeholder="Nome do responsável"
              value={assignee}
              onChange={(e) =>
                setAssignee(e.target.value)
              }
              className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <button
              onClick={onClose}
              className="px-4 py-3 rounded-lg bg-slate-700 hover:bg-slate-600 focus:outline-none focus:ring-2 focus:ring-slate-400"
            >
              Cancelar
            </button>

            <button
              onClick={handleSubmit}
              className="px-4 py-3 rounded-lg bg-blue-600 hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-400"
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