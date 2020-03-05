import deckGenerator from '../../util/deckGenerator';

export class PaletteManager {
  constructor(styles) {
    this._palettes = Object.values(styles).map(value => value);
    this._currentPalette = null;
    this._iterator = this._createNewIterator();
  }

  _createNewIterator = () => {
    return deckGenerator(this._palettes);
  };

  get currentPalette() {
    return new Palette(this._currentPalette);
  }

  next = () => {
    const { value, done } = this._iterator.next();
    this._currentPalette = value;

    if (done) {
      this._iterator = this._createNewIterator();
    }
    return this.currentPalette;
  };
}

export class Palette {
  constructor(className) {
    this._className = className;
  }

  get className() {
    return this._className;
  }
}
