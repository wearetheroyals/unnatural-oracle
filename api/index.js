const apiRequest = require('./utils/apiRequest');

module.exports = async (req, res) => {
  let message = 'Success';
  let error = false;
  let records = [];
  let status = 200;

  const params = {
    fields: ['published'],
    filterByFormula: '{published}',
  };

  try {
    records = await apiRequest('/spark', params);
    records = records.map(record => record.id);
  } catch (e) {
    message = e.message;
    error = true;
  }

  res.setHeader('Cache-Control', 's-maxage=1, stale-while-revalidate');
  res.status(status).send({ records, error, message });
};
