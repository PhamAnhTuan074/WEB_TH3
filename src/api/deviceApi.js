import { axiosClient } from './axiosClient'

export const deviceApi = {
  getAll: () => axiosClient.get('/devices'),
  getById: (id) => axiosClient.get(`/devices/${id}`),
  create: (data) => axiosClient.post('/devices', data),
  update: (id, data) => axiosClient.put(`/devices/${id}`, data),
  remove: (id) => axiosClient.delete(`/devices/${id}`),
}
