import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { AuthProvider } from './context/AuthProvider.jsx';
import './config/firebase-config.js';
import { ProfileProvider } from './components/context/ProfileContext.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ProfileProvider>
      <AuthProvider>
        <App />
      </AuthProvider>
    </ProfileProvider>
  </React.StrictMode>,
)
