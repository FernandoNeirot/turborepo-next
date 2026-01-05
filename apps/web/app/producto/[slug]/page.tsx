import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getProductBySlug } from "../../features/products";
import { getBaseUrl } from "../../shared/lib/metadata";
import ProductPageClient from "./page.client";
import { projectName } from "../../shared/lib/contants";

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

function stripHtml(html: string): string {
  return html
    .replace(/<[^>]*>/g, "")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .trim();
}

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;

  try {
    const product = await getProductBySlug(slug);

    if (!product) {
      return {
        title: "Producto no encontrado",
        description: "El producto que buscas no existe.",
      };
    }

    const baseUrl = getBaseUrl();
    const productUrl = `${baseUrl}/producto/${slug}`;
    const description = stripHtml(
      product.descriptionClean || product.description || ""
    );
    const title = `${product.title} - ${projectName}`;
    const price = `$${product.price.toLocaleString("en-US", {
      maximumFractionDigits: 0,
    })}`;

    return {
      title,
      description: description || `Compra ${product.title} por ${price}`,
      keywords: [
        product.title,
        "bazar",
        "ofertas",
        "productos",
        "comprar",
        price,
      ],
      authors: [{ name: projectName }],
      openGraph: {
        title,
        description: description || `Compra ${product.title} por ${price}`,
        url: productUrl,
        siteName: projectName,
        images: product.imageUrl
          ? [
              {
                url: product.imageUrl,
                width: 1200,
                height: 630,
                alt: product.title,
              },
            ]
          : [],
        locale: "es_ES",
        type: "website",
      },
      twitter: {
        card: "summary_large_image",
        title,
        description: description || `Compra ${product.title} por ${price}`,
        images: product.imageUrl ? [product.imageUrl] : [],
      },
      alternates: {
        canonical: productUrl,
      },
      other: {
        "product:price:amount": product.price.toString(),
        "product:price:currency": "USD",
      },
    };
  } catch (error) {
    console.error("Error al generar metadata:", error);
    return {
      title: `Producto - ${projectName}`,
      description: "Encuentra las mejores ofertas y oportunidades.",
    };
  }
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
