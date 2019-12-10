export default class Query {
  constructor({
    method,
    fields = null,
    filterByFormula = null,
    maxRecords = null,
    sort = null,
  }) {
    this._method = method;
    const params = {};

    fields ? (params.fields = [...fields]) : null;
    filterByFormula ? (params.filterByFormula = filterByFormula) : null;
    maxRecords ? (params.maxRecords = maxRecords * 1) : null;
    sort ? (params.sort = [...sort]) : null;

    this._params = params;
  }

  get table() {
    return this.method;
  }

  get method() {
    return this._method;
  }

  get options() {
    console.log('The options property is deprecated. Use params instead.');
    return this.params;
  }

  get params() {
    return JSON.parse(JSON.stringify(this._params));
  }

  toJSON() {
    const str = JSON.stringify({
      method: this.method,
      params: this._params,
    });
    console.log(str);
    return str;
  }

  // toString() {
  //   return JSON.stringify(this.toJSON());
  // }
}
