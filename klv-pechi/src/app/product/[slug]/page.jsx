import { productService } from '@/lib/ProductService';
import ProductDetails from '@/components/ProductDetails/ProductDetails';

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
