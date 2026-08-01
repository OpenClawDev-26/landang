import type { Metadata } from "next";

export const metadata: Metadata = { title: "Política de cookies", robots: { index: false, follow: true } };

export default function CookiesPolicy() {
  return (
    <main className="legal-page">
      <article className="legal-wrap">
        <a className="legal-back" href="/">← Volver a la web</a>
        <h1>Política de cookies</h1>
        <p className="legal-warning">
          Borrador pendiente de revisar y adaptar a las herramientas finalmente activadas en producción.
        </p>
        <h2>Qué son las cookies</h2>
        <p>
          Son pequeños archivos que el navegador almacena para permitir funciones técnicas, recordar preferencias
          o medir de forma agregada el uso de un sitio.
        </p>
        <h2>Cookies utilizadas</h2>
        <p>
          Esta versión utiliza únicamente almacenamiento local para recordar la elección de privacidad. El vídeo de YouTube
          se carga desde el dominio de privacidad mejorada solo cuando el usuario pulsa reproducir.
        </p>
        <h2>Configuración</h2>
        <p>
          Puedes aceptar o rechazar cookies no esenciales desde el aviso de la web y eliminarlas en cualquier momento
          desde la configuración de tu navegador.
        </p>
      </article>
    </main>
  );
}
