import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import './components/AppRouter';
import AppRouter from './components/AppRouter';
import { AuthProvider } from './context/AuthProvider';

function App() {
  
  return (
    <div className='app-div'>
      <AuthProvider>
        <AppRouter/>
      </AuthProvider>
    </div>
  )
}

export default App
