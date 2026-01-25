import { getOrganizationJsonLd } from '@/seo/organizationSchema';

export default function Head() {
  return (
    <>
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(getOrganizationJsonLd()),
        }}
      />
    </>
  );
}
