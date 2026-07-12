# Despliegue

Build de producción con `output: standalone` (ver `next.config.ts`): genera un servidor Node autocontenido en `.next/standalone`.

## Opción A — Droplet propio (objetivo)

El dominio `redlocal.cl` ya vive en un droplet con nginx. El sitio nuevo necesita un proceso Node (por el route handler del formulario → CRM).

### Build

```bash
npm ci
npm run build
# artefactos: .next/standalone (server.js), .next/static, public/
```

### Servir con systemd

Copiar `.next/standalone`, `.next/static` y `public/` al servidor. Ejemplo de unit:

```ini
# /etc/systemd/system/redlocal.service
[Service]
WorkingDirectory=/var/www/redlocal-app
ExecStart=/usr/bin/node server.js
Environment=NODE_ENV=production
Environment=PORT=3000
Environment=TWENTY_API_URL=https://crm.redlocal.cl/rest
Environment=TWENTY_API_KEY=***        # nunca en el repo
Environment=LEADS_DIR=/var/lib/redlocal/leads
Restart=always
User=www-data
[Install]
WantedBy=multi-user.target
```

`LEADS_DIR` debe existir y ser escribible por `www-data`, **fuera del webroot**.

### nginx (reverse proxy)

```nginx
location / {
  proxy_pass http://127.0.0.1:3000;
  proxy_set_header Host $host;
  proxy_set_header X-Real-IP $remote_addr;
  proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
  proxy_set_header X-Forwarded-Proto $scheme;
}
```

El route handler lee `x-forwarded-for` para el rate limiting: asegurar que nginx lo envíe (arriba).

### Switch desde legacy

El sitio actual (RestoRdL, en `legacy/`) sigue sirviéndose hasta el switch. Cambiar el `proxy_pass`/root de nginx al nuevo servicio cuando se valide. Mantener `legacy/` como referencia.

## Opción B — Vercel

`git push` de la rama conectada. Configurar `TWENTY_API_URL` y `TWENTY_API_KEY` como env vars del proyecto. El fallback a disco **no es persistente** en Vercel (filesystem efímero): con Vercel, configurar el CRM sí o sí, o cambiar el fallback a un store durable (KV). Documentado como limitación.

## Checklist de producción

- [ ] `npm run lint && npm run typecheck && npm run test && npm run build` en verde.
- [ ] Variables de entorno configuradas (o fallback a disco aceptado conscientemente).
- [ ] `LEADS_DIR` existe, escribible, fuera del webroot.
- [ ] HTTPS/HSTS activo en nginx.
- [ ] Plausible recibiendo eventos (`data-domain` correcto).
- [ ] Prueba real del formulario end-to-end.
