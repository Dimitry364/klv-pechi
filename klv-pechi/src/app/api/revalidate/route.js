import { revalidateTag } from 'next/cache';

export async function POST(req) {
  const secret = req.headers.get('x-sanity-secret');
  if (secret !== process.env.SANITY_WEBHOOK_SECRET)
    return new Response('Invalid secret', { status: 401 });

  let body = {};
  try {
    body = await req.json();
  } catch {}

  // всегда снимем общие теги
  revalidateTag('products');
  revalidateTag('categories');
  revalidateTag('gallery');

  console.log('[revalidate] body:', body);

  // если прилетел slug/тип — снимем точечно
  const slug = body?.slug?.current || body?.slug;
  const type = body?._type || body?.type;
  if (type === 'product' && slug) {
    revalidateTag('product');
    revalidateTag(slug);
  }
  if (type === 'category' && slug) {
    revalidateTag(`category:${slug}`);
  }

  return Response.json({ ok: true });
}
