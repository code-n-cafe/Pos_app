import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Navbar  from '../navbar/navbar';
import Menu  from '../menu/Menu.jsx';
import Footer from '../footer/FFooter';
import LogIn from '../login/LogIn';
import Bookings from '../booking/Bookings';
import MainRouter from '../../../MainRouter';
import SignUp from '../signup/SignUp';
import Contact from '../contact/Contact.jsx';
import Giftcard from '../giftcard/Giftcard';
import { AuthProvider } from '../../context/AuthContext.jsx';

const App = () => {
 return (
    <AuthProvider>
        <Router>
        <Navbar/>
        <MainRouter/>
        <Menu/>
        <LogIn/>
        <SignUp/>
        <Bookings/>
        <Contact/>
        <Giftcard/>
        <Footer/>
        </Router>
    </AuthProvider>
 );
 };

export default App;
