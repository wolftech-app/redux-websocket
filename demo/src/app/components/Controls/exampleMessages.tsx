export default [
  {
    name: 'None',
    value: '',
  },
  {
    name: 'Array',
    value: JSON.stringify([
      {
        ins: 'AAPL',
        amt: 550,
        side: 'buy',
        date: new Date(),
      },
      {
        ins: 'GOOG',
        amt: 200,
        sex: 'sell',
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
      ins: 'AAPL',
      amt: 550,
      side: 'buy',
      date: new Date(),
    }, null, 2),
  },
  {
    name: 'String',
    value: JSON.stringify(Math.random().toString(36).substring(2)),
  },
];
