// Note on sort direction:
// See utitlity class SortDir for managing sort direction strings
// as applicartion-wide constants

import SortDir from '../util/SortDir';
import { isNumber, isNonEmptyString, isNonEmptyArray } from '../util/valueTests';

export default class AirtableQuery {
  constructor(
    endpoint,
    {
      fields = null,
      filterByFormula = null,
      maxRecords = null,
      sortBy = null,
      sortDir = null,
    } = {},
  ) {
    this._endpoint = endpoint;

    const params = {};
    isNonEmptyArray(fields) ? (params.fields = [...fields]) : null;
    isNonEmptyString(filterByFormula) ? (params.filterByFormula = filterByFormula) : null;
    isNumber(maxRecords) ? (params.maxRecords = maxRecords * 1) : null;
    isNonEmptyString(sortBy) ? (params.sortBy = sortBy) : null;
    isNonEmptyString(sortDir)
      ? (params.sortDir = sortDir)
      : sortBy
      ? SortDir.ASCENDING
      : null;
    this._params = params;
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
      params: this.params,
    };
  }
}
