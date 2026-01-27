import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  build: {
    emptyOutDir: false,
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'tmg-shared',
      fileName: 'index',
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
