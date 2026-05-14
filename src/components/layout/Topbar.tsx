type TopbarProps = {
  onAddTask: () => void;
};

export function Topbar({
  onAddTask,
}: TopbarProps) {
  return (
    <div className="flex items-center justify-between mb-8">
      <div>
        <h2 className="text-3xl font-bold">
          Dashboard
        </h2>

        <p className="text-slate-400 mt-1">
          Gerencie suas tarefas
        </p>
      </div>

      <button
        onClick={onAddTask}
        className="bg-blue-600 hover:bg-blue-500 transition px-5 py-3 rounded-lg font-medium"
      >
        + Nova tarefa
      </button>
    </div>
  );
}