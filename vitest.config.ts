import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
// import path from 'path';

// https://medium.com/@kafkahw/adding-vitest-react-testing-library-to-an-existing-react-project-w-o-vite-97e4aeb2ae2d
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true, // ini tetap require import jadi tambah config di tsconfig.app.json
    environment: 'jsdom',
    setupFiles: './src/tests/setup.ts',
    passWithNoTests: true,
    coverage: {
      include: ['src/**/*.{ts,tsx}'], 
      // exclude: ['src/generated/**/*.ts'],
      reporter: ['text', 'html']
    },
  },
  resolve: {
    // alias: {
    //   '@': path.resolve(__dirname, './src'),
    // },
  },
});
