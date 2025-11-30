import { SITE_URL, SITE_NAME, SITE_CONTACT, SITE_SOCIAL } from '@/config/site';

export function getOrganizationJsonLd() {
  const sameAs = Object.values(SITE_SOCIAL).filter(Boolean);

  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SITE_NAME,
    url: SITE_URL,
    logo: `${SITE_URL}/img/logo/Logored.svg`,
    telephone: SITE_CONTACT.phone || undefined,
    sameAs: sameAs.length ? sameAs : undefined,
  };
}
