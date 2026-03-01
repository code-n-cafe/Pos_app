import Navbar  from '../navbar/navbar';
import Footer from '../footer/FFooter';
import MainRouter from '../../../MainRouter';
import { AuthProvider } from '../../context/AuthContext.jsx';
import './App.css';

const App = () => {
 return (
    <div className="app-container">
        <AuthProvider>
            <Navbar/>
            <MainRouter/>
            <Footer/>
        </AuthProvider>
    </div>
 );
 };

export default App;
