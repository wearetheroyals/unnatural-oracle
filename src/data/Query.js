export default class Query {
  constructor({
    table,
    fields = null,
    filterByFormula = null,
    maxRecords = null,
    pageSize = null,
    sort = null,
    view = null,
  }) {
    this._table = table;
    const opts = {};

    fields ? (opts.fields = [...fields]) : null;
    filterByFormula ? (opts.filterByFormula = filterByFormula) : null;
    maxRecords ? (opts.maxRecords = maxRecords * 1) : null;
    pageSize ? (opts.pageSize = pageSize * 1) : null;
    sort ? (opts.sort = [...sort]) : null;
    view ? (opts.view = view) : null;

    this._options = opts;
  }

  get table() {
    return this._table;
  }

  get options() {
    return JSON.parse(JSON.stringify(this._options));
  }

  toJSON() {
    return {
      table: this._table,
      options: this._options,
    };
  }

  toString() {
    return JSON.stringify(this.toJSON());
  }
}
