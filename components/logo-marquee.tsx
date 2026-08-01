import Image from "next/image";

const clients = [
  { name: "rIL", src: "/clients/ril.png" },
  { name: "Impulso Dental", src: "/clients/impulso-dental.jpg" },
  { name: "Yera", src: "/clients/yera.jpg" },
  { name: "Gonzalo Navarro", src: "/clients/gonzalo-navarro.jpg" },
  { name: "Luciano Badanelli", src: "/clients/badanelli.png" },
  { name: "Divisoplay", src: "/clients/divisoplay.png" },
  { name: "B-One", src: "/clients/b-one.webp" },
  { name: "Ivoire", src: "/clients/ivoire.png" },
  { name: "Farmacia Escribano", src: "/clients/farmacia-escribano.avif" },
  { name: "Saura Dental", src: "/clients/saura.png" },
  { name: "Diana Escudero", src: "/clients/diana-escudero.png" },
  { name: "Santisteban Academy", src: "/clients/santisteban.webp" },
  { name: "Irida Psicólogos", src: "/clients/irida.png" },
  { name: "Dr. Arnalich", src: "/clients/arnalich.png" },
];

export function LogoMarquee() {
  const repeated = [...clients, ...clients];

  return (
    <section className="clients-section" aria-labelledby="clients-title">
      <div className="clients-heading">
        <h2 id="clients-title">Ya me conocen.</h2>
        <p>Marcas y profesionales que ya han compartido mesa conmigo.</p>
      </div>
      <div className="marquee" role="region" aria-label="Clientes de Ángel Mendoza">
        <div className="marquee-track">
          {repeated.map((client, index) => (
            <figure className="client-logo" key={`${client.name}-${index}`}>
              <Image
                src={client.src}
                alt={`Logo de ${client.name}`}
                fill
                sizes="180px"
              />
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
