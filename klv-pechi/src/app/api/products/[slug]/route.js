// import clientPromise from '@/lib/mongo';
import { getProductBySlug } from '@/lib/ProductServiceSanity';

export async function GET(req, { params }) {
  // try {
  //   const client = await clientPromise;
  //   const db = client.db('klv-pech');
  //   const product = await db
  //     .collection('products')
  //     .findOne({ slug: params.slug });
  //   if (!product) {
  //     return new Response(JSON.stringify({ error: 'Карточка не найдена' }), {
  //       status: 404,
  //       headers: { 'Content-Type': 'application/json' },
  //     });
  //   }
  //   return Response.json(product);
  // } catch (error) {
  //   console.error('Mongo error:', error);
  //   return new Response(
  //     JSON.stringify({ error: 'Не удалось получить продукт' }),
  //     { status: 500, headers: { 'Content-Type': 'application/json' } }
  //   );
  // }

  const item = await getProductBySlug(params.slug);
  return item
    ? Response.json(item)
    : new Response('Not found', { status: 404 });
}
