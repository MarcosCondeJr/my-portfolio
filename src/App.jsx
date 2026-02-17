import './App.css'
import Navbar from './components/layout/Navbar'
import Home from './pages/Home'
import About from './pages/About'
import Skills from './pages/Skills'
import Projects from './pages/Projects'
import Footer from './components/layout/Footer'
import Contact from './pages/Contact'
import ParallaxBackground from './components/background/ParallaxBackground'
import Experience from './pages/Experience'

function App() {
  return (
    <div>
      <ParallaxBackground />
      <main>
      <Navbar />
        <Home/>
        <About/>
        <Skills/>
        <Projects/>
        <Experience/>
        <Contact/>
        <Footer/>
      </main>
    </div>
  )
}

export default App
