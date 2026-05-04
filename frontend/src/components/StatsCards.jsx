const cards = [
  { label: 'Total de Vagas', key: 'total' },
  { label: 'Em Entrevista', key: 'entrevista' },
  { label: 'Ofertas', key: 'ofertas' },
  { label: 'Outros', key: 'outros' },
];

export function StatsCards({ stats }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {cards.map((card) => (
        <div
          key={card.key}
          className="rounded-[28px] border border-white/10 bg-slate-900/80 p-6 shadow-glow transition hover:-translate-y-1"
        >
          <p className="text-sm uppercase tracking-[0.25em] text-slate-400">{card.label}</p>
          <p className="mt-4 text-4xl font-semibold text-white">
            {stats[card.key] ?? 0}
          </p>
        </div>
      ))}
    </div>
  );
}
