import type { Metadata } from "next";

export const metadata: Metadata = { title: "Política de privacidad", robots: { index: false, follow: true } };

export default function PrivacyPolicy() {
  return (
    <main className="legal-page">
      <article className="legal-wrap">
        <a className="legal-back" href="/">← Volver a la web</a>
        <h1>Política de privacidad</h1>
        <p className="legal-warning">
          Borrador pendiente de completar y revisar por un profesional antes de publicar.
        </p>
        <h2>Responsable del tratamiento</h2>
        <p>[NOMBRE COMPLETO / RAZÓN SOCIAL], NIF/CIF [NIF/CIF], domicilio en [DIRECCIÓN FISCAL], email [EMAIL].</p>
        <h2>Finalidad</h2>
        <p>
          Los datos del formulario se tratan para gestionar la solicitud de consultoría gratuita, contactar con la persona
          interesada y enviar, puntualmente, comunicaciones informativas autorizadas sobre medios, ponencias o ferias.
        </p>
        <h2>Legitimación y conservación</h2>
        <p>
          La base legal para responder a la solicitud es el consentimiento expresado al enviar el formulario. El envío
          de comunicaciones informativas tiene un consentimiento separado y opcional, que puede retirarse en cualquier
          momento. Los datos se conservarán mientras exista interés mutuo y durante los plazos legalmente exigibles.
        </p>
        <h2>Destinatarios y derechos</h2>
        <p>
          No se cederán datos salvo obligación legal. Puedes ejercer tus derechos de acceso, rectificación, supresión,
          oposición, limitación y portabilidad en [EMAIL DE CONTACTO], y reclamar ante la AEPD.
        </p>
      </article>
    </main>
  );
}
