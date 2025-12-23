import { defineConfig } from 'tsup';
import postcss from 'esbuild-postcss';

export default defineConfig({
  entry: ['src/index.tsx'],
  format: ['cjs', 'esm'],
  dts: true,
  sourcemap: true,
  clean: true,
  external: ['react', 'react-dom', 'next'],
  outDir: 'dist',
  esbuildPlugins: [postcss()],
  injectStyle: true,
});
