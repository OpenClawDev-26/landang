# Guía backend y datos — Landing Ángel Mendoza

Descriptiva: documenta lo que el código hace **hoy**. Referencias con `archivo:línea`.

El «backend» de este repo es mínimo y a propósito: **un solo Route Handler** que envía el
formulario por email. No hay base de datos, ni auth, ni ORM, ni sesiones.

---

## 1. Route Handlers

Único endpoint: [`app/api/contact/route.ts`](../../app/api/contact/route.ts).

Convenciones que se siguen ahí y hay que mantener:

- **`export const runtime = "nodejs"`** (`route.ts:4`) — el SDK de Resend necesita Node, no Edge.
- Respuestas con `NextResponse.json()`. **Nunca** `new Response(JSON.stringify(...))`.
- El payload entra tipado como `unknown` campo a campo (`type ContactPayload`, `route.ts:6-15`) y se
  normaliza con el helper `clean(value, maxLength)` (`route.ts:17-19`): trim + recorte de longitud.
  Validación **a mano con regex**, sin Zod (no está instalado y no hace falta para 7 campos).
- **Orden fijo:** parseo → normalización → honeypot → validaciones → efecto → respuesta.
- Códigos: `400` datos inválidos · `503` servicio no configurado · `502` fallo del proveedor ·
  `200` éxito.

---

## 2. Mensajes de error (son UI, no logs)

Los mensajes de la respuesta se pintan tal cual en el formulario. Por eso:

- **En español, en primera persona de Ángel**, y siempre con salida alternativa:
  `"El mensaje no ha salido. Escríbeme a angelmendozarivero@gmail.com."` (`route.ts:84`).
- **Nunca** filtres detalles internos al cliente. Al proveedor solo se le loguea el nombre del
  error: `console.error("Error enviando el formulario", error.name)` (`route.ts:82`).
- **Nunca loguees datos personales** (nombre, teléfono, email, contexto) ni el payload completo.

---

## 3. Anti-spam y RGPD

- **Honeypot:** el campo `website` debe llegar vacío. Si viene relleno se responde **200 con el
  mensaje de éxito** y no se envía nada (`route.ts:38`) — el bot no debe notar el rechazo. No lo
  cambies por un error.
- **Consentimiento obligatorio:** sin `consent === true` se rechaza con 400 (`route.ts:46-48`).
  `marketing` es opcional y separado. Esta separación es un requisito legal: no las fusiones.
- Validación de **teléfono español** y email por regex (`route.ts:40-45`).
- Límites de longitud por campo: nombre 80 · clínica 120 · teléfono 30 · email 160 · contexto 2000.
- Los datos **no se persisten**: solo viajan al email de destino. Si alguna vez se guardan, hay que
  actualizar la política de privacidad **en el mismo cambio**.

> Cualquier cambio en este fichero, en el consentimiento de
> [`components/contact-form.tsx`](../../components/contact-form.tsx) o en las páginas legales es
> **perfil `full`** (ver `AGENTS.md`).

---

## 4. Variables de entorno

| Variable | Uso | Si falta |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | `metadataBase`, canonical, sitemap | fallback `https://angelmendoza.es` (`app/layout.tsx:5`) |
| `RESEND_API_KEY` | envío del formulario | 503 con mensaje de fallback |
| `CONTACT_FROM_EMAIL` | remitente (dominio verificado en Resend) | 503 |
| `CONTACT_TO_EMAIL` | destinatario | fallback al correo de Ángel (`route.ts:52`) |
| `STATIC_EXPORT` | `=1` genera export estático | modo Node/Vercel normal |
| `E2E_BASE_URL` | URL que ataca el E2E | — |

Reglas:

- **`.env.example` solo nombres y valores de ejemplo**; los valores reales viven en `.env.local`
  (git-ignored por `.env*` en `.gitignore`).
- Toda variable nueva se añade a `.env.example` y a esta tabla en el mismo cambio.
- **Nada de secretos con prefijo `NEXT_PUBLIC_`.**
- Se leen con `process.env.X` y **siempre con fallback o guard** — la web no debe romper si falta
  una: el patrón es degradar con mensaje útil (`route.ts:54-59`), no lanzar.
