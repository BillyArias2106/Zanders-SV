# CMS Profesional

Base monorepo para un CMS profesional con sitio web y panel administrativo.

## Stack

- `apps/web`: Next.js App Router, TypeScript, Tailwind, GSAP, Lenis, Framer Motion y Three.js.
- `apps/cms`: Payload CMS 3 sobre Next.js con PostgreSQL.
- `packages/ui`: componentes compartidos con Tailwind y Atomic Design.

## Desarrollo con Docker

```bash
docker compose up
```

Docker usa el proyecto `cms-profesional`, asi que los contenedores y volumenes
quedan agrupados con ese prefijo aunque clones el repo en otra carpeta.

La primera vez Docker descarga las imagenes y `pnpm` instala las dependencias.
Despues, si no cambian los `package.json` o `pnpm-lock.yaml`, Docker reutiliza
los volumenes y se salta la instalacion para levantar mas rapido.

En desarrollo, Docker ejecuta las migraciones de Payload antes de iniciar el
CMS. La base de datos queda lista con las tablas vacias y el primer usuario se
crea desde el panel de Payload.

Para produccion, manten `PAYLOAD_DB_PUSH=false` y usa migraciones controladas.

Si ya tenias contenedores viejos corriendo y `/admin` falla con
`relation "users" does not exist`, reinicia el stack para que tome el comando
actualizado:

```bash
docker compose up --force-recreate
```

Docker Desktop muestra varios volumenes porque cada uno guarda un tipo de dato
distinto: Postgres, cache de pnpm, cache de Corepack, `node_modules` y cache de
Next. Separarlos evita conflictos entre rutas internas y acelera los siguientes
arranques. Todos pertenecen al proyecto `cms-profesional`.

Para limpiar volumenes viejos de pruebas anteriores, apaga primero esos stacks
desde Docker Desktop o con `docker compose down` en la carpeta donde los creaste.

URLs locales:

- Web: `http://localhost:3000`
- CMS: `http://localhost:3001/admin`
- PostgreSQL interno: `postgresql://app:app_dev_password@postgres:5432/app`

Antes de usar en produccion, define un `PAYLOAD_SECRET` fuerte en `.env`.
