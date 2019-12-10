import ENDPOINTS from './endpoints';

const fetchRecords = query => {
  return new Promise(async (resolve, reject) => {
    try {
      const res = await fetch(ENDPOINTS.GET.RECORD, {
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

export default fetchRecords;
