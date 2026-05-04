import { useEffect, useMemo, useState } from 'react';
import { CheckCircle2, XCircle } from 'lucide-react';
import { Sidebar } from './components/Sidebar.jsx';
import { StatsCards } from './components/StatsCards.jsx';
import { VagasTable } from './components/VagasTable.jsx';
import { VagaModal } from './components/VagaModal.jsx';
import { vagaService } from './services/vagaService.js';

const initialModalState = { open: false, editing: null, deleting: false };

export default function App() {
  const [vagas, setVagas] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modal, setModal] = useState(initialModalState);
  const [toast, setToast] = useState(null);

  const stats = useMemo(() => {
    const entrevista = vagas.filter((v) => v.status === 'Entrevista').length;
    const ofertas = vagas.filter((v) => v.status === 'Oferta').length;
    const outros = vagas.filter((v) => !['Entrevista', 'Oferta'].includes(v.status)).length;
    return { total: vagas.length, entrevista, ofertas, outros };
  }, [vagas]);

  useEffect(() => {
    fetchVagas();
  }, []);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3500);
  };

  const fetchVagas = async () => {
    setLoading(true);
    try {
      const response = await vagaService.getAll();
      setVagas(response.data ?? []);
    } catch {
      showToast('Não foi possível conectar à API. Verifique se o backend está rodando.', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleOpenCreate = () => setModal({ open: true, editing: null, deleting: false });
  const handleOpenEdit = (vaga) => setModal({ open: true, editing: vaga, deleting: false });
  const handleOpenDelete = (vaga) => setModal({ open: true, editing: vaga, deleting: true });
  const handleCloseModal = () => setModal(initialModalState);

  const handleSubmit = async (formData) => {
    setLoading(true);
    try {
      if (modal.deleting && modal.editing) {
        await vagaService.remove(modal.editing.id);
        showToast('Vaga removida com sucesso.');
      } else if (modal.editing) {
        await vagaService.update(modal.editing.id, formData);
        showToast('Vaga atualizada com sucesso.');
      } else {
        await vagaService.create(formData);
        showToast('Vaga criada com sucesso.');
      }
      await fetchVagas();
      handleCloseModal();
    } catch {
      showToast('Erro ao salvar. Tente novamente.', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      {toast && (
        <div
          className={`fixed right-5 top-5 z-[100] flex items-center gap-3 rounded-2xl px-5 py-4 text-sm font-medium shadow-xl transition-all ${
            toast.type === 'error'
              ? 'border border-red-500/30 bg-red-950/90 text-red-200'
              : 'border border-violet-500/30 bg-violet-950/90 text-violet-100'
          }`}
        >
          {toast.type === 'error'
            ? <XCircle size={18} className="text-red-400" />
            : <CheckCircle2 size={18} className="text-violet-400" />}
          {toast.message}
        </div>
      )}

      <div className="grid min-h-screen grid-cols-1 lg:grid-cols-[18rem_1fr]">
        <Sidebar />
        <main className="px-6 py-8 sm:px-10">
          <header className="mb-8 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.35em] text-violet-400/80">Dashboard</p>
              <h1 className="mt-2 text-4xl font-bold tracking-tight text-white">DevLog</h1>
              <p className="mt-2 max-w-xl text-sm text-slate-400">
                Monitore vagas, gerencie entrevistas e mantenha seu histórico organizado.
              </p>
            </div>
            <div className="rounded-2xl border border-violet-500/20 bg-slate-900/80 px-5 py-4 shadow-glow">
              <p className="text-xs uppercase tracking-[0.35em] text-slate-500">Status da API</p>
              <div className="mt-2 flex items-center gap-2">
                <span className={`h-2 w-2 rounded-full ${loading ? 'animate-pulse bg-yellow-400' : 'bg-emerald-400'}`} />
                <p className="text-base font-semibold text-white">{loading ? 'Sincronizando...' : 'Conectado'}</p>
              </div>
            </div>
          </header>

          <section className="mb-8">
            <StatsCards stats={stats} />
          </section>

          <section>
            <VagasTable
              vagas={vagas}
              loading={loading}
              onEdit={handleOpenEdit}
              onDelete={handleOpenDelete}
              onCreate={handleOpenCreate}
            />
          </section>

          <VagaModal
            open={modal.open}
            onClose={handleCloseModal}
            initialData={modal.editing}
            isDeleting={modal.deleting}
            onSubmit={handleSubmit}
            loading={loading}
          />
        </main>
      </div>
    </div>
  );
}
