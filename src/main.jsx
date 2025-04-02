import React from 'react'
 import { Route, Routes } from 'react-router-dom'
 import ReactDOM from 'react-dom/client'
 import App from './App.jsx'
import './index.css'
import './main.jsx'
import './SignUp.jsx'
import './LogIn.jsx'


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App/>
  </React.StrictMode>
)