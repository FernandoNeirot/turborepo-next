/**
 * Servicio cliente para subir imágenes optimizadas
 * Usa la API route /api/images para procesar y subir imágenes
 */

export interface UploadImageOptions {
  /** Carpeta en Storage donde se guardará la imagen (ej: 'products', 'avatars') */
  folder?: string;
  /** Nombre personalizado del archivo. Si no se proporciona, se genera uno único */
  fileName?: string;
  /** Calidad de compresión WebP (0-100, default: 80) */
  quality?: number;
}

export interface UploadImageResult {
  /** URL pública de la imagen subida */
  url: string;
  /** Nombre del archivo generado */
  fileName: string;
  /** Ruta completa en Storage */
  path: string;
}

/**
 * Optimiza una imagen convirtiéndola a WebP y la sube a Firebase Storage
 * Usa la API route /api/images para el procesamiento
 * 
 * @param file - Archivo de imagen (File)
 * @param options - Opciones de configuración
 * @returns URL de descarga y metadatos de la imagen subida
 * 
 * @example
 * ```ts
 * const file = event.target.files[0];
 * const result = await uploadAndOptimizeImage(file, {
 *   folder: 'products',
 *   quality: 85
 * });
 * console.log(result.url); // URL pública de la imagen
 * ```
 */
export async function uploadAndOptimizeImage(
  file: File,
  options: UploadImageOptions = {}
): Promise<UploadImageResult> {
  const { folder = 'images', fileName, quality = 80 } = options;

  try {
    // Crear FormData para enviar la imagen
    const formData = new FormData();
    formData.append('image', file);

    // Construir URL con query parameters
    const url = new URL('/api/product/images', typeof window !== 'undefined' ? window.location.origin : '');
    if (folder) url.searchParams.set('folder', folder);
    if (quality) url.searchParams.set('quality', quality.toString());
    if (fileName) url.searchParams.set('fileName', fileName);

    // Enviar request a la API route
    const response = await fetch(url.toString(), {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ error: 'Error desconocido' }));
      throw new Error(errorData.error || `Error ${response.status}: ${response.statusText}`);
    }

    const result = await response.json();

    if (!result.success || !result.data) {
      throw new Error(result.error || 'Error al procesar la imagen');
    }

    return result.data;
  } catch (error) {
    console.error('[uploadAndOptimizeImage] Error:', error);
    throw new Error(`Error al optimizar y subir imagen: ${error instanceof Error ? error.message : 'Error desconocido'}`);
  }
}
