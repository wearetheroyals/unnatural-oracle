const select = require('./db/select');

module.exports = async (req, res) => {
  let titles;
  console.log(req);
  try {
    titles = await select();
    // console.log('AAAAAAAAAA');
  } catch (e) {
    // console.log('LKJLJHKLHKJH');
    titles = e;
  }
  res.status(200).send(titles);
};
