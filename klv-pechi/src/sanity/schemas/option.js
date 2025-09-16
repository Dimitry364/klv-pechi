// eslint-disable-next-line import/no-anonymous-default-export
export default {
  name: 'option',
  title: 'Опция/Комплектация',
  type: 'object',
  fields: [
    {
      name: 'name',
      title: 'Название опции (напр. "Комплектация")',
      type: 'string',
      validation: (R) => R.required(),
    },
    {
      name: 'values',
      title: 'Значения',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'label',
              title: 'Метка (напр. "Базовая")',
              type: 'string',
              validation: (R) => R.required(),
            },
            {
              name: 'price',
              title: 'Цена',
              type: 'number',
              validation: (R) => R.required(),
            },
          ],
        },
      ],
      validation: (R) => R.min(1),
    },
  ],
};
