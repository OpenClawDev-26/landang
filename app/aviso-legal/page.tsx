import type { Metadata } from "next";

export const metadata: Metadata = { title: "Aviso legal", robots: { index: false, follow: true } };

export default function LegalNotice() {
  return (
    <main className="legal-page">
      <article className="legal-wrap">
        <a className="legal-back" href="/">← Volver a la web</a>
        <h1>Aviso legal</h1>
        <p className="legal-warning">
          Borrador pendiente de completar y revisar por un profesional antes de publicar.
        </p>
        <h2>Datos identificativos</h2>
        <p>
          En cumplimiento del artículo 10 de la Ley 34/2002, el sitio angelmendoza.es es titularidad de
          [NOMBRE COMPLETO / RAZÓN SOCIAL], con NIF/CIF [NIF/CIF], domicilio en [DIRECCIÓN FISCAL COMPLETA]
          y correo electrónico [EMAIL DE CONTACTO].
        </p>
        <h2>Condiciones de uso</h2>
        <p>
          El acceso y uso de este sitio atribuye la condición de usuario e implica la aceptación de estas condiciones.
          Los textos, imágenes, logotipos y demás contenidos pertenecen a su titular o a terceros que han autorizado su uso.
        </p>
        <h2>Responsabilidad</h2>
        <p>
          El titular no se responsabiliza de daños derivados de interrupciones, virus, averías, desconexiones o
          deficiencias ajenas en Internet y otros sistemas electrónicos.
        </p>
      </article>
    </main>
  );
}
