import { useEffect, useMemo, useState } from 'react';
import { Sidebar } from './components/Sidebar.jsx';
import { StatsCards } from './components/StatsCards.jsx';
import { VagasTable } from './components/VagasTable.jsx';
import { VagaModal } from './components/VagaModal.jsx';
import { vagaService } from './services/vagaService.js';

const initialModalState = {
  open: false,
  editing: null,
  deleting: false,
};

export default function App() {
  const [vagas, setVagas] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modal, setModal] = useState(initialModalState);
  const [error, setError] = useState('');

  const stats = useMemo(() => {
    const entrevista = vagas.filter((item) => item.status === 'Entrevista').length;
    const ofertas = vagas.filter((item) => item.status === 'Oferta').length;
    const outros = vagas.filter((item) => !['Entrevista', 'Oferta'].includes(item.status)).length;
    return {
      total: vagas.length,
      entrevista,
      ofertas,
      outros,
    };
  }, [vagas]);

  useEffect(() => {
    fetchVagas();
  }, []);

  const fetchVagas = async () => {
    setLoading(true);
    setError('');

    try {
      const response = await vagaService.getAll();
      setVagas(response.data ?? []);
    } catch (err) {
      setError('Não foi possível carregar as vagas. Verifique se a API está rodando em http://localhost:8080/vagas');
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
    setError('');

    try {
      if (modal.deleting && modal.editing) {
        await vagaService.remove(modal.editing.id);
      } else if (modal.editing) {
        await vagaService.update(modal.editing.id, formData);
      } else {
        await vagaService.create(formData);
      }
      await fetchVagas();
      handleCloseModal();
    } catch (err) {
      setError('Erro ao salvar. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <div className="grid min-h-screen grid-cols-1 lg:grid-cols-[18rem_1fr]">
        <Sidebar />
        <main className="px-6 py-8 sm:px-10">
          <header className="mb-8 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-violet-300/80">Dashboard</p>
              <h1 className="mt-3 text-4xl font-semibold text-white">DevLog</h1>
              <p className="mt-2 max-w-2xl text-slate-400">Monitore vagas, gerencie entrevistas e mantenha seu histórico de estudos sempre organizado.</p>
            </div>
            <div className="rounded-[28px] border border-violet-500/20 bg-slate-900/80 px-5 py-4 shadow-glow">
              <p className="text-xs uppercase tracking-[0.35em] text-slate-400">Status</p>
              <p className="mt-2 text-2xl font-semibold text-white">{loading ? 'Sincronizando...' : 'Pronto'}</p>
            </div>
          </header>

          <section className="mb-8">
            <StatsCards stats={stats} />
          </section>

          {error ? (
            <div className="mb-6 rounded-3xl border border-red-500/20 bg-red-500/10 p-4 text-slate-100">
              {error}
            </div>
          ) : null}

          <section>
            <VagasTable vagas={vagas} onEdit={handleOpenEdit} onDelete={handleOpenDelete} onCreate={handleOpenCreate} />
          </section>

          <VagaModal
            open={modal.open}
            onClose={handleCloseModal}
            initialData={modal.editing}
            isDeleting={modal.deleting}
            onSubmit={handleSubmit}
          />
        </main>
      </div>
    </div>
  );
}
