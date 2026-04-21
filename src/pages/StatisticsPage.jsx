import { useEffect, useState } from 'react'
import { roomApi } from '../api/roomApi'
import { deviceApi } from '../api/deviceApi'
import { borrowRecordApi } from '../api/borrowRecordApi'

function StatisticsPage() {
  const [stats, setStats] = useState([
    { title: 'Tổng số phòng', value: 0 },
    { title: 'Tổng số thiết bị', value: 0 },
    { title: 'Thiết bị bảo trì', value: 0 },
    { title: 'Lượt mượn/trả', value: 0 },
  ])
  const [error, setError] = useState('')

  useEffect(() => {
    const loadStats = async () => {
      try {
        const [roomsRes, devicesRes, recordsRes] = await Promise.all([
          roomApi.getAll(),
          deviceApi.getAll(),
          borrowRecordApi.getAll(),
        ])

        const rooms = roomsRes.data
        const devices = devicesRes.data
        const records = recordsRes.data

        setStats([
          { title: 'Tổng số phòng', value: rooms.length },
          { title: 'Tổng số thiết bị', value: devices.length },
          { title: 'Thiết bị bảo trì', value: devices.filter((x) => x.status?.toLowerCase().includes('bảo trì')).length },
          { title: 'Lượt mượn/trả', value: records.length },
        ])
      } catch (err) {
        setError('Không thể tải thống kê từ Back-end.')
      }
    }

    loadStats()
  }, [])

  return (
    <section className="page">
      <h2>Thống kê</h2>
      <p>Dữ liệu thống kê được tính từ API Rooms, Devices và BorrowRecords.</p>
      {error && <p className="error-message">{error}</p>}
      <div className="page-grid">
        {stats.map((stat) => (
          <div className="card" key={stat.title}>
            <h3>{stat.title}</h3>
            <p className="stat-number">{stat.value}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

export default StatisticsPage
