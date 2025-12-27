'use client'
import React from 'react'
import { ProductForm, useProductMutation } from '../../../features/products'
import { useAuth } from '../../../shared/providers/AuthContext'

const DashboardProducto = () => {
  const auth = useAuth();
  const { createProductAsync, isLoading } = useProductMutation({
    redirectOnSuccess: '/dashboard',
    // TODO: Implementar notificaciones con toasts
    onSuccess: () => {
      console.log('Producto creado exitosamente');
    },
    onError: (error) => {
      console.error('Error al crear producto:', error);
    },
  });

  const handleSubmit = async (data: Parameters<typeof createProductAsync>[0]) => {
    try {
      await createProductAsync({...data,userId: auth.user?.uid});
    } catch (error) {
      console.error('Error al crear producto:', error);
    }
  };

  return (
    <ProductForm
      onSubmit={handleSubmit}
      isLoading={isLoading}
      submitLabel="Crear Producto"
    />
  )
}

export default DashboardProducto