import { useEffect, useState } from 'react'
import { borrowRecordApi } from '../api/borrowRecordApi'

const emptyForm = { itemName: '', borrower: '', status: '' }

function BorrowReturnPage() {
  const [records, setRecords] = useState([])
  const [form, setForm] = useState(emptyForm)
  const [editingId, setEditingId] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const loadRecords = async () => {
    try {
      setLoading(true)
      const response = await borrowRecordApi.getAll()
      setRecords(response.data)
      setError('')
    } catch (err) {
      setError('Không thể tải lịch sử mượn/trả. Hãy kiểm tra Back-end đã chạy chưa.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadRecords()
  }, [])

  const handleChange = (event) => {
    const { name, value } = event.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    if (!form.itemName || !form.borrower || !form.status) {
      setError('Vui lòng nhập đầy đủ thông tin mượn/trả.')
      return
    }

    try {
      if (editingId) {
        await borrowRecordApi.update(editingId, form)
      } else {
        await borrowRecordApi.create(form)
      }

      setForm(emptyForm)
      setEditingId(null)
      await loadRecords()
    } catch (err) {
      setError('Không thể lưu dữ liệu mượn/trả.')
    }
  }

  const handleEdit = (record) => {
    setEditingId(record.id)
    setForm({
      itemName: record.itemName,
      borrower: record.borrower,
      status: record.status,
    })
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Bạn có chắc muốn xóa phiếu này?')) return

    try {
      await borrowRecordApi.remove(id)
      await loadRecords()
    } catch (err) {
      setError('Không thể xóa phiếu mượn/trả.')
    }
  }

  const handleCancel = () => {
    setEditingId(null)
    setForm(emptyForm)
  }

  return (
    <section className="page">
      <h2>Quản lý mượn / trả</h2>
      <p>Trang này thao tác với API BorrowRecords bằng POST, GET, PUT, DELETE.</p>

      <form className="api-form" onSubmit={handleSubmit}>
        <input name="itemName" placeholder="Tên thiết bị" value={form.itemName} onChange={handleChange} />
        <input name="borrower" placeholder="Người mượn" value={form.borrower} onChange={handleChange} />
        <input name="status" placeholder="Trạng thái" value={form.status} onChange={handleChange} />
        <button type="submit">{editingId ? 'Cập nhật phiếu' : 'Thêm phiếu'}</button>
        {editingId && <button type="button" className="secondary-button" onClick={handleCancel}>Hủy</button>}
      </form>

      {error && <p className="error-message">{error}</p>}
      {loading && <p>Đang tải dữ liệu...</p>}

      <div className="page-grid">
        {records.map((record) => (
          <div className="card" key={record.id}>
            <h3>{record.itemName}</h3>
            <p>Người mượn: {record.borrower}</p>
            <p>Trạng thái: {record.status}</p>
            <div className="card-actions">
              <button onClick={() => handleEdit(record)}>Sửa</button>
              <button className="danger-button" onClick={() => handleDelete(record.id)}>Xóa</button>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default BorrowReturnPage
