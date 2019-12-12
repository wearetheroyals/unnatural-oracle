import { AIRTABLE_PROXY } from './endpoints';
import TABLE from '../data/tables';
import Query from '../data/Query';

const fetchIndex = () => {
  const query = new Query('/spark', {
    fields: [TABLE.SPARK.FIELDS.IS_PUBLISHED],
    filterByFormula: `{${TABLE.SPARK.FIELDS.IS_PUBLISHED}}`,
  });

  return new Promise(async (resolve, reject) => {
    const payload = {
      method: 'POST',
      body: JSON.stringify(query),
    };

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

export default fetchIndex;
