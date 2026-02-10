import { Mail, Linkedin, Github, Zap, Phone } from "lucide-react";
import ContactCard from "../components/ui/ContactCard";

export default function Contact() {
  return (
    <section
      id="contact"
      className="max-w-6xl mx-auto px-4 sm:px-6 py-24"
    >
      <div className="mb-12 text-center">
        <h2 className="text-3xl font-bold text-zinc-900 dark:text-blue-400">
          Contato
        </h2>
        <p className="mt-3 text-zinc-600 dark:text-zinc-400">
          Vamos conversar? Escolha uma das opções abaixo.
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <ContactCard
          icon={Mail}
          title="Email"
          description="marcosconde@email.com"
          href="mailto:marcosconde@email.com"
          action="Enviar email"
        />

        <ContactCard
          icon={Phone}
          title="WhatsApp"
          description="+55 (71) 99958-0785"
          href="https://wa.me/5571999580785"
          action="Chamar no WhatsApp"
        />

        <ContactCard
          icon={Linkedin}
          title="LinkedIn"
          description="Conecte-se comigo"
          href="https://www.linkedin.com/in/marcos-conde-481627285/"
          action="Abrir LinkedIn"
        />
      </div>
    </section>
  );
}
