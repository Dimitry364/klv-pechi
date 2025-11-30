import { createPageMetadata } from '@/seo/baseSeo';

export const metadata = createPageMetadata({
  title: 'Корзина — Колывань-Печи',
  description: 'Товары, которые вы планируете заказать на сайте Колывань-Печи.',
  path: '/cart',
  index: false, // корзина noindex
});
