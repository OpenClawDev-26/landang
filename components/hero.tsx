"use client";

import Image from "next/image";
import { ArrowDownRight } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";

export function Hero() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="hero" id="top" aria-labelledby="hero-title">
      <motion.div
        className="hero-photo"
        initial={reduceMotion ? false : { scale: 1.04 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.4 }}
      >
        <Image
          src="/images/angel-hero-hq.png"
          alt="Ángel Mendoza, consultor de comunicación y marketing especializado en salud"
          fill
          priority
          fetchPriority="high"
          sizes="100vw"
          quality={95}
        />
      </motion.div>
      <div className="hero-shade" aria-hidden="true" />

      <motion.div
        className="hero-copy"
        initial={reduceMotion ? false : { opacity: 0, x: 36 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.85, delay: 0.12 }}
      >
        <span className="eyebrow hero-eyebrow">Comunicación · Marketing · Salud</span>
        <h1 id="hero-title">
          Ángel Mendoza.
          <span>Tu consultor de cabecera.</span>
        </h1>
        <p>
          Consultor de Comunicación y Marketing especializado en sector salud.
          Ideas claras y aplicables para hacer crecer tu clínica.
        </p>
        <a className="button button-primary" href="#contacto">
          Reserva tu consultoría gratuita
          <ArrowDownRight aria-hidden="true" size={23} />
        </a>
      </motion.div>

      <div className="hero-index" aria-hidden="true">
        <span>01</span><i /> <span>Consultoría de 45 min.</span>
      </div>
    </section>
  );
}
