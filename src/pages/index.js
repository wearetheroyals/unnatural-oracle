import React from 'react';
import { graphql } from 'gatsby';

import { ThemeContext, paletteManager } from '../components/Theme';

import Layout from '../components/Layout';

// UI Components
import { Card, CardFooter, CardHeader, CardBody } from '../components/Card';
import OracleEye from '../components/OracleEye';
import Logo from '../assets/logo.svg';
import InfoButton from '../components/InfoButton';

// utilities
import deckGenerator from '../util/deckGenerator';

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
    // grab the next card
    const { value, done } = this.deck.next();
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
            <CardFooter>
              <InfoButton props={{ modalContent: this.props.data.modalContent }} />
              <Logo />
            </CardFooter>
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
    modalContent: allMarkdownRemark(filter: { fileAbsolutePath: { regex: "/modal/[^/]*md$/" } }) {
      nodes {
        frontmatter {
          title
        }
        html
        fileAbsolutePath
      }
    }
  }
`;
