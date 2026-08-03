"use client";

import Image from "next/image";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";

const links = [
  { href: "#como-trabajamos", label: "Cómo trabajamos" },
  { href: "#conoceme", label: "Conóceme" },
  { href: "#trayectoria", label: "Trayectoria" },
  { href: "#temas", label: "En qué te ayudo" },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.classList.toggle("menu-open", open);
    return () => document.body.classList.remove("menu-open");
  }, [open]);

  return (
    <header className="site-header">
      <a className="brand" href="#top" aria-label="Ángel Mendoza, volver al inicio">
        <Image
          src="/logo-angel-mendoza.png"
          alt="Ángel Mendoza, consultor de comunicación y marketing"
          width={320}
          height={54}
          priority
          quality={100}
        />
      </a>

      <nav className="desktop-nav" aria-label="Navegación principal">
        {links.map((link) => (
          <a href={link.href} key={link.href}>{link.label}</a>
        ))}
      </nav>

      <a className="header-cta" href="#contacto">
        Hablemos <ArrowUpRight aria-hidden="true" size={18} />
      </a>

      <button
        className="menu-button"
        type="button"
        aria-label={open ? "Cerrar menú" : "Abrir menú"}
        aria-expanded={open}
        aria-controls="mobile-navigation"
        onClick={() => setOpen((value) => !value)}
      >
        {open ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
      </button>

      <div className="mobile-nav" id="mobile-navigation" data-open={open}>
        <nav aria-label="Navegación móvil">
          {links.map((link) => (
            <a href={link.href} key={link.href} onClick={() => setOpen(false)}>
              {link.label}
            </a>
          ))}
          <a className="mobile-nav-cta" href="#contacto" onClick={() => setOpen(false)}>
            Reservar consultoría <ArrowUpRight aria-hidden="true" />
          </a>
        </nav>
      </div>
    </header>
  );
}
