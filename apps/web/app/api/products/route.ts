import { NextRequest, NextResponse } from 'next/server';
import { collection, getDocs, query, where } from "firebase/firestore";
import { Product } from '../../features/products';
import { db } from '../../shared/configs/firebase';

export async function GET(request: NextRequest) {
  try {
    const userId = request.nextUrl.searchParams.get('userId');
    let q;
    if (userId) {
      q = query(collection(db, "products"), where("userId", "==", userId));
    } else {
      q = query(collection(db, "products"));
    }

    const querySnapshot = await getDocs(q);
    const products: Product[] = [];

    querySnapshot.forEach((doc) => {
      const data = doc.data();
      data.id = doc.id;
      products.push(data as Product);
    });

    return NextResponse.json({ data: products, error: null }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { data: null, error: 'Error fetching products' },
      { status: 500 }
    );
  }
}

