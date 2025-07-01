import { writeFileSync } from "fs";
import { join } from "path";

const siteUrl = "https://thesquarechessclub.com";

const robotsTxt = `User-agent: *
Allow: /

Sitemap: ${siteUrl}/sitemap.xml

# Disallow admin or private areas (if any)
Disallow: /admin/
Disallow: /private/
Disallow: /api/

# Allow all other content
Allow: /images/
Allow: /assets/
Allow: /css/
Allow: /js/
`;

const distPath = join(process.cwd(), "dist");
const robotsPath = join(distPath, "robots.txt");

try {
  writeFileSync(robotsPath, robotsTxt, "utf8");
  console.log("✅ Robots.txt generat cu succes în dist/robots.txt");
} catch (error) {
  console.error("❌ Eroare la generarea robots.txt:", error);
}
