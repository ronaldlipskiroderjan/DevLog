import { Edit3, Trash2, Plus, FolderOpen } from 'lucide-react';

const statusStyle = {
  Pendente:    'bg-amber-500/15 text-amber-300 ring-amber-500/20',
  Entrevista:  'bg-blue-500/15 text-blue-300 ring-blue-500/20',
  Oferta:      'bg-emerald-500/15 text-emerald-300 ring-emerald-500/20',
  Rejeitada:   'bg-red-500/15 text-red-300 ring-red-500/20',
};

export function VagasTable({ vagas, loading, onEdit, onDelete, onCreate }) {
  return (
    <div className="rounded-2xl border border-white/[0.07] bg-slate-900/70 p-6 shadow-glow">
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.25em] text-slate-500">Candidaturas</p>
          <h2 className="mt-1 text-xl font-bold text-white">Controle de Vagas</h2>
        </div>
        <button
          type="button"
          onClick={onCreate}
          className="inline-flex items-center gap-2 rounded-xl bg-violet-600 px-5 py-2.5 text-sm font-semibold text-white shadow-glow transition hover:bg-violet-500 active:scale-95"
        >
          <Plus size={16} /> Nova vaga
        </button>
      </div>

      {loading && vagas.length === 0 ? (
        <div className="space-y-3 py-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-14 animate-pulse rounded-xl bg-slate-800/60" />
          ))}
        </div>
      ) : vagas.length === 0 ? (
        <div className="flex flex-col items-center justify-center gap-3 py-16 text-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-violet-500/10 ring-1 ring-violet-500/20">
            <FolderOpen size={24} className="text-violet-400" />
          </div>
          <p className="text-base font-medium text-slate-300">Nenhuma vaga ainda</p>
          <p className="text-sm text-slate-500">Clique em "Nova vaga" para começar a registrar candidaturas.</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border-separate border-spacing-y-2 text-left text-sm">
            <thead>
              <tr>
                <th className="px-4 py-2 text-xs font-medium uppercase tracking-[0.2em] text-slate-500">Título</th>
                <th className="px-4 py-2 text-xs font-medium uppercase tracking-[0.2em] text-slate-500">Empresa</th>
                <th className="px-4 py-2 text-xs font-medium uppercase tracking-[0.2em] text-slate-500">Status</th>
                <th className="px-4 py-2 text-xs font-medium uppercase tracking-[0.2em] text-slate-500">Stack</th>
                <th className="px-4 py-2 text-xs font-medium uppercase tracking-[0.2em] text-slate-500">Ações</th>
              </tr>
            </thead>
            <tbody>
              {vagas.map((vaga) => {
                const style = statusStyle[vaga.status] ?? 'bg-slate-500/15 text-slate-300 ring-slate-500/20';
                return (
                  <tr
                    key={vaga.id}
                    className="group rounded-xl border border-white/[0.04] bg-slate-950/60 transition hover:bg-slate-900/80"
                  >
                    <td className="rounded-l-xl px-4 py-4 font-medium text-slate-100">{vaga.titulo}</td>
                    <td className="px-4 py-4 text-slate-400">{vaga.empresa}</td>
                    <td className="px-4 py-4">
                      <span className={`inline-flex items-center rounded-lg px-2.5 py-1 text-xs font-semibold ring-1 ${style}`}>
                        {vaga.status}
                      </span>
                    </td>
                    <td className="px-4 py-4 text-slate-400">{vaga.stack}</td>
                    <td className="rounded-r-xl px-4 py-4">
                      <div className="flex gap-2">
                        <button
                          type="button"
                          onClick={() => onEdit(vaga)}
                          className="inline-flex items-center gap-1.5 rounded-lg border border-violet-500/20 bg-violet-500/10 px-3 py-2 text-xs font-medium text-violet-300 transition hover:bg-violet-500/20 hover:text-white"
                        >
                          <Edit3 size={13} /> Editar
                        </button>
                        <button
                          type="button"
                          onClick={() => onDelete(vaga)}
                          className="inline-flex items-center gap-1.5 rounded-lg border border-red-500/20 bg-red-500/10 px-3 py-2 text-xs font-medium text-red-300 transition hover:bg-red-500/20 hover:text-white"
                        >
                          <Trash2 size={13} /> Deletar
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
