"use client";

import { useState } from "react";

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
    assignee: string,
    dueDate: string
  ) => void;

  initialTitle?: string;

  initialDescription?: string;

  initialPriority?: TaskPriority;

  initialAssignee?: string;

  initialDueDate?: string;

  isEditing?: boolean;

  isDark: boolean;
};

export function AddTaskModal({
  isOpen,
  onClose,
  onAdd,

  initialTitle = "",

  initialDescription = "",

  initialPriority = "medium",

  initialAssignee = "",

  initialDueDate = "",

  isEditing = false,

  isDark,
}: AddTaskModalProps) {
  const [title, setTitle] =
    useState(initialTitle);

  const [
    description,
    setDescription,
  ] = useState(initialDescription);

  const [priority, setPriority] =
    useState<TaskPriority>(
      initialPriority
    );

  const [assignee, setAssignee] =
    useState(initialAssignee);

  const [dueDate, setDueDate] =
    useState(initialDueDate);

  if (!isOpen) return null;

  function handleSubmit() {
    if (!title.trim()) return;

    onAdd(
      title,
      description,
      priority,
      assignee,
      dueDate
    );

    setTitle("");

    setDescription("");

    setPriority("medium");

    setAssignee("");

    setDueDate("");

    onClose();
  }

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
      <div
        className={`w-full max-w-md rounded-2xl border p-6 transition ${
          isDark
            ? "bg-slate-900 border-slate-700 text-white"
            : "bg-white border-slate-300 text-slate-900 shadow-xl"
        }`}
      >
        <h2 className="text-2xl font-bold mb-6">
          {isEditing
            ? "Editar tarefa"
            : "Nova tarefa"}
        </h2>

        <div className="space-y-4">
          <div>
            <label
              className={`block text-sm mb-2 ${
                isDark
                  ? "text-slate-300"
                  : "text-slate-700"
              }`}
            >
              Título
            </label>

            <input
              type="text"
              placeholder="Digite o título"
              value={title}
              onChange={(e) =>
                setTitle(e.target.value)
              }
              className={`w-full rounded-lg px-4 py-3 outline-none transition ${
                isDark
                  ? "bg-slate-800 border border-slate-700 focus:ring-2 focus:ring-blue-500"
                  : "bg-slate-50 border border-slate-300 focus:ring-2 focus:ring-blue-500"
              }`}
            />
          </div>

          <div>
            <label
              className={`block text-sm mb-2 ${
                isDark
                  ? "text-slate-300"
                  : "text-slate-700"
              }`}
            >
              Descrição
            </label>

            <textarea
              placeholder="Digite a descrição"
              value={description}
              onChange={(e) =>
                setDescription(
                  e.target.value
                )
              }
              className={`w-full rounded-lg px-4 py-3 h-28 resize-none outline-none transition ${
                isDark
                  ? "bg-slate-800 border border-slate-700 focus:ring-2 focus:ring-blue-500"
                  : "bg-slate-50 border border-slate-300 focus:ring-2 focus:ring-blue-500"
              }`}
            />
          </div>

          <div>
            <label
              className={`block text-sm mb-2 ${
                isDark
                  ? "text-slate-300"
                  : "text-slate-700"
              }`}
            >
              Prioridade
            </label>

            <select
              value={priority}
              onChange={(e) =>
                setPriority(
                  e.target
                    .value as TaskPriority
                )
              }
              className={`w-full rounded-lg px-4 py-3 outline-none transition ${
                isDark
                  ? "bg-slate-800 border border-slate-700"
                  : "bg-slate-50 border border-slate-300"
              }`}
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
            <label
              className={`block text-sm mb-2 ${
                isDark
                  ? "text-slate-300"
                  : "text-slate-700"
              }`}
            >
              Responsável
            </label>

            <input
              type="text"
              placeholder="Nome do responsável"
              value={assignee}
              onChange={(e) =>
                setAssignee(
                  e.target.value
                )
              }
              className={`w-full rounded-lg px-4 py-3 outline-none transition ${
                isDark
                  ? "bg-slate-800 border border-slate-700 focus:ring-2 focus:ring-blue-500"
                  : "bg-slate-50 border border-slate-300 focus:ring-2 focus:ring-blue-500"
              }`}
            />
          </div>

          <div>
            <label
              className={`block text-sm mb-2 ${
                isDark
                  ? "text-slate-300"
                  : "text-slate-700"
              }`}
            >
              Data limite
            </label>

            <input
              type="date"
              value={dueDate}
              onChange={(e) =>
                setDueDate(
                  e.target.value
                )
              }
              className={`w-full rounded-lg px-4 py-3 outline-none transition ${
                isDark
                  ? "bg-slate-800 border border-slate-700"
                  : "bg-slate-50 border border-slate-300"
              }`}
            />
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <button
              onClick={onClose}
              className={`px-4 py-3 rounded-lg transition focus:outline-none ${
                isDark
                  ? "bg-slate-700 hover:bg-slate-600 text-white"
                  : "bg-slate-200 hover:bg-slate-300 text-slate-900"
              }`}
            >
              Cancelar
            </button>

            <button
              onClick={handleSubmit}
              className="px-4 py-3 rounded-lg bg-blue-600 hover:bg-blue-500 text-white transition focus:outline-none"
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