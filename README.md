# Landing de Ángel Mendoza

Landing one-page construida con Next.js, React, TypeScript y Motion.

## Desarrollo

```bash
npm install
npm run dev
```

## Producción

```bash
npm run build
npm start
```

El proyecto se puede desplegar directamente en Vercel. Para activar el formulario, copia `.env.example` a `.env.local`, configura Resend y verifica el dominio remitente.

## Pendientes antes de publicar

- Completar los datos fiscales de las páginas legales.
- Revisión legal profesional.
- Añadir los logotipos que faltan si se reciben.
- Configurar Analytics/Search Console y una CMP si se añaden cookies no esenciales.

La versión actual no carga analítica ni cookies no esenciales. El vídeo utiliza modo de privacidad mejorada y solo se
carga cuando el visitante pulsa reproducir, por lo que no se muestra un banner que tape la conversión.
