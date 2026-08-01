import Image from "next/image";
import { ArrowDownRight, ArrowRight, Check, MessageCircle, Search, TrendingUp } from "lucide-react";
import { ContactForm } from "@/components/contact-form";
import { Hero } from "@/components/hero";
import { LogoMarquee } from "@/components/logo-marquee";
import { Reveal } from "@/components/reveal";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { VideoFacade } from "@/components/video-facade";

const workSteps = [
  "Agendamos una primera consultoría gratuita de 45 minutos por vídeo para conocernos.",
  "Me expones qué te preocupa y analizamos juntos tu web, tus redes y la trayectoria de tu clínica.",
  "Recibirás soluciones reales y aplicables desde el primer día, sin coste.",
  "Si necesitas acciones específicas, te recomendaré empresas de confianza con experiencia en salud.",
  "Todo claro y transparente. Solo seguiremos trabajando juntos si tú quieres.",
];

const topicGroups = [
  {
    title: "Captación y visibilidad",
    items: [
      "¿Tu marca física y tu presencia online atraen al perfil de paciente que buscas?",
      "¿Tienes una estrategia para captar primeras visitas y fidelizar pacientes?",
      "¿Cómo está tu posicionamiento en buscadores frente a la competencia?",
      "¿Tu comunicación en redes transmite una imagen correcta y confiable?",
    ],
  },
  {
    title: "Marca profesional",
    items: [
      "¿Necesitas dar visibilidad a tus logros profesionales y a tu nombre?",
      "¿La experiencia que vive el paciente refleja el valor real de tu clínica?",
    ],
  },
  {
    title: "Crecimiento y rentabilidad",
    items: [
      "¿Qué planes de crecimiento tienes y qué apoyo necesitas para ejecutarlos?",
      "¿Vas a abrir un nuevo centro, unidad de negocio o franquicia?",
      "¿Quieres mejorar tus resultados financieros mes a mes?",
      "¿Has pensado en crear una nueva unidad de negocio paralela?",
    ],
  },
  {
    title: "Procesos y proveedores",
    items: [
      "¿Has valorado automatizar procesos dentro de tu clínica?",
      "¿Tus proveedores se coordinan o terminan quitándote demasiado tiempo?",
    ],
  },
];

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main id="contenido">
        <Hero />

        <section className="work-section" id="como-trabajamos" aria-labelledby="work-title">
          <Reveal className="section-intro work-intro">
            <h2 id="work-title">¿Cómo es trabajar conmigo?</h2>
            <p>
              Una conversación directa para entender dónde estás, qué te preocupa y cuál puede ser el siguiente paso.
            </p>
          </Reveal>

          <ol className="work-list">
            {workSteps.map((step, index) => (
              <li key={step}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <p>{step}</p>
                <Check aria-hidden="true" />
              </li>
            ))}
          </ol>

          <a className="button button-dark" href="#contacto">
            Reserva ya una consultoría gratuita <ArrowDownRight aria-hidden="true" />
          </a>
        </section>

        <LogoMarquee />

        <section className="know-section" id="conoceme" aria-labelledby="know-title">
          <Reveal className="know-copy">
            <h2 id="know-title">Conóceme mejor.</h2>
            <p>
              En Expodental participé en el podcast <em>Espejo Dental</em>, donde repasamos aciertos,
              errores y consejos de marketing digital para clínicas dentales y el sector salud.
            </p>
            <p> Dale al play: algunas ideas las puedes implementar desde hoy.</p>
            <a className="text-link" href="#contacto">
              Quiero mi consultoría gratuita <ArrowRight aria-hidden="true" />
            </a>
          </Reveal>
          <Reveal className="know-video" delay={0.12}><VideoFacade /></Reveal>
        </section>

        <section className="trajectory-section" id="trayectoria" aria-labelledby="trajectory-title">
          <figure className="trajectory-photo">
            <Image
              src="/images/angel-expodental-hq.png"
              alt="Ángel Mendoza con parte del equipo de rIL en Expodental"
              fill
              sizes="(max-width: 800px) 100vw, 48vw"
              quality={95}
            />
            <figcaption>Expodental · Madrid</figcaption>
          </figure>

          <Reveal className="trajectory-copy">
            <h2 id="trajectory-title">Mi trayectoria.</h2>
            <p>
              Soy un apasionado de la Comunicación y el Marketing Digital. Durante mis primeros años trabajé en prensa,
              radio y televisión: IDEAL, SER, COPE y PTV. Con la llegada del mundo digital, me especialicé en marketing
              y durante 10 años tuve mi propia agencia.
            </p>
            <p>
              Formé parte del lanzamiento y crecimiento de empresas de salud, moda, restauración, automoción y química,
              hasta que el equipo de rIL me devolvió al mundo de la agencia con el respaldo de 40 profesionales.
            </p>
            <p>
              Hoy dedico casi todo mi tiempo a ser consultor de marketing desde rIL Medical, ayudando a empresas y clínicas
              con ganas de crecer. ¿Quieres que nos conozcamos?
            </p>
            <a className="button button-outline" href="#contacto">
              Concertamos un Meet sin compromiso <ArrowRight aria-hidden="true" />
            </a>
          </Reveal>
        </section>

        <section className="topics-section" id="temas" aria-labelledby="topics-title">
          <div className="topics-heading">
            <Reveal>
              <h2 id="topics-title">¿De qué podemos hablar?</h2>
            </Reveal>
            <div className="topic-icons" aria-hidden="true">
              <MessageCircle /><Search /><TrendingUp />
            </div>
          </div>

          <div className="topics-layout">
            <div className="topics-lead">
              <p>
                El sector salud tiene particularidades que lo hacen único. Por eso importa sentarse con un consultor
                que hable tu idioma y el de tus pacientes.
              </p>
              <a href="#contacto">Cuéntame qué te preocupa <ArrowDownRight aria-hidden="true" /></a>
            </div>
            <div className="topic-groups">
              {topicGroups.map((group, index) => (
                <details key={group.title} open={index === 0}>
                  <summary>
                    <span>{String(index + 1).padStart(2, "0")}</span>
                    {group.title}
                    <i aria-hidden="true" />
                  </summary>
                  <ul>
                    {group.items.map((item) => <li key={item}>{item}</li>)}
                  </ul>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section className="contact-section" id="contacto" aria-labelledby="contact-title">
          <Reveal className="contact-copy">
            <h2 id="contact-title">Conectemos ya.</h2>
            <p>Ponte en contacto conmigo, te llamo y cuadramos agendas.</p>
            <div className="contact-promise">
              <span>01</span><p>Me cuentas tu situación.</p>
              <span>02</span><p>Revisamos juntos tus canales.</p>
              <span>03</span><p>Sales con ideas aplicables.</p>
            </div>
          </Reveal>
          <ContactForm />
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
