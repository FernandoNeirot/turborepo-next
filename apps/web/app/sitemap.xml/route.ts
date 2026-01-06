import { NextResponse } from 'next/server';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../shared/configs/firebase';

export async function GET() {
    const productsRef = collection(db, 'products');
    const q = query(productsRef, where('sold', '==', false));
    const snapshot = await getDocs(q);

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL as string;
    const urls = snapshot.docs.map(doc => {
        const slug = doc.data().slug;
        return `<url><loc>${baseUrl}/producto/${slug}</loc></url>`;
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
}
