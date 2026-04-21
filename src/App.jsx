import { Routes, Route } from 'react-router-dom'
import './App.css'

import Header from './components/Header'
import Footer from './components/Footer'

import HomePage from './pages/HomePage'
import AboutUsPage from './pages/AboutUsPage'
import RoomsPage from './pages/RoomsPage'
import DevicesPage from './pages/DevicesPage'
import BorrowReturnPage from './pages/BorrowReturnPage'
import StatisticsPage from './pages/StatisticsPage'
import NotFoundPage from './pages/NotFoundPage'

function App() {
  return (
    <div className="container">
      <Header />

      <main className="main-content">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about-us" element={<AboutUsPage />} />
          <Route path="/rooms" element={<RoomsPage />} />
          <Route path="/devices" element={<DevicesPage />} />
          <Route path="/borrow-return" element={<BorrowReturnPage />} />
          <Route path="/statistics" element={<StatisticsPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>

      <Footer />
    </div>
  )
}

export default App