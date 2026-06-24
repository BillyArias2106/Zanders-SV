# Zanders Platform

Base monorepo para la plataforma digital de Zanders SV y Zanders Aero Solutions.

## Stack

- `apps/web`: Next.js App Router, TypeScript, Tailwind, GSAP, Lenis, Framer Motion y Three.js.
- `apps/cms`: Payload CMS 3 sobre Next.js con PostgreSQL.
- `packages/ui`: componentes compartidos con Tailwind y Atomic Design.

## Desarrollo con Docker

```bash
docker compose up
```

URLs locales:

- Web: `http://localhost:3000`
- CMS: `http://localhost:3001/admin`
- PostgreSQL: `postgresql://zanders:zanders_dev_password@localhost:5432/zanders`

Antes de usar en produccion, define un `PAYLOAD_SECRET` fuerte en `.env`.
