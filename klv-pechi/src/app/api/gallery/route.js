import clientPromise from '@/lib/mongo';
import path from 'path';
import fs from 'fs/promises';

export const runtime = 'nodejs';

export async function GET() {
  console.log('process.cwd():', process.cwd());

  try {
    const client = await clientPromise;
    const db = client.db('klv-pech');

    const albums = await db.collection('gallery').find({}).toArray();
    console.log('/api/gallery route вызван');

    const widthPhotos = await Promise.all(
      albums.map(async (alb) => {
        const dir = path.join(process.cwd(), 'public', 'gallery', alb.folder); // формируем путь к папке

        console.log('ABSOLUTE PATH', dir);

        const files = await fs.readdir(dir); //читаем список файлов
        console.log(
          'Чтение папки:',
          path.join(process.cwd(), 'public', 'gallery', alb.folder)
        );
        const photos = files
          .filter((f) => !/cover/i.test(f))
          .sort()
          .map((f) => `/gallery/${alb.folder}/${f}`);

        console.log('Найденные фото:', photos);
        return { ...alb, photos };
      })
    );
    return Response.json(widthPhotos);
  } catch (err) {
    console.error(err);
    return new Response('Ошибка сервера', { status: 500 });
  }
}
