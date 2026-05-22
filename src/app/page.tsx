"use client";

import { useEffect, useState } from "react";

import {
  DndContext,
  DragEndEvent,
} from "@dnd-kit/core";

import { Sidebar } from "../components/layout/Sidebar";
import { Topbar } from "../components/layout/Topbar";
import { BoardColumn } from "../components/board/BoardColumn";
import { TaskCard } from "../components/task/TaskCard";
import { AddTaskModal } from "../components/task/AddTaskModal";
import { StatsCard } from "../components/dashboard/StatsCard";

import { Toaster, toast } from "sonner";

type TaskStatus =
  | "todo"
  | "progress"
  | "done";

type TaskPriority =
  | "low"
  | "medium"
  | "high";

type Theme =
  | "light"
  | "dark";

type Task = {
  id: number;
  title: string;
  description: string;
  status: TaskStatus;
  priority: TaskPriority;
  assignee: string;
  dueDate: string;
};

const initialTasks: Task[] = [
  {
    id: 1,
    title: "Criar tela login",
    description:
      "Desenvolver autenticação",
    status: "todo",
    priority: "high",
    assignee: "João",
    dueDate: "2026-05-30",
  },

  {
    id: 2,
    title: "Criar dashboard",
    description:
      "Estruturar layout",
    status: "progress",
    priority: "medium",
    assignee: "Maria",
    dueDate: "2026-05-28",
  },

  {
    id: 3,
    title: "Criar projeto",
    description:
      "Next.js configurado",
    status: "done",
    priority: "low",
    assignee: "Carlos",
    dueDate: "2026-05-25",
  },
];

