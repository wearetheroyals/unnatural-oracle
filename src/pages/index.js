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
import { filenameFromAbsolutePath } from '../util/stringUtils';

export default class CardPage extends React.Component {
  constructor(props) {
    super(props);
    this.records = props.data.allAirtable.nodes.map(item => item.data.content);
    this.deck = deckGenerator(this.records);
    this.modalContent = props.data.modalContent.nodes.reduce((acc, node) => {
      const { fileAbsolutePath, ...obj } = node;
      const key = filenameFromAbsolutePath(fileAbsolutePath);
      return { ...acc, [key]: { ...obj.frontmatter, html: obj.html } };
    }, {});

    this.state = {
      card: null,
      palette: null
    };

    console.log(this.props.data);
    console.log(this.modalContent.about);
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
            <ModalContext.Consumer>
              {({ openModal, setMessage }) => (
                <CardFooter
                  onClick={() => {
                    setMessage(this.modalContent.about);
                    openModal();
                  }}
                >
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
    modalContent: allMarkdownRemark(
      filter: { fileAbsolutePath: { regex: "/modal/[^/]*md$/" } }
    ) {
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
