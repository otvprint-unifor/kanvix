"use client";

import { useEffect, useState } from "react";

import { DndContext, DragEndEvent } from "@dnd-kit/core";

import { Sidebar } from "../components/layout/Sidebar";
import { Topbar } from "../components/layout/Topbar";
import { BoardColumn } from "../components/board/BoardColumn";
import { TaskCard } from "../components/task/TaskCard";
import { AddTaskModal } from "../components/task/AddTaskModal";
import { StatsCard } from "../components/dashboard/StatsCard";

import { Toaster, toast } from "sonner";

type TaskStatus = "todo" | "progress" | "done";

type TaskPriority =
  | "low"
  | "medium"
  | "high";

type Task = {
  id: number;
  title: string;
  description: string;
  status: TaskStatus;
  priority: TaskPriority;
  assignee: string;
};

const initialTasks: Task[] = [
  {
    id: 1,
    title: "Criar tela login",
    description: "Desenvolver autenticação",
    status: "todo",
    priority: "high",
    assignee: "João",
  },

  {
    id: 2,
    title: "Criar dashboard",
    description: "Estruturar layout",
    status: "progress",
    priority: "medium",
    assignee: "Maria",
  },

  {
    id: 3,
    title: "Criar projeto",
    description: "Next.js configurado",
    status: "done",
    priority: "low",
    assignee: "Carlos",
  },
];

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  const [isModalOpen, setIsModalOpen] =
    useState(false);

  const [editingTask, setEditingTask] =
    useState<Task | null>(null);

  const [search, setSearch] = useState("");

  const [priorityFilter, setPriorityFilter] =
    useState("all");

  const totalTasks = tasks.length;

  const todoTasks = tasks.filter(
    (task) => task.status === "todo"
  ).length;

  const progressTasks = tasks.filter(
    (task) => task.status === "progress"
  ).length;

  const doneTasks = tasks.filter(
    (task) => task.status === "done"
  ).length;

  const productivity =
    totalTasks > 0
      ? Math.round(
          (doneTasks / totalTasks) * 100
        )
      : 0;

  const filteredTasks = tasks.filter((task) => {
    const matchesSearch =
      task.title
        .toLowerCase()
        .includes(search.toLowerCase());

    const matchesPriority =
      priorityFilter === "all"
        ? true
        : task.priority === priorityFilter;

    return (
      matchesSearch && matchesPriority
    );
  });

  useEffect(() => {
    const storedTasks =
      localStorage.getItem("kanvix-tasks");

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

function handleAddTask(
  title: string,
  description: string,
  priority: TaskPriority,
  assignee: string
) {
  const newTask: Task = {
    id: Date.now(),
    title,
    description,
    status: "todo",
    priority,
    assignee,
  };

  setTasks((prev) => [...prev, newTask]);

  toast.success("Tarefa criada com sucesso!");
}

function handleEditTask(
  title: string,
  description: string,
  priority: TaskPriority,
  assignee: string
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
          }
        : task
    )
  );

  toast.success("Tarefa atualizada");

  setEditingTask(null);
}

  function deleteTask(taskId: number) {
  setTasks((prev) =>
    prev.filter((task) => task.id !== taskId)
  );

  toast.error("Tarefa removida!");
}

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    if (!over) return;

    const taskId = Number(active.id);
    const newStatus = over.id as TaskStatus;

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
    <main className="flex h-screen bg-slate-950 text-white">
      <Sidebar />

      <section className="flex-1 p-8 overflow-auto">
        <Topbar
          onAddTask={() => setIsModalOpen(true)}
        />

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <StatsCard
            title="Total de tarefas"
            value={totalTasks}
          />

          <StatsCard
            title="A Fazer"
            value={todoTasks}
          />

          <StatsCard
            title="Em progresso"
            value={progressTasks}
          />

          <StatsCard
            title="Produtividade"
            value={`${productivity}%`}
          />
        </div>

        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <input
            type="text"
            placeholder="Buscar tarefa..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            className="bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 w-full md:w-80 outline-none"
          />

          <select
            value={priorityFilter}
            onChange={(e) =>
              setPriorityFilter(e.target.value)
            }
            className="bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 outline-none"
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

        <DndContext onDragEnd={handleDragEnd}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <BoardColumn
              id="todo"
              title="A Fazer"
            >
              {filteredTasks
                .filter(
                  (task) => task.status === "todo"
                )
                .map((task) => (
                  <TaskCard
                    key={task.id}
                    id={task.id}
                    title={task.title}
                    description={task.description}
                    priority={task.priority}
                    assignee={task.assignee}
                    onEdit={() =>
                      setEditingTask(task)
                    }
                    onDelete={() =>
                      deleteTask(task.id)
                    }
                  />
                ))}
            </BoardColumn>

            <BoardColumn
              id="progress"
              title="Em Progresso"
            >
              {filteredTasks
                .filter(
                  (task) =>
                    task.status === "progress"
                )
                .map((task) => (
                  <TaskCard
                    key={task.id}
                    id={task.id}
                    title={task.title}
                    description={task.description}
                    priority={task.priority}
                    assignee={task.assignee}
                    onEdit={() =>
                      setEditingTask(task)
                    }
                    onDelete={() =>
                      deleteTask(task.id)
                    }
                  />
                ))}
            </BoardColumn>

            <BoardColumn
              id="done"
              title="Concluído"
            >
              {filteredTasks
                .filter(
                  (task) => task.status === "done"
                )
                .map((task) => (
                  <TaskCard
                    key={task.id}
                    id={task.id}
                    title={task.title}
                    description={task.description}
                    priority={task.priority}
                    assignee={task.assignee}
                    onEdit={() =>
                      setEditingTask(task)
                    }
                    onDelete={() =>
                      deleteTask(task.id)
                    }
                  />
                ))}
            </BoardColumn>
          </div>
        </DndContext>
      </section>

      <AddTaskModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAdd={handleAddTask}
      />

      <AddTaskModal
        isOpen={!!editingTask}
        onClose={() => setEditingTask(null)}
        onAdd={handleEditTask}
        initialTitle={editingTask?.title}
        initialDescription={
          editingTask?.description
        }
        initialPriority={
          editingTask?.priority
        }
        initialAssignee={editingTask?.assignee}
        isEditing
      />

      <Toaster richColors position="top-right" />
    </main>
  );
}