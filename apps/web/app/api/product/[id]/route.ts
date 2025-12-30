import { NextRequest, NextResponse } from 'next/server';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../../shared/configs/firebase';

/**
 * DELETE /api/product/[id]
 * Elimina un producto por su ID
 */
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
): Promise<NextResponse> {
  try {
    const { id } = await params;
    
    // Verificar que el producto existe
    const productRef = doc(db, 'products', id);
    const productSnap = await getDoc(productRef);
    
    if (!productSnap.exists()) {
      return NextResponse.json(
        { data: null, error: 'Producto no encontrado' },
        { status: 404 }
      );
    }
    
    // Eliminar el producto
    const { deleteDoc } = await import('firebase/firestore');
    await deleteDoc(productRef);
    
    return NextResponse.json(
      { data: { id }, error: null },
      { status: 200 }
    );
  } catch (error) {
    console.error('[API Route] Error deleting product:', error);
    return NextResponse.json(
      { data: null, error: error instanceof Error ? error.message : 'Error deleting product' },
      { status: 500 }
    );
  }
}

/**
 * PUT /api/product/[id]
 * Actualiza un producto por su ID
 */
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
): Promise<NextResponse> {
  try {
    const { id } = await params;
    const body = await request.json();
    
    // Verificar que el producto existe
    const productRef = doc(db, 'products', id);
    const productSnap = await getDoc(productRef);
    
    if (!productSnap.exists()) {
      return NextResponse.json(
        { data: null, error: 'Producto no encontrado' },
        { status: 404 }
      );
    }
    
    // Actualizar el producto
    const { updateDoc } = await import('firebase/firestore');
    await updateDoc(productRef, {
      ...body,
      updatedAt: new Date(),
    });
    
    // Obtener el producto actualizado
    const updatedSnap = await getDoc(productRef);
    const updatedData = { id: updatedSnap.id, ...updatedSnap.data() };
    
    return NextResponse.json(
      { data: updatedData, error: null },
      { status: 200 }
    );
  } catch (error) {
    console.error('[API Route] Error updating product:', error);
    return NextResponse.json(
      { data: null, error: error instanceof Error ? error.message : 'Error updating product' },
      { status: 500 }
    );
  }
}

