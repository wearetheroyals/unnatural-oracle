const pushStrToArray = (str, arr) => {
  const trimmed = str.trim();
  if (str.length > 0 && !arr.includes(trimmed)) {
    arr.push(trimmed);
  }
};

export default class Spark {
  static fromData(data) {
    const spk = new Spark();
    spk.parse(data);
    return spk;
  }

  constructor() {
    this._title = '';
    this._content = '';
    this._tags = [];
    this._actions = [];
  }

  set title(str = '') {
    this._title = str;
  }
  get title() {
    return this._title;
  }

  set content(str = '') {
    this._content = str;
  }
  get content() {
    return this._content;
  }

  hasTag(val) {
    return this._tags.includes(val);
  }

  hasAction(val) {
    return this._actions.includes(val);
  }

  addTag(str) {
    pushStrToArray(str, this._tags);
  }

  get tags() {
    return [...this._tags];
  }

  addAction(str) {
    pushStrToArray(str, this._actions);
  }

  get actions() {
    return [...this._actions];
  }

  parse(data) {
    const obj = typeof data === 'string' ? JSON.parse(data) : data;

    this.title = obj.title;
    this.content = obj.content;
    if (obj.tags) {
      obj.tags.map(tag => this.addTag(tag));
    }
    if (obj.actions) {
      obj.actions.map(action => this.addAction(action));
    }

    return this;
  }

  stringify() {
    return JSON.stringify({
      title: this.title,
      content: this.content,
      tags: this.tags,
      actions: this.actions,
    });
  }

  clone() {
    return new Spark().parse(this.stringify());
  }
}
