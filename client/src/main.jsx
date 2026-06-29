import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import { CarOptionsProvider } from './context/CarOptionsContext'
import './index.css'
import 'picocss/pico.min.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <CarOptionsProvider>
        <App />
      </CarOptionsProvider>
    </BrowserRouter>
  </React.StrictMode>
)