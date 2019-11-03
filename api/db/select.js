const db = require('./conn');
const dbName = process.env.DB_NAME;
const result = [];
const done = err => err;
const page = (records, fetchNextPage) => {
  records.map(record => result.push(record.get('Title')));
  // To fetch the next page of records, call `fetchNextPage`.
  // If there are more records, `page` will get called again.
  // If there are no more records, `done` will get called.
  fetchNextPage();
};

const select = query => {
  return new Promise(async function(resolve, reject) {
    const resultObj = await db(dbName).select(query);
    const err = await resultObj.eachPage((records, fetchNextPage) => page(records, fetchNextPage));
    if (err) {
      reject(err);
    } else {
      resolve(result);
    }
  });
};

module.exports = query => {
  return select(query);
};
