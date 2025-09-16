import { unstable_cache } from 'next/cache';
import { sanityServerClient } from './sanity.client.server';
import { PRODUCTS_LIST, PRODUCT_BY_SLUG } from './sanityQueries';

// свернуть массив пар в объект {label: value}
const pairsToObject = (pairs = []) =>
  pairs.reduce(
    (acc, it) => (it?.label ? ((acc[it.label] = it.value ?? ''), acc) : acc),
    {}
  );

// привести документ как в Mongo
const map = (p) => ({
  _id: p._id,
  title: p.title,
  slug: p.slug,
  basePrice: p.basePrice,
  description: p.description ?? {
    intro: '',
    equipment: [],
    benefits: '',
    conclusion: '',
  },
  material: p.material ?? '',
  warranty: p.warranty ?? '',
  image: p.image ?? null,
  images: Array.isArray(p.images) ? p.images : [],
  options: Array.isArray(p.options) ? p.options : [],
  specs: pairsToObject(p.specsPairs),
  category: p.category || 'uncategorized',
});

const _list = () => sanityServerClient.fetch(PRODUCTS_LIST);
const _one = (slug) => sanityServerClient.fetch(PRODUCT_BY_SLUG, { slug });

export const getProducts = unstable_cache(
  async () => {
    const rows = await _list();
    return rows.map(map);
  },
  ['products'],
  { tags: ['products'], revalidate: 60 }
);

export const getProductBySlug = async (slug) => {
  const fn = unstable_cache(() => _one(slug), ['product', slug], {
    tags: ['product', slug],
    revalidate: 60,
  });
  const p = await fn();
  return p ? map(p) : null;
};
