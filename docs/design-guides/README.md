# Guías de diseño — Landing Ángel Mendoza

**Capa propia** del proyecto (el «cómo se escribe el código aquí»). El «cómo trabajamos»
(protocolo, modelos, comandos) es compartido y vive en `ai-dev-config` (ver [`AGENTS.md`](../../AGENTS.md)).

> **Obligatorio (protocolo §3.5):** antes de escribir código en un área, lee su guía y respeta su
> naming y estructura. El código debe parecer escrito por el mismo autor que los archivos vecinos.

## Guías

| Guía | Cubre |
|------|-------|
| [`frontend_styleguide.md`](frontend_styleguide.md) | Next.js 16 App Router, server vs client components, CSS plano en `globals.css`, Motion, imágenes, accesibilidad, SEO. |
| [`backend_styleguide.md`](backend_styleguide.md) | Route Handlers, validación y anti-spam del formulario, Resend, variables de entorno, despliegue en Vercel y la futura capa de datos (WordPress headless). |

El sistema **visual** (idea rectora, tokens, reglas de composición) vive en
[`DESIGN.md`](../../DESIGN.md) — estas guías son el «cómo se escribe», `DESIGN.md` es el «cómo se ve».

Cada guía termina con **«Cómo verificar»** — el contrato que lee el subagente `verifier`:
estático → build → intención → E2E.

## Al añadir una convención nueva

Si una tarea introduce o cambia una convención o el stack, **actualiza la guía correspondiente** en
el mismo cambio (Definición de Terminado, protocolo §6). Un cambio que invalida una guía y no la
actualiza no está terminado.
