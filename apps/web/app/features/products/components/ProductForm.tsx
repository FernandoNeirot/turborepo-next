'use client';

import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Form } from '@fernando_neirot2/ui';
import type { CreateProductInput, Product } from '../types';

export interface ProductFormProps {
  initialData?: Product;
  onSubmit: (data: CreateProductInput) => void | Promise<void>;
  isLoading?: boolean;
  submitLabel?: string;
}

export function ProductForm({
  initialData,
  onSubmit,
  isLoading = false,
  submitLabel = 'Guardar',
}: ProductFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateProductInput>({
    defaultValues: initialData
      ? {
          title: initialData.title,
          description: initialData.description,
          price: initialData.price,
          imageUrl: initialData.imageUrl,
        }
      : undefined,
  });

  const onSubmitForm: SubmitHandler<CreateProductInput> = async (data) => {
    await onSubmit(data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmitForm)}
      className="mt-4 mx-4 grid grid-cols-1 sm:grid-cols-2 gap-4"
    >
      <Form.Input
        label="Título del producto"
        placeholder="Ingrese el título del producto"
        error={errors.title?.message}
        {...register('title', {
          required: 'El título es requerido',
          maxLength: {
            value: 100,
            message: 'Máximo 100 caracteres',
          },
        })}
      />
      <Form.Input
        label="Precio del producto"
        placeholder="Ingrese el precio del producto"
        type="number"
        step="0.01"
        error={errors.price?.message}
        {...register('price', {
          required: 'El precio es requerido',
          valueAsNumber: true,
          min: {
            value: 0,
            message: 'El precio debe ser mayor a 0',
          },
        })}
      />
      <div className="sm:col-span-2">
        <Form.Input
          label="Descripción del producto"
          placeholder="Ingrese la descripción del producto"
          error={errors.description?.message}
          {...register('description', {
            required: 'La descripción es requerida',
            maxLength: {
              value: 100,
              message: 'Máximo 100 caracteres',
            },
          })}
        />
      </div>
      <div className="sm:col-span-2">
        <Form.Input
          label="URL de la imagen (opcional)"
          placeholder="Ingrese la URL de la imagen"
          error={errors.imageUrl?.message}
          {...register('imageUrl', {
            pattern: {
              value: /^https?:\/\/.+/,
              message: 'Debe ser una URL válida',
            },
          })}
        />
      </div>
      <div className="sm:col-span-2">
        <button
          type="submit"
          disabled={isLoading}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          {isLoading ? 'Guardando...' : submitLabel}
        </button>
      </div>
    </form>
  );
}

