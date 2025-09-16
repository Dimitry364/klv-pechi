import { unstable_cache } from 'next/cache';
import { sanityServerClient } from './sanity.client.server';
import { GALLERY_ITEMS, GALLERY_BY_SLUG } from './sanityQueries';

const map = (g) => ({
  _id: g._id,
  title: g.title,
  slug: g.slug,
  cover: g.cover || null,
  // чтобы не ломать фронт, назовём поле как раньше photos
  photos: Array.isArray(g.images) ? g.images : [],
  text: g.text || [],
  textPlain: g.textPlain || '',
});

const _list = async () => sanityServerClient.fetch(GALLERY_ITEMS);
const _one = async (slug) =>
  sanityServerClient.fetch(GALLERY_BY_SLUG, { slug });

export const getGallery = unstable_cache(
  async () => {
    const rows = await _list();
    return rows.map(map);
  },
  ['gallery'],
  { tags: ['gallery'], revalidate: 60 }
);

export const getGalleryBySlug = async (slug) => {
  const fn = unstable_cache(() => _one(slug), ['gallery', slug], {
    tags: ['gallery', slug],
    revalidate: 60,
  });
  const doc = await fn();
  return doc ? map(doc) : null;
};
