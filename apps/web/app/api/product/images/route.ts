import { NextRequest, NextResponse } from 'next/server';
import { getAdminStorage } from '../../../shared/configs/firebase-admin';
import sharp from 'sharp';

function generateFileName(originalName?: string): string {
  const timestamp = Date.now();
  const random = Math.random().toString(36).substring(2, 9);
  const extension = 'webp';
  
  if (originalName) {
    const nameWithoutExt = originalName.replace(/\.[^/.]+$/, '');
    return `${nameWithoutExt}-${timestamp}-${random}.${extension}`;
  }
  
  return `image-${timestamp}-${random}.${extension}`;
}

/**
 * API Route para subir y optimizar imágenes
 * 
 * POST /api/images
 * Body: FormData con campo 'image' que contiene el archivo
 * Query params:
 *   - folder: Carpeta en Storage (default: 'images')
 *   - quality: Calidad WebP 0-100 (default: 80)
 *   - fileName: Nombre personalizado (opcional)
 */
export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('image') as File | null;

    if (!file) {
      return NextResponse.json(
        { error: 'No se proporcionó ninguna imagen' },
        { status: 400 }
      );
    }

    if (!file.type.startsWith('image/')) {
      return NextResponse.json(
        { error: 'El archivo debe ser una imagen' },
        { status: 400 }
      );
    }

    const folder = request.nextUrl.searchParams.get('folder') || 'images';
    const qualityParam = request.nextUrl.searchParams.get('quality');
    const quality = qualityParam ? parseInt(qualityParam, 10) : 80;
    const fileName = request.nextUrl.searchParams.get('fileName') || undefined;

    if (quality < 0 || quality > 100) {
      return NextResponse.json(
        { error: 'La calidad debe estar entre 0 y 100' },
        { status: 400 }
      );
    }

    const arrayBuffer = await file.arrayBuffer();
    const imageBuffer = Buffer.from(arrayBuffer);

    const webpBuffer = await sharp(imageBuffer)
      .webp({ quality })
      .toBuffer();

    const finalFileName = fileName || generateFileName(file.name);

    // Usar Firebase Admin SDK para subir el archivo (tiene permisos completos)
    const adminStorage = getAdminStorage();
    const bucket = adminStorage.bucket();
    const fileRef = bucket.file(`${folder}/${finalFileName}`);

    // Subir el archivo
    await fileRef.save(webpBuffer, {
      contentType: 'image/webp',
      metadata: {
        cacheControl: 'public, max-age=31536000',
      },
    });

    // Hacer el archivo público y obtener la URL
    await fileRef.makePublic();
    const url = `https://storage.googleapis.com/${bucket.name}/${folder}/${finalFileName}`;

    return NextResponse.json(
      {
        success: true,
        data: {
          url,
          fileName: finalFileName,
          path: `${folder}/${finalFileName}`,
        },
        error: null,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('[API /api/images] Error:', error);
    return NextResponse.json(
      {
        success: false,
        data: null,
        error: error instanceof Error ? error.message : 'Error al procesar la imagen',
      },
      { status: 500 }
    );
  }
}

