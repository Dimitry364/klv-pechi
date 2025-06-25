import { productService } from '@/lib/ProductService';
import ProductDetails from '@/components/ProductDetails/ProductDetails';
import Script from 'next/script';

export async function generateMetadata({ params }) {
  const mongoProducts = await productService.getProductBySlug(params.slug);
  const product = JSON.parse(JSON.stringify(mongoProducts));

  const extension = product.image?.split('.').pop()?.toLowerCase();
  const mimeType =
    extension === 'png'
      ? 'image/png'
      : extension === 'webp'
      ? 'image/webp'
      : 'image/jpeg';

  if (!product)
    return {
      title: 'Товар не найден',
      description: 'Извините, товар не найден.',
    };

  return {
    title: `${product.title} — Колывань-Печи`,
    description: `Купить ${product.title}. Материал: ${product.description?.material}. Цена от ${product.basePrice} ₽. Доставка по России.`,
    openGraph: {
      title: `${product.title} | Купить с доставкой — Колывань-Печи`,
      description: `Печь ${product.title} из стали AISI 321. ${product.description?.material}. Цена от ${product.basePrice} ₽. Прямая поставка с завода.`,
      url: `https://колывань-печи.рф/product/${product.slug}`,
      type: 'website',
      images: [
        {
          url: product.image
            ? `https://колывань-печи.рф${product.image}`
            : 'https://колывань-печи.рф/img/og-main.jpg',
          width: 1200,
          height: 630,
          alt: product.title,
          type: mimeType,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${product.title} — Колывань-Печи`,
      description: `Печь из стали AISI 321. От ${product.basePrice} ₽ с доставкой.`,
      images: [`https://колывань-печи.рф${product.image}`],
    },
  };
}

export async function generateStaticParams() {
  const products = await productService.getProducts();

  return products.map((product) => ({ slug: product.slug }));
}

export default async function ProductPage({ params }) {
  const { slug } = params;
  const mongoProducts = await productService.getProductBySlug(slug);
  const product = JSON.parse(JSON.stringify(mongoProducts));

  if (!product) {
    return <div>Товар не найден</div>;
  }

  return (
    <>
      {/* SEO structured data (Product) */}
      <Script
        id='product-schema'
        type='application/ld+json'
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org/',
            '@type': 'Product',
            name: product.title,
            image: product.image
              ? [`https://колывань-печи.рф${product.image}`]
              : ['https://колывань-печи.рф/img/og-main.jpg'],
            description: product.description?.material || '',
            brand: {
              '@type': 'Organization',
              name: 'Колывань-Печи',
            },
            offers: {
              '@type': 'Offer',
              url: `https://колывань-печи.рф/product/${product.slug}`,
              priceCurrency: 'RUB',
              price: product.basePrice,
              availability: 'https://schema.org/InStock',
            },
          }),
        }}
      />
      <div>
        <ProductDetails product={product} />
      </div>
    </>
  );
}
