import { AIRTABLE_PROXY } from './endpoints';

const sendQuery = query => {
  return new Promise(async (resolve, reject) => {
    try {
      const res = await fetch(AIRTABLE_PROXY.QUERY, {
        method: 'POST',
        body: JSON.stringify(query),
      });

      const result = await res.text();
      resolve(JSON.parse(result));
    } catch (e) {
      reject(e);
    }
  });
};

export default sendQuery;
