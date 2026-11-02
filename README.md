# Web de Cercadia (cercadia.com)

Trabajar siempre en la rama **borrador**. La rama **main** es la web publicada.

## Cómo publicar un cambio

1. Editar en la rama `borrador`.
2. Revisar en la URL de prueba: https://borrador--cercasenior.netlify.app
3. Pasar los cambios a `main`: *Compare & pull request* → *Create pull request* → *Merge pull request*.
4. En Netlify (Deploys), abrir la nueva versión de `main` y pulsar **Publish deploy** (gasta 15 créditos; la publicación automática está bloqueada).

## Cómo escribir un artículo del blog

Crear un archivo nuevo en `blog/articulos/`. El nombre del archivo será la dirección del artículo:
`blog/articulos/como-hablar-con-tu-madre.md` → `cercadia.com/blog/como-hablar-con-tu-madre/`
(minúsculas, sin acentos ni espacios, palabras separadas por guiones).

El archivo empieza con este encabezado:

```
---
titulo: "Título del artículo"
descripcion: "Resumen de una o dos frases. Sale en el listado, en Google y al compartir en WhatsApp."
date: 2026-11-20
autora: Ioana Resano
borrador: true
---

Aquí empieza el texto del artículo.
```

- `autora`: opcional. Si se borra la línea, el artículo sale sin firma.
- `borrador: true`: el artículo se ve en la URL de prueba (con una etiqueta "Borrador") pero **no** en cercadia.com. Para publicarlo, borrar esa línea.
- `imagen` e `imagen_alt` (opcionales): imagen de portada, guardada en `blog/img/`. Ejemplo: `imagen: /blog/img/llamada.jpg` y `imagen_alt: "Descripción de la imagen"`.
- `actualizado: 2026-12-01` (opcional): fecha de revisión del artículo.

Formato del texto: línea en blanco entre párrafos; `## Subtítulo`; `**negrita**`; `*cursiva*`; `- punto de lista`; `> cita destacada`; `[texto del enlace](https://...)`.

Recordatorios: sin precios ni número de llamadas en los artículos; nunca "control", "supervisión", "vigilancia" ni "cuidadora".

## Aspectos técnicos

- Las páginas existentes (`index.html`, `/ca/`, páginas legales, imágenes, `_redirects`) se copian tal cual.
- Eleventy genera solo el blog (`/blog/`) y `sitemap.xml` (plantilla `sitemap.njk`, que incluye las páginas fijas y los artículos).
- Plantillas del blog en `_includes/`. Configuración en `eleventy.config.js` y `netlify.toml`.
