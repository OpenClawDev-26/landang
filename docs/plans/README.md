# Planes

Un fichero por tarea o feature. Es el **histórico real de trabajo** del repo: contexto, plan de
implementación y registro de lo hecho.

- Los crea `/spec` (o `/auto*` antes de ejecutar) y los consume `/exec*`.
- Nombre: `YYYY-MM-DD-slug-en-kebab-case.md` (fechas Europe/Madrid).
- Cada plan declara su **perfil de verificación** (`light`, `standard`, `full`) según el riesgo —
  ver la tabla de [`AGENTS.md`](../../AGENTS.md).
- Al terminar una tarea, el plan queda actualizado con lo que realmente se hizo y las incidencias
  `major`/`critical` que aparecieron.

Este proyecto **no tiene base de datos**, así que ningún plan lleva sección de migraciones.
