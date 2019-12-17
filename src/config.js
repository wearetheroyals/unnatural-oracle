const TABLES = {
  SPARK: {
    NAME: 'spark',
    FIELDS: {
      ID: 'id',
      TITLE: 'title',
      CONTENT: 'content',
      TAGS: 'tags',
      ACTIONS: 'actions',
      IS_PUBLISHED: 'published',
      CONTRIBUTOR: 'contributor',
    },
  },
};

const apiProd = '/api/prod';
const apiMock = '/api/mock';

const FUNCTION_PATHS = {
  ENV: {
    PROD: '/api/prod',
    MOCK: 'api/mock',
  },
  ENDPOINTS: {
    QUERY_AIRTABLE: `/queryAirtable`,
  },
};

module.exports.TABLES = TABLES;
module.exports.FUNCTION_PATHS = FUNCTION_PATHS;
