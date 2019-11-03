const db = require('./db/conn');

const getTitles = () => {
  const titles = [];
  return new Promise(function(resolve, reject) {
    // resolve('hello');
    db('Spark')
      .select({
        // Selecting the first 3 records in default:
        maxRecords: 3,
        view: 'default',
      })
      .eachPage(
        function page(records, fetchNextPage) {
          // This function (`page`) will get called for each page of records.

          records.forEach(function(record) {
            titles.push(record.get('Title'));
          });

          // To fetch the next page of records, call `fetchNextPage`.
          // If there are more records, `page` will get called again.
          // If there are no more records, `done` will get called.
          fetchNextPage();
        },
        function done(err) {
          if (err) {
            reject(err);
          }
          resolve(titles);
        },
      );
  });
};

module.exports = async (req, res) => {
  const titles = await getTitles();
  res.status(200).send(titles);
};
