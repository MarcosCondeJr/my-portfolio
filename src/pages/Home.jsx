export default function Home() {
  return (
    <section className="min-h-screen text-white flex items-center">
      <div className="max-w-6xl mx-auto px-6">
        <h1 className="text-4xl md:text-6xl font-bold leading-tight text-zinc-800 dark:text-white">
          Olá, eu sou <span className="text-blue-400">Marcos</span> 
        </h1>

        <p className="mt-6 text-zinc-400 max-w-xl">
          Desenvolvedor focado em criar aplicações modernas, performáticas e bem estruturadas.
        </p>

        <div className="mt-8 flex gap-4">
          <a
            href="#projects"
            className="bg-blue-100 hover:bg-blue-400 text-white px-6 py-3 rounded-md font-medium transition"
          >
            Ver Projetos
          </a>

          <a
            href="#contact"
            className="border border-zinc-700 hover:border-blue-400 px-6 py-3 rounded-md font-medium transition"
          >
            Contato
          </a>
        </div>
      </div>
    </section>
  );
}
