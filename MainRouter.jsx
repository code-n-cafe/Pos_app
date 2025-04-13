import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './src/components/home/Home'
import About from './src/components/menu/Menu'
import SignUp from './src/components/signup/SignUp'
import Contact from './src/components/contact/Contact'
import Services from './src/components/booking/Bookings'
import LogIn from './src/components/login/LogIn'
import Reservation from './src/components/booking/Reservation'
import PrivateRoute from './src/components/lib/PrivateRoute'
import Profile from './src/profile/Profile'
import EditProfile from './src/profile/EditProfile'

//  import Education from './src/education'
 import Projects from './src/components/giftcard/Giftcard'
//  import Layout from ‘./components/Layout’

const MainRouter = () => {
 return (<div>
<Routes>
    <Route exact path="/" element={<Home />} />
    <Route exact path="/about" element={<About />} />
    <Route exact path="/projects" element={<Projects />} /> 
    <Route exact path="/contact" element={<Contact />} />
    <Route exact path="/Services" element={<Services />} /> 
    <Route exact path="/SignUp" element={<SignUp/>}/>
    <Route exact path="/LogIn" element={<LogIn />} />
    <Route
        path="/profile"
        element={
        <PrivateRoute>
        <Profile />
        </PrivateRoute>
        }
        />
    <Route exact path="/profile/edit" element={
        <PrivateRoute>
        <EditProfile />
        </PrivateRoute>
        } />
</Routes>    
 </div>
 )
 }
 export default MainRouter


