import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080/vagas',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const vagaService = {
  getAll: () => api.get('/'),
  create: (vaga) => api.post('/', vaga),
  update: (id, vaga) => api.put(`/${id}`, vaga),
  remove: (id) => api.delete(`/${id}`),
};
