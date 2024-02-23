import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { AuthProvider } from './context/AuthProvider.jsx';
import { ClerkProvider } from '@clerk/clerk-react';
import './config/firebase-config.js';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ClerkProvider publishableKey='pk_test_Zmx1ZW50LXB1cC0xLmNsZXJrLmFjY291bnRzLmRldiQ'>
    <AuthProvider>
      <App />
    </AuthProvider>
    </ClerkProvider>
  </React.StrictMode>,
)
