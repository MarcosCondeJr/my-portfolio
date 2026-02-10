import './App.css'
import Navbar from './components/layout/Navbar'
import Home from './pages/Home'
import About from './pages/About'
import Skills from './pages/Skills'
import Projects from './pages/Projects'
import Footer from './components/layout/Footer'
import Contact from './pages/Contact'
import ParallaxBackground from './components/background/ParallaxBackground'

function App() {
  return (
    <div className=''>
      <ParallaxBackground />
      <Navbar />
      <main>
        <Home/>
        <About/>
        <Skills/>
        <Projects/>
        <Contact/>
        <Footer/>
      </main>
    </div>
  )
}

export default App
