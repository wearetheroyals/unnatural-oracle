import APIError from '../../../src/APIError';
require('dotenv').config();
const qs = require('qs');

const ax = require('axios').create({
  baseURL: `https://api.airtable.com/v0/${process.env.DB_ID}`,
  headers: {
    Authorization: `Bearer ${process.env.DB_KEY}`,
  },
});

const nextPage = async (endpoint, params = {}, records = []) => {
  return new Promise((resolve, reject) => {
    ax.request(endpoint, {
      params: params,
      paramsSerializer: params => {
        return qs.stringify(params, { arrayFormat: 'brackets' });
      },
    })
      .then(function(response) {
        const offset = response.data.offset;
        let { data, error, message } = response;

        // records = response.data.records ? response.data.records : [response.data];
        // strip metadata from each records, and just hold onto field contents
        if (error) {
          throw new APIError(message);
        }

        data.records.map(record =>
          records.push({ id: record.id, fields: record.fields }),
        );

        if (offset) {
          // more pages to fetch, so recursion ahoy
          params.offset = offset;
          nextPage(endpoint, params, records).then(response => resolve(response));
        } else {
          // reached the final page of records, so pass them all back
          resolve(records);
        }
      })
      .catch(function(error) {
        const message = error.response.data.error.message;
        reject(new APIError(message));
      });
  });
};

const apiRequest = (method, params = {}) => {
  return nextPage(method, params);
};

module.exports = apiRequest;
