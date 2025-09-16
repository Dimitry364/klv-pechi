import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { visionTool } from '@sanity/vision';
import { ruKZLocale } from '@sanity/locale-ru-kz';
import schemas from './src/sanity/schemas';

const isDev = process.env.NODE_ENV !== 'production';

export default defineConfig({
  name: 'default',
  title: 'KLV Pechi CMS',
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  basePath: '/admin',
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Контент')
          .items([
            S.documentTypeListItem('category').title('Категории'),
            S.documentTypeListItem('product').title('Товары'),
            S.divider(),
            S.documentTypeListItem('galleryItem').title('Галерея'),
          ]),
    }),
    ...(isDev ? [visionTool()] : []), // в dev есть Vision, в prod — нет
    ruKZLocale(),
  ],
  schema: { types: schemas },
  document: {
    // Кнопка «Посмотреть на сайте»
    productionUrl: async (prev, { document }) => {
      if (document?._type === 'product' && document?.slug?.current) {
        const base =
          process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
        return new URL(`/products/${document.slug.current}`, base).toString();
      }
      return prev;
    },
  },
});
