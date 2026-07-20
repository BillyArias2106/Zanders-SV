# Starter Platform

Base monorepo para la plataforma digital de un sitio nuevo.

## Stack

- `apps/web`: Next.js App Router, TypeScript, Tailwind, GSAP, Lenis, Framer Motion y Three.js.
- `apps/cms`: Payload CMS 3 sobre Next.js con PostgreSQL.
- `packages/ui`: componentes compartidos con Tailwind y Atomic Design.

## Desarrollo con Docker

```bash
docker compose up
```

En una base de datos nueva, Docker ejecuta las migraciones de Payload antes de
levantar el CMS, por lo que las tablas empiezan vacias y el primer usuario se
crea desde el panel de Payload.

Si ya tenias contenedores viejos corriendo y `/admin` falla con
`relation "users" does not exist`, reinicia el stack para que tome el comando
actualizado:

```bash
docker compose up --force-recreate
```

URLs locales:

- Web: `http://localhost:3000`
- CMS: `http://localhost:3001/admin`
- PostgreSQL: `postgresql://app:app_dev_password@localhost:5432/app`

Antes de usar en produccion, define un `PAYLOAD_SECRET` fuerte en `.env`.
