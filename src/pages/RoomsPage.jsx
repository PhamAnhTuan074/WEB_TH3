import { useEffect, useState } from 'react'
import { roomApi } from '../api/roomApi'

const emptyForm = { name: '', type: '', status: '' }

function RoomsPage() {
  const [rooms, setRooms] = useState([])
  const [form, setForm] = useState(emptyForm)
  const [editingId, setEditingId] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const loadRooms = async () => {
    try {
      setLoading(true)
      const response = await roomApi.getAll()
      setRooms(response.data)
      setError('')
    } catch (err) {
      setError('Không thể tải danh sách phòng. Hãy kiểm tra Back-end đã chạy chưa.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadRooms()
  }, [])

  const handleChange = (event) => {
    const { name, value } = event.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    if (!form.name || !form.type || !form.status) {
      setError('Vui lòng nhập đầy đủ thông tin phòng.')
      return
    }

    try {
      if (editingId) {
        await roomApi.update(editingId, form)
      } else {
        await roomApi.create(form)
      }

      setForm(emptyForm)
      setEditingId(null)
      await loadRooms()
    } catch (err) {
      setError('Không thể lưu dữ liệu phòng.')
    }
  }

  const handleEdit = (room) => {
    setEditingId(room.id)
    setForm({ name: room.name, type: room.type, status: room.status })
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Bạn có chắc muốn xóa phòng này?')) return

    try {
      await roomApi.remove(id)
      await loadRooms()
    } catch (err) {
      setError('Không thể xóa phòng.')
    }
  }

  const handleCancel = () => {
    setEditingId(null)
    setForm(emptyForm)
  }

  return (
    <section className="page">
      <h2>Danh sách phòng</h2>
      <p>Trang này gọi API Back-end bằng Axios với đủ GET, POST, PUT, DELETE.</p>

      <form className="api-form" onSubmit={handleSubmit}>
        <input name="name" placeholder="Tên phòng, ví dụ P101" value={form.name} onChange={handleChange} />
        <input name="type" placeholder="Loại phòng" value={form.type} onChange={handleChange} />
        <input name="status" placeholder="Trạng thái" value={form.status} onChange={handleChange} />
        <button type="submit">{editingId ? 'Cập nhật phòng' : 'Thêm phòng'}</button>
        {editingId && <button type="button" className="secondary-button" onClick={handleCancel}>Hủy</button>}
      </form>

      {error && <p className="error-message">{error}</p>}
      {loading && <p>Đang tải dữ liệu...</p>}

      <div className="page-grid">
        {rooms.map((room) => (
          <div className="card" key={room.id}>
            <h3>{room.name}</h3>
            <p>Loại phòng: {room.type}</p>
            <p>Trạng thái: {room.status}</p>
            <div className="card-actions">
              <button onClick={() => handleEdit(room)}>Sửa</button>
              <button className="danger-button" onClick={() => handleDelete(room.id)}>Xóa</button>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default RoomsPage
