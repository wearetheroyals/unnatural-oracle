require('dotenv').config();
const ax = require('axios').create({
  baseURL: `https://api.airtable.com/v0/${process.env.DB_ID}`,
  headers: {
    Authorization: `Bearer ${process.env.DB_KEY}`,
  },
});

const nextPage = async (method, params = {}, records = []) => {
  return new Promise((resolve, reject) => {
    ax.get(method, { params })
      .then(function(response) {
        const { offset } = response.data;
        records = [...records, ...response.data.records];

        if (offset) {
          // more pages to fetch, so recursion ahoy
          params.offset = offset;
          nextPage(method, params, records).then(response => resolve(response));
        } else {
          // reached the final page of records, so pass them all back
          resolve(records);
        }
      })
      .catch(function(error) {
        reject(error);
      });
  });
};

const apiRequest = (method, params = {}) => {
  // const { table, params } = query;
  return nextPage(method, params);
};

module.exports = apiRequest;
