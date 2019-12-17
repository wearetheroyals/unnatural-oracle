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

const apiPath = '/api';
const ENDPOINTS = {
  QUERY_AIRTABLE: `${apiPath}/queryAirtable`,
};

module.exports.TABLES = TABLES;
module.exports.ENDPOINTS = ENDPOINTS;
