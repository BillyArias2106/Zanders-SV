# Plan de profesionalización del CMS

## Diagnóstico

La plataforma ya tiene una base sólida: monorepo con `apps/web`, `apps/cms`, `packages/ui`, Payload CMS 3, PostgreSQL y un frontend Next.js que consume contenido por REST. El riesgo principal no es técnico sino de producto: el admin mezcla configuración de empresa, marca, SEO, footer, contacto y legal dentro de `company-settings`, mientras `main-navigation` y `footer-settings` permanecen como globals heredados. Eso puede confundir a clientes finales si se exponen como módulos activos.

Problemas encontrados:

- `company-settings` concentra demasiados dominios funcionales.
- `main-navigation` y `footer-settings` existen por compatibilidad, pero el flujo activo ya usa `pages` y `company-settings`.
- `pages` tenía buen contenido base, pero le faltaban campos editoriales profesionales como tipo, plantilla, noindex/nofollow, canonical y presentación.
- `media` era funcional, pero no tenía clasificación por uso, carpetas, tags, créditos ni soporte documental.
- `contact-submissions` guardaba mensajes, pero no operaba como mini CRM.
- `users` no tenía metadatos de rol para evolucionar permisos.
- El dashboard y la navegación del admin todavía explicaban la estructura antigua.

## Decisión de arquitectura

Fase 1 mantiene `company-settings` como fuente compatible para evitar romper el frontend público y datos existentes. Los globals heredados `main-navigation` y `footer-settings` quedan ocultos y marcados como legado.

La separación recomendada para una fase posterior es:

- `company-settings`: datos legales/base de empresa.
- `branding-settings`: logos, favicon, colores, tipografías y tokens visuales.
- `seo-settings`: SEO global, indexación, canonical base, OG/Twitter defaults y schema base.
- `navigation-settings`: navegación manual avanzada, CTA de header y comportamiento responsive.
- `footer-settings`: columnas, enlaces, redes visibles, legales inferiores y copyright.
- `contact-settings`: textos de formulario, destinatarios por idioma/formulario, WhatsApp y horarios.
- `integration-settings`: Analytics, GTM, pixels, reCAPTCHA/hCaptcha y scripts controlados.
- `legal-settings`: privacidad, términos, cookies y textos legales reutilizables.

Estrategia de migración recomendada:

1. Crear nuevos globals con campos equivalentes.
2. Agregar fetchers que lean primero el nuevo global y caigan a `company-settings`.
3. Crear migración que copie datos desde `company-settings`.
4. Cambiar el admin para ocultar pestañas migradas de `company-settings`.
5. Mantener compatibilidad de API por una versión antes de eliminar campos antiguos.

## Estructura de admin recomendada

- Dashboard.
- Sitio web: páginas, navegación automática, presentación por página.
- Contenido: medios, galerías, servicios, testimonios, equipo, clientes y proyectos.
- Configuración: empresa, marca, footer, contacto, redes, SEO y legal.
- Leads y contacto: mensajes recibidos, responsables, prioridad, seguimiento y próximos pasos.
- SEO y marketing: redirects, sitemap, robots, analytics, pixels y tags.
- Sistema: usuarios, roles, seguridad y auditoría.

## Cambios aplicados en Fase 1

- Grupos administrativos centralizados en `apps/cms/src/lib/admin-groups.ts`.
- `pages` movido a `Sitio web` con campos:
  - `pageType`
  - `pageTemplate`
  - `isFeatured`
  - `seo.canonicalUrl`
  - `seo.noIndex`
  - `seo.noFollow`
  - `headerStyle`
  - `hideFooter`
  - `enableBreadcrumbs`
  - `customClassName`
- Metadata pública ahora respeta canonical específico, noindex y nofollow.
- `media` mejorado con:
  - PDF permitido.
  - tamaños `thumbnail`, `card` y `hero`.
  - focal point.
  - `usageType`
  - `folder`
  - `tags`
  - poster obligatorio para videos.
  - créditos, copyright y URL de origen.
- Configuración global de uploads:
  - nombres de archivo seguros.
  - límite de 100 MB.
- `contact-submissions` ampliado como mini CRM:
  - prioridad.
  - responsable.
  - tags.
  - notas internas.
  - historial de seguimiento.
  - última respuesta.
  - próxima acción.
  - motivo de pérdida.
  - estados extendidos: contactado, seguimiento, ganado y perdido.
- `users` ahora tiene `role` como base para permisos.
- `company-settings` renombrado visualmente como `Configuración del sitio`.
- `main-navigation` y `footer-settings` quedan etiquetados como legado.
- Navegación superior y dashboard del admin actualizados para un flujo comercial.

## Fase 2: CMS comercial

Prioridad alta:

- Separar `branding-settings`, `seo-settings`, `contact-settings` y `integration-settings` con migración.
- Crear colecciones `services`, `testimonials`, `team-members`, `clients`, `projects`, `categories` y `tags`.
- Crear `reusable-sections` para guardar bloques reutilizables.
- Dividir `snapLayoutBlock`: mantenerlo como avanzado y ofrecer bloques simples para clientes.

Bloques recomendados:

- Hero avanzado.
- Hero split.
- Beneficios.
- Servicios.
- Proceso / pasos.
- Testimonios.
- Logos de clientes.
- Equipo.
- Pricing.
- Estadísticas.
- Mapa.
- CTA avanzado.
- Timeline.
- Portafolio / proyectos.
- Descarga de archivos.
- Embed externo.
- Formulario personalizado.

Cada bloque debe tener configuración común: sección ID, espaciado, ancho máximo, fondo, color de texto, alineación, visibilidad por dispositivo y clase CSS segura.

## Fase 3: Leads, SEO e integraciones

- Crear formularios configurables con campos dinámicos.
- Agregar honeypot, rate limit y reCAPTCHA/hCaptcha.
- Exportación CSV de leads.
- Filtros guardados por estado, prioridad, responsable y fecha.
- Redirecciones 301/302.
- `sitemap.xml` dinámico.
- `robots.txt` dinámico.
- `hreflang`.
- Schema.org para Organization, WebSite, LocalBusiness y BreadcrumbList.
- Analytics, GTM, Meta Pixel y TikTok Pixel desde configuración.

## Fase 4: Roles, dashboard y pulido

Permisos propuestos:

- `superAdmin`: todo.
- `admin`: contenido, marca, SEO, usuarios no críticos y leads.
- `editor`: crear/editar contenido, no publicar configuración crítica.
- `marketing`: SEO, analytics, redirects, campañas y leads.
- `viewer`: solo lectura.
- `client`: lectura y edición limitada de contenido asignado.

Dashboard final:

- páginas publicadas y borradores.
- mensajes nuevos.
- últimos leads.
- alertas de configuración incompleta.
- medios sin alt.
- páginas con SEO incompleto.
- formularios sin destinatarios.
- SMTP no configurado.
- acceso a preview del sitio público.
- últimos cambios y actividad.

## Comandos de verificación

Después de instalar dependencias:

```bash
pnpm cms:types
pnpm cms:importmap
pnpm typecheck
pnpm build
docker compose up
```
