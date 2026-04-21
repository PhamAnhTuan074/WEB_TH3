import { axiosClient } from './axiosClient'

export const borrowRecordApi = {
  getAll: () => axiosClient.get('/borrowrecords'),
  getById: (id) => axiosClient.get(`/borrowrecords/${id}`),
  create: (data) => axiosClient.post('/borrowrecords', data),
  update: (id, data) => axiosClient.put(`/borrowrecords/${id}`, data),
  remove: (id) => axiosClient.delete(`/borrowrecords/${id}`),
}
