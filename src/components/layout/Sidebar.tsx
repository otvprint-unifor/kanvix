export function Sidebar() {
  return (
    <aside
      aria-label="Menu lateral"
      className="w-64 bg-slate-900 border-r border-slate-800 p-6"
    >
      <h1 className="text-2xl font-bold text-blue-400 mb-10">
        Kanvix
      </h1>

      <nav
        aria-label="Navegação principal"
        className="space-y-4"
      >
        <button
          aria-label="Ir para dashboard"
          className="w-full text-left px-4 py-3 rounded-lg bg-slate-800 hover:bg-slate-700 transition focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          Dashboard
        </button>

        <button
          aria-label="Ir para minhas tarefas"
          className="w-full text-left px-4 py-3 rounded-lg hover:bg-slate-800 transition focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          Minhas tarefas
        </button>

        <button
          aria-label="Abrir configurações"
          className="w-full text-left px-4 py-3 rounded-lg hover:bg-slate-800 transition focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          Configurações
        </button>
      </nav>
    </aside>
  );
}