import type { StorybookConfig } from '@storybook/react-vite';
import path from "path";
import { dirname } from "path"
import { fileURLToPath } from "url"
import tailwindcss from '@tailwindcss/postcss';
import autoprefixer from 'autoprefixer';

const __dirname = dirname(fileURLToPath(import.meta.url));

/**
* This function is used to resolve the absolute path of a package.
* It is needed in projects that use Yarn PnP or are set up within a monorepo.
*/
function getAbsolutePath(value: string): any {
  return dirname(fileURLToPath(import.meta.resolve(`${value}/package.json`)))
}
const config: StorybookConfig = {
  "stories": ["../../../packages/ui/src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  "addons": [
    getAbsolutePath('@chromatic-com/storybook'),
    getAbsolutePath('@storybook/addon-vitest'),
    getAbsolutePath('@storybook/addon-a11y'),
    getAbsolutePath('@storybook/addon-docs')
  ],
  "framework": getAbsolutePath('@storybook/react-vite'),
  async viteFinal(config) {
    if (config.resolve) {
      config.resolve.alias = {
        ...config.resolve.alias,
        "@tu-org/ui": path.resolve(__dirname, "../../../packages/ui/src"),
        // Mock de next/image para Storybook
        "next/image": path.resolve(__dirname, "./next-image-stub.tsx"),
      };
    }
    
    // Configurar Vite para manejar correctamente React
    config.optimizeDeps = {
      ...config.optimizeDeps,
      include: [
        ...(config.optimizeDeps?.include || []),
        'react',
        'react-dom',
      ],
    };
    
    // Configurar PostCSS con Tailwind v4 directamente
    if (!config.css) {
      config.css = {};
    }
    
    // Configurar PostCSS directamente con los plugins
    config.css.postcss = {
      plugins: [
        tailwindcss,
        autoprefixer,
      ],
    };
    
    // Definir process para componentes que puedan usar Next.js
    if (!config.define) {
      config.define = {};
    }
    config.define['process.env'] = JSON.stringify({});
    config.define['process.env.NODE_ENV'] = JSON.stringify('development');
    
    // Excluir next/image de la optimización para evitar errores
    if (config.optimizeDeps) {
      config.optimizeDeps.exclude = [
        ...(config.optimizeDeps.exclude || []),
        'next/image',
      ];
    }
    
    return config;
  }
};
export default config;