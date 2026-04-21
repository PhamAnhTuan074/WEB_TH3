import { Link } from 'react-router-dom'

function NotFoundPage() {
  return (
    <section className="page not-found">
      <h2>404 - Không tìm thấy trang</h2>
      <p>Đường dẫn bạn truy cập không tồn tại trong hệ thống.</p>
      <Link to="/" className="banner-button">
        Quay về trang chủ
      </Link>
    </section>
  )
}

export default NotFoundPage