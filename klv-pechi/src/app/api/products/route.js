import clientPromise from '@/lib/mongo';

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db('klv-pech');
    const products = await db.collection('products').find({}).toArray();

    return Response.json(products);
  } catch (error) {
    console.error('Mongo error:', error);
    return new Response(
      JSON.stringify({ error: 'Неудалось получить products' }),
      { status: 500 }
    );
  }
}
