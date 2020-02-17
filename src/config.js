const TABLES = {
  SPARK: {
    NAME: 'spark',
    ENDPOINT: 'spark',
    FIELDS: {
      ID: 'rec_id',
      TITLE: 'title',
      CONTENT: 'content',
      TAGS: 'tags',
      ACTIONS: 'actions',
      IS_PUBLISHED: 'published',
      CONTRIBUTOR: 'contributor'
    },
    INDEX_FIELD: 'rec_id'
  }
};

const FUNCTION_PATHS = {
  ENV: {
    PROD: '/api/prod',
    MOCK: 'api/mock'
  },
  ENDPOINTS: {
    QUERY_AIRTABLE: `/queryAirtable`
  }
};

module.exports.TABLES = TABLES;
module.exports.FUNCTION_PATHS = FUNCTION_PATHS;
