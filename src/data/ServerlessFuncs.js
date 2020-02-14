import APIError from '../APIError';
import Query from './Query';
import { TABLES, FUNCTION_PATHS } from '../config';

let basePath = FUNCTION_PATHS.ENV.PROD;

const callServerlessFunction = (
  query,
  endpoint = FUNCTION_PATHS.ENDPOINTS.QUERY_AIRTABLE
) => {
  const path = basePath + endpoint;

  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch(path, {
        method: 'POST',
        body: JSON.stringify(query),
        headers: { 'content-type': 'application/json' }
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

export default class ServerlessFuncs {
  constructor({ useMock = false } = {}) {
    this.useMock = useMock;
  }

  get useMock() {
    return this._useMock;
  }

  set useMock(value) {
    this._useMock = Boolean(value);
    basePath = this.useMock ? FUNCTION_PATHS.ENV.MOCK : FUNCTION_PATHS.ENV.PROD;
  }

  async fetchSparkIndex() {
    return new Promise(async (resolve, reject) => {
      const endpoint = `/spark`;
      const params = {
        fields: [TABLES.SPARK.FIELDS.IS_PUBLISHED],
        filterByFormula: `{${TABLES.SPARK.FIELDS.IS_PUBLISHED}}`
      };
      const query = new Query(endpoint, params);

      try {
        const records = await callServerlessFunction(query);
        resolve(records);
      } catch (e) {
        reject(e);
      }
    });
  }

  fetchSpark(recordId) {
    return new Promise(async (resolve, reject) => {
      const endpoint = `/spark`;
      const params = {
        fields: [
          TABLES.SPARK.FIELDS.TITLE,
          TABLES.SPARK.FIELDS.CONTENT,
          TABLES.SPARK.FIELDS.TAGS,
          TABLES.SPARK.FIELDS.ACTIONS
        ],
        filterByFormula: `SEARCH('${recordId}',{rec_id})`
      };
      const query = new Query(endpoint, params);
      try {
        const records = await callServerlessFunction(query);
        resolve(records[0]);
      } catch (e) {
        reject(e);
      }
    });
  }
}

// const fetchSpark = async recordId => {
//   return new Promise(async (resolve, reject) => {
//     const endpoint = `/spark`;
//     const params = {
//       fields: [
//         TABLES.SPARK.FIELDS.TITLE,
//         TABLES.SPARK.FIELDS.CONTENT,
//         TABLES.SPARK.FIELDS.TAGS,
//         TABLES.SPARK.FIELDS.ACTIONS,
//       ],
//       filterByFormula: `SEARCH('${recordId}',{rec_id})`,
//     };
//     const query = new Query(endpoint, params);
//     try {
//       const records = await callServerlessFunction(query);
//       resolve(records[0]);
//     } catch (e) {
//       reject(e);
//     }
//   });
// };

// const fetchSparkIndex = () => {
//   return new Promise(async (resolve, reject) => {
//     const endpoint = `/spark`;
//     const params = {
//       fields: [TABLES.SPARK.FIELDS.IS_PUBLISHED],
//       filterByFormula: `{${TABLES.SPARK.FIELDS.IS_PUBLISHED}}`,
//     };
//     const query = new Query(endpoint, params);

//     try {
//       const records = await callServerlessFunction(query);
//       resolve(records);
//     } catch (e) {
//       reject(e);
//     }
//   });
// };

// module.exports.fetchSpark = fetchSpark;
// module.exports.fetchSparkIndex = fetchSparkIndex;
// module.exports.fetchOffline = fetchOffline;
