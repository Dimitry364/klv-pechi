import clientPromise from '@/lib/mongo';
import path from 'path';
import fs from 'fs/promises';

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db('klv-pech');

    const albums = await db.collection('gallery').find({}).toArray();

    const widthPhotos = await Promise.all(
      albums.map(async (alb) => {
        const dir = path.join(process.cwd(), 'public', 'gallery', alb.folder); // формируем путь к папке
        const files = await fs.readdir(dir); //читаем список файлов
        const photos = files
          .filter((f) => !/cover/i.test(f))
          .sort()
          .map((f) => `/gallery/${alb.folder}/${f}`);

        return { ...alb, photos };
      })
    );
    return Response.json(widthPhotos);
  } catch (err) {
    console.error(err);
    return new Response('Ошибка сервера', { status: 500 });
  }
}
