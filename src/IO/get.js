const APIError = require('../APIError');
const Query = require('../data/Query');
const { TABLES } = require('../config');

const callServerlessFunction = (query, path = '/api/queryAirtable') => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch(path, {
        method: 'POST',
        body: JSON.stringify(query),
        headers: { 'content-type': 'application/json' },
      });

      let { records, message, error } = await response.json();

      if (error) {
        // Convert error messages in the payload into Error objects
        throw new APIError(message);
      }
      resolve(records);
    } catch (e) {
      reject(e);
    }
  });
};

const fetchSpark = async recordId => {
  return new Promise(async (resolve, reject) => {
    const endpoint = `/spark`;
    const params = {
      fields: [
        TABLES.SPARK.FIELDS.TITLE,
        TABLES.SPARK.FIELDS.CONTENT,
        TABLES.SPARK.FIELDS.TAGS,
        TABLES.SPARK.FIELDS.ACTIONS,
      ],
      filterByFormula: `SEARCH('${recordId}',{rec_id})`,
    };
    const query = new Query(endpoint, params);
    try {
      const records = await callServerlessFunction(query);
      resolve(records[0]);
    } catch (e) {
      reject(e);
    }
  });
};

const fetchSparkIndex = () => {
  return new Promise(async (resolve, reject) => {
    const endpoint = `/spark`;
    const params = {
      fields: [TABLES.SPARK.FIELDS.IS_PUBLISHED],
      filterByFormula: `{${TABLES.SPARK.FIELDS.IS_PUBLISHED}}`,
    };
    const query = new Query(endpoint, params);

    try {
      const records = await callServerlessFunction(query);
      resolve(records);
    } catch (e) {
      reject(e);
    }
  });
};

module.exports.fetchSpark = fetchSpark;
module.exports.fetchSparkIndex = fetchSparkIndex;
