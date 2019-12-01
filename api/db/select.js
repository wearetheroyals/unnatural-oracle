const db = require('./conn');
const dbName = process.env.DB_NAME;
const result = [];
const done = err => err;

const page = (records, fetchNextPage) => {
  records.map(record => result.push(record.fields));
  // To fetch the next page of records, call `fetchNextPage`.
  // If there are more records, `page` will get called again.
  // If there are no more records, `done` will get called.
  fetchNextPage();
};

const select = query => {
  console.log(query);
  return new Promise(async function(resolve, reject) {
    const resultObj = await db(query.table).select(query.options);
    const err = await resultObj.eachPage((records, fetchNextPage) =>
      page(records, fetchNextPage),
    );
    err ? reject(err) : resolve(result);
  });
};

module.exports = query => {
  return select(query);
};
