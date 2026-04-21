import { NavLink } from 'react-router-dom'

function Header() {
  const navItems = [
    { path: '/', label: 'Trang chủ' },
    { path: '/about-us', label: 'Giới thiệu' },
    { path: '/rooms', label: 'Phòng' },
    { path: '/devices', label: 'Thiết bị' },
    { path: '/borrow-return', label: 'Mượn trả' },
    { path: '/statistics', label: 'Thống kê' },
  ]

  return (
    <header className="header">
      <h1>Hệ thống quản lý cơ sở vật chất</h1>

      <nav>
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.path === '/'}
            className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
          >
            {item.label}
          </NavLink>
        ))}
      </nav>
    </header>
  )
}

export default Header