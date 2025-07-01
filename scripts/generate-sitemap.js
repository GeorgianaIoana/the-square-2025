import { writeFileSync } from "fs";
import { join } from "path";

const siteUrl = "https://thesquarechessclub.com";
const routes = [
  {
    path: "/",
    changefreq: "weekly",
    priority: 1.0,
    lastmod: new Date().toISOString().split("T")[0],
  },
  {
    path: "/contact",
    changefreq: "monthly",
    priority: 0.8,
    lastmod: new Date().toISOString().split("T")[0],
  },
  {
    path: "/team",
    changefreq: "monthly",
    priority: 0.8,
    lastmod: new Date().toISOString().split("T")[0],
  },
  {
    path: "/services",
    changefreq: "monthly",
    priority: 0.8,
    lastmod: new Date().toISOString().split("T")[0],
  },
  {
    path: "/calendar",
    changefreq: "weekly",
    priority: 0.7,
    lastmod: new Date().toISOString().split("T")[0],
  },
  {
    path: "/privacy-policy",
    changefreq: "yearly",
    priority: 0.3,
    lastmod: new Date().toISOString().split("T")[0],
  },
  {
    path: "/terms-and-conditions",
    changefreq: "yearly",
    priority: 0.3,
    lastmod: new Date().toISOString().split("T")[0],
  },
  {
    path: "/cookie-policy",
    changefreq: "yearly",
    priority: 0.3,
    lastmod: new Date().toISOString().split("T")[0],
  },
];

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes
  .map(
    (route) => `  <url>
    <loc>${siteUrl}${route.path}</loc>
    <lastmod>${route.lastmod}</lastmod>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>
  </url>`
  )
  .join("\n")}
</urlset>`;

const distPath = join(process.cwd(), "dist");
const sitemapPath = join(distPath, "sitemap.xml");

try {
  writeFileSync(sitemapPath, sitemap, "utf8");
  console.log("✅ Sitemap generat cu succes în dist/sitemap.xml");
} catch (error) {
  console.error("❌ Eroare la generarea sitemap-ului:", error);
}
