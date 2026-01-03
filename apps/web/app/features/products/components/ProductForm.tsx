"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { Form } from "@fernando_neirot2/ui";
import type { CreateProductInput, Product } from "../types";
import { uploadAndOptimizeImage } from "../../../shared/lib/imageStorage";

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
  submitLabel = "Guardar",
}: ProductFormProps) {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(
    initialData?.imageUrl || null
  );
  const [isUploadingImage, setIsUploadingImage] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    control,
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

  const imageUrlValue = watch("imageUrl");

  const onSubmitForm: SubmitHandler<CreateProductInput> = async (data) => {
    try {
      // Si hay una imagen seleccionada, subirla primero
      if (selectedImage) {
        setIsUploadingImage(true);
        setUploadError(null);

        const uploadResult = await uploadAndOptimizeImage(selectedImage, {
          folder: "products",
          quality: 85,
        });

        data.imageUrl = uploadResult.url;
        setImagePreview(uploadResult.url);
        setIsUploadingImage(false);
      }

      await onSubmit(data);
    } catch (error) {
      setIsUploadingImage(false);
      setUploadError(
        error instanceof Error ? error.message : "Error al subir la imagen"
      );
      console.error("Error al procesar el formulario:", error);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setSelectedImage(file);
    setUploadError(null);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setImagePreview(imageUrlValue || null);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmitForm)}
      className="mt-4 mb-10 grid grid-cols-1 sm:grid-cols-2 gap-4"
    >
      <Form.Input
        label="Título del producto"
        placeholder="Ingrese el título del producto"
        error={errors.title?.message}
        {...register("title", {
          required: "El título es requerido",
          maxLength: {
            value: 100,
            message: "Máximo 100 caracteres",
          },
        })}
      />
      <Form.Input
        label="Precio del producto"
        placeholder="Ingrese el precio del producto"
        type="number"
        step="0.01"
        error={errors.price?.message}
        {...register("price", {
          required: "El precio es requerido",
          valueAsNumber: true,
          min: {
            value: 0,
            message: "El precio debe ser mayor a 0",
          },
        })}
      />
      <div className="sm:col-span-2">
        <Controller
          name="description"
          control={control}
          rules={{
            required: "La descripción es requerida",
            maxLength: {
              value: 1000,
              message: "Máximo 1000 caracteres",
            },
          }}
          render={({ field }) => (
            <Form.Textarea
              richText
              label="Descripción del producto"
              placeholder="Ingrese la descripción del producto"
              error={errors.description?.message}
              value={field.value || ""}
              onChange={(e) => {
                field.onChange(e.target.value);
              }}
              onBlur={field.onBlur}
              name={field.name}
            />
          )}
        />
      </div>

      {/* TODO: Migrar a un componente de la UI */}
      <div className="sm:col-span-2">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Subir imagen
        </label>
        <input
          type="file"
          accept="image/*"
          disabled={isLoading || isUploadingImage}
          onChange={handleImageChange}
          className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 disabled:opacity-50 disabled:cursor-not-allowed"
        />
        {uploadError && (
          <p className="mt-1 text-sm text-red-600">{uploadError}</p>
        )}
        {isUploadingImage && (
          <p className="mt-1 text-sm text-blue-600">Subiendo imagen...</p>
        )}
        {imagePreview && (
          <div className="mt-4">
            <Image
              src={imagePreview}
              alt="Vista previa"
              width={320}
              height={192}
              className="max-w-xs max-h-48 object-cover rounded-lg border border-gray-300"
            />
          </div>
        )}
      </div>
      <div className="sm:col-span-2 flex justify-end gap-4">
        <Form.Button
          onClick={() => {}}
          label="Cancelar"
          textColor="#000"
          backgroundColor="TRANSPARENT"
        />
        <Form.Button
          onClick={() => {}}
          label={isLoading || isUploadingImage ? "Guardando..." : submitLabel}
          textColor="#fff"
          backgroundColor="BLUE"
          type="submit"
        />
      </div>
    </form>
  );
}
