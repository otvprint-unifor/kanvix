"use client";

import { useEffect, useState } from "react";

import { DndContext, DragEndEvent } from "@dnd-kit/core";

import { Sidebar } from "../components/layout/Sidebar";
import { Topbar } from "../components/layout/Topbar";
import { BoardColumn } from "../components/board/BoardColumn";
import { TaskCard } from "../components/task/TaskCard";
import { AddTaskModal } from "../components/task/AddTaskModal";

type TaskStatus = "todo" | "progress" | "done";

type Task = {
  id: number;
  title: string;
  description: string;
  status: TaskStatus;
};

const initialTasks: Task[] = [
  {
    id: 1,
    title: "Criar tela login",
    description: "Desenvolver autenticação",
    status: "todo",
  },

  {
    id: 2,
    title: "Criar dashboard",
    description: "Estruturar layout",
    status: "progress",
  },

  {
    id: 3,
    title: "Criar projeto",
    description: "Next.js configurado",
    status: "done",
  },
];

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isModalOpen, setIsModalOpen] =
    useState(false);

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
    description: string
  ) {
    const newTask: Task = {
      id: Date.now(),
      title,
      description,
      status: "todo",
    };

    setTasks((prev) => [...prev, newTask]);
  }

  function deleteTask(taskId: number) {
    setTasks((prev) =>
      prev.filter((task) => task.id !== taskId)
    );
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
  }

  return (
    <main className="flex h-screen bg-slate-950 text-white">
      <Sidebar />

      <section className="flex-1 p-8 overflow-auto">
        <Topbar
          onAddTask={() => setIsModalOpen(true)}
        />

        <DndContext onDragEnd={handleDragEnd}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <BoardColumn
              id="todo"
              title="A Fazer"
            >
              {tasks
                .filter(
                  (task) => task.status === "todo"
                )
                .map((task) => (
                  <TaskCard
                    key={task.id}
                    id={task.id}
                    title={task.title}
                    description={task.description}
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
              {tasks
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
              {tasks
                .filter(
                  (task) => task.status === "done"
                )
                .map((task) => (
                  <TaskCard
                    key={task.id}
                    id={task.id}
                    title={task.title}
                    description={task.description}
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
    </main>
  );
}