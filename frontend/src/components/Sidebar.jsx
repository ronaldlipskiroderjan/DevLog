import { useState } from 'react';
import { Briefcase, CheckCircle2, ScrollText, Sparkles } from 'lucide-react';

const navItems = [
  { label: 'Dashboard', icon: Briefcase },
  { label: 'Vagas', icon: ScrollText },
  { label: 'Estudos', icon: Sparkles },
  { label: 'Conquistas', icon: CheckCircle2 },
];

export function Sidebar() {
  const [active, setActive] = useState('Dashboard');

  return (
    <aside className="sticky top-0 h-screen overflow-y-auto border-r border-white/[0.06] bg-slate-950/95 px-5 py-8 backdrop-blur-xl">
      <div className="mb-10 flex items-center gap-3 px-2">
        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-violet-600/20 ring-1 ring-violet-500/30 shadow-glow">
          <Briefcase size={20} className="text-violet-300" />
        </div>
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.35em] text-slate-500">DevLog</p>
          <h1 className="text-xl font-bold text-white">Painel</h1>
        </div>
      </div>

      <nav className="space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = active === item.label;
          return (
            <button
              key={item.label}
              type="button"
              onClick={() => setActive(item.label)}
              className={`group flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all ${
                isActive
                  ? 'bg-violet-600/20 text-white ring-1 ring-violet-500/30 shadow-glow'
                  : 'text-slate-400 hover:bg-white/[0.04] hover:text-slate-200'
              }`}
            >
              <Icon
                size={17}
                className={isActive ? 'text-violet-400' : 'text-slate-500 group-hover:text-slate-300'}
              />
              {item.label}
              {isActive && (
                <span className="ml-auto h-1.5 w-1.5 rounded-full bg-violet-400" />
              )}
            </button>
          );
        })}
      </nav>

      <div className="mt-10 rounded-2xl border border-violet-500/15 bg-violet-950/30 p-5">
        <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-violet-400/70">Dica</p>
        <p className="mt-3 text-sm leading-relaxed text-slate-400">
          Registre todas as vagas que aplicar para acompanhar seu progresso.
        </p>
      </div>
    </aside>
  );
}
