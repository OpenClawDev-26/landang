import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="footer-brand">
        <a href="#top" aria-label="Volver al inicio">
          <Image
            src="/logo-angel-mendoza.png"
            alt="Ángel Mendoza"
            width={330}
            height={56}
          />
        </a>
        <p>Consultor de Comunicación y Marketing especializado en sector salud.</p>
      </div>
      <nav aria-label="Enlaces legales">
        <a href="/aviso-legal">Aviso legal</a>
        <a href="/politica-de-privacidad">Privacidad</a>
        <a href="/politica-de-cookies">Cookies</a>
        <a href="mailto:angelmendozarivero@gmail.com">
          Email <ArrowUpRight aria-hidden="true" size={15} />
        </a>
      </nav>
      <p className="footer-meta">© {new Date().getFullYear()} Ángel Mendoza</p>
    </footer>
  );
}
