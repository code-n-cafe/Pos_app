import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Navbar  from './navbar';
import Menu  from './Menu';
import Footer from './FFooter';
//import Projects from './Projects';
import Bookings from './Bookings';
 //import { ThemeProvider } from '@material-ui/styles';
 import MainRouter from '../MainRouter';
 import Contact from './Contact';
import Giftcard from './Giftcard';
 //import theme from '../theme';
 //import { hot } from 'react-hot-loader'

 /// testing

const App = () => {
 return (
 <Router>
<Navbar/>
 <MainRouter />
<Footer/>
 </Router>
  
 );
 };

export default App;
