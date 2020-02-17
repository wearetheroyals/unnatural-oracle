import React from 'react';
import APIConn from '../ApiConn';
import OracleEye from './OracleEye';
import './App.css';

import { randomRangeInt } from '../util/randomRange.js';
import Loader from './Loader';

class App extends React.Component {
  constructor() {
    super();
    this.api = new APIConn();
    this.state = {
      currentItem: null,
      itemIndex: [],
      isLoading: false,
      currentPaletteNumber: 0,
      paletteStyle: {}
    };

    this.palettes = ['green', 'blue', 'red', 'yellow'];
  }

  init = async () => {
    this.changePalette();
    await this.fetchContentIndex();
    await this.fetchRandomItem();
  };

  changePalette = () => {
    let pNum = this.state.currentPaletteNumber;
    pNum = pNum < this.palettes.length - 1 ? pNum + 1 : 0;
    const pName = this.palettes[pNum];
    const paletteStyle = {
      '--col-base': `var(--palette-${pName}-base)`,
      '--col-lighter': `var(--palette-${pName}-lighter)`,
      '--col-darker': `var(--palette-${pName}-darker)`
    };
    this.setState({ currentPaletteNumber: pNum });
    this.setState({ paletteStyle });
  };

  componentDidMount() {
    this.init();
  }

  fetchContentIndex = () => {
    return new Promise(async (resolve, reject) => {
      try {
        this.isLoading = true;
        const itemIndex = await this.api.fetchContentIndex();
        this.setState({ itemIndex });
        resolve(true);
      } catch (e) {
        reject(e);
      } finally {
        this.isLoading = false;
      }
    });
  };

  fetchContentItem = itemId => {
    return new Promise(async (resolve, reject) => {
      try {
        this.isLoading = true;
        const currentItem = await this.api.fetchItem(itemId);
        this.setState({ currentItem });
        resolve(true);
      } catch (e) {
        reject(e);
      } finally {
        this.isLoading = false;
      }
    });
  };

  fetchRandomItem = () => {
    const itemIndex = [...this.state.itemIndex];
    if (itemIndex.length === 0)
      throw new Error(
        `Can't fetch a random item until you load the item index.`
      );
    const int = randomRangeInt(0, Math.max(itemIndex.length - 1), 0);
    return this.fetchContentItem(itemIndex[int].id);
  };

  loadNext = () => {
    if (!this.isLoading) {
      this.fetchRandomItem();
      this.changePalette();
    }
  };

  get currentItem() {
    let obj = this.state.currentItem;
    return obj ? (obj.fields ? { ...obj.fields } : {}) : {};
  }

  set isLoading(bool) {
    this.setState({ isLoading: bool });
  }

  get isLoading() {
    return this.state.isLoading;
  }

  render() {
    const contentComponent = this.isLoading ? (
      <Loader />
    ) : (
      <p>{this.currentItem.content}</p>
    );

    return (
      <main>
        <div className='ratio'>
          <div
            id='spark'
            style={this.state.paletteStyle}
            onClick={this.loadNext}
          >
            <section className='oracle'>
              <OracleEye />
            </section>
            <section className='content'>{contentComponent}</section>
            <section className='brand'>Royals</section>
          </div>
        </div>
      </main>
    );
  }
}

export default App;
