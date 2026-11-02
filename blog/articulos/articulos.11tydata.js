// Valores por defecto de todos los artículos del blog
const IS_PRODUCTION = process.env.CONTEXT === "production";
const SITE_URL = "https://cercadia.com";

export default {
  layout: "articulo.njk",
  eleventyComputed: {
    // URL: /blog/nombre-del-archivo/  (el nombre del archivo .md es la dirección del artículo)
    // Los artículos marcados "borrador: true" no se generan en la web publicada.
    permalink: (data) =>
      IS_PRODUCTION && data.borrador ? false : `/blog/${data.page.fileSlug}/`,

    // titulo_seo (opcional): título más corto para Google (máx. ~60 caracteres)
    tituloPagina: (data) => data.titulo_seo || `${data.titulo} | Blog de Cercadia`,
    ogTitulo: (data) => data.titulo,
    descripcionPagina: (data) => data.descripcion,
    ogTipo: () => "article",
    ogImagen: (data) => data.imagen || null,

    // Datos estructurados para Google (tipo BlogPosting)
    jsonld: (data) => {
      const url = `${SITE_URL}/blog/${data.page.fileSlug}/`;
      const fecha = new Date(data.page.date).toISOString().slice(0, 10);
      const cercadia = { "@type": "Organization", name: "Cercadia", url: SITE_URL };
      const ld = {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        headline: data.titulo,
        description: data.descripcion,
        datePublished: fecha,
        dateModified: data.actualizado ? new Date(data.actualizado).toISOString().slice(0, 10) : fecha,
        inLanguage: "es-ES",
        mainEntityOfPage: url,
        url,
        author: data.autora ? { "@type": "Person", name: data.autora } : cercadia,
        publisher: { ...cercadia, logo: { "@type": "ImageObject", url: `${SITE_URL}/favicon-192.png` } },
      };
      if (data.imagen) ld.image = new URL(data.imagen, SITE_URL).href;
      return ld;
    },
  },
};
