import { Link } from 'react-router-dom'

function HomePage() {
  return (
    <>
      <section className="banner">
        <h2>Quản lý cơ sở vật chất</h2>
        <p>Quản lý tài sản, thiết bị và phòng học một cách hiệu quả</p>
        <Link to="/about-us" className="banner-button">
          Bắt đầu
        </Link>
      </section>

      <section className="features">
        <Link to="/rooms" className="card-link">
        <div className="card">
          <h3>Quản lý phòng</h3>
          <p>Theo dõi trạng thái và thông tin các phòng học, phòng lab, phòng chức năng.</p>
        </div>
        </Link>
        
        <Link to="/devices" className="card-link">  
        <div className="card">
          <h3>Quản lý thiết bị</h3>
          <p>Danh sách thiết bị, tình trạng sử dụng và vị trí của từng tài sản.</p>
        </div>
        </Link>
       <Link to="/borrow-return" className="card-link">   
        <div className="card">
          <h3>Mượn / Trả</h3>
          <p>Quản lý lịch sử mượn trả thiết bị, hỗ trợ kiểm tra nhanh tình trạng bàn giao.</p>
        </div>
        </Link>
         <Link to="/statistics" className="card-link">  
        <div className="card">
          <h3>Thống kê</h3>
          <p>Tổng hợp số liệu sử dụng cơ sở vật chất để hỗ trợ quản lý hiệu quả hơn.</p>
        </div>
        </Link>
      </section>
    </>
  )
}

export default HomePage