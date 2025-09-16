import { createClient } from 'next-sanity';

export const sanityServerClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2025-01-01',
  useCdn: false, // на сервере CDN не нужен
  token: process.env.SANITY_READ_TOKEN, // private ⇒ нужен токен
});
