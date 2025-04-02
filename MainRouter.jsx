import React from 'react'
 import { Route, Routes } from 'react-router-dom'
 import Home from './components/Home'
 import About from './src/Menu'
 import SignUp from './src/SignUp'
 import Contact from './src/Contact'
 import Services from './src/Bookings'
 import LogIn from './src/LogIn' 

//  import Education from './src/education'
 import Projects from './src/Giftcard'
//  import Layout from ‘./components/Layout’

const MainRouter = () => {
 return (<div>
 {/* <Layout/> */}
 <Routes>
 <Route exact path="/" element={<Home />} />
 <Route exact path="/about" element={<About />} />
 {/* <Route exact path="/education" element={<Education />} /> */}
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


