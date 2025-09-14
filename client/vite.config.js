import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { fileURLToPath } from 'url';
import { defineConfig } from 'vite';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({
   plugins: [react(), tailwindcss()],
   server: {
      host: true,
      allowedHosts: true,
   },
   resolve: {
      alias: {
         '@assets': path.resolve(__dirname, 'src/assets'),
      },
   },
});