export default function Home() {
  const [tasks, setTasks] = useState<
    Task[]
  >([]);

  const [theme, setTheme] =
    useState<Theme>("dark");

  const [isModalOpen, setIsModalOpen] =
    useState(false);

  const [editingTask, setEditingTask] =
    useState<Task | null>(null);

  const [taskToDelete, setTaskToDelete] =
    useState<number | null>(null);

  const [search, setSearch] =
    useState("");

  const [
    priorityFilter,
    setPriorityFilter,
  ] = useState("all");

  const isDark = theme === "dark";

  const totalTasks = tasks.length;

  const todoTasks = tasks.filter(
    (task) => task.status === "todo"
  ).length;

  const progressTasks = tasks.filter(
    (task) =>
      task.status === "progress"
  ).length;

  const doneTasks = tasks.filter(
    (task) => task.status === "done"
  ).length;

  const productivity =
    totalTasks > 0
      ? Math.round(
          (doneTasks / totalTasks) *
            100
        )
      : 0;

  const filteredTasks = tasks.filter(
    (task) => {
      const matchesSearch =
        task.title
          .toLowerCase()
          .includes(
            search.toLowerCase()
          );

      const matchesPriority =
        priorityFilter === "all"
          ? true
          : task.priority ===
            priorityFilter;

      return (
        matchesSearch &&
        matchesPriority
      );
    }
  );

  useEffect(() => {
    const storedTasks =
      localStorage.getItem(
        "kanvix-tasks"
      );

    const savedTheme =
      localStorage.getItem(
        "kanvix-theme"
      ) as Theme | null;

    if (savedTheme) {
      setTheme(savedTheme);
    }

    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
    } else {
      setTasks(initialTasks);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(
      "kanvix-tasks",
      JSON.stringify(tasks)
    );
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem(
      "kanvix-theme",
      theme
    );
  }, [theme]);

  function toggleTheme() {
    setTheme((prev) =>
      prev === "dark"
        ? "light"
        : "dark"
    );
  }

  function handleAddTask(
    title: string,
    description: string,
    priority: TaskPriority,
    assignee: string,
    dueDate: string
  ) {
    const newTask: Task = {
      id: Date.now(),
      title,
      description,
      status: "todo",
      priority,
      assignee,
      dueDate,
    };

    setTasks((prev) => [
      ...prev,
      newTask,
    ]);

    toast.success(
      "Tarefa criada com sucesso!"
    );
  }

  function handleEditTask(
    title: string,
    description: string,
    priority: TaskPriority,
    assignee: string,
    dueDate: string
  ) {
    if (!editingTask) return;

    setTasks((prev) =>
      prev.map((task) =>
        task.id === editingTask.id
          ? {
              ...task,
              title,
              description,
              priority,
              assignee,
              dueDate,
            }
          : task
      )
    );

    toast.success(
      "Tarefa atualizada"
    );

    setEditingTask(null);
  }

  function deleteTask(taskId: number) {
    setTasks((prev) =>
      prev.filter(
        (task) => task.id !== taskId
      )
    );

    toast.error("Tarefa removida!");
  }

  function handleDragEnd(
    event: DragEndEvent
  ) {
    const { active, over } = event;

    if (!over) return;

    const taskId = Number(active.id);

    const newStatus =
      over.id as TaskStatus;

    setTasks((prev) =>
      prev.map((task) =>
        task.id === taskId
          ? {
              ...task,
              status: newStatus,
            }
          : task
      )
    );

    toast.success("Tarefa movida");
  }

  return (
    <main
      className={`flex h-screen transition-colors duration-300 ${
        isDark
          ? "bg-slate-950 text-white"
          : "bg-slate-100 text-slate-900"
      }`}
    >
      <Sidebar />

      <section className="flex-1 p-8 overflow-auto">
        <div className="flex items-center justify-between mb-6">
          <Topbar
            onAddTask={() =>
              setIsModalOpen(true)
            }
          />

          <button
            onClick={toggleTheme}
            aria-label="Alternar tema"
            className={`px-5 py-3 rounded-xl font-medium transition-all border ${
              isDark
                ? "bg-slate-800 border-slate-700 hover:bg-slate-700 text-white"
                : "bg-white border border-slate-300 hover:bg-slate-200 text-slate-900 shadow-sm"
            }`}
          >
            {isDark
              ? "☀️ Light Mode"
              : "🌙 Dark Mode"}
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <StatsCard
            title="Total de tarefas"
            value={totalTasks}
            isDark={isDark}
          />

          <StatsCard
            title="A Fazer"
            value={todoTasks}
            isDark={isDark}
          />

          <StatsCard
            title="Em progresso"
            value={progressTasks}
            isDark={isDark}
          />

          <StatsCard
            title="Produtividade"
            value={`${productivity}%`}
            isDark={isDark}
          />
        </div>

        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <input
            type="text"
            placeholder="Buscar tarefa..."
            aria-label="Buscar tarefa"
            value={search}
            onChange={(e) =>
              setSearch(
                e.target.value
              )
            }
            className={`rounded-xl px-4 py-3 w-full md:w-80 outline-none transition-all ${
              isDark
                ? "bg-slate-800 border border-slate-700 text-white placeholder:text-slate-400 focus:ring-2 focus:ring-blue-500"
                : "bg-white border border-slate-300 text-slate-900 placeholder:text-slate-500 focus:ring-2 focus:ring-blue-500 shadow-sm"
            }`}
          />

          <select
            aria-label="Filtrar prioridade"
            value={priorityFilter}
            onChange={(e) =>
              setPriorityFilter(
                e.target.value
              )
            }
            className={`rounded-xl px-4 py-3 outline-none transition-all ${
              isDark
                ? "bg-slate-800 border border-slate-700 text-white"
                : "bg-white border border-slate-300 text-slate-900 shadow-sm"
            }`}
          >
            <option value="all">
              Todas prioridades
            </option>

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

        <DndContext
          onDragEnd={handleDragEnd}
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <BoardColumn
              id="todo"
              title="A Fazer"
              isDark={isDark}
            >
              {filteredTasks
                .filter(
                  (task) =>
                    task.status ===
                    "todo"
                )
                .map((task) => (
                  <TaskCard
                    key={task.id}
                    id={task.id}
                    title={task.title}
                    description={
                      task.description
                    }
                    priority={
                      task.priority
                    }
                    assignee={
                      task.assignee
                    }
                    dueDate={
                      task.dueDate
                    }
                    onEdit={() =>
                      setEditingTask(
                        task
                      )
                    }
                    onDelete={() =>
                      setTaskToDelete(
                        task.id
                      )
                    }
                    isDark={isDark}
                  />
                ))}
            </BoardColumn>

            <BoardColumn
              id="progress"
              title="Em Progresso"
              isDark={isDark}
            >
              {filteredTasks
                .filter(
                  (task) =>
                    task.status ===
                    "progress"
                )
                .map((task) => (
                  <TaskCard
                    key={task.id}
                    id={task.id}
                    title={task.title}
                    description={
                      task.description
                    }
                    priority={
                      task.priority
                    }
                    assignee={
                      task.assignee
                    }
                    dueDate={
                      task.dueDate
                    }
                    onEdit={() =>
                      setEditingTask(
                        task
                      )
                    }
                    onDelete={() =>
                      setTaskToDelete(
                        task.id
                      )
                    }
                    isDark={isDark}
                  />
                ))}
            </BoardColumn>

            <BoardColumn
              id="done"
              title="Concluído"
              isDark={isDark}
            >
              {filteredTasks
                .filter(
                  (task) =>
                    task.status ===
                    "done"
                )
                .map((task) => (
                  <TaskCard
                    key={task.id}
                    id={task.id}
                    title={task.title}
                    description={
                      task.description
                    }
                    priority={
                      task.priority
                    }
                    assignee={
                      task.assignee
                    }
                    dueDate={
                      task.dueDate
                    }
                    onEdit={() =>
                      setEditingTask(
                        task
                      )
                    }
                    onDelete={() =>
                      setTaskToDelete(
                        task.id
                      )
                    }
                    isDark={isDark}
                  />
                ))}
            </BoardColumn>
          </div>
        </DndContext>
      </section>

      <AddTaskModal
        isOpen={isModalOpen}
        onClose={() =>
          setIsModalOpen(false)
        }
        onAdd={handleAddTask}
        isDark={isDark}
      />

      <AddTaskModal
        isOpen={!!editingTask}
        onClose={() =>
          setEditingTask(null)
        }
        onAdd={handleEditTask}
        initialTitle={
          editingTask?.title
        }
        initialDescription={
          editingTask?.description
        }
        initialPriority={
          editingTask?.priority
        }
        initialAssignee={
          editingTask?.assignee
        }
        initialDueDate={
          editingTask?.dueDate
        }
        isEditing
        isDark={isDark}
      />

      {taskToDelete !== null && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
          <div
            className={`rounded-2xl p-6 w-full max-w-sm border shadow-2xl ${
              isDark
                ? "bg-slate-900 border-slate-700"
                : "bg-white border-slate-200"
            }`}
          >
            <h2 className="text-xl font-bold mb-3">
              Excluir tarefa
            </h2>

            <p
              className={`mb-6 ${
                isDark
                  ? "text-slate-300"
                  : "text-slate-600"
              }`}
            >
              Tem certeza que deseja
              excluir essa tarefa?
            </p>

            <div className="flex justify-end gap-3">
              <button
                onClick={() =>
                  setTaskToDelete(
                    null
                  )
                }
                className={`px-4 py-3 rounded-lg transition ${
                  isDark
                    ? "bg-slate-700 hover:bg-slate-600 text-white"
                    : "bg-slate-200 hover:bg-slate-300 text-slate-900"
                }`}
              >
                Cancelar
              </button>

              <button
                onClick={() => {
                  if (
                    taskToDelete !==
                    null
                  ) {
                    deleteTask(
                      taskToDelete
                    );
                  }

                  setTaskToDelete(
                    null
                  );
                }}
                className="px-4 py-3 rounded-lg bg-red-600 hover:bg-red-500 text-white transition"
              >
                Excluir
              </button>
            </div>
          </div>
        </div>
      )}

      <Toaster
        richColors
        position="top-right"
      />
    </main>
  );
}