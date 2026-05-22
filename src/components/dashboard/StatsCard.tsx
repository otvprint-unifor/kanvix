type StatsCardProps = {
  title: string;
  value: string | number;
  isDark?: boolean;
};

export function StatsCard({
  title,
  value,
  isDark = true,
}: StatsCardProps) {
  return (
    <div
      className={`rounded-2xl p-5 border transition-all ${
        isDark
          ? "bg-slate-900 border-slate-800 hover:border-slate-700"
          : "bg-white border-slate-200 hover:border-slate-300 shadow-sm"
      }`}
    >
      <p
        className={`text-sm ${
          isDark
            ? "text-slate-400"
            : "text-slate-500"
        }`}
      >
        {title}
      </p>

      <div className="flex items-end justify-between mt-4">
        <h3
          className={`text-3xl font-bold ${
            isDark
              ? "text-white"
              : "text-slate-900"
          }`}
        >
          {value}
        </h3>

        <div
          className={`w-12 h-12 rounded-xl flex items-center justify-center ${
            isDark
              ? "bg-blue-500/10"
              : "bg-blue-100"
          }`}
        >
          <div className="w-3 h-3 rounded-full bg-blue-500" />
        </div>
      </div>
    </div>
  );
}