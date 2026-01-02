import { notFound } from "next/navigation";
import { getProductBySlug } from "../../features/products";
import ProductPageClient from "./page.client";

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;

  try {
    const product = await getProductBySlug(slug);

    if (!product) {
      notFound();
    }

    return <ProductPageClient product={product} />;
  } catch (error) {
    console.error("Error al obtener producto:", error);
    notFound();
  }
}
