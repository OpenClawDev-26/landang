import { NextResponse } from "next/server";
import { Resend } from "resend";

export const runtime = "nodejs";

type ContactPayload = {
  name?: unknown;
  clinic?: unknown;
  phone?: unknown;
  email?: unknown;
  context?: unknown;
  consent?: unknown;
  marketing?: unknown;
  website?: unknown;
};

function clean(value: unknown, maxLength: number) {
  return typeof value === "string" ? value.trim().slice(0, maxLength) : "";
}

export async function POST(request: Request) {
  let payload: ContactPayload;
  try {
    payload = (await request.json()) as ContactPayload;
  } catch {
    return NextResponse.json({ message: "No he podido leer el formulario. Revisa los campos." }, { status: 400 });
  }

  const name = clean(payload.name, 80);
  const clinic = clean(payload.clinic, 120);
  const phone = clean(payload.phone, 30);
  const email = clean(payload.email, 160).toLowerCase();
  const context = clean(payload.context, 2000);
  const website = clean(payload.website, 200);
  const consent = payload.consent === true;
  const marketing = payload.marketing === true;

  if (website) return NextResponse.json({ message: "Gracias. Te llamaré para cuadrar agendas." });
  if (name.length < 2) return NextResponse.json({ message: "Escribe un nombre válido." }, { status: 400 });
  if (!/^(?:\+34[ -]?)?[6789]\d{2}[ -]?\d{3}[ -]?\d{3}$/.test(phone)) {
    return NextResponse.json({ message: "Escribe un teléfono español válido." }, { status: 400 });
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ message: "Escribe un correo válido." }, { status: 400 });
  }
  if (!consent) {
    return NextResponse.json({ message: "Necesito que aceptes la Política de Privacidad." }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.CONTACT_FROM_EMAIL;
  const to = process.env.CONTACT_TO_EMAIL ?? "angelmendozarivero@gmail.com";

  if (!apiKey || !from) {
    return NextResponse.json(
      { message: "El formulario aún no está conectado. Escríbeme a angelmendozarivero@gmail.com." },
      { status: 503 },
    );
  }

  const resend = new Resend(apiKey);
  const text = [
    `Nombre: ${name}`,
    `Clínica: ${clinic || "No indicada"}`,
    `Teléfono: ${phone}`,
    `Email: ${email}`,
    `Comunicaciones puntuales: ${marketing ? "Sí" : "No"}`,
    "",
    "Contexto:",
    context || "No indicado",
  ].join("\n");

  const { error } = await resend.emails.send({
    from,
    to,
    replyTo: email,
    subject: `Nueva solicitud de consultoría${clinic ? ` — ${clinic}` : ""}`,
    text,
  });

  if (error) {
    console.error("Error enviando el formulario", error.name);
    return NextResponse.json(
      { message: "El mensaje no ha salido. Escríbeme a angelmendozarivero@gmail.com." },
      { status: 502 },
    );
  }

  return NextResponse.json({ message: "Gracias. Te llamaré para cuadrar agendas." });
}
