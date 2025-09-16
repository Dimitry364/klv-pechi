// eslint-disable-next-line import/no-anonymous-default-export
export default {
  name: 'category',
  title: 'Категория',
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
    { name: 'subtitle', title: 'Подзаголовок (под названием)', type: 'string' },
    {
      name: 'order',
      title: 'Порядок на витрине (меньше - выше)',
      type: 'number',
      initialValue: 0,
    },
  ],
  preview: {
    select: { title: 'title', subtitle: 'slug.current' },
  },
};
