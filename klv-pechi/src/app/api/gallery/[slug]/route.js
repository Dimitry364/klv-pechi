import path from 'path';
import fs from 'fs/promises';
import clientPromise from '@/lib/mongo';

export async function GET(req, { params }) {
  try {
    // Достаём мета данные альблма
    const client = await clientPromise;
    const db = client.db('klv-pech');
    const album = await db.collection('gallery').findOne({ slug: params.slug });

    if (!album) {
      return new Response('Альбом не найден', { status: 404 });
    }

    // читаем файлы в папке public/gallery/<folder>
    const dir = path.join(process.cwd(), 'public', 'gallery', album.folder);
    const files = await fs.readdir(dir); // читаем спивок файлов

    //отфильтровывем cover и сортируем по имени
    const photos = files
      .filter((f) => !/cover/i.test(f)) // фильтруем cover
      .sort((a, b) => a.localeCompare(b)) // сортируем
      .map((f) => `/gallery/${album.folder}/${f}`); // собираем url

    return Response.json({ ...album, photos });
  } catch (err) {
    console.error(err);
    return new Response('Ошибка сервера', { status: 500 });
  }
}
