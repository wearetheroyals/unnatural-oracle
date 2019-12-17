const mockedRecords = require('./mockdata');

module.exports = async (req, res) => {
  let message = 'Success';
  let error = false;
  let status = 200;
  const records = mockedRecords;
  res.setHeader('Cache-Control', 's-maxage=1, stale-while-revalidate');
  res.status(status).send({ records, error, message });
};
