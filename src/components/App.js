import React from 'react';
import APIConn from '../ApiConn';
import OracleEye from './OracleEye';
import { ReactComponent as Logo } from '../assets/logo.svg';
import './App.css';

import { randomRangeInt } from '../util/randomRange.js';
import Loader from './Loader';

const mockDataRoute = '/mock';

class App extends React.Component {
  constructor() {
    super();
    this.api = new APIConn();
    this.state = {
      currentItem: null,
      itemIndex: [],
      isLoading: false,
      currentPaletteNumber: 0,
      paletteStyle: {},
      useMockData: false
    };

    this.noConnectionMessage = (
      <p>
        You're not connected to the internet right now! I need the interpipes to
        make my magic.
      </p>
    );
    this.palettes = ['green', 'blue', 'red', 'yellow'];
  }

  init = async () => {
    const useMock = window.location.pathname.toLowerCase() == mockDataRoute;
    this.setState({ useMock });

    this.changePalette();

    try {
      await this.fetchContentIndex();
      await this.fetchRandomItem();
    } catch (e) {
      console.error('Error connecting with serverless functions:');
      console.error(e);
    }
  };

  configureAPIForMockOrLiveData = () => {
    this.api.useMockData = this.state.useMock;
    if (this.state.useMock) {
      console.log(
        `Using mocked data because\n> you're on the ${mockDataRoute} route.`
      );
    }
  };

  changePalette = () => {
    let pNum = this.state.currentPaletteNumber;
    pNum = pNum < this.palettes.length - 1 ? pNum + 1 : 0;
    const pName = this.palettes[pNum];
    const paletteStyle = {
      '--col-base': `var(--palette-${pName}-base)`,
      '--col-lighter': `var(--palette-${pName}-lighter)`,
      '--col-darker': `var(--palette-${pName}-darker)`,
      '--col-text': `var(--palette-${pName}-text)`
    };
    this.setState({ currentPaletteNumber: pNum });
    this.setState({ paletteStyle });
  };

  componentDidMount() {
    this.init();
  }

  fetchContentIndex = () => {
    this.configureAPIForMockOrLiveData();
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
    this.configureAPIForMockOrLiveData();
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
    const isConnected = navigator.onLine;
    const contentComponent = isConnected ? (
      this.isLoading ? (
        <Loader />
      ) : (
        <p>{this.currentItem.content}</p>
      )
    ) : (
      this.noConnectionMessage
    );

    return (
      <div id='spark' style={this.state.paletteStyle} onClick={this.loadNext}>
        <section className='oracle'>
          <OracleEye />
        </section>
        <section className='content'>{contentComponent}</section>
        <section className='brand'>
          <Logo />
        </section>
      </div>
    );
  }
}

export default App;
