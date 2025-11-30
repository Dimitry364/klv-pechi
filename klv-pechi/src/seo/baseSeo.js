import { SITE_URL, SITE_NAME, SITE_DEFAULT_OG_IMAGE } from '@/config/site';

// Строим абсолютный URL по относительному пути
export function buildCanonical(path = '/') {
  if (!path.startsWith('/')) path = `/${path}`;
  // Для корня / не добавляем лишний слеш
  return `${SITE_URL}${path === '/' ? '' : path}`;
}

// OpenGraph (общий случай для страниц)
export function buildOpenGraph({ title, description, path = '/', image }) {
  const url = buildCanonical(path);
  const imageUrl = image || SITE_DEFAULT_OG_IMAGE;

  return {
    locale: 'ru_RU',
    title,
    description,
    url,
    type: 'website',
    images: [
      {
        url: imageUrl,
        width: 1200,
        height: 630,
        alt: title,
      },
    ],
  };
}

// Twitter-карта
export function buildTwitter({ title, description, image }) {
  const imageUrl = image || SITE_DEFAULT_OG_IMAGE;

  return {
    card: 'summary_large_image',
    title,
    description,
    images: [imageUrl],
  };
}

// Универсальный конструктор metadata для страниц
export function createPageMetadata({
  title,
  description,
  path = '/',
  index = true,
  image,
}) {
  const canonical = buildCanonical(path);

  const robots = index
    ? { index: true, follow: true }
    : { index: false, follow: false };

  return {
    title,
    description,
    alternates: {
      canonical,
    },
    robots,
    openGraph: buildOpenGraph({ title, description, path, image }),
    twitter: buildTwitter({ title, description, image }),
  };
}
