import { Mail, Linkedin, Phone } from "lucide-react";
import ContactCard from "../components/ui/ContactCard";
import Section from "../components/layout/Section";
import Reveal from "../components/motion/Reveal";

export default function Contact() {
  return (
    <Section
      tone="dark"
      id="contact"
      number="06"
      label="Contato"
      title={["Vamos", "conversar"]}
    >
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <Reveal delay={0} className="h-full">
          <ContactCard
            icon={Mail}
            title="Email"
            description="marcos14conde@hotmail.com"
            href="mailto:marcos14conde@hotmail.com"
            action="Enviar email"
          />
        </Reveal>

        <Reveal delay={0.08} className="h-full">
          <ContactCard
            icon={Phone}
            title="WhatsApp"
            description="+55 (71) 99958-0785"
            href="https://wa.me/5571999580785"
            action="Chamar no WhatsApp"
          />
        </Reveal>

        <Reveal delay={0.16} className="h-full">
          <ContactCard
            icon={Linkedin}
            title="LinkedIn"
            description="Conecte-se comigo"
            href="https://www.linkedin.com/in/marcos-conde-481627285/"
            action="Abrir LinkedIn"
          />
        </Reveal>
      </div>
    </Section>
  );
}
