import React from 'react'
 import { Route, Routes } from 'react-router-dom'
import Home from './src/components/home/Home'
 import About from './src/components/menu/Menu'
 import SignUp from './src/components/signup/SignUp'
 import Contact from './src/Contact'
 import Services from './src/components/booking/Bookings'
 import LogIn from './src/components/login/LogIn' 

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
 </Routes>
 </div>
 )
 }
 export default MainRouter


