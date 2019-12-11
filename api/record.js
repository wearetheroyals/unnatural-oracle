const apiRequest = require('./utils/apiRequest');

module.exports = async (req, res) => {
  let message = 'Success';
  let error = false;
  let records = [];
  let status = 200;

  try {
    let query = JSON.parse(req.body);
    records = await apiRequest(query.endpoint, query.querystring);
    // records = await apiRequest(query.endpoint);
    records = records.map(record => record.fields);
  } catch (e) {
    message = e.message;
    error = true;
  }

  res.setHeader('Cache-Control', 's-maxage=1, stale-while-revalidate');
  res.status(status).send({ records, error, message });
};
