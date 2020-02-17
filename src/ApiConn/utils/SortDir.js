export default class SortDir {
  static get Modes() {
    return _modes.map(mode => mode.clone());
  }

  static get Mode() {
    if (!SortDir._mode) {
      SortDir.Mode = 0;
    }
    return SortDir._mode.clone();
  }

  static set Mode(int) {
    if (int >= 0 && int < _modes.length) {
      SortDir._mode = _modes[int];
    }
  }

  static get ASCENDING() {
    return SortDir.Mode.ASCENDING;
  }
  static get DESCENDING() {
    return SortDir.Mode.DESCENDING;
  }

  constructor() {
    throw new Error('SortDir class can not be instantiated.');
  }
}

// ==================================
// ======= Module Scope Only ========

// Mode class is for internal module use only
class Mode {
  constructor(asc = 'ASC', desc = 'DESC') {
    this.ASCENDING = asc;
    this.DESCENDING = desc;
  }

  clone() {
    return new Mode(this.ASCENDING, this.DESCENDING);
  }
}

const _modes = [
  new Mode('ASC', 'DESC'),
  new Mode('ASCENDING', 'DESCENDING'),
  new Mode('asc', 'desc'),
  new Mode('ascending', 'descending'),
  new Mode(1, 0),
  new Mode(1, -1)
];
