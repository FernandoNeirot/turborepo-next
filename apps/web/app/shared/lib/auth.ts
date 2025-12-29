import { cookies } from 'next/headers';

interface FirebaseJWTPayload {
  sub?: string; 
  name?: string;
  user_id?: string;
  uid?: string;
  [key: string]: unknown;
}

function decodeJWT(token: string): FirebaseJWTPayload | null {
  try {
    const parts = token.split('.');
    if (parts.length !== 3 || !parts[1]) {
      return null;
    }

    const payload = parts[1];
    
    const base64 = payload.replace(/-/g, '+').replace(/_/g, '/');
    
    const paddedBase64 = base64.padEnd(base64.length + (4 - (base64.length % 4)) % 4, '=');
    
    const decoded = Buffer.from(paddedBase64, 'base64').toString('utf-8');
    
    return JSON.parse(decoded) as FirebaseJWTPayload;
  } catch (error) {
    console.error('[decodeJWT] Error decodificando token:', error);
    return null;
  }
}

export async function getUserIdFromSession(): Promise<string | null> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('session_token')?.value;

    if (!token) {
      return null;
    }

    const payload = decodeJWT(token);
    
    if (!payload) {
      return null;
    }

    return payload.sub || payload.user_id || payload.uid || null;
  } catch (error) {
    console.error('[getUserIdFromSession] Error obteniendo userId:', error);
    return null;
  }
}

export async function getSessionToken(): Promise<string | null> {
  try {
    const cookieStore = await cookies();
    return cookieStore.get('session_token')?.value || null;
  } catch (error) {
    console.error('[getSessionToken] Error obteniendo token:', error);
    return null;
  }
}

