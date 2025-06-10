import clientPromise from '@/lib/mongo';

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db('klv-pech');
    const images = await db.collection('gallery').find({}).toArray();

    return Response.json(images, { status: 200 });
  } catch (error) {
    console.error('Mongo error:', error);
    return new Response(
      JSON.stringify({ error: 'Неудалось получить images' }),
      { status: 500 }
    );
  }
}
