/**
 * Configuración de Orval para generar tipos y clientes API desde OpenAPI
 * 
 * Para usar Orval:
 * 1. Instalar: pnpm add -D orval
 * 2. Tener un archivo OpenAPI/Swagger de tu API
 * 3. Ejecutar: pnpm orval
 * 
 * Orval generará automáticamente:
 * - Tipos TypeScript desde el schema OpenAPI
 * - Cliente API con funciones tipadas
 * - Hooks de React Query (opcional)
 * 
 * NOTA: Este archivo es opcional. Si no tienes Orval instalado,
 * puedes ignorar este archivo o instalarlo cuando lo necesites.
 */

// @ts-ignore - Orval es opcional, solo se necesita si quieres generar tipos automáticamente
import { defineConfig } from 'orval';

export default defineConfig({
  rickandmorty: {
    // input: {
      // Si la API tuviera OpenAPI, aquí iría la URL o archivo
      // Por ahora, usamos tipos manuales
      // target: 'https://rickandmortyapi.com/api/openapi.json',
    // },
    output: {
      target: './app/features/characters/api/generated.ts',
      schemas: './app/features/characters/types/generated.ts',
      client: 'react-query',
      mode: 'tags-split',
      override: {
        mutator: {
          path: './app/shared/api/mutator.ts',
          name: 'customInstance',
        },
      },
    },
    hooks: {
      afterAllFilesWrite: 'prettier --write',
    },
  },
});

/**
 * Ejemplo de mutator personalizado (opcional)
 * Esto permite personalizar cómo se hacen las peticiones
 */
// apps/web/app/shared/api/mutator.ts
// export const customInstance = async <T>(
//   config: AxiosRequestConfig,
//   options?: AxiosRequestConfig
// ): Promise<T> => {
//   const response = await fetch(config.url!, {
//     ...config,
//     ...options,
//   });
//   return response.json();
// };
