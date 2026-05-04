import { Briefcase, MessageSquare, Trophy, Tag } from 'lucide-react';

const cards = [
  {
    label: 'Total de Vagas',
    key: 'total',
    icon: Briefcase,
    color: 'text-violet-400',
    ring: 'ring-violet-500/20',
    bg: 'bg-violet-500/10',
  },
  {
    label: 'Em Entrevista',
    key: 'entrevista',
    icon: MessageSquare,
    color: 'text-blue-400',
    ring: 'ring-blue-500/20',
    bg: 'bg-blue-500/10',
  },
  {
    label: 'Ofertas',
    key: 'ofertas',
    icon: Trophy,
    color: 'text-emerald-400',
    ring: 'ring-emerald-500/20',
    bg: 'bg-emerald-500/10',
  },
  {
    label: 'Outros Status',
    key: 'outros',
    icon: Tag,
    color: 'text-amber-400',
    ring: 'ring-amber-500/20',
    bg: 'bg-amber-500/10',
  },
];

export function StatsCards({ stats }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {cards.map((card) => {
        const Icon = card.icon;
        return (
          <div
            key={card.key}
            className="group rounded-2xl border border-white/[0.07] bg-slate-900/70 p-6 shadow-glow transition hover:-translate-y-0.5 hover:border-white/10"
          >
            <div className="mb-4 flex items-center justify-between">
              <p className="text-xs font-medium uppercase tracking-[0.25em] text-slate-500">{card.label}</p>
              <div className={`flex h-8 w-8 items-center justify-center rounded-xl ring-1 ${card.bg} ${card.ring}`}>
                <Icon size={15} className={card.color} />
              </div>
            </div>
            <p className={`text-4xl font-bold tracking-tight ${card.color}`}>
              {stats[card.key] ?? 0}
            </p>
          </div>
        );
      })}
    </div>
  );
}
