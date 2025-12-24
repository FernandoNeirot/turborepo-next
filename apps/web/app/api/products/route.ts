import { NextRequest, NextResponse } from 'next/server';
import { collection, getDocs, query, where } from "firebase/firestore";
import { Product } from '../../features/products';
import { db } from '../../shared/configs/firebase';

export async function GET(request: NextRequest) {
  try {
    console.log('[API Route] /api/products - GET request recibida');
    console.log('[API Route] URL:', request.url);
    
    const products: Product[] = [];
    const q = query(collection(db, "products"));

    console.log('[API Route] Consultando Firebase...');
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
      const data = doc.data();
      data.id = doc.id;
      products.push(data as Product);
    });

    console.log('[API Route] Productos obtenidos:', products.length);
    console.log('[API Route] Productos:', products);

    return NextResponse.json({ data: products, error: null }, { status: 200 });
  } catch (error) {
    console.error('[API Route] Error fetching products:', error);
    return NextResponse.json(
      { data: null, error: 'Error fetching products' },
      { status: 500 }
    );
  }
}

