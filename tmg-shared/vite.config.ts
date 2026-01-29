import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  build: {
    emptyOutDir: false,
    lib: {
      entry: {
        index: resolve(__dirname, 'src/index.ts'),
        server: resolve(__dirname, 'src/server.ts'),
      },
      name: 'tmg-shared',
      formats: ['es', 'cjs']
    },
    rollupOptions: {
      external: (id: string) =>
        id.startsWith('@prisma/client') ||
        id.startsWith('node:') ||
        id === 'zod',
      output: {
        globals: {
          zod: 'Zod',
        },
      },
    },
  },
});
