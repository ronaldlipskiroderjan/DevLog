import { Briefcase, CheckCircle2, ScrollText, Sparkles } from 'lucide-react';

const navItems = [
  { label: 'Dashboard', icon: Briefcase },
  { label: 'Vagas', icon: ScrollText },
  { label: 'Estudos', icon: Sparkles },
  { label: 'Conquistas', icon: CheckCircle2 },
];

export function Sidebar() {
  return (
    <aside className="w-80 min-h-screen border-r border-white/10 bg-slate-950/95 backdrop-blur-lg px-6 py-8">
      <div className="mb-10">
        <div className="flex items-center gap-3 text-violet-300">
          <div className="h-12 w-12 rounded-3xl bg-violet-500/15 shadow-glow flex items-center justify-center ring-1 ring-violet-400/20">
            <Briefcase size={20} />
          </div>
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-slate-400">DevLog</p>
            <h1 className="text-2xl font-semibold text-white">Painel</h1>
          </div>
        </div>
      </div>

      <nav className="space-y-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.label}
              className="flex w-full items-center gap-3 rounded-3xl px-4 py-3 text-left text-slate-300 transition hover:bg-violet-500/10 hover:text-white"
              type="button"
            >
              <Icon size={18} />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>

      <div className="mt-12 rounded-3xl border border-violet-500/20 bg-slate-900/80 p-5 shadow-glow">
        <p className="text-sm uppercase tracking-[0.25em] text-violet-300/70">Resumo</p>
        <p className="mt-4 text-base text-slate-200">O DevLog centraliza vagas, entrevistas e seus próximos passos em um só lugar.</p>
      </div>
    </aside>
  );
}
