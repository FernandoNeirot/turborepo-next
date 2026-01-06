function getBaseUrl(): string {
  // En el servidor, usar variable de entorno o construir la URL
  if (typeof window === "undefined") {
    // En producción, usar la variable de entorno
    if (process.env.NEXT_PUBLIC_BASE_URL) {
      return process.env.NEXT_PUBLIC_BASE_URL;
    }
    // En desarrollo, construir la URL desde las variables de entorno
    // Next.js en el servidor puede usar localhost directamente
    const protocol = process.env.NEXT_PUBLIC_PROTOCOL || "http";
    const host = process.env.NEXT_PUBLIC_HOST || "localhost";
    const port = process.env.NEXT_PUBLIC_PORT || process.env.PORT || "3000";
    return `${protocol}://${host}:${port}`;
  }
  return "";
}

export interface User {
  uid: string;
  email: string | null;
  displayName: string | null;
  phone: string | null;
  name?: string;
  adress?: string;
  role?: string;
  createdAt?: Date | string;
  [key: string]: unknown;
}

export async function getUser(): Promise<User> {
  const baseUrl = getBaseUrl();
  const url = `${baseUrl}/api/user`;

  const response = await fetch(url, {
    credentials: "include", // Incluir cookies para la autenticación
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    if (response.status === 401) {
      throw new Error("No autorizado");
    }
    if (response.status === 404) {
      throw new Error("Usuario no encontrado");
    }
    const errorText = await response.text().catch(() => response.statusText);
    throw new Error(
      `Error al obtener usuario: ${response.status} - ${errorText}`
    );
  }

  const result = await response.json();

  if (result.error) {
    throw new Error(result.error);
  }

  return result.data;
}
