type StatsCardProps = {
  title: string;
  value: number | string;
};

export function StatsCard({
  title,
  value,
}: StatsCardProps) {
  return (
    <div className="bg-slate-900 rounded-xl p-6 border border-slate-800">
      <p className="text-slate-400 text-sm">
        {title}
      </p>

      <h3 className="text-3xl font-bold mt-2">
        {value}
      </h3>
    </div>
  );
}