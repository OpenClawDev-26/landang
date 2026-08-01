# Especificaciones para el desarrollo de la landing page personal — angelmendoza.es

Documento de traspaso a desarrollo — versión 1.0 — 31 de julio de 2026

Assets adjuntos en la carpeta `assets/`: `logo-angel-mendoza.png`, `foto-hero-angel.png`, `foto-expodental-ril.png`.

---

## 1. Resumen del proyecto

Landing page de una sola página (one-pager) para la web personal profesional de Ángel Mendoza, Consultor de Comunicación y Marketing especializado en sector salud. La web sirve como carta de presentación y herramienta de captación de leads (clínicas y empresas de salud) hacia una consultoría inicial gratuita de 45 minutos.

| Campo | Detalle |
|---|---|
| Dominio | angelmendoza.es |
| Idioma / mercado | Español (es-ES), dirigido únicamente a España. No se requiere versión en otros idiomas. |
| Tipo de sitio | Landing page única (single page) + 3 páginas legales no indexables enlazadas desde el pie. |
| Objetivo principal | Generar leads cualificados que rellenen el formulario de contacto para reservar la consultoría gratuita. |
| CTA principal | "Reserva ya una consultoría gratuita con Ángel" → ancla (#contacto) al formulario, repetido 2 veces en la página. |
| Destino de leads | Notificación por email a angelmendozarivero@gmail.com |
| Gestión de citas | No hay widget de reserva automática embebido. Tras recibir el lead por email, Ángel contacta y agenda manualmente vía Google Calendar / Google Meet (ver sección 4). |

---

## 2. Identidad visual y assets

### 2.1 Logotipo

Archivo: `assets/logo-angel-mendoza.png` (logotipo horizontal, incluye símbolo de cruz con flecha + nombre + tagline). Entregar también al desarrollador, si es posible, una versión vectorial (SVG/AI) y una versión solo-símbolo para favicon.

### 2.2 Paleta de color

| Uso | Color | HEX | RGB |
|---|---|---|---|
| Azul principal (marca, H1/H2, texto destacado) | Azul oscuro | `#005B85` | 0, 91, 133 |
| Azul de acento (enlaces, iconos, hover, detalles) | Azul claro | `#009FE3` | 0, 159, 227 |
| Texto secundario / párrafos | Gris neutro (orientativo) | `#595959` | 89, 89, 89 |
| Fondo | Blanco | `#FFFFFF` | 255, 255, 255 |

> **Nota:** `#009FE3` sobre fondo blanco no cumple el contraste AA de WCAG para texto de cuerpo en tamaño pequeño. Usarlo solo para iconos, enlaces grandes, botones (con texto en blanco encima) y estados hover. El texto de párrafo siempre en `#595959` o `#005B85`.

### 2.3 Tipografía

Familia tipográfica única: **Montserrat** (Google Fonts), coherente con el logotipo. No mezclar con otras familias.

- Pesos: 300/400 para cuerpo de texto, 600 para subtítulos y labels, 700–800 para H1/H2 y botones/CTA.
- Interlineado generoso (≈1.5 en párrafos) y buen espaciado entre secciones para transmitir una sensación elegante y profesional sobre fondo blanco.
- Tamaños orientativos desktop: H1 ~48–56px, H2 ~32–36px, H3 ~22–24px, cuerpo ~16–18px.

### 2.4 Fotografías e imágenes

| Archivo | Uso en la página | Estado |
|---|---|---|
| `foto-hero-angel.png` | Imagen a pantalla completa del Hero (Home) | ⚠ Resolución actual 512×512 px. Insuficiente para un fondo a pantalla completa. Solicitar versión en alta resolución (mínimo 2400 px de ancho). |
| `foto-expodental-ril.png` | Sección "Mi trayectoria" (columna izquierda) | OK, resolución suficiente (1080×1440 px). |

> **Pendiente:** los 17 logotipos de clientes de la sección "Ya me conocen" están sin recopilar (ver sección 8).

---

## 3. Estructura y contenido de la página

One-pager con navegación por anclas. Todo el copy siguiente es texto definitivo salvo indicación contraria.

### 3.1 Hero (Home)

Layout: imagen a pantalla completa (full-bleed) de fondo. El H1 se alinea al lateral derecho, con el claim debajo en tipografía menor. Si el contraste con la foto lo requiere, aplicar un degradado sutil oscuro solo en la zona del texto.

> **H1:** Ángel Mendoza. Consultor de Comunicación y Marketing especializado en sector salud.
>
> **Claim** (tipografía menor, debajo del H1): El consultor de cabecera para tus clínicas.

**Nota dev:** el H1 y el claim deben ser texto real en HTML (no incrustados en la imagen), imprescindible para SEO. Imagen con `loading="eager"` / `fetchpriority="high"` al ser el LCP de la página; el resto de imágenes con `loading="lazy"`.

### 3.2 ¿Cómo es trabajar conmigo?

- Agendamos una primera consultoría gratuita de 45 min. por vídeo para conocernos.
- Me expones qué te preocupa, analizamos juntos tu web, tus redes, la trayectoria de tu clínica.
- Recibirás soluciones reales y aplicables desde el primer día para tu clínica, sin coste.
- Para acciones más específicas, te recomendaré empresas de confianza con las que estamos ayudando a las mejores clínicas españolas e internacionales. Juntos podremos la tuya en el siguiente nivel.
- Todo claro, todo transparente, no te compromete a nada. Solo seguiremos trabajando juntos si tú quieres.

**CTA:** "Reserva ya una consultoría gratuita con Ángel" (botón, ancla al formulario de contacto, id `#contacto`)

### 3.3 Ya me conocen

Carrusel/marquee horizontal de logotipos en dos líneas, desplazamiento continuo y suave (loop infinito), pausado al hover. Logos en escala de grises con transición a color al hover (opcional).

Listado de marcas (17): RIL, Impulso Dental, Zárate Dental Estudio, Yera, Gonzalo Navarro, Luciano Badanelli, Divisoplay, B-One, Ivoire, Farmacia Escribano, Incliva, Saura Dental, Diana, Santisteban Academy, Irida Psicólogos, Dr. Arnalich, Oleoden.

**Nota dev:** cada logo con `alt="Logo de [nombre del cliente]"`.

### 3.4 Conóceme mejor

> En la última edición de Expodental tuve el placer de participar en el podcast "Espejo Dental", donde repasamos aciertos, errores y consejos del marketing digital en las clínicas dentales en particular y el sector salud en general. ¡Dale al play y disfruta! Algunas ideas las puedes implementar desde hoy.

Caja con vídeo embebido de YouTube: https://youtu.be/CfcpYORSHr0

**Nota dev:** implementar el embed como "facade" (miniatura + botón play, cargar el iframe solo al clic) para no penalizar Core Web Vitals.

**CTA:** "Reserva ya una consultoría gratuita con Ángel" (mismo botón, misma ancla `#contacto`)

### 3.5 Mi trayectoria

Layout a dos columnas (50/50): izquierda foto `foto-expodental-ril.png`, derecha texto. En móvil, apilar foto arriba y texto debajo.

> Soy un apasionado de la Comunicación y el Marketing Digital. Durante mis primeros años trabajé en prensa, radio y televisión: IDEAL, SER, COPE y PTV. Con la llegada del mundo digital, me especialicé en marketing y durante 10 años tuve mi propia agencia.
>
> Formé parte del lanzamiento, desarrollo y expansión de empresas de salud, moda, restauración, automoción y química, hasta que los amigos de RIL en Zaragoza me devolvieron al mundo de la agencia para tener el respaldo de un equipazo de 40 profesionales.
>
> Hoy dedico casi todo mi tiempo a ser el consultor de marketing de la agencia (me ves en la foto con algunos de mis compañeros en Expodental), desde donde sigo ayudando a empresas y clínicas con ganas de crecer desde RIL MEDICAL. ¿Quieres que nos conozcamos?

**CTA:** "Rellena el formulario y concertamos un meet sin compromiso" (ancla `#contacto`)

### 3.6 ¿De qué podemos hablar?

> Como has leído antes, he ayudado a muchas empresas de diferentes nichos, lo que me permite tener una visión global de muchos de los problemas a los que se enfrenta una empresa en su etapa inicial y de crecimiento.
>
> El sector salud tiene ciertas particularidades que lo hacen único, por eso es importante que puedas sentarte con un consultor que hable tu idioma y el de tus pacientes. Podemos hablar de temas como:

- ¿La imagen que traslada tu marca en la clínica física y tu presencia online van enfocados al perfil que quieres atraer?
- ¿Tienes planificada la estrategia adecuada para captar primeras visitas y fidelizar pacientes?
- ¿Cómo está tu posicionamiento en buscadores respecto a tu competencia?
- ¿Qué planes de crecimiento tienes? ¿Necesitas apoyo para ejecutarlos?
- ¿Estás transmitiendo una imagen correcta y confiable a tu comunidad en redes?
- Como profesional del sector ¿necesitas visibilidad acerca de tus logros profesionales y que tu nombre sea reconocido?
- ¿Vas a abrir un local nuevo o crear franquicia?
- ¿Has valorado automatizar procesos en tu clínica?
- ¿Deseas mejorar los resultados financieros mes a mes?
- ¿Tienes muchos proveedores de servicios que no se coordinan y te quitan mucho tiempo?
- ¿Has pensado crear una nueva unidad de negocio paralela?

> Estaré encantado de ayudarte y aconsejarte en todo lo posible. Para eso está tu consultor de cabecera.

### 3.7 Conectemos ya (formulario de contacto)

Título: "Conectemos ya". Subtítulo: "Ponte en contacto conmigo, te llamo y cuadramos agendas."

Campos:

- Nombre (obligatorio, texto)
- Clínica (opcional, texto)
- Teléfono (obligatorio, tel, validación formato español)
- Email (obligatorio, validación de formato)
- Ponme en contexto (opcional, textarea)
- Checkbox obligatorio de aceptación legal (ver texto abajo)

Texto exacto junto al checkbox (aviso de comunicaciones):

> No te preocupes, no te voy a enviar newsletters mensuales ni publicidad comercial. Solo te enviaré muy puntualmente información de algo que crea que te puede interesar: si hablo de marketing en un medio, si hago una intervención en medios y quieres verla, o si voy a una feria de salud y te gustaría saber dónde está mi stand para saludarnos.

Texto sugerido del propio checkbox (a validar por Ángel): *"He leído y acepto la Política de Privacidad, y autorizo el envío puntual de comunicaciones informativas como las descritas anteriormente."*

---

## 4. Formulario, notificaciones y flujo de leads

- Al enviar el formulario, se genera un email de notificación a angelmendozarivero@gmail.com con todos los campos.
- Validación de campos obligatorios en cliente (JS) **y** en servidor.
- Protección anti-spam recomendada: honeypot + Google reCAPTCHA v3 invisible.
- Mensaje de confirmación tras el envío (copy final a validar con Ángel).
- **Gestión de la cita:** no se requiere widget de reserva automática (tipo Calendly). Flujo: el lead rellena el formulario → Ángel recibe el email → Ángel contacta y agenda manualmente la videollamada de 45 min. por Google Calendar / Google Meet. A futuro se podría contemplar Google Calendar Appointment Schedule para automatizar la reserva.
- Guardar también copia de cada envío en un sitio consultable (hoja de cálculo, BD o CRM), aunque el aviso principal sea por email.

---

## 5. SEO técnico

### 5.1 Metadatos

| Campo | Valor |
|---|---|
| Title tag | Ángel Mendoza \| Consultor de Comunicación y Marketing para Clínicas y Sector Salud |
| Meta description | Consultor de comunicación y marketing especializado en salud. Más de 25 años ayudando a clínicas a mejorar su imagen, ganar confianza y captar primeras visitas. Reserva tu consultoría gratuita de 45 min. |
| URL canónica | https://angelmendoza.es/ |
| Idioma | `lang="es-ES"` en `<html>` |
| Open Graph | og:title, og:description (igual que arriba), og:type="profile", og:url, og:image (foto hero HD o logo), og:locale="es_ES" |
| Twitter Card | twitter:card="summary_large_image" |
| Favicon | Versión solo-símbolo del logo, varios tamaños (16/32/180/512 px) |

### 5.2 Jerarquía de encabezados

Un único H1 en toda la página (Hero). H2 = los definidos en la sección 3. No saltar niveles.

### 5.3 Palabras clave objetivo (orientativas)

Consultor de marketing para clínicas dentales · Consultor de comunicación sector salud · Marketing digital para clínicas dentales España · Asesor de marketing para clínicas · Consultoría de marketing salud gratuita · Captación de pacientes clínica dental.

### 5.4 Datos estructurados (schema.org, JSON-LD)

- **Person:** name, jobTitle ("Consultor de Comunicación y Marketing"), worksFor (rIL Estudio S.L. / rIL Medical), url, image, sameAs (LinkedIn/redes si existen).
- **ProfessionalService/LocalBusiness** (opcional): para reforzar asociación con rIL Medical.
- **VideoObject:** para el vídeo embebido (name, description, thumbnailUrl, uploadDate, embedUrl).

### 5.5 Rastreo e indexación

- `sitemap.xml`: solo la home. Excluir las 3 páginas legales.
- `robots.txt` / meta robots: páginas legales con `<meta name="robots" content="noindex, follow">`, accesibles y enlazadas desde el footer pero no indexadas.
- Enviar sitemap a Google Search Console tras el lanzamiento.

### 5.6 Imágenes

- Formatos modernos con fallback: WebP/AVIF + JPG/PNG de respaldo.
- `alt` descriptivo en todas las imágenes.
- Hero: carga prioritaria (`fetchpriority="high"`, sin lazy load), `srcset` para móvil.
- Resto: `loading="lazy"`.

### 5.7 Rendimiento y Core Web Vitals

- LCP < 2.5s (cuidado con el peso de la imagen del Hero).
- CLS < 0.1 (reservar espacio para Hero, vídeo y carrusel de logos).
- INP optimizado (evitar JS pesado en carrusel/formulario).
- HTTPS/SSL obligatorio.
- Google Analytics 4 + Google Search Console desde el lanzamiento (confirmar si ya existen cuentas).

---

## 6. Accesibilidad y aspectos técnicos generales

- Contraste AA de WCAG en todo el texto de cuerpo.
- Navegación completa por teclado, foco visible.
- `<label>` asociados a cada campo del formulario; errores accesibles.
- Responsive en breakpoints: móvil (~360–428px), tablet (~768px), escritorio (~1024–1440px), pantallas grandes (≥1920px).
- Hero adaptado en móvil (imagen recortada + H1/claim centrados o apilados).
- "Mi trayectoria" se apila en móvil (foto arriba, texto debajo).
- Vídeo embebido responsive (contenedor 16:9).

---

## 7. Textos legales (borrador)

Ángel ha solicitado un primer borrador estándar, ya que aún no dispone de versiones redactadas. Deben implementarse como páginas independientes no indexables (ver 5.5), enlazadas desde el footer.

> ⚠️ **Importante:** borrador genérico basado en RGPD/LOPDGDD y LSSI-CE, con placeholders `[ ]` a completar con los datos fiscales/identificativos reales. **Debe ser revisado por un profesional colegiado (abogado/gestoría) antes de publicar.** No constituye asesoramiento jurídico vinculante.

### 7.1 Aviso legal (borrador)

En cumplimiento del deber de información recogido en el artículo 10 de la Ley 34/2002, de 11 de julio, de Servicios de la Sociedad de la Información y del Comercio Electrónico (LSSI-CE), se facilitan los siguientes datos: el presente sitio web angelmendoza.es ("el Sitio Web") es titularidad de **[NOMBRE COMPLETO / RAZÓN SOCIAL]**, con NIF/CIF **[NIF/CIF]**, domicilio en **[DIRECCIÓN FISCAL COMPLETA]**, y correo electrónico de contacto **[EMAIL DE CONTACTO]**.

El acceso y/o uso de este Sitio Web atribuye la condición de usuario, que acepta las condiciones generales de uso aquí reflejadas. Los contenidos, textos, imágenes, logotipos y demás elementos son propiedad de [NOMBRE COMPLETO / RAZÓN SOCIAL] o de terceros que han autorizado su uso, protegidos por la normativa de propiedad intelectual e industrial vigente.

El titular no se hace responsable de daños derivados de interferencias, omisiones, interrupciones, virus, averías o desconexiones en el funcionamiento del Sitio Web, ni de retrasos o bloqueos causados por deficiencias o sobrecargas en Internet u otros sistemas electrónicos.

### 7.2 Política de privacidad (borrador)

**Responsable del tratamiento:** [NOMBRE COMPLETO / RAZÓN SOCIAL], NIF/CIF [NIF/CIF], domicilio en [DIRECCIÓN FISCAL], email [EMAIL DE CONTACTO].

**Finalidad:** los datos del formulario "Conectemos ya" (nombre, clínica, teléfono, email, contexto) se tratan para gestionar la solicitud de consultoría gratuita, contactar con el interesado y, puntualmente, enviar comunicaciones informativas sobre apariciones en medios, ponencias o presencia en ferias del sector.

**Legitimación:** consentimiento expreso mediante la casilla del formulario.

**Conservación:** mientras exista interés mutuo en el tratamiento y, tras finalizar la relación, durante los plazos legalmente exigibles.

**Destinatarios:** no se ceden datos a terceros salvo obligación legal; posibles encargados del tratamiento (hosting, email) con garantías RGPD.

**Derechos:** acceso, rectificación, supresión, oposición, limitación y portabilidad en [EMAIL DE CONTACTO]; reclamación ante la AEPD (www.aepd.es).

### 7.3 Política de cookies (borrador)

El Sitio Web puede utilizar cookies propias y/o de terceros (analítica tipo Google Analytics, o vídeos incrustados de YouTube) para mejorar la experiencia de navegación y obtener estadísticas de uso.

Tipos: cookies técnicas (necesarias), cookies analíticas (medición agregada/anónima) y cookies de terceros por contenidos incrustados (reproductor YouTube).

El usuario puede aceptar, rechazar o configurar las cookies no esenciales mediante el banner de consentimiento mostrado en la primera visita, y eliminarlas en cualquier momento desde su navegador.

> **Nota dev:** implementar un banner de consentimiento (CMP) que bloquee cookies no esenciales hasta el consentimiento, conforme a la guía de la AEPD.

---

## 8. Anexo: assets, pendientes y checklist de lanzamiento

### 8.1 Assets entregados

- `logo-angel-mendoza.png` — logotipo horizontal
- `foto-hero-angel.png` — foto de Ángel (⚠ baja resolución, ver 2.4)
- `foto-expodental-ril.png` — foto de equipo en Expodental

### 8.2 Pendiente de recopilar antes de maquetar

- Versión en alta resolución de la foto del Hero (mínimo 2400 px de ancho).
- Logotipos de las 17 marcas de "Ya me conocen" (PNG transparente o SVG).
- Datos fiscales/identificativos para los textos legales.
- Confirmación de perfiles de LinkedIn/redes para schema.org Person (sameAs) y footer.
- Validación final de meta description, mensaje de confirmación del formulario y texto del checkbox legal.
- Revisión de los 3 textos legales por un profesional colegiado antes de publicar.

### 8.3 Checklist antes del lanzamiento

- [ ] Certificado SSL activo y forzado (https, redirección desde http).
- [ ] Formulario probado en producción: envío correcto, email recibido, validaciones OK.
- [ ] Google Analytics 4 y Google Search Console instalados y verificados.
- [ ] Sitemap.xml generado y enviado a Search Console; páginas legales excluidas.
- [ ] Test de velocidad (PageSpeed Insights / Core Web Vitals) en móvil y escritorio.
- [ ] Test de responsive en los breakpoints principales.
- [ ] Banner de cookies funcionando y bloqueando cookies no esenciales hasta el consentimiento.
- [ ] Revisión de accesibilidad básica (contraste, foco de teclado, alt de imágenes).
