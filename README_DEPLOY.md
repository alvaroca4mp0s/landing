# Deploy RedLocal Landing (estático)

Este proyecto es una landing estática (HTML + CSS), sin backend.

## Estructura esperada

- `index.html`
- `styles.css`
- `assets/` (opcional, para imágenes livianas / íconos)

## 1) Probar local (rápido)

Puedes abrir `index.html` directo en navegador o levantar un servidor simple:

```bash
cd /home/alvaro/Projects/redlocal-landing
python3 -m http.server 8080
```

Luego visita: `http://localhost:8080`

## 2) Reemplazar placeholders obligatorios (1 línea c/u)

Antes de publicar, reemplaza estos valores:

1. **WhatsApp CTA** en `index.html`:
   - Buscar: `56XXXXXXXXX`
   - Reemplazar por número real en formato internacional (sin `+` ni espacios).

2. **Email de contacto** en `index.html`:
   - Buscar: `contacto@redlocal.cl`
   - Reemplazar si corresponde.

3. **RUT opcional** en `index.html`:
   - Buscar: `[RUT_OPCIONAL]`
   - Completar o eliminar la línea.

4. **Política/Términos**:
   - Buscar: `[PENDIENTE]`
   - Reemplazar por URLs reales.

## 3) Deploy al droplet con rsync

Comando base solicitado:

```bash
rsync -avz --delete ./ root@IP_DEL_DROPLET:/var/www/redlocal.cl/
```

### Recomendación segura

Ejecuta primero en modo simulación para validar qué cambia:

```bash
rsync -avzn --delete ./ root@IP_DEL_DROPLET:/var/www/redlocal.cl/
```

Luego, si está bien, corre el comando real sin `n`.

## 4) Permisos en servidor (si corresponde)

Si Nginx/Apache sirve como `www-data`, asegúrate de dueño y permisos:

```bash
chown -R www-data:www-data /var/www/redlocal.cl
find /var/www/redlocal.cl -type d -exec chmod 755 {} \;
find /var/www/redlocal.cl -type f -exec chmod 644 {} \;
```

## 5) Checklist post-deploy

- [ ] `https://redlocal.cl` carga sin errores
- [ ] CTA WhatsApp abre conversación correcta
- [ ] CTA email abre dirección correcta
- [ ] Diseño mobile se ve bien (320px en adelante)
- [ ] No hay imágenes pesadas ni elementos rotos
- [ ] Footer con datos finales (RUT/legal) actualizado

## Notas

- Esta landing no usa frameworks para mantener carga rápida.
- Si agregas imágenes en `assets/`, ideal comprimirlas (WebP/JPG optimizado) antes de subir.
