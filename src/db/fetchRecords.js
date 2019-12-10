import ENDPOINTS from './endpoints';
const fetchRecords = query => {
  return new Promise(async (resolve, reject) => {
    try {
      const res = await fetch(ENDPOINTS.GET_RECORDS, {
        method: 'POST',
        body: query,
      });
      const result = await res.text();
      resolve(JSON.parse(result));
    } catch (e) {
      reject(e);
    }
  });
};

export default fetchRecords;
