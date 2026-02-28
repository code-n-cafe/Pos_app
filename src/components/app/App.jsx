import { BrowserRouter as Router } from 'react-router-dom';
import Navbar  from '../navbar/navbar';
import Footer from '../footer/FFooter';
import MainRouter from '../../../MainRouter';
import { AuthProvider } from '../../context/AuthContext.jsx';
import './App.css';

const App = () => {
 return (
    <div className="app-container">
        <AuthProvider>
            <Router>
                <Navbar/>
                <MainRouter/>
                <Footer/>
            </Router>
        </AuthProvider>
    </div>
 );
 };

export default App;
