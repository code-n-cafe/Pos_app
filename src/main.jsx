import React from 'react'
import { Route, Routes } from 'react-router-dom'
import ReactDOM from 'react-dom/client'
import App from './components/app/App.jsx'
import './index.css'
import SignUp from './components/signup/SignUp.jsx'
import LogIn from './components/login/LogIn.jsx'
import { AuthProvider } from './context/AuthContext.jsx'


ReactDOM.createRoot(document.getElementById('root')).render(
  <AuthProvider>
    <App />
  </AuthProvider>
);