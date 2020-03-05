import React from 'react';
import { graphql } from 'gatsby';

// context providers
import ModalContext from '../store/modalContext';
import { ThemeContext, paletteManager } from '../components/Theme';

import Layout from '../components/Layout';

// UI Components
import { Card, CardFooter, CardHeader, CardBody } from '../components/Card';
import OracleEye from '../components/OracleEye';
import Logo from '../assets/logo.svg';

// utilities
import deckGenerator from '../util/deckGenerator';

export default class CardPage extends React.Component {
  constructor(props) {
    super(props);
    this._records = props.data.allAirtable.nodes.map(item => item.data.content);
    this._deck = deckGenerator(this._records);

    this.state = {
      card: null,
      palette: null
    };
  }

  componentDidMount = () => this.nextCard();
  resetDeck = () => (this._deck = deckGenerator(this._records));

  nextCard = () => {
    // grab the next card
    const { value, done } = this._deck.next();
    this.setState({ card: value });

    // if that was the last card, reset the deck
    if (done) this.resetDeck();

    // change the palette
    paletteManager.next();
  };

  render() {
    const { className } = paletteManager.currentPalette;

    return (
      <Layout>
        <ThemeContext.Provider value={className}>
          <Card>
            <CardHeader onClick={() => this.nextCard()}>
              <OracleEye />
            </CardHeader>
            <CardBody text={this.state.card} onClick={() => this.nextCard()} />
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
