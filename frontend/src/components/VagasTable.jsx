import { Edit3, Trash2, Plus } from 'lucide-react';

export function VagasTable({ vagas, onEdit, onDelete, onCreate }) {
  return (
    <div className="rounded-[32px] border border-white/10 bg-slate-900/80 p-6 shadow-glow">
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.25em] text-slate-400">Vagas recentes</p>
          <h2 className="text-2xl font-semibold text-white">Controle de candidaturas</h2>
        </div>
        <button
          type="button"
          onClick={onCreate}
          className="inline-flex items-center gap-2 rounded-3xl bg-violet-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-violet-400"
        >
          <Plus size={18} /> Nova vaga
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-separate border-spacing-y-3 text-left text-sm">
          <thead>
            <tr className="text-slate-400">
              <th className="px-4 py-3">Título</th>
              <th className="px-4 py-3">Empresa</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Stack</th>
              <th className="px-4 py-3">Ações</th>
            </tr>
          </thead>
          <tbody>
            {vagas.map((vaga) => (
              <tr key={vaga.id} className="rounded-3xl border border-white/5 bg-slate-950/80 shadow-sm">
                <td className="px-4 py-4 text-slate-100">{vaga.titulo}</td>
                <td className="px-4 py-4 text-slate-300">{vaga.empresa}</td>
                <td className="px-4 py-4 text-violet-300">{vaga.status}</td>
                <td className="px-4 py-4 text-slate-300">{vaga.stack}</td>
                <td className="px-4 py-4">
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => onEdit(vaga)}
                      className="inline-flex items-center gap-2 rounded-2xl border border-violet-500/20 bg-violet-500/10 px-3 py-2 text-sm text-violet-200 transition hover:bg-violet-500/20"
                    >
                      <Edit3 size={16} /> Editar
                    </button>
                    <button
                      type="button"
                      onClick={() => onDelete(vaga)}
                      className="inline-flex items-center gap-2 rounded-2xl border border-red-500/20 bg-red-500/10 px-3 py-2 text-sm text-red-300 transition hover:bg-red-500/20"
                    >
                      <Trash2 size={16} /> Deletar
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
