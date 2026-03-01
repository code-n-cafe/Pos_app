import ReactDOM from 'react-dom/client'
import App from './components/app/App.jsx'
import './index.css'
import { AuthProvider } from './context/AuthContext.jsx'
import { HashRouter } from 'react-router-dom';


ReactDOM.createRoot(document.getElementById('root')).render(
  <HashRouter>
    <AuthProvider>
      <App />
    </AuthProvider>
  </HashRouter>
);