// eslint-disable-next-line import/no-anonymous-default-export
export default {
  name: 'galleryItem',
  title: 'Галерея — элемент',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Название',
      type: 'string',
      validation: (R) => R.required(),
    },
    {
      name: 'slug',
      title: 'Slug (латиницей)',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      validation: (R) => R.required(),
    },
    {
      name: 'cover',
      title: 'Обложка',
      type: 'image',
      options: { hotspot: true },
    },
    {
      name: 'images',
      title: 'Изображения',
      type: 'array',
      of: [{ type: 'image', options: { hotspot: true } }],
    },
    { name: 'text', title: 'Описание', type: 'array', of: [{ type: 'block' }] },
    { name: 'order', title: 'Порядок', type: 'number', initialValue: 0 },
  ],
};
