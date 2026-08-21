import Navbar from './components/layout/Navbar'
import Home from './pages/Home'
import About from './pages/About'
import Experience from './pages/Experience'
import Projects from './pages/Projects'
import Skills from './pages/Skills'
import Contact from './pages/Contact'
import Footer from './components/layout/Footer'
import Marquee from './components/ui/Marquee'
// import BassBand from './components/sections/BassBand'

const FAIXA = [
  "Desenvolvedor Full Stack",
  "Contrabaixista",
  "Salvador / BA",
]

function App() {
  return (
    <>
      <Navbar />
      <main>
        <Home />
        {/* Toque 1 de 4 da musica. */}
        <Marquee items={FAIXA} />
        <About />
        <Experience />
        <Projects />
        {/*
          Toque 3 de 4. Descomentar quando public/marcos-contrabaixo.jpeg
          existir — uma faixa sem imagem e pior que faixa nenhuma.
          <BassBand />
        */}
        <Skills />
        <Marquee items={FAIXA} speed={0.4} />
        <Contact />
      </main>
      <Footer />
    </>
  )
}

export default App
