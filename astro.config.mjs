// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  // The site's address. Used for link previews, the canonical address and the sitemap.
  site: 'https://alvarolopezguerra.com',
  integrations: [sitemap()],
});
