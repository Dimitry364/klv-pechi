import { productService } from '@/lib/ProductService';
import ProductDetails from '@/components/ProductDetails/ProductDetails';

export async function generateMetadata({ params }) {
  const product = await productService.getProductBySlug(params.slug);

  if (!product) return { title: 'Товар не найден' };

  return {
    title: `${product.title} — Колывань-Печи`,
    description: `Купить ${product.title}. Материал: ${product.description?.material}. Цена от ${product.basePrice} ₽.`,
    openGraph: {
      title: `${product.title} — Колывань-Печи`,
      description: `Печь из стали AISI 321. Гарантия. Цена от ${product.basePrice} ₽.`,
      images: [
        {
          url: product.image,
          width: 1200,
          height: 630,
          alt: product.title,
        },
      ],
    },
  };
}

export async function generateStaticParams() {
  const products = await productService.getProducts();

  return products.map((product) => ({ slug: product.slug }));
}

export default async function ProductPage({ params }) {
  const { slug } = params;
  const product = await productService.getProductBySlug(slug);

  if (!product) {
    return <div>Товар не найден</div>;
  }

  return (
    <div>
      <ProductDetails product={product} />
    </div>
  );
}
