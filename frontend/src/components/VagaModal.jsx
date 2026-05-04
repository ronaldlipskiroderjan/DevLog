import { X, AlertTriangle } from 'lucide-react';
import { useEffect, useState } from 'react';

const defaultForm = { titulo: '', empresa: '', status: 'Pendente', stack: '' };

const inputClass =
  'mt-1.5 w-full rounded-xl border border-white/[0.08] bg-slate-950/80 px-4 py-3 text-sm text-white placeholder-slate-600 transition focus:border-violet-500 focus:ring-1 focus:ring-violet-500/30';

export function VagaModal({ open, onClose, onSubmit, initialData, isDeleting, loading }) {
  const [form, setForm] = useState(defaultForm);

  useEffect(() => {
    if (!open) return;
    setForm(initialData ?? defaultForm);
  }, [initialData, open]);

  const handleChange = (field) => (e) =>
    setForm((cur) => ({ ...cur, [field]: e.target.value }));

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/75 px-4 py-6 backdrop-blur-md">
      <div className="w-full max-w-xl rounded-2xl border border-white/[0.08] bg-slate-900 p-7 shadow-glow">
        <div className="mb-6 flex items-start justify-between gap-4">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.35em] text-violet-400/80">
              {isDeleting ? 'Confirmar exclusão' : initialData ? 'Editar vaga' : 'Nova vaga'}
            </p>
            <h2 className="mt-1.5 text-2xl font-bold text-white">
              {isDeleting ? 'Tem certeza?' : initialData ? 'Atualize os detalhes' : 'Registrar candidatura'}
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="mt-1 flex h-8 w-8 items-center justify-center rounded-lg text-slate-500 transition hover:bg-white/[0.06] hover:text-white"
          >
            <X size={18} />
          </button>
        </div>

        {isDeleting ? (
          <div className="rounded-xl border border-red-500/20 bg-red-950/40 p-5">
            <div className="mb-3 flex items-center gap-2 text-red-400">
              <AlertTriangle size={16} />
              <span className="text-sm font-semibold">Ação irreversível</span>
            </div>
            <p className="text-sm text-slate-300">
              A vaga <span className="font-semibold text-white">"{initialData?.titulo}"</span> será removida permanentemente.
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <button
                type="button"
                disabled={loading}
                onClick={() => onSubmit(form)}
                className="rounded-xl bg-red-600 px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-red-500 disabled:opacity-50 active:scale-95"
              >
                {loading ? 'Removendo...' : 'Sim, deletar'}
              </button>
              <button
                type="button"
                onClick={onClose}
                className="rounded-xl border border-white/10 bg-slate-950 px-6 py-2.5 text-sm text-slate-300 transition hover:bg-slate-800"
              >
                Cancelar
              </button>
            </div>
          </div>
        ) : (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              onSubmit(form);
            }}
            className="grid gap-4"
          >
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="block text-xs font-medium uppercase tracking-[0.2em] text-slate-400">
                Título
                <input
                  required
                  value={form.titulo}
                  onChange={handleChange('titulo')}
                  placeholder="Ex: Desenvolvedor Java"
                  className={inputClass}
                />
              </label>
              <label className="block text-xs font-medium uppercase tracking-[0.2em] text-slate-400">
                Empresa
                <input
                  required
                  value={form.empresa}
                  onChange={handleChange('empresa')}
                  placeholder="Ex: Nubank"
                  className={inputClass}
                />
              </label>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <label className="block text-xs font-medium uppercase tracking-[0.2em] text-slate-400">
                Status
                <select
                  required
                  value={form.status}
                  onChange={handleChange('status')}
                  className={inputClass}
                >
                  <option>Pendente</option>
                  <option>Entrevista</option>
                  <option>Oferta</option>
                  <option>Rejeitada</option>
                </select>
              </label>
              <label className="block text-xs font-medium uppercase tracking-[0.2em] text-slate-400">
                Stack
                <input
                  required
                  value={form.stack}
                  onChange={handleChange('stack')}
                  placeholder="Java, Spring, PostgreSQL"
                  className={inputClass}
                />
              </label>
            </div>

            <div className="mt-2 flex flex-wrap gap-3 border-t border-white/[0.06] pt-5">
              <button
                type="submit"
                disabled={loading}
                className="rounded-xl bg-violet-600 px-6 py-2.5 text-sm font-semibold text-white shadow-glow transition hover:bg-violet-500 disabled:opacity-50 active:scale-95"
              >
                {loading ? 'Salvando...' : initialData ? 'Salvar alterações' : 'Criar vaga'}
              </button>
              <button
                type="button"
                onClick={onClose}
                className="rounded-xl border border-white/10 bg-slate-950 px-6 py-2.5 text-sm text-slate-300 transition hover:bg-slate-800"
              >
                Cancelar
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
