import React from 'react';
import { graphql } from 'gatsby';

// UI Components
import Layout from '../components/Layout';
import { Card, CardFooter, CardHeader, CardBody } from '../components/Card';
import OracleEye from '../components/OracleEye';
import Logo from '../assets/logo.svg';

// main app styles
import '../components/App.css';

// Theming via hooks and context provider
import { ThemeContext, getPaletteAtIndex } from '../Theme';

export default class CardPage extends React.Component {
  constructor(props) {
    super(props);

    const { data } = props;
    const { allAirtable } = data;

    this.state = {
      records: allAirtable.nodes.map(item => item.data.content),
      cursor: 0,
      paletteIndex: 0
    };
  }

  changePalette = () => {
    const { index } = getPaletteAtIndex(this.state.paletteIndex + 1);
    this.setState({ paletteIndex: index });
  };

  nextRecord = () => {
    const { records, cursor } = this.state;
    const cursorNext = cursor >= records.length - 1 ? 0 : cursor + 1;
    this.changePalette();
    this.setState({ cursor: cursorNext });
  };

  getRecordByIndex = index => {
    try {
      return this.state.records[index];
    } catch (e) {
      console.error(e);
    }
  };

  render() {
    const content = this.getRecordByIndex(this.state.cursor);
    const { className } = getPaletteAtIndex(this.state.paletteIndex);

    return (
      <Layout>
        <ThemeContext.Provider value={className}>
          <Card onClick={() => this.nextRecord()}>
            <CardHeader>
              <OracleEye />
            </CardHeader>
            <CardBody>
              <p>{content}</p>
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
    allAirtable(filter: { table: { eq: "spark" } }) {
      nodes {
        data {
          content
        }
      }
    }
  }
`;
