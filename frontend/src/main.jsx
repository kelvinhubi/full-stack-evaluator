import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

const user = true; // Change to an object like {} to simulate a logged-in user

if (user) {
  createRoot(document.getElementById('root')).render(
    <StrictMode>
      <App />
    </StrictMode>);
}

