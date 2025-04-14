import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import axios from 'axios'

// Set up axios defaults
// In production, use relative URLs which will automatically target the same domain
// In development, use localhost:5000
axios.defaults.baseURL = import.meta.env.PROD ? '' : 'http://localhost:5000'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
