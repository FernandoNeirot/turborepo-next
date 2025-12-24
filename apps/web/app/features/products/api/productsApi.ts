/**
 * Servicio de API para productos
 * Esta capa abstrae las llamadas HTTP
 */

import type { Product } from '../types';

// Función helper para obtener la URL base en el servidor
function getBaseUrl(): string {
  // En el servidor, usar variable de entorno o construir la URL
  if (typeof window === 'undefined') {
    // En producción, usar la variable de entorno
    if (process.env.NEXT_PUBLIC_BASE_URL) {
      return process.env.NEXT_PUBLIC_BASE_URL;
    }
    // En desarrollo, construir la URL desde las variables de entorno
    // Next.js en el servidor puede usar localhost directamente
    const protocol = process.env.NEXT_PUBLIC_PROTOCOL || 'http';
    const host = process.env.NEXT_PUBLIC_HOST || 'localhost';
    const port = process.env.NEXT_PUBLIC_PORT || process.env.PORT || '3000';
    return `${protocol}://${host}:${port}`;
  }
  // En el cliente, usar URL relativa
  return '';
}

/**
 * Obtiene la lista de productos desde la API route
 * La API route está en: apps/web/api/products/route.ts
 * 
 * La API devuelve: { data: Product[], error: null }
 */
export async function getProducts(): Promise<Product[]> {
  const baseUrl = getBaseUrl();
  const url = `${baseUrl}/api/products`;
  
  console.log('[getProducts] Llamando a:', url);
  console.log('[getProducts] Es servidor:', typeof window === 'undefined');
  
  const response = await fetch(url, {
    next: { revalidate: 3600 }, // Revalidar cada hora
    headers: {
      'Content-Type': 'application/json',
    },
  });
  
  console.log('[getProducts] Response status:', response.status, response.statusText);
  
  if (!response.ok) {
    const errorText = await response.text().catch(() => response.statusText);
    console.error('[getProducts] Error en response:', errorText);
    throw new Error(`Error al obtener productos: ${response.status} - ${errorText}`);
  }
  
  const result = await response.json();
  console.log('[getProducts] Response data:', result);
  
  // La API devuelve { data: Product[], error: null }
  if (result.error) {
    throw new Error(result.error);
  }
  
  return result.data || [];
}

