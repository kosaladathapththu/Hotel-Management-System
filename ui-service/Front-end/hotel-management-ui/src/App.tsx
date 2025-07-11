import { Routes, Route } from 'react-router-dom'
import MainDashboard from './pages/MainDashboard'   // 🧍 Guest Home Page
import Login from './pages/Login'                   // 👤 User Login
import Register from './pages/Register'             // 📝 User Register
import Dashboard from './pages/Dashboard'           // ✅ User Dashboard after login
import BookingPage from './pages/BookingPage'       // 📅 Booking
import AdminLogin from './pages/AdminLogin'         // 🛡️ Admin Login

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainDashboard />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/booking" element={<BookingPage />} />
      <Route path="/admin" element={<AdminLogin />} />
    </Routes>
  )
}

export default App
