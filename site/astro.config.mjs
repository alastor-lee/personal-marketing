// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  // Used for canonical URLs + absolute RSS links.
  site: 'https://alastorcurns.com',
  vite: {
    plugins: [tailwindcss()],
  },
});
