import React from 'react';
import { graphql } from 'gatsby';

// UI Components
import Layout from '../components/Layout';
import { Card, CardFooter, CardHeader, CardBody } from '../components/Card';
import OracleEye from '../components/OracleEye';
import Logo from '../assets/logo.svg';

// Theming via hooks and context provider
import { ThemeContext, getPaletteAtIndex } from '../Theme';

const lastItem = arr => arr[arr.length - 1];
const shuffle = arr => [...arr].sort(item => (Math.random() > 0.5 ? 1 : -1));

export default class CardPage extends React.Component {
  constructor(props) {
    super(props);

    const { data } = props;
    const { allAirtable } = data;
    const records = allAirtable.nodes.map(item => item.data.content);

    this.state = {
      records: {
        unseen: shuffle(records),
        seen: [],
        current: null
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
  };

  get currentCard() {
    // return this.state.records.seen[this.state.records.seen.length - 1];
    return lastItem(this.state.records.seen);
  }

  render() {
    const { className } = getPaletteAtIndex(this.state.paletteIndex);

    return (
      <Layout>
        <ThemeContext.Provider value={className}>
          <Card onClick={() => this.nextCard()}>
            <CardHeader>
              <OracleEye />
            </CardHeader>
            <CardBody>
              <p>{this.currentCard}</p>
            </CardBody>
            <CardFooter>
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
  }
`;
// export const query = graphql`
//   query {
//     allAirtable(filter: { table: { eq: "spark" } }) {
//       nodes {
//         data {
//           content
//         }
//       }
//     }
//   }
// `;
