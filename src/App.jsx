import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Navbar from './components/layout/Navbar'
import Home from './pages/Home'

function App() {
  return (
    <div className=''>
      <Navbar />
      <main className="pt-10">
        <Home />
      </main>
    </div>
  )
}

export default App
