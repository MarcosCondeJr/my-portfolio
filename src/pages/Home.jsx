export default function Home() {
  return (
    <section id="home" className="min-h-screen text-white flex items-center">
      <div className="max-w-6xl mx-auto px-6">

        <span className="text-lg  text-zinc-600 dark:text-zinc-400">
          Olá, eu sou
        </span>

        <h1
          className="
            text-[3rem]
            lg:text-[5rem]
            font-bold
            leading-none
            tracking-tight
            text-zinc-900 dark:text-white
          "
        >
          <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
            Marcos Conde
          </span>
        </h1>

        <h2 className="mt-4 text-xl md:text-2xl font-medium text-zinc-600 dark:text-zinc-400">
          &lt;Desenvolvedor <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent"><i>FullStack</i> </span>/&gt;
        </h2>

        <div className="mt-10 flex justify-center flex-wrap gap-4">
  
        {/* Botão principal */}
        <a
          href="#projects"
          className="
            px-6 py-3
            text-sm font-medium
            rounded-full
            bg-blue-400/10
            text-blue-400
            border border-blue-400/20
            backdrop-blur-sm
            transition
            hover:bg-transparent hover:text-blue-400
          "
        >
          Ver Projetos
        </a>

        {/* Botão secundário */}
        <a
          href="#contact"
          className="
            px-6 py-3
            text-sm font-medium
            rounded-full
            border border-zinc-300 dark:border-zinc-700
            text-zinc-700 dark:text-zinc-300
            backdrop-blur-md
            transition
            hover:bg-white/60 hover:text-blue-400
          "
        >
          Entrar em contato
        </a>

      </div>

      </div>
    </section>
  );
}
