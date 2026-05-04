import { X } from 'lucide-react';
import { useEffect, useState } from 'react';

const defaultForm = {
  titulo: '',
  empresa: '',
  status: 'Pendente',
  stack: '',
};

export function VagaModal({ open, onClose, onSubmit, initialData, isDeleting }) {
  const [form, setForm] = useState(defaultForm);

  useEffect(() => {
    if (!open) return;
    setForm(initialData ?? defaultForm);
  }, [initialData, open]);

  const handleChange = (field) => (event) => {
    setForm((current) => ({ ...current, [field]: event.target.value }));
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 px-4 py-6 backdrop-blur-sm">
      <div className="w-full max-w-2xl rounded-[32px] border border-white/10 bg-slate-900/95 p-6 shadow-glow backdrop-blur-xl">
        <div className="mb-6 flex items-start justify-between gap-4">
          <div>
            <p className="text-sm uppercase tracking-[0.28em] text-violet-300/80">{isDeleting ? 'Confirmar exclusão' : initialData ? 'Editar vaga' : 'Nova vaga'}</p>
            <h2 className="mt-3 text-3xl font-semibold text-white">{isDeleting ? 'Tem certeza?' : initialData ? 'Atualize os detalhes' : 'Adicionar nova oportunidade'}</h2>
          </div>
          <button type="button" onClick={onClose} className="text-slate-400 transition hover:text-white">
            <X size={24} />
          </button>
        </div>

        {isDeleting ? (
          <div className="rounded-3xl border border-red-500/20 bg-red-500/10 p-6 text-slate-100">
            <p>Essa ação irá remover permanentemente a vaga selecionada. Deseja continuar?</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => onSubmit(form)}
                className="rounded-3xl bg-red-500 px-6 py-3 text-sm font-semibold text-white transition hover:bg-red-400"
              >
                Sim, deletar
              </button>
              <button
                type="button"
                onClick={onClose}
                className="rounded-3xl border border-white/10 bg-slate-950 px-6 py-3 text-sm text-slate-200 transition hover:bg-slate-900"
              >
                Cancelar
              </button>
            </div>
          </div>
        ) : (
          <form
            onSubmit={(event) => {
              event.preventDefault();
              onSubmit(form);
            }}
            className="grid gap-4"
          >
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="space-y-2 text-sm text-slate-200">
                Título
                <input
                  required
                  value={form.titulo}
                  onChange={handleChange('titulo')}
                  className="w-full rounded-3xl border border-white/10 bg-slate-950/90 px-4 py-3 text-white outline-none transition focus:border-violet-500"
                />
              </label>
              <label className="space-y-2 text-sm text-slate-200">
                Empresa
                <input
                  required
                  value={form.empresa}
                  onChange={handleChange('empresa')}
                  className="w-full rounded-3xl border border-white/10 bg-slate-950/90 px-4 py-3 text-white outline-none transition focus:border-violet-500"
                />
              </label>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <label className="space-y-2 text-sm text-slate-200">
                Status
                <select
                  required
                  value={form.status}
                  onChange={handleChange('status')}
                  className="w-full rounded-3xl border border-white/10 bg-slate-950/90 px-4 py-3 text-white outline-none transition focus:border-violet-500"
                >
                  <option>Pendente</option>
                  <option>Entrevista</option>
                  <option>Oferta</option>
                  <option>Rejeitada</option>
                </select>
              </label>
              <label className="space-y-2 text-sm text-slate-200">
                Stack
                <input
                  required
                  value={form.stack}
                  onChange={handleChange('stack')}
                  placeholder="Java, Spring, PostgreSQL"
                  className="w-full rounded-3xl border border-white/10 bg-slate-950/90 px-4 py-3 text-white outline-none transition focus:border-violet-500"
                />
              </label>
            </div>

            <div className="mt-4 flex flex-wrap gap-3">
              <button
                type="submit"
                className="rounded-3xl bg-violet-500 px-6 py-3 text-sm font-semibold text-white transition hover:bg-violet-400"
              >
                {initialData ? 'Salvar alterações' : 'Criar vaga'}
              </button>
              <button
                type="button"
                onClick={onClose}
                className="rounded-3xl border border-white/10 bg-slate-950 px-6 py-3 text-sm text-slate-200 transition hover:bg-slate-900"
              >
                Fechar
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
