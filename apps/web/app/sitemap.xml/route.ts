import { NextResponse } from 'next/server';
import { getAdminFirestore } from '../shared/configs/firebase-admin';

export async function GET() {
    try {
        const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

        if (!baseUrl) {
            // Si no hay baseUrl, retornar sitemap básico
            const basicSitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
<url><loc>/</loc></url>
</urlset>`;

            return new NextResponse(basicSitemap, {
                headers: {
                    'Content-Type': 'application/xml',
                },
            });
        }

        // Usar Firebase Admin SDK para acceso desde el servidor
        const db = getAdminFirestore();
        const productsSnapshot = await db
            .collection('products')
            .where('sold', '==', false)
            .get();

        const urls: string[] = [
            `<url><loc>${baseUrl}/</loc></url>`, // Página principal
        ];

        productsSnapshot.forEach((doc) => {
            const data = doc.data();
            if (data.slug) {
                urls.push(`<url><loc>${baseUrl}/producto/${data.slug}</loc></url>`);
            }
        });

        const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join('\n')}
</urlset>`;

        return new NextResponse(sitemap, {
            headers: {
                'Content-Type': 'application/xml',
            },
        });
    } catch (error) {
        // Si hay error (permisos, etc.), retornar sitemap básico sin productos
        console.error('[Sitemap] Error generando sitemap:', error);

        const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || '';
        const fallbackSitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
<url><loc>${baseUrl}/</loc></url>
</urlset>`;

        return new NextResponse(fallbackSitemap, {
            headers: {
                'Content-Type': 'application/xml',
            },
        });
    }
}
