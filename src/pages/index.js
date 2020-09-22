import React from 'react';
import { graphql } from 'gatsby';

// theme and utils
import { ThemeContext, paletteManager } from '../components/Theme';
import Layout from '../components/Layout';
import deckGenerator from '../util/deckGenerator';

// UI Components
import { Card, CardFooter, CardHeader, CardBody } from '../components/Card';
import OracleEye from '../components/OracleEye';

export default class CardPage extends React.Component {
  constructor(props) {
    super(props);
    this.records = props.data.allAirtable.nodes.map((item) => item.data.content);
    this.deck = deckGenerator(this.records);

    this.state = {
      card: null,
      palette: null,
    };
  }

  componentDidMount = () => this.nextCard();
  resetDeck = () => (this.deck = deckGenerator(this.records));

  nextCard = () => {
    // change the palette each time we get a new card
    paletteManager.next();

    // grab the next card
    // and, if that is the last card, reset the deck
    const { value, done } = this.deck.next();
    if (done) this.resetDeck();

    this.setState({ card: value });
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
            <CardFooter />
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
