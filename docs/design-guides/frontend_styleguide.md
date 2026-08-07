# Guía frontend — Landing Ángel Mendoza

Descriptiva: documenta lo que el código hace **hoy**. Referencias con `archivo:línea`.

---

## 1. Stack

| Pieza | Versión / decisión |
|---|---|
| Framework | **Next.js 16** — App Router (`app/`), Server Components por defecto |
| UI | **React 19** |
| Lenguaje | **TypeScript 6**, `strict: true` ([`tsconfig.json`](../../tsconfig.json)) |
| Estilos | **CSS plano** en un único [`app/globals.css`](../../app/globals.css) (317 líneas). **Sin Tailwind, sin CSS Modules, sin CSS-in-JS** |
| Animación | **`motion`** (Framer Motion v12) — `motion/react` |
| Iconos | **`lucide-react`** |
| Tipografía | Montserrat Variable vía `@import` de Google Fonts en `globals.css:1` |
| Email | `resend` (solo en el Route Handler, ver guía backend) |
| Alias | `@/*` → raíz del proyecto (`tsconfig.json`) |

**No añadas dependencias.** Es una landing de una página: cada KB cuenta. Si crees que hace falta
una librería, justifícalo en el plan antes de instalarla.

---

## 2. Estructura de carpetas

```
app/
├─ layout.tsx          metadata, JSON-LD, MotionProvider, skip-link
├─ page.tsx            la landing completa: compone secciones
├─ globals.css         TODO el CSS del sitio
├─ robots.ts · sitemap.ts · icon.svg
├─ api/contact/route.ts
└─ aviso-legal/ · politica-de-privacidad/ · politica-de-cookies/   (page.tsx cada una)
components/            componentes de sección y UI, planos (sin subcarpetas)
public/images/ · public/clients/
```

- **Sin `src/`.** Los imports usan `@/components/...` y `@/app/...`.
- `components/` es **plano**: no crees subcarpetas por dominio mientras haya <20 ficheros.
- Un componente por fichero, **export nombrado** (nunca `export default` en `components/`).

---

## 3. Naming

