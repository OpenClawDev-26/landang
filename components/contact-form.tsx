"use client";

import { FormEvent, useState } from "react";
import { ArrowRight, LoaderCircle, Mail } from "lucide-react";

type FormStatus =
  | { kind: "idle" }
  | { kind: "sending" }
  | { kind: "success"; message: string }
  | { kind: "error"; message: string };

export function ContactForm() {
  const [status, setStatus] = useState<FormStatus>({ kind: "idle" });

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    setStatus({ kind: "sending" });

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.get("name"),
          clinic: data.get("clinic"),
          phone: data.get("phone"),
          email: data.get("email"),
          context: data.get("context"),
          consent: data.get("consent") === "on",
          marketing: data.get("marketing") === "on",
          website: data.get("website"),
        }),
      });

      const result = (await response.json()) as { message?: string };
      if (!response.ok) throw new Error(result.message ?? "No se ha podido enviar el formulario.");

      form.reset();
      setStatus({
        kind: "success",
        message: result.message ?? "Gracias. Te llamaré para cuadrar agendas.",
      });
    } catch (error) {
      setStatus({
        kind: "error",
        message: error instanceof Error ? error.message : "No se ha podido enviar el formulario.",
      });
    }
  }

  const sending = status.kind === "sending";

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <div className="form-grid">
        <label>
          <span>Nombre *</span>
          <input name="name" type="text" autoComplete="name" minLength={2} maxLength={80} required />
        </label>
        <label>
          <span>Clínica <small>(opcional)</small></span>
          <input name="clinic" type="text" autoComplete="organization" maxLength={120} />
        </label>
        <label>
          <span>Teléfono *</span>
          <input
            name="phone"
            type="tel"
            autoComplete="tel"
            inputMode="tel"
            pattern="(?:\\+34[ -]?)?[6789]\\d{2}[ -]?\\d{3}[ -]?\\d{3}"
            placeholder="600 000 000"
            required
          />
        </label>
        <label>
          <span>Email *</span>
          <input name="email" type="email" autoComplete="email" spellCheck={false} required />
        </label>
      </div>

      <label>
        <span>Ponme en contexto <small>(opcional)</small></span>
        <textarea
          name="context"
          rows={5}
          maxLength={2000}
          placeholder="Cuéntame brevemente qué te preocupa o qué te gustaría mejorar…"
        />
      </label>

      <label className="honeypot" aria-hidden="true">
        <span>Tu web</span>
        <input name="website" type="text" tabIndex={-1} autoComplete="off" />
      </label>

      <label className="consent-field">
        <input name="consent" type="checkbox" required />
        <span>
          He leído y acepto la <a href="/politica-de-privacidad">Política de Privacidad</a> para
          que Ángel pueda responder a mi solicitud. *
        </span>
      </label>

      <label className="consent-field marketing-field">
        <input name="marketing" type="checkbox" />
        <span>
          Quiero recibir, de forma muy puntual, información sobre intervenciones en medios o ferias de salud.
          Sin newsletters mensuales ni publicidad comercial.
        </span>
      </label>

      <button className="form-submit" type="submit" disabled={sending}>
        {sending ? (
          <>Enviando… <LoaderCircle className="spin" aria-hidden="true" /></>
        ) : (
          <>Solicitar mi consultoría gratuita <ArrowRight aria-hidden="true" /></>
        )}
      </button>

      <div className="form-status" aria-live="polite" data-kind={status.kind}>
        {status.kind === "success" && status.message}
        {status.kind === "error" && (
          <>
            {status.message}{" "}
            <a href="mailto:angelmendozarivero@gmail.com">
              <Mail aria-hidden="true" size={16} /> Escribir por email
            </a>
          </>
        )}
      </div>
    </form>
  );
}
