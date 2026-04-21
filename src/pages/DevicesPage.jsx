import { useEffect, useState } from 'react'
import { deviceApi } from '../api/deviceApi'

const emptyForm = { code: '', name: '', status: '', room: '' }

function DevicesPage() {
  const [devices, setDevices] = useState([])
  const [form, setForm] = useState(emptyForm)
  const [editingId, setEditingId] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const loadDevices = async () => {
    try {
      setLoading(true)
      const response = await deviceApi.getAll()
      setDevices(response.data)
      setError('')
    } catch (err) {
      setError('Không thể tải danh sách thiết bị. Hãy kiểm tra Back-end đã chạy chưa.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadDevices()
  }, [])

  const handleChange = (event) => {
    const { name, value } = event.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    if (!form.code || !form.name || !form.status) {
      setError('Vui lòng nhập mã, tên và trạng thái thiết bị.')
      return
    }

    try {
      if (editingId) {
        await deviceApi.update(editingId, form)
      } else {
        await deviceApi.create(form)
      }

      setForm(emptyForm)
      setEditingId(null)
      await loadDevices()
    } catch (err) {
      setError('Không thể lưu dữ liệu thiết bị.')
    }
  }

  const handleEdit = (device) => {
    setEditingId(device.id)
    setForm({
      code: device.code,
      name: device.name,
      status: device.status,
      room: device.room || '',
    })
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Bạn có chắc muốn xóa thiết bị này?')) return

    try {
      await deviceApi.remove(id)
      await loadDevices()
    } catch (err) {
      setError('Không thể xóa thiết bị.')
    }
  }

  const handleCancel = () => {
    setEditingId(null)
    setForm(emptyForm)
  }

  return (
    <section className="page">
      <h2>Danh sách thiết bị</h2>
      <p>Trang này lấy dữ liệu thiết bị từ API ASP.NET Core thông qua Axios.</p>

      <form className="api-form" onSubmit={handleSubmit}>
        <input name="code" placeholder="Mã thiết bị" value={form.code} onChange={handleChange} />
        <input name="name" placeholder="Tên thiết bị" value={form.name} onChange={handleChange} />
        <input name="status" placeholder="Tình trạng" value={form.status} onChange={handleChange} />
        <input name="room" placeholder="Vị trí / Phòng" value={form.room} onChange={handleChange} />
        <button type="submit">{editingId ? 'Cập nhật thiết bị' : 'Thêm thiết bị'}</button>
        {editingId && <button type="button" className="secondary-button" onClick={handleCancel}>Hủy</button>}
      </form>

      {error && <p className="error-message">{error}</p>}
      {loading && <p>Đang tải dữ liệu...</p>}

      <div className="page-grid">
        {devices.map((device) => (
          <div className="card" key={device.id}>
            <h3>{device.name}</h3>
            <p>Mã thiết bị: {device.code}</p>
            <p>Tình trạng: {device.status}</p>
            <p>Vị trí: {device.room || 'Chưa cập nhật'}</p>
            <div className="card-actions">
              <button onClick={() => handleEdit(device)}>Sửa</button>
              <button className="danger-button" onClick={() => handleDelete(device.id)}>Xóa</button>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default DevicesPage
