const apiRequest = require('./utils/apiRequest');

module.exports = async (req, res) => {
  let message = 'Success';
  let error = false;
  let records = [];
  let status = 200;

  try {
    let query = req.body;
    records = await apiRequest(query.endpoint, query.params);
  } catch (e) {
    message = e.message;
    error = true;
  } finally {
    res.setHeader('Cache-Control', 's-maxage=1, stale-while-revalidate');
    res.status(status).send({ records, error, message });
  }
};
