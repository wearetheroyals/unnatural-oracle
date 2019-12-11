require('dotenv').config();
const ax = require('axios').create({
  baseURL: `https://api.airtable.com/v0/${process.env.DB_ID}`,
  headers: {
    Authorization: `Bearer ${process.env.DB_KEY}`,
  },
});

const nextPage = async (endpoint, params = {}, items = []) => {
  console.log('Sending API request to ' + endpoint);
  return new Promise((resolve, reject) => {
    ax.get(endpoint, { params })
      .then(function(response) {
        const offset = response.data.offset;
        const records = response.data.records ? response.data.records : [response.data];
        items = [...items, ...records];
        if (offset) {
          // more pages to fetch, so recursion ahoy
          params.offset = offset;
          nextPage(endpoint, params, items).then(response => resolve(response));
        } else {
          // reached the final page of records, so pass them all back
          resolve(items);
        }
      })
      .catch(function(error) {
        console.log(error);
        reject(error);
      });
  });
};

const apiRequest = (method, params = {}) => {
  // const { table, params } = query;
  return nextPage(method, params);
};

module.exports = apiRequest;
