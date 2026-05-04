import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const vagaService = {
  getAll: () => api.get('/vagas'),
  create: (vaga) => api.post('/vagas', vaga),
  update: (id, vaga) => api.put(`/vagas/${id}`, vaga),
  remove: (id) => api.delete(`/vagas/${id}`),
};