| Elemento | Convención | Ejemplo |
|---|---|---|
| Fichero de componente | `kebab-case.tsx` | `site-header.tsx`, `contact-form.tsx`, `video-facade.tsx` |
| Componente | `PascalCase`, export nombrado | `export function SiteHeader()` ([`components/site-header.tsx:14`](../../components/site-header.tsx#L14)) |
| Funciones y variables | `camelCase` | `handleSubmit`, `reduceMotion` |
| Tipos | `PascalCase`, `type` (no `interface`) | `type FormStatus` ([`components/contact-form.tsx:6-10`](../../components/contact-form.tsx#L6-L10)) |
| Clases CSS | `kebab-case`, prefijo por sección | `.work-section`, `.work-list-col`, `.topic-groups` |
| `id` de sección | español, sin acentos | `#como-trabajamos`, `#conoceme`, `#trayectoria`, `#temas`, `#contacto` |

Los `id` de sección son **contrato**: los usa la navegación de `site-header.tsx:7-12` y todos los
CTA de la página. Renombrar uno obliga a actualizar ambos lados.

---

## 4. Server vs Client Components

Regla: **client solo si hay estado, evento o hook de Motion**. La lista completa hoy:

| Client (`"use client"`) | Por qué |
|---|---|
| `hero.tsx` | `useReducedMotion` + `motion.div` |
| `site-header.tsx` | `useState` (menú móvil) + `useEffect` |
| `contact-form.tsx` | estado del formulario y `fetch` |
| `video-facade.tsx` | `useState` (carga diferida del iframe) |
| `cookie-banner.tsx`, `reveal.tsx`, `motion-provider.tsx` | estado / Motion |

`app/page.tsx` y `logo-marquee.tsx` son **Server Components**. Manténlo así: si necesitas
interactividad dentro de una sección, extrae solo esa parte a un componente cliente.

---

## 5. Contenido

Hoy el contenido vive en **constantes al inicio del fichero**, tipadas por inferencia, encima del
componente: `workSteps` y `topicGroups` en [`app/page.tsx:11-52`](../../app/page.tsx#L11-L52),
`clients` en [`components/logo-marquee.tsx:3`](../../components/logo-marquee.tsx#L3), `links` en
`site-header.tsx:7`.

- Copys en **español de España**, tono del briefing (`Especificaciones_Landing_AngelMendoza.md`).
- No reescribas textos aprobados sin pedirlo.
- Si una lista se usa en dos sitios, súbela a una constante compartida antes que duplicarla.

> Si se ejecuta la migración a WordPress headless (ver `docs/plans/`), estas constantes pasan a
> `lib/wp-fallback.ts` y el contenido llega por props. Hasta entonces, esta es la convención.

---

## 6. Estilos

**Todo el CSS está en `app/globals.css`.** No hay `<style>` inline ni `style={{}}` salvo variables
CSS puntuales.

- **Tokens en `:root`** (`globals.css:3-16`): `--blue`, `--blue-deep`, `--sky`, `--ink`, `--muted`,
  `--paper`, `--fog`, `--line`, más `--page`, `--section` y `--header-height` para el ritmo. **Usa
  siempre el token, nunca el hex literal.** La paleta canónica está en [`DESIGN.md`](../../DESIGN.md).
- **Fluidez con `clamp()`**, no breakpoints por defecto: `clamp(3rem, 6.3vw, 6.6rem)`. Añade media
  query solo cuando el layout cambie de estructura.
- Organización del fichero: reset → tokens → utilidades (`.eyebrow`, `.button`, `.text-link`) →
  bloques por sección en el mismo orden que `page.tsx`. **Añade tus reglas en el bloque de su
  sección**, no al final del fichero.
- Clases utilitarias reutilizables ya existentes: `.button` + `.button-primary` / `.button-dark` /
  `.button-outline`, `.eyebrow`, `.section-intro`, `.text-link`. Reúsalas antes de crear otra.

---

## 7. Animación

- Config global en [`components/motion-provider.tsx`](../../components/motion-provider.tsx):
  `reducedMotion="user"` y easing `[0.16, 1, 0.3, 1]` a 0.55 s. **No pases `transition` propio salvo
  para el `delay`.**
- Entradas por scroll: envuelve en [`<Reveal>`](../../components/reveal.tsx) (`opacity` + `y: 28`,
  `viewport={{ once: true }}`). Escalona con `delay` en pasos de ~0.12.
- **Solo `opacity` y `transform`.** Nada que provoque layout (`height`, `top`, `width`).
- Si escribes `motion.*` directamente, respeta `useReducedMotion()` como en
  [`components/hero.tsx:8`](../../components/hero.tsx#L8).

---

## 8. Imágenes

- Siempre `next/image`. Nunca `<img>`.
- Patrón de foto de sección: `fill` + `sizes` real + `quality={100}` dentro de un `<figure>` con
  `position: relative` en CSS ([`app/page.tsx:86-94`](../../app/page.tsx#L86-L94)).
- **`sizes` es obligatorio con `fill`** — sin él Next sirve la imagen a ancho completo.
- Formatos servidos: AVIF y WebP ([`next.config.ts`](../../next.config.ts)); `qualities: [75, 100]`
  está declarado, así que **solo esos dos valores** son válidos en `quality`.
- Los originales pesados viven en `public/images/`; los logos de cliente en `public/clients/`.
- `alt` descriptivo en español; `alt=""` + `aria-hidden` solo si es decorativa.

---

## 9. Accesibilidad (requisito, no extra)

- Cada `<section>` con `aria-labelledby` apuntando al `id` de su `<h2>` — patrón en todo `page.tsx`.
- Un solo `<h1>` (en el hero); jerarquía sin saltos.
- Iconos decorativos: `aria-hidden="true"` (todos los `lucide-react` de `page.tsx`).
- `:focus-visible` está definido globalmente (`globals.css`) — **no lo elimines** por estética.
- Skip-link en [`app/layout.tsx:64`](../../app/layout.tsx#L64) → `#contenido`.
- Contraste **AA** mínimo. Objetivo táctil ≥ 44 px (`.button` usa `min-height: 58px`).
- Textos accesibles en español; nada de `title` como sustituto de etiqueta.

---

## 10. SEO

- Metadata en [`app/layout.tsx:7-35`](../../app/layout.tsx#L7-L35): `metadataBase` desde
  `NEXT_PUBLIC_SITE_URL`, `title.template`, OG y Twitter. Las páginas legales solo definen su
  `title`/`description`.
- JSON-LD `Person` en `layout.tsx:42-56`. Si cambian datos de Ángel (cargo, empresa, foto),
  actualízalo ahí.
- [`app/sitemap.ts`](../../app/sitemap.ts) y [`app/robots.ts`](../../app/robots.ts) son la fuente de
  rutas indexables: **al añadir una página, añádela al sitemap en el mismo cambio**.

---

## 11. No hacer nunca

- Instalar una dependencia sin justificarla en el plan.
- Añadir Tailwind, CSS Modules o un segundo fichero de estilos global.
- Añadir analítica, píxeles o cookies no esenciales (obligaría a un banner que tapa la conversión —
  ver `README.md`).
- Convertir `app/page.tsx` en client component.
- Hex de color literales en lugar de tokens CSS.
- `export default` en `components/`.
- Reescribir copys aprobados sin pedirlo.
- Romper el modo `STATIC_EXPORT=1` sin decirlo.

---

## Cómo verificar (contrato del `verifier`)

Orden: **estático → build → intención → E2E**.

**Comandos por capa:**

```bash
npm run lint          # ESLint (next core-web-vitals + typescript) — sin errores
npx tsc --noEmit      # Typecheck — sin errores
npm run build         # Build de producción Next.js 16 — compila
```

> **No hay test runner instalado** (`package.json` no define `test`). El perfil `standard` en este
> repo = lint + typecheck + build + comprobación visual. Si algún día se añaden tests unitarios,
> actualiza esta sección en el mismo cambio.

**Intención (visual) — obligatorio en `standard` y `full`:** arranca `npm run dev`, abre la página
con el **MCP de Playwright** y comprueba:

1. La sección modificada en **escritorio (1440×900)** y **móvil (375×667)**.
2. Que la navegación por anclas (`#como-trabajamos`, `#conoceme`, `#trayectoria`, `#temas`,
   `#contacto`) sigue llevando al sitio correcto y el header móvil abre/cierra.
3. Que las animaciones de entrada disparan y no hay saltos de layout.
4. Consola del navegador **sin errores**.

**E2E:** por defecto **`agent-browser`** (skill `agent-browser`); TestSprite solo si el prompt lo
pide. **Esta web es pública y no tiene login**, así que no hay auth de test: solo se usa
`E2E_BASE_URL` de `.env.test.local` (ver [`backend_styleguide.md`](backend_styleguide.md#cómo-verificar-contrato-del-verifier)).

**No hay base de datos**, así que el cruce contra BD del perfil `full` no aplica. En su lugar, el
`full` de este repo exige: build + revisión visual móvil y escritorio + prueba real del formulario
en dev (ver guía backend) + revisión de que las páginas legales y el sitemap siguen coherentes.
