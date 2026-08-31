import React from 'react'
import ReactDOM from 'react-dom/client'
import '@fontsource/inter' // Self-hosted Inter — makes the 'Inter' declaration in index.css truthful (no render-blocking external request)
import App from './App.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)