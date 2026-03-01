import { HashRouter, Route, Routes, Navigate } from 'react-router-dom'
import Home from './src/components/home/Home'
import Menu from './src/components/menu/Menu' // Changed from About to Menu
import SignUp from './src/components/signup/SignUp'
import Contact from './src/components/contact/Contact'
import Bookings from './src/components/booking/Bookings' // Changed from Services to Bookings
import LogIn from './src/components/login/LogIn'
import Reservation from './src/components/booking/Reservation'
import PrivateRoute from './src/components/lib/PrivateRoute'
import Profile from './src/profile/Profile'
import EditProfile from './src/profile/EditProfile'
import Giftcard from './src/components/giftcard/Giftcard' // Changed from Projects to Giftcard

const MainRouter = () => {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/giftcard" element={<Giftcard />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/bookings" element={<Bookings />} /> 
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/reservation" element={<Reservation />} />

        {/* Private Routes */}
        <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
        <Route path="/profile/edit" element={<PrivateRoute><EditProfile /></PrivateRoute>} />

        {/* Add catch-all route */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </HashRouter>
  )
}

export default MainRouter