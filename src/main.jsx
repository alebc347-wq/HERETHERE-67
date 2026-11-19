import React, { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { CoffeeProvider } from './context/CoffeeContext'
import App from './App.jsx'
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <CoffeeProvider>
        <App />
      </CoffeeProvider>
    </BrowserRouter>
  </StrictMode>,
)