- Las variables del dashboard de **Vercel las cambia el humano**, no el agente.

---

## 5. Despliegue (Vercel)

- [`vercel.json`](../../vercel.json): `{ "framework": "nextjs" }`. Sin `buildCommand` propio.
- Build por defecto = Node/Vercel. **`STATIC_EXPORT=1`** activa `output: "export"` +
  `images.unoptimized` ([`next.config.ts`](../../next.config.ts)) — ese modo **no tiene API de
  contacto** (los Route Handlers POST no se exportan). Si tocas `next.config.ts`, verifica los dos
  modos o retira el estático explícitamente en el plan.
- Un agente **no** ejecuta `vercel deploy`, no cambia variables del dashboard ni toca el dominio.
- Rutas indexables: al añadir una página, añádela a [`app/sitemap.ts`](../../app/sitemap.ts).

---

## 6. Capa de datos futura (WordPress headless)

Todavía **no existe**. Cuando se ejecute el plan correspondiente en `docs/plans/`, estas son las
convenciones acordadas — si implementas antes de que exista el plan, cíñete a ellas y actualiza
esta sección:

- Todo el acceso a WordPress en **`lib/wp.ts`**; tipos en `lib/wp-types.ts`.
- **Fallback obligatorio** al contenido estático (`lib/wp-fallback.ts`) si la API falla: la landing
  nunca puede quedarse en blanco por un WordPress caído.
- `fetch` con `next: { tags: [...] }` para revalidación por etiqueta; nada de `cache: "no-store"`
  en la home.
- Revalidación on-demand en `app/api/revalidate/route.ts`, protegida por `WP_REVALIDATE_SECRET` en
  cabecera. Comparación del secreto contra `process.env`, nunca hardcodeado.
- Dominio de medios declarado en `images.remotePatterns` de `next.config.ts`.
- Ese trabajo es **perfil `full`**.

---

## 7. No hacer nunca

- Instalar Zod, un ORM o una base de datos «por si acaso».
- Loguear datos personales del formulario.
- Convertir el honeypot en un error visible.
- Enviar correos de prueba a `CONTACT_TO_EMAIL` (buzón real de Ángel) sin pedirlo antes.
- Mover el envío a Edge runtime.
- Exponer secretos con `NEXT_PUBLIC_`.
- Cambiar variables o despliegues de Vercel desde un agente.

---

## Cómo verificar (contrato del `verifier`)

Orden: **estático → build → intención → E2E**.

```bash
npm run lint
npx tsc --noEmit
npm run build
```

**No hay base de datos de desarrollo** que cruzar: el cruce de datos del perfil `full` se sustituye
por la prueba real del formulario descrita abajo.

**Prueba del formulario (perfil `full`, obligatoria al tocar el endpoint):**

1. `npm run dev`.
2. Con el MCP de Playwright o `agent-browser`, rellena `#contacto` con datos ficticios
   (`test@dev.local`, teléfono `600000000`) y envía.
3. Casos a cubrir: teléfono inválido → 400 con mensaje · sin consentimiento → 400 · honeypot
   relleno → 200 sin envío · envío correcto.
4. **Para no enviar correo real**, verifica sin `RESEND_API_KEY` en `.env.local` (debe responder
   503 con el mensaje de fallback) o pide al humano un `CONTACT_TO_EMAIL` de prueba. **Nunca
   dispares un envío real al buzón de Ángel sin autorización.**

**Auth de test (E2E):** la web es **pública, sin login**, así que no aplican `E2E_TEST_USER`,
`E2E_TEST_PASSWORD` ni `E2E_STORAGE_STATE`. Solo:

```bash
# .env.test.local   ← git-ignored
E2E_BASE_URL=http://localhost:3000
```

Sus **nombres** (sin valores) están en `.env.example`. Si algún día la web añade área privada,
añade aquí el patrón de sesión reutilizable de `agent-browser` (README del kit, §4).
