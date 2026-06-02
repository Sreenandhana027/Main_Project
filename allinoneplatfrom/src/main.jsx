import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { HashRouter } from "react-router-dom";
import { GoogleOAuthProvider } from '@react-oauth/google';
import SearchContextShare from './context/SearchContextShare.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HashRouter>
      <GoogleOAuthProvider clientId={import.meta.env.VITE_CLIENTID}>
        <SearchContextShare>
          <App />
        </SearchContextShare>
      </GoogleOAuthProvider>
    </HashRouter>
  </StrictMode>
)