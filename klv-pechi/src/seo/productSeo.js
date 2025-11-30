import { SITE_URL } from '@/config/site';

// Универсальная функция получения URL товара
export function getProductUrl(product) {
  return `${SITE_URL}/product/${product.slug}`;
}

// Нормализация поля объём парной, для разных вариантов в bd
export function getProductVolume(product) {
  if (!product?.specs) return null;

  const volumeFields = new Set([
    'Объем парного помещения, м3',
    'Объем парного помещения, м³',
    'Объем парильного помещения, м3',
    'Объем парильного помещения, м³',
    'Объем парилки, м3',
    'Объем парилки, м³',
    'Объем парной, м3',
    'Объем парной, м³',
  ]);

  for (const key of Object.keys(product.specs)) {
    if (volumeFields.has(key)) {
      return product.specs[key];
    }
  }
  return null;
}

// Генерация title по правилам сео (модель + материал + объём парной)
export function getProductSeoTitle(product, volume) {
  return volume
    ? `Печь для бани ${product.title} на ${volume} м³ — Колывань-Печи`
    : `${product.title} — Колывань-Печи`;
}

// Генерация Description
export function getProductSeoDescription(product, volume) {
  // Защита от цены 0р.
  const hasPrice = Boolean(product.basePrice);
  const priceText = hasPrice ? `Цена от ${product.basePrice} ₽.` : '';

  return volume
    ? `Купить печь для бани ${product.title} для парилки до ${volume} м³ из нержавеющей стали AISI 321. ${priceText} Мягкий пар, экономия дров до 50%, доставка по России.`
    : `Купить печь для бани ${product.title} из нержавеющей стали AISI 321. ${priceText} Мягкий пар, экономия дров до 50%, доставка по России.`;
}

// Получение абсолютного URL изображения
export function getProductImageUrl(product) {
  if (!product.image) return null;

  return product.image.startsWith('http')
    ? product.image
    : `${SITE_URL}${product.image}`;
}

// OpenGraph для соцсетей/Telegram
export function getProductOpenGraph(product, url, imageUrl) {
  const volume = getProductVolume(product);
  const title = getProductSeoTitle(product, volume);
  const description = getProductSeoDescription(product, volume);

  return {
    title,
    description,
    url,
    type: 'website',
    images: imageUrl
      ? [
          {
            url: imageUrl,
            width: 1200,
            height: 630,
            alt: product.title,
          },
        ]
      : [],
  };
}

// Twitter card
export function getProductTwitter(product, imageUrl) {
  const volume = getProductVolume(product);
  const title = getProductSeoTitle(product, volume);
  const description = getProductSeoDescription(product, volume);

  return {
    card: 'summary_large_image',
    title,
    description,
    images: imageUrl ? [imageUrl] : [],
  };
}

export function extractDescription(product) {
  if (typeof product.description === 'string')
    return product.description.trim();

  if (!product.description || typeof product.description !== 'object')
    return `Печь ${product.title} из нержавеющей стали AISI 321 для бани и сауны.`;

  const { intro, benefits, conclusion } = product.description;

  return (
    intro?.trim() ||
    benefits?.trim() ||
    conclusion?.trim() ||
    `Печь ${product.title} из нержавеющей стали AISI 321 для бани и сауны.`
  );
}

// JSON-LD Product Schema
// улучшает сниппет в поиске
export function getProductJsonLd(product, url, imageUrl) {
  const description = extractDescription(product);

  const productSchema = {
    '@context': 'https://schema.org/',
    '@type': 'Product',
    name: product.title,
    image: imageUrl ? [imageUrl] : [],
    description,
    brand: {
      '@type': 'Brand',
      name: 'Колывань-Печи',
    },
    offers: {
      '@type': 'Offer',
      url,
      priceCurrency: 'RUB',
      price: Number(product.basePrice) || undefined,
      availability: 'https://schema.org/InStock',
    },
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Главная',
        item: SITE_URL,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: product.category,
        item: SITE_URL,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: product.title,
        item: url,
      },
    ],
  };

  return [productSchema, breadcrumbSchema];
}

// возвращает весь metadata
export function buildProductMetadata(product) {
  if (!product) {
    return {
      title: 'Товар не найден',
      description: 'Извините, товар не найден',
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const url = getProductUrl(product);
  const imageUrl = getProductImageUrl(product);
  const volume = getProductVolume(product);

  const title = getProductSeoTitle(product, volume);
  const description = getProductSeoDescription(product, volume);

  return {
    title,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: getProductOpenGraph(product, url, imageUrl),
    twitter: getProductTwitter(product, imageUrl),
    jsonLd: getProductJsonLd(product, url, imageUrl),
  };
}
