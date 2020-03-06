const dotenv = require('dotenv');
if (process.env.ENVIRONMENT !== 'production') {
  dotenv.config();
}

const { DB_KEY, DB_ID } = process.env;

module.exports = {
  plugins: [
    {
      resolve: 'gatsby-source-airtable',
      options: {
        apiKey: DB_KEY,
        concurrency: 5,
        tables: [
          {
            baseId: DB_ID,
            tableName: 'spark'
          }
        ]
      }
    },
    {
      resolve: `gatsby-plugin-postcss`,
      options: {
        postCssPlugins: [require(`postcss-preset-env`)({ stage: 0 })]
      }
    },
    {
      resolve: 'gatsby-plugin-react-svg'
    },
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/src/content`,
        name: 'content'
      }
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: []
      }
    }
  ]
};
