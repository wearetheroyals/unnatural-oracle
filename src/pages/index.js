import React from 'react';
import { graphql } from 'gatsby';

// context providers
import ModalContext from '../store/modalContext';
import { ThemeContext, getPaletteAtIndex } from '../components/Theme';

import Layout from '../components/Layout';

// UI Components
import { Card, CardFooter, CardHeader, CardBody } from '../components/Card';
import OracleEye from '../components/OracleEye';
import Logo from '../assets/logo.svg';
import { lastItem, shuffle } from '../arrayUtil';

// const lastItem = arr => arr[arr.length - 1];
// const shuffle = arr => [...arr].sort(item => (Math.random() > 0.5 ? 1 : -1));

export default class CardPage extends React.Component {
  constructor(props) {
    super(props);
    const records = props.data.allAirtable.nodes.map(item => item.data.content);

    this.state = {
      records: {
        unseen: shuffle(records),
        seen: []
      },
      paletteIndex: 0
    };
  }

  componentDidMount = () => {
    this.nextCard();
  };

  changePalette = () => {
    const { index } = getPaletteAtIndex(this.state.paletteIndex + 1);
    this.setState({ paletteIndex: index });
  };

  resetDeck = cards => {
    unseen = shuffle(cards);
    seen = [];
  };

  nextCard = () => {
    let { seen, unseen } = this.state.records;

    // If the unseen stack is empty, reset it
    unseen.length == 0 ? this.resetDeck(seen) : null;

    // pop a new current card off the unseen deck
    // and move it to the seen deck
    seen.push(unseen.pop());

    // update state object
    this.setState({ records: { seen, unseen } });
    this.changePalette();
  };

  render() {
    const { className } = getPaletteAtIndex(this.state.paletteIndex);
    const content = lastItem(this.state.records.seen);

    return (
      <Layout>
        <ThemeContext.Provider value={className}>
          <Card>
            <CardHeader onClick={() => this.nextCard()}>
              <OracleEye />
            </CardHeader>
            <CardBody text={content} onClick={() => this.nextCard()} />
            <ModalContext.Consumer>
              {({ openModal }) => (
                <CardFooter onClick={openModal}>
                  <Logo />
                </CardFooter>
              )}
            </ModalContext.Consumer>
          </Card>
        </ThemeContext.Provider>
      </Layout>
    );
  }
}

export const query = graphql`
  query {
    allAirtable {
      nodes {
        data {
          content
        }
      }
    }
  }
`;
