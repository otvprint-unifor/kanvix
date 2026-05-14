export function Sidebar() {
  return (
    <aside className="w-64 bg-slate-900 border-r border-slate-800 p-6">
      <h1 className="text-2xl font-bold text-blue-500 mb-10">
        Kanvix
      </h1>

      <nav className="space-y-4">
        <button className="w-full text-left px-4 py-3 rounded-lg bg-slate-800 hover:bg-slate-700 transition">
          Dashboard
        </button>

        <button className="w-full text-left px-4 py-3 rounded-lg hover:bg-slate-800 transition">
          Minhas tarefas
        </button>

        <button className="w-full text-left px-4 py-3 rounded-lg hover:bg-slate-800 transition">
          Configurações
        </button>
      </nav>
    </aside>
  );
}