import APIError from './APIError';
import { FUNCTION_PATHS } from '../../config';

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

  sendQuery(query) {
    return callServerlessFunction(query);
  }
}
