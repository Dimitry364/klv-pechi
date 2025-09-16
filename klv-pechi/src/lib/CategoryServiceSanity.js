import { unstable_cache } from 'next/cache';
import { sanityServerClient } from './sanity.client.server';
import { CATEGORIES_WITH_PRODUCTS } from './sanityQueries';

// вспомогалки как в сервисе товаров
const pairsToObject = (pairs = []) =>
  pairs.reduce(
    (acc, it) => (it?.label ? ((acc[it.label] = it.value ?? ''), acc) : acc),
    {}
  );

const mapProduct = (p) => ({
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

const _sections = async () => {
  const cats = await sanityServerClient.fetch(CATEGORIES_WITH_PRODUCTS);
  return cats.map((c) => ({
    category: {
      id: c._id,
      title: c.title,
      slug: c.slug,
      subtitle: c.subtitle ?? '',
      order: c.order ?? 0,
    },
    products: (c.products || []).map(mapProduct),
  }));
};

export const getCatalogSections = unstable_cache(
  _sections,
  ['categories-with-products'],
  {
    tags: ['categories', 'products'],
    revalidate: 60,
  }
);
