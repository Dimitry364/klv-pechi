import { getGallery } from '@/lib/galleryServiceSanity';
export const runtime = 'nodejs';

export async function GET() {
  const items = await getGallery();
  return Response.json(items);
}
