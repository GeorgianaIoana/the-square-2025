import { defineConfig, Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import Pages from 'vite-plugin-pages';
import PagesSitemap from 'vite-plugin-pages-sitemap';

export default defineConfig({
  plugins: [
    react(),
    Pages(),
    PagesSitemap({
      hostname: "https://thesquarechessclub.com",
      readable: true,
      exclude: ["/404"],
      changefreq: "weekly",
      priority: 0.7,
      lastmod: new Date(),
    }) as unknown as Plugin,
  ],
  optimizeDeps: {
    exclude: ["lucide-react"],
  },
});
