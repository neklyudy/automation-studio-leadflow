import fs from "node:fs/promises";
import { render, site } from "../.ssr/entry-server.js";
const base = await fs.readFile("dist/index.html", "utf8");
const pagesBuild = process.env.GITHUB_PAGES === "true";
const basePath = process.env.VITE_BASE_PATH || "/";
const siteRoot = site.origin.replace(/\/$/, "") + basePath.replace(/\/$/, "");
function setMeta(html, key, value) {
  const escaped = value.replaceAll("&", "&amp;").replaceAll('"', "&quot;");
  const pattern = new RegExp(`<meta\\s+(?:name|property)="${key}"\\s+content="[^"]*"\\s*\\/?>`);
  return html.replace(pattern, () => `<meta ${key.startsWith("og:") ? "property" : "name"}="${key}" content="${escaped}" />`);
}
const routes = [
  [
    "/",
    "Automation Studio — автоматизація бізнес-процесів",
    "Автоматизація заявок, розрахунків і роботи з клієнтами. Ознайомтеся з LeadFlow — навчальною CRM для клінінгу на Google Workspace.",
  ],
  [
    "/projects/leadflow",
    "LeadFlow — навчальна CRM для клінінгу | Automation Studio",
    "Як влаштована автоматизація заявок: форма, перевірка даних, розрахунок вартості, сповіщення й панель менеджера. Докладний кейс LeadFlow.",
  ],
  [
    "/404",
    "Сторінку не знайдено | Automation Studio",
    "Поверніться до проєктів і рішень Automation Studio.",
  ],
];
for (const [path, title, description] of routes) {
  const canonical = site.origin
    ? siteRoot + (path === "/" ? "/" : path + (pagesBuild ? "/" : ""))
    : "";
  let html = base
    .replace('<div id="root"></div>', `<div id="root">${render(path)}</div>`)
    .replace(/<title>.*?<\/title>/, `<title>${title}</title>`);
  html = setMeta(html, "description", description);
  html = setMeta(html, "og:title", title);
  html = setMeta(html, "og:description", description);
  html = setMeta(html, "og:image", `${siteRoot}/og-cover.png`);
  html = setMeta(html, "twitter:title", title);
  html = setMeta(html, "twitter:description", description);
  html = setMeta(html, "twitter:image", `${siteRoot}/og-cover.png`);
  html = html
    .replace('content="/og-cover.png"', `content="${site.origin}/og-cover.png"`)
    .replace(
      "</head>",
      `${canonical ? `<link rel="canonical" href="${canonical}"/><meta property="og:url" content="${canonical}"/>` : ""}<meta name="robots" content="${site.indexable && path !== "/404" ? "index,follow" : "noindex,nofollow"}"/></head>`,
    );
  // Flat HTML gives clean routes a real file, rather than an SPA fallback to home.
  const file =
    path === "/"
      ? "dist/index.html"
      : path === "/404"
        ? "dist/404.html"
        : pagesBuild ? `dist${path}/index.html` : `dist${path}.html`;
  await fs.mkdir(file.substring(0, file.lastIndexOf("/")), { recursive: true });
  await fs.writeFile(file, html);
}
await fs.writeFile(
  "dist/robots.txt",
  `User-agent: *\n${site.indexable ? "Allow: /" : "Disallow: /"}\n${site.indexable && site.origin ? `Sitemap: ${siteRoot}/sitemap.xml\n` : ""}`,
);
if (site.origin)
  await fs.writeFile(
    "dist/sitemap.xml",
    `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"><url><loc>${siteRoot}/</loc></url><url><loc>${siteRoot}/projects/leadflow${pagesBuild ? "/" : ""}</loc></url></urlset>`,
  );
if (pagesBuild) await fs.writeFile("dist/.nojekyll", "");
console.log(
  "Prerendered: /, /projects/leadflow, /404; SEO metadata generated.",
);
