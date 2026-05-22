export type TaskStatus =
  | "todo"
  | "progress"
  | "done";

export type TaskPriority =
  | "low"
  | "medium"
  | "high";

export type Task = {
  id: number;
  title: string;
  description: string;
  status: TaskStatus;
  priority: TaskPriority;
  assignee: string;
  dueDate: string;
};