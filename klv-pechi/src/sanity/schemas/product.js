// eslint-disable-next-line import/no-anonymous-default-export
export default {
  name: 'product',
  title: 'Товар (печь/аксессуар)',
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
      name: 'basePrice',
      title: 'Базовая цена',
      type: 'number',
      validation: (R) => R.required(),
    },
    {
      name: 'options',
      title: 'Опции/комплектации',
      type: 'array',
      of: [{ type: 'option' }],
    },

    { name: 'material', title: 'Материал', type: 'string' },
    { name: 'warranty', title: 'Гарантия', type: 'string' },

    { name: 'descriptionIntro', title: 'Описание — вступление', type: 'text' },
    { name: 'descriptionBenefits', title: 'Преимущества', type: 'text' },
    {
      name: 'descriptionConclusion',
      title: 'Описание — заключение',
      type: 'text',
    },
    {
      name: 'equipment',
      title: 'Комплектация (список)',
      type: 'array',
      of: [{ type: 'string' }],
    },

    {
      name: 'mainImage',
      title: 'Главное изображение',
      type: 'image',
      options: { hotspot: true },
    },
    {
      name: 'images',
      title: 'Галерея',
      type: 'array',
      of: [{ type: 'image', options: { hotspot: true } }],
    },

    {
      name: 'specs',
      title: 'Характеристики',
      type: 'array',
      of: [{ type: 'specPair' }],
    },

    {
      name: 'category',
      title: 'Категория',
      type: 'reference',
      to: [{ type: 'category' }],
      validation: (R) => R.required(),
    },

    {
      name: 'order',
      title: 'Порядок на витрине (меньше — выше)',
      type: 'number',
      initialValue: 0,
    },
  ],
};
