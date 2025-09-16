import { getGalleryBySlug } from '@/lib/galleryServiceSanity';

export async function GET(_req, { params }) {
  const item = await getGalleryBySlug(params.slug);
  if (!item) return new Response('Альбом не найден', { status: 404 });
  return Response.json(item);
}
