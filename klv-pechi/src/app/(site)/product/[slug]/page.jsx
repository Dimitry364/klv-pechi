import { getProductBySlug, getProducts } from '@/lib/ProductServiceSanity';
import ProductDetails from '@/components/ProductDetails/ProductDetails';
import Script from 'next/script';
import { buildProductMetadata } from '@/seo/productSeo';

export async function generateMetadata({ params }) {
  const product = await getProductBySlug(params.slug);
  return buildProductMetadata(product);
}

export async function generateStaticParams() {
  const products = await getProducts();
  return products.map((p) => ({ slug: p.slug }));
}

export default async function ProductPage({ params }) {
  const product = await getProductBySlug(params.slug);

  if (!product) return <div>Товар не найден</div>;

  const meta = buildProductMetadata(product);

  return (
    <>
      <Script
        id='product-schema'
        type='application/ld+json'
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(meta.jsonLd),
        }}
      />
      <ProductDetails product={product} />
    </>
  );
}
