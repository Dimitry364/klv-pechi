import { getProductBySlug, getProducts } from '@/lib/ProductServiceSanity';
import ProductDetails from '@/components/ProductDetails/ProductDetails';
import Script from 'next/script';

const SITE = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) {
    return {
      title: 'Товар не найден',
      description: 'Извините, товар не найден',
    };
  }

  const imageUrl = product.image?.startsWith('http')
    ? product.image
    : `${SITE}${product.image}`;

  return {
    title: `${product.title} — Колывань-Печи`,
    description: `Купить ${product.title}. Материал: ${product.material || 'Нержавеющая сталь AISI 321'}. Цена от ${product.basePrice} ₽. Доставка по России.`,
    openGraph: {
      title: `${product.title} | Купить с доставкой — Колывань-Печи`,
      description: `Печь ${product.title}. Материал: ${product.material || 'Нержавеющая сталь AISI 321'}. Цена от ${product.basePrice} ₽.`,
      url: `${SITE}/product/${product.slug}`,
      type: 'website',
      images: [{ url: imageUrl, width: 1200, height: 630, alt: product.title }],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${product.title} — Колывань-Печи`,
      description: `Печь из стали. От ${product.basePrice} ₽ с доставкой.`,
      images: [imageUrl],
    },
  };
}

export async function generateStaticParams() {
  const products = await getProducts();
  return products.map((p) => ({ slug: p.slug }));
}

export default async function ProductPage({ params }) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) return <div>Товар не найден</div>;

  const imageUrl = product.image?.startsWith('http')
    ? product.image
    : `${SITE}${product.image}`;

  return (
    <>
      <Script
        id='product-schema'
        type='application/ld+json'
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org/',
            '@type': 'Product',
            name: product.title,
            image: [imageUrl],
            description: product.material || '',
            brand: { '@type': 'Organization', name: 'Колывань-Печи' },
            offers: {
              '@type': 'Offer',
              url: `${SITE}/product/${product.slug}`,
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
