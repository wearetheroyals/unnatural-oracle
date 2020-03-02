import React from 'react';
import { graphql } from 'gatsby';

// UI Components
import Layout from '../components/Layout';
import { Card, CardFooter, CardHeader, CardBody } from '../components/Card';
import OracleEye from '../components/OracleEye';
import Logo from '../assets/logo.svg';

// Theming via hooks and context provider
import { ThemeContext, getPaletteAtIndex } from '../components/Theme';

export default class Home extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { className } = getPaletteAtIndex(0);
    const content =
      'sdoinfpi nfian pisrb lkasnfblsabdfpsabfl sadvlk sadiusablsdlkjn lifi salri sldivlsdifbsiufnkls dfbveortisvn;sehnfpweru weufpidn ';

    return (
      <Layout>
        <ThemeContext.Provider value={className}>
          <Card>
            <CardHeader>
              <OracleEye />
            </CardHeader>
            <CardBody text={content} />
            <CardFooter>
              <Logo />
            </CardFooter>
          </Card>
        </ThemeContext.Provider>
      </Layout>
    );
  }
}
