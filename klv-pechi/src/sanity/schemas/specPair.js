// eslint-disable-next-line import/no-anonymous-default-export
export default {
  name: 'specPair',
  title: 'Характеристика (ключ-значение)',
  type: 'object',
  fields: [
    {
      name: 'label',
      title: 'Название характеристики',
      type: 'string',
      validation: (R) => R.required(),
    },
    {
      name: 'value',
      title: 'Значение',
      type: 'string',
      validation: (R) => R.required(),
    },
  ],
};
