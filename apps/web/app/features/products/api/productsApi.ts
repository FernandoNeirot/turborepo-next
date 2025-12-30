
import type { Product, CreateProductInput, UpdateProductInput } from '../types';

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
  return '';
}

export async function getProducts(userId?: string): Promise<Product[]> {
  const baseUrl = getBaseUrl();
  const url = userId 
    ? `${baseUrl}/api/products?userId=${encodeURIComponent(userId)}`
    : `${baseUrl}/api/products`;
  
  const response = await fetch(url, {
    next: { revalidate: 3600 },
    headers: {
      'Content-Type': 'application/json',
    },
  });
  
  if (!response.ok) {
    const errorText = await response.text().catch(() => response.statusText);
    throw new Error(`Error al obtener productos: ${response.status} - ${errorText}`);
  }
  
  const result = await response.json();
  
  if (result.error) {
    throw new Error(result.error);
  }
  
  return result.data || [];
}

export async function createProduct(input: CreateProductInput): Promise<Product> {
  const baseUrl = getBaseUrl();
  const url = `${baseUrl}/api/product`;
  
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(input),
  });
  
  if (!response.ok) {
    const errorText = await response.text().catch(() => response.statusText);
    throw new Error(`Error al crear producto: ${response.status} - ${errorText}`);
  }
  
  const result = await response.json();
  
  if (result.error) {
    throw new Error(result.error);
  }
  
  return result.data;
}

export async function deleteProduct(id: string): Promise<void> {
  const baseUrl = getBaseUrl();
  const url = `${baseUrl}/api/product/${id}`;
  const response = await fetch(url, {
    method: 'DELETE',
  });
  if (!response.ok) {
    const errorText = await response.text().catch(() => response.statusText);
    throw new Error(`Error al eliminar producto: ${response.status} - ${errorText}`);
  }
  const result = await response.json();
  
  if (result.error) {
    throw new Error(result.error);
  }
  
  return result.data;
}

export async function uploadImageInFirebase(input: File): Promise<File> {
  const baseUrl = getBaseUrl();
  const url = `${baseUrl}/api/product/images`;
  
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(input),
  });
  
  if (!response.ok) {
    const errorText = await response.text().catch(() => response.statusText);
    throw new Error(`Error al crear producto: ${response.status} - ${errorText}`);
  }
  
  const result = await response.json();
  
  if (result.error) {
    throw new Error(result.error);
  }
  
  return result.data;
}

export async function updateProduct(input: UpdateProductInput): Promise<Product> {
  const baseUrl = getBaseUrl();
  const url = `${baseUrl}/api/product/${input.id}`;
  
  const response = await fetch(url, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      title: input.title,
      description: input.description,
      price: input.price,
      imageUrl: input.imageUrl,
    }),
  });
  
  if (!response.ok) {
    const errorText = await response.text().catch(() => response.statusText);
    throw new Error(`Error al actualizar producto: ${response.status} - ${errorText}`);
  }
  
  const result = await response.json();
  
  if (result.error) {
    throw new Error(result.error);
  }
  
  return result.data;
}
