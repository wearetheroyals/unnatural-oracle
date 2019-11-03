require('dotenv').config();

const Airtable = require('airtable');
Airtable.configure({
  endpointUrl: 'https://api.airtable.com',
  apiKey: process.env.DB_KEY,
});

const db = Airtable.base(process.env.DB_ID);

module.exports = db;
