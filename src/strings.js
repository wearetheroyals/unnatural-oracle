export const ROUTES = {
  MOCK: '/mock',
  OFFLINE: '/offline'
};

export const MESSAGES = {
  USING_MOCK_DATA: `**** WARNING : MOCK DATA! ****\nUsing mocked data because you're on the ${ROUTES.MOCK} route.`,
  NO_CONNECTION: `You're not connected to the internet right now! I need the interpipes to
    make my magic.`,
  INDEX_NOT_FOUND: `Can't fetch a random item until you load the item index.`,
  API_CONNECTION_ERROR: 'Error connecting with serverless functions:',
  NO_CONCURRENT_FETCH: 'Wait until current request is complete.'
};
