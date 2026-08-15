# RedLocal — landing (`www.redlocal.cl`)

Sitio estático hecho a mano (HTML + CSS + JS vanilla, **sin build**) desplegado en
**Cloudflare Pages**, que sirve la raíz del repo tal cual. Es la vitrina pública de RedLocal:
sistemas que detectan eventos, filtran el ruido y avisan a la persona correcta por el canal
adecuado.

## Servir en local

Sin instalación ni build. Servir la raíz por HTTP:

```bash
python3 -m http.server 8080   # http://localhost:8080
```

## Tests

Contrato de contenido/SEO en **`unittest`** de la stdlib (no pytest). Cubren la landing de
oferta `/diagnostico-ot/` (alcance, exclusiones, enlaces, canonical + OG + JSON-LD, y que la
home y el sitemap enlacen a la oferta):

```bash
python3 -m unittest discover -s tests          # todo
python3 -m unittest tests.test_diagnostico_ot  # un módulo
```

## Deploy

Push al repo; Cloudflare Pages publica la raíz de la rama tal cual (no hay carpeta `dist/`).
`_headers` (CSP + cabeceras de seguridad), `robots.txt`, `sitemap.xml` y
`manifest.webmanifest` son configuración de producción en vivo.

## Estructura

| Ruta | Qué es |
|------|--------|
| `index.html` · `styles.css` · `app.js` | Home. Un CSS, un JS (IIFE, mejora progresiva). |
| `diagnostico-ot/` | Landing de oferta autónoma (con su test de contrato). |
| `privacidad.html` | Política de privacidad. |
| `assets/` | Imágenes (hero + OG, `.webp` con fallback). |
| `tests/` | Test de contrato (`unittest`). |
| `remotion/` | Proyecto React/Remotion aparte para assets de video (no se despliega). |

Ver `CLAUDE.md` para el detalle de arquitectura y convenciones.
