export default function Home() {
  return (
    <section id="home" className="min-h-screen text-white flex items-center">
      <div className="max-w-6xl mx-auto px-6">

        <span className="text-lg  text-zinc-500 dark:text-zinc-400">
          Olá, eu sou
        </span>

        <h1 className="text-4xl md:text-6xl font-bold leading-tight text-zinc-800 dark:text-white">
          <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">Marcos Conde</span>
        </h1>

        <p className="mt-6 text-zinc-600 dark:text-zinc-400 max-w-xl">
          Desenvolvedor focado em criar aplicações modernas, performáticas e bem estruturadas.
        </p>
      

        {/* <div className="mt-8 flex gap-4">
          <a
            href="#projects"
            className="bg-gradient-to-r from-blue-400 to-cyan-400 text-transparent hover:bg-white text-white px-6 py-3 rounded-md font-medium transition"
          >
            <span className="dark:text-white text-blue-400">Ver Projetos</span>
          </a>

          <a
            href="#contact"
            className="border border-zinc-700 hover:border-blue-400 px-6 py-3 rounded-md font-medium transition"
          >
            <span className="text-blue-400">Contato</span>
          </a>
        </div> */}
      </div>
    </section>
  );
}
