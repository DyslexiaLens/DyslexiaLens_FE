import React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { Analytics } from '@vercel/analytics/react'
import App from './App'
import { AppProvider } from './context/AppContext'
import './index.css'

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AppProvider>
      <BrowserRouter>
        <App />
        <Analytics />
      </BrowserRouter>
    </AppProvider>
  </React.StrictMode>
)
