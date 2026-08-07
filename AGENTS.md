# AGENTS.md — Landing Ángel Mendoza

> **LÉEME PRIMERO (Claude Code · Cursor · OpenCode · Codex · cualquier agente).**
> Este fichero es la **fuente de verdad** de cómo trabajamos en este repo. Léelo antes de
> tocar código y navega desde aquí a lo que necesites — no leas todo el repo de golpe.

Landing **one-page** de Ángel Mendoza (consultor de comunicación y marketing para clínicas y
sector salud). **Next.js 16 (App Router) + React 19 + TypeScript + Motion**, CSS plano en un único
`app/globals.css`, sin Tailwind y sin librería de componentes. Formulario de contacto vía
**Resend** en un Route Handler. Despliegue en **Vercel**.

Todo el contenido está **hardcodeado en TSX** hoy. Hay un plan abierto para migrarlo a
**WordPress headless** (ver `docs/plans/`).

---

## Estado operativo del entorno

- **Fase actual:** `development`.
- **No hay base de datos ni migraciones.** Cualquier sección del protocolo compartido sobre
  migraciones no aplica aquí.
- **El despliegue de Vercel y sus variables de entorno son producción y se operan a mano.** Un
  agente no crea proyectos en Vercel, no cambia variables de entorno del dashboard, no toca el
  dominio ni dispara despliegues; propone los cambios y los aplica el humano.
- La clave de **Resend** y el correo de destino son reales: no se envían correos de prueba a
  `CONTACT_TO_EMAIL` sin pedirlo antes.
- Si este estado cambia, se actualiza primero esta sección; los agentes no deben inferir el
  entorno del hostname, del `.env` ni de recuerdos previos.

---

## Estructura (qué hay y dónde mirar)

| Carpeta / fichero | Contenido | Cuándo leerlo |
|---|---|---|
| [`docs/design-guides/`](docs/design-guides/) | **Guías de stack y estilo por área** (estructura, naming, CSS, animación, Route Handlers, verificación). | **OBLIGATORIO antes de escribir código** — lee la guía del área que vas a tocar. |
| [`DESIGN.md`](DESIGN.md) | Sistema visual: idea rectora, tokens de color, reglas de composición y animación. | Antes de tocar layout, color, tipografía o animación. |
| [`docs/plans/`](docs/plans/) | Un fichero por tarea/feature: contexto + plan + registro de lo hecho. Histórico real del trabajo. | Para ver qué se hizo o crear un plan nuevo (`/spec`). |
| [`Especificaciones_Landing_AngelMendoza.md`](Especificaciones_Landing_AngelMendoza.md) | Briefing original del cliente: secciones, copys aprobados y requisitos. | Antes de cambiar textos, secciones o el discurso de la web. |
| [`README.md`](README.md) | Arranque, build y pendientes antes de publicar. | Setup y estado de publicación. |

**Regla de oro:** antes de escribir código en un área, lee su guía en `docs/design-guides/` y
respeta su naming/estructura (lo impone `.agents/protocol/operating-protocol.md`).

---

## Particularidades de este proyecto

- **Es una landing de conversión.** El objetivo único es la consultoría gratuita. Cualquier cambio
  que añada fricción al camino hacia `#contacto` necesita justificación explícita.
- **Rendimiento y accesibilidad son requisito, no extra.** Sin librerías nuevas sin motivo, sin
  analítica ni cookies no esenciales (hoy no hay banner que tape la conversión), foco visible y
  contraste AA en todo.
- **RGPD:** el formulario recoge datos personales. Tocar
  [`app/api/contact/route.ts`](app/api/contact/route.ts), el consentimiento de
  [`components/contact-form.tsx`](components/contact-form.tsx) o las páginas legales **eleva el
  perfil de verificación a `full`**.
- **Textos en español de España**, con el tono del briefing (directo, cercano, sin jerga de
  agencia). No se reescriben copys aprobados sin pedirlo.
- **Dos modos de build:** por defecto Node/Vercel; con `STATIC_EXPORT=1` genera export estático
  (sin API de contacto ni optimización de imágenes). Si tocas
  [`next.config.ts`](next.config.ts), comprueba que ambos siguen funcionando o retira el modo.

---

## Cómo trabajamos (capa compartida — `ai-dev-config`)

El **cómo** (comandos, orquestadores, skills, protocolo, modelos) es igual en todos los proyectos y
vive en el kit compartido `ai-dev-config`, enlazado en `.agents/` (y en `.claude/`, `.opencode/`,
`.cursor/commands`, `.codex/agents` según la herramienta) mediante **junctions** — editar el kit se
refleja aquí al instante, no hay copias que desincronizar.

**Los 8 comandos:**

| Comando | Qué hace | Git | Paradas |
|---|---|---|---|
| `/auto` | planifica **y ejecuta** autónomo | rama actual, sin commits | ninguna |
| `/auto-git` | igual | rama nueva + commit/tarea + push | ninguna |
| `/spec` | solo el plan en `docs/plans/` | — | entrega el plan |
| `/exec` | ejecuta un plan completo sin parar | rama actual, sin commits | ninguna |
| `/exec-git` | ejecuta un plan completo sin parar | rama nueva + commit/tarea + push | ninguna |
| `/exec-3` | ejecuta un plan | rama actual, sin commits | cada 3 archivos |
| `/exec-3-git` | ejecuta un plan | rama nueva + commit/tarea + push | cada 3 archivos |
| `/research` | investiga y responde sin modificar archivos | — | entrega el informe |

En **Codex**, invoca los mismos nombres como skills: `$auto`, `$auto-git`, `$spec`, `$exec`,
`$exec-git`, `$exec-3`, `$exec-3-git` y `$research`. `/plan` es el modo nativo; `$spec` es el
workflow que guarda el documento en `docs/plans/`.

Protocolo compartido: `.agents/protocol/operating-protocol.md` (Regla del 95 %, Plan Mode,
ediciones quirúrgicas, modo Caveman). Política por rol: `.agents/orchestrators/modelos.md`;
bindings por herramienta: `.agents/config/models.json` (planificar = modelo grande · ejecutar =
modelo medio · buscar = modelo rápido). Git en inglés, Conventional Commits
(`.agents/orchestrators/git-flow.md`).

**Verificación por riesgo:** todo plan declara `light`, `standard` o `full`.

| Perfil | Cuándo en este repo |
|---|---|
| `light` | documentación, `README`, `DESIGN.md`, guías, comentarios. |
| `standard` | componentes, estilos, copys, SEO estático, animación. |
| `full` | formulario de contacto, Route Handler, páginas legales/RGPD, `next.config.ts`, `sitemap`/`robots`, y la futura capa de datos de WordPress headless. |

Si el verifier falla, el orquestador puede lanzar hasta 5 rondas de executor + verificación
completa. Las incidencias `major`/`critical` quedan registradas en el plan.

---

## Mantenimiento (Definición de Terminado)

1. Al cerrar una tarea vía `/exec*`, deja su ficha en `docs/plans/` actualizada con lo hecho.
2. Si el cambio introduce o altera una convención o el stack, actualiza la guía correspondiente en
   `docs/design-guides/` en el mismo cambio. Si cambia el sistema visual, actualiza `DESIGN.md`.
3. `docs/design-guides/` es **descriptivo** (lo que el código hace hoy), no aspiracional — las
   propuestas de cambio van a `docs/plans/`.
4. LF siempre · español en la doc · git en inglés (Conventional Commits) · fechas Europe/Madrid
   (DD/MM/YYYY).
