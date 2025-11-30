// Базовый URL сайта (всегда без слеша на конце)
export const SITE_URL =
  process.env.NEXT_PUBLIC_BASE_URL ?? 'https://колывань-печи.рф';

export const SITE_NAME = 'Колывань-Печи';

// Картинка по умолчанию для og/twitter
export const SITE_DEFAULT_OG_IMAGE = `${SITE_URL}/img/og-main.jpg`;

// Контакты бренда — заполни своими реальными данными
export const SITE_CONTACT = {
  phone: '+7 951 364-55-66',
  telegram: 'https://t.me/+79513645566',
  whatsapp: 'https://wa.me/79513645566',
};

// Соцсети — если чего-то нет, оставь пустой строкой или null
export const SITE_SOCIAL = {
  vk: 'https://vk.com/club229742329',
  telegram: 'https://t.me/+79513645566',
  youtube: '',
};
