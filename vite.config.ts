import { defineConfig, Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import Pages from 'vite-plugin-pages';
import PagesSitemap from 'vite-plugin-pages-sitemap';

export default defineConfig({
  plugins: [
    react(),
    Pages(),
    PagesSitemap({
      hostname: "https://thesquare.ro",
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
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          // Vendor chunks
          if (id.includes('node_modules')) {
            if (id.includes('react-dom') || id.includes('react-router')) {
              return 'vendor-react';
            }
            if (id.includes('framer-motion')) {
              return 'vendor-framer';
            }
            if (id.includes('swiper')) {
              return 'vendor-swiper';
            }
            // Other vendor libs
            return 'vendor';
          }
        },
      },
    },
    // Increase chunk size warning limit
    chunkSizeWarningLimit: 600,
    // Enable minification with esbuild (built-in, faster)
    minify: 'esbuild',
    // Disable source maps for smaller production bundle
    sourcemap: false,
  },
  server: {
    host: true,
    port: 5173,
    strictPort: false,
    open: true,
    cors: true,
    headers: {
      'Cache-Control': 'no-store',
    },
  },
});
