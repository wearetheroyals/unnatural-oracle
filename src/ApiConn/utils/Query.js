// Note on sort direction:
// See utitlity class SortDir for managing sort direction strings
// as application-wide constants

import SortDir from './SortDir';

export default class AirtableQuery {
  constructor(
    endpoint,
    {
      fields = null,
      filterByFormula = null,
      maxRecords = null,
      sortBy = null,
      sortDir = SortDir.ASCENDING
    } = {}
  ) {
    this._endpoint = endpoint;
    this._setParam('fields', fields);
    this._setParam('filterByFormula', filterByFormula);
    this._setParam('maxRecords', maxRecords);
    this._setParam('sortBy', sortBy);
    this._setParam('sortDir', sortBy ? sortDir : null);
  }

  get endpoint() {
    return this._endpoint;
  }

  get params() {
    return JSON.parse(JSON.stringify(this._params));
  }

  toJSON() {
    return {
      endpoint: this.endpoint,
      params: this.params
    };
  }

  _setParam(name, value = null) {
    this._params = this._params ? this._params : {};
    this._params[name] = value;
  }
}
