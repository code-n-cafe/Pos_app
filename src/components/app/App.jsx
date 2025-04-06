import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Navbar  from '../navbar/navbar';
import Menu  from '../menu/Menu';
import Footer from '../footer/FFooter';
import LogIn from '../login/LogIn';
import Bookings from '../booking/Bookings';
 //import { ThemeProvider } from '@material-ui/styles';
 import MainRouter from '../../../MainRouter';
import SignUp from '../signup/SignUp';
 import Contact from '../../Contact';
import Giftcard from '../giftcard/Giftcard';
 //import theme from '../theme';
 //import { hot } from 'react-hot-loader'

 /// testing

const App = () => {
 return (
 <Router>
 <Navbar/>
 <MainRouter/>
 <Footer/>
 </Router>
  
 );
 };

export default App;
