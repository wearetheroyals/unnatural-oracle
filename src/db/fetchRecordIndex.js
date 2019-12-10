import ENDPOINTS from './endpoints';
import TABLE from '../data/tables';
import Query from '../data/Query';

const getRecordIndex = () => {
  const query = new Query({
    method: '/spark',
    select: [TABLE.SPARK.FIELDS.ID],
    filterByFormula: `{${TABLE.SPARK.FIELDS.IS_PUBLISHED}}`,
  });

  return new Promise(async (resolve, reject) => {
    const payload = {
      method: 'POST',
      body: JSON.stringify(query),
    };

    try {
      const res = await fetch(ENDPOINTS.GET.RECORD_INDEX, {
        method: 'POST',
        body: JSON.stringify(query),
      });

      const result = await res.text();
      console.log(result);
      resolve(JSON.parse(result));
    } catch (e) {
      reject(e);
    }
  });
};

export default getRecordIndex;
