export default [
  {
    name: 'None',
    value: '',
  },
  {
    name: 'Array',
    value: JSON.stringify([
      {
        name: 'Jane',
        age: 26,
        sex: 'F',
        created: new Date(),
      },
      {
        name: 'John',
        age: 25,
        sex: 'M',
        created: new Date(),
      },
    ], null, 2),
  },
  {
    name: 'Date',
    value: JSON.stringify(new Date()),
  },
  {
    name: 'Object',
    value: JSON.stringify({
      name: 'John',
      age: 25,
      sex: 'M',
      created: new Date(),
    }, null, 2),
  },
  {
    name: 'String',
    value: JSON.stringify(Math.random().toString(36).substring(2)),
  },
];
