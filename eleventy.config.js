// Configuración de Eleventy para cercadia.com
// - Las páginas existentes (.html, /ca/, imágenes, _redirects...) se copian tal cual, sin procesar.
// - Eleventy solo genera el blog (/blog/) y el sitemap.xml.

const SITE_URL = "https://cercadia.com";

// En la web publicada (rama main) los artículos con "borrador: true" no se generan.
// En la URL de prueba (rama borrador) sí se ven, para poder revisarlos.
const IS_PRODUCTION = process.env.CONTEXT === "production";

export default function (eleventyConfig) {
  // --- Archivos que se copian tal cual ---
  eleventyConfig.addPassthroughCopy("*.html");
  eleventyConfig.addPassthroughCopy("ca");
  eleventyConfig.addPassthroughCopy("*.{png,jpg,jpeg,webp,ico,svg}");
  eleventyConfig.addPassthroughCopy("_redirects");
  eleventyConfig.addPassthroughCopy("robots.txt");
  eleventyConfig.addPassthroughCopy("blog/img");

  // --- Archivos que no forman parte de la web ---
  eleventyConfig.ignores.add("README.md");
  eleventyConfig.ignores.add("node_modules/**");
  eleventyConfig.ignores.add("_site/**");

  eleventyConfig.addGlobalData("site", { url: SITE_URL, isProduction: IS_PRODUCTION });

  // --- Colección de artículos (más recientes primero) ---
  eleventyConfig.addCollection("articulos", (api) =>
    api
      .getFilteredByGlob("blog/articulos/*.md")
      .filter((a) => !(IS_PRODUCTION && a.data.borrador))
      .sort((a, b) => b.date - a.date)
  );

  // --- Filtros ---
  // "5 de noviembre de 2026"
  eleventyConfig.addFilter("fechaLarga", (d) =>
    new Intl.DateTimeFormat("es-ES", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" }).format(d)
  );
  // "2026-11-05"
  eleventyConfig.addFilter("fechaISO", (d) => new Date(d).toISOString().slice(0, 10));
  // Minutos de lectura aproximados (200 palabras/minuto)
  eleventyConfig.addFilter("minutosLectura", (html) => {
    const palabras = String(html || "").replace(/<[^>]+>/g, " ").split(/\s+/).filter(Boolean).length;
    return Math.max(1, Math.round(palabras / 200));
  });
  eleventyConfig.addFilter("urlAbsoluta", (ruta) => new URL(ruta, SITE_URL).href);
  eleventyConfig.addFilter("json", (v) => JSON.stringify(v));

  return {
    dir: { input: ".", includes: "_includes", output: "_site" },
    templateFormats: ["md", "njk"],
    markdownTemplateEngine: false,
    htmlTemplateEngine: "njk",
  };
}
