import React from 'react';
import APIConn from '../ApiConn';

import { getRandomArrayIndex } from '../util/randomRange.js';
import { MESSAGES, ROUTES } from '../strings';

// Theming via hooks and context provider
import { ThemeContext, getPaletteAtIndex } from '../Theme';

// UI Components
import { Card, CardFooter, CardHeader, CardBody } from './Card';
import Loader from './Loader';
import OracleEye from './OracleEye';
import { ReactComponent as Logo } from '../assets/logo.svg';

import './App.css';

class App extends React.Component {
  constructor() {
    super();

    this.api = new APIConn();
    this.state = {
      currentItem: null,
      itemIndex: [],
      isLoading: false,
      paletteIndex: 0,
      testRoute: null
    };
  }

  init = async () => {
    // check for routes which set special testing statuses
    this.setState({ testRoute: this.isTestingRoute() });

    // set first color palette
    this.changePalette();

    // fetch content
    try {
      await this.fetchFromApi('fetchContentIndex', 'itemIndex');
      await this.fetchRandomItem();
    } catch (e) {
      console.error(MESSAGES.API_CONNECTION_ERROR, e);
    }
  };

  isTestingRoute = () => {
    const route = window.location.pathname.toLowerCase();
    return Object.values(ROUTES).includes(route) ? route : null;
  };

  configureAPIForMockOrLiveData = () => {
    this.api.useMockData = this.state.testRoute === ROUTES.MOCK;
  };

  changePalette = () => {
    const { index } = getPaletteAtIndex(this.state.paletteIndex + 1);
    this.setState({ paletteIndex: index });
  };

  componentDidMount() {
    this.init();
  }

  fetchFromApi = (method, storeAs, args = {}) => {
    this.configureAPIForMockOrLiveData();
    this.isLoading = true;

    return new Promise(async (resolve, reject) => {
      try {
        const result = await this.api[method](args);
        this.setState({ [storeAs]: result });
        resolve(true);
      } catch (e) {
        reject(e);
      } finally {
        this.isLoading = false;
      }
    });
  };

  fetchRandomItem = () => {
    try {
      const n = getRandomArrayIndex(this.state.itemIndex);
      const itemId = this.state.itemIndex[n].id;
      return this.fetchFromApi('fetchItem', 'currentItem', { itemId });
    } catch (e) {
      console.error(e);
    }
  };

  loadNext = () => {
    if (!this.isLoading) {
      this.fetchRandomItem();
      this.changePalette();
    }
  };

  getCurrentItem() {
    let obj = this.state.currentItem;
    return obj ? (obj.fields ? { ...obj.fields } : {}) : {};
  }

  set isLoading(bool) {
    this.setState({ isLoading: bool });
  }

  get isLoading() {
    return this.state.isLoading;
  }

  getCardBodytext = () => {
    const online =
      this.state.testRoute !== ROUTES.OFFLINE && this.api.isOnline();
    return online ? this.getCurrentItem().content : MESSAGES.NO_CONNECTION;
  };

  render() {
    const { className } = getPaletteAtIndex(this.state.paletteIndex);
    return (
      <ThemeContext.Provider value={className}>
        <Card onClick={this.loadNext}>
          <CardHeader>
            <OracleEye />
          </CardHeader>
          <CardBody>
            {this.isLoading ? <Loader /> : <p>{this.getCardBodytext()}</p>}
          </CardBody>
          <CardFooter>
            <Logo />
          </CardFooter>
        </Card>
      </ThemeContext.Provider>
    );
  }
}

export default App;
