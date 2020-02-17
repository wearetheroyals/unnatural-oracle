import ServerlessFuncs from './ServerlessFuncs';
import Query from './Query';
import { TABLES } from '../../config';

const ERRORS = {
  NO_CONCURRENT: 'Wait until current request is complete.'
};

const serverlessFuncs = new ServerlessFuncs();

export default class APIConn {
  constructor() {
    this.isLoading = false;
    this.useMockData = false;
  }

  fetchContentIndex() {
    serverlessFuncs.useMock = this.useMockData;

    return new Promise(async (resolve, reject) => {
      if (this.isLoading) reject(ERRORS.NO_CONCURRENT);

      this.isLoading = true;
      const { NAME, FIELDS } = TABLES.SPARK;
      const method = `/${NAME}`;
      const params = {
        fields: [FIELDS.ID],
        filterByFormula: `{${FIELDS.IS_PUBLISHED}}`
      };

      try {
        const result = await serverlessFuncs.sendQuery(
          new Query(method, params)
        );
        resolve(result);
      } catch (e) {
        reject(e);
      } finally {
        this.isLoading = false;
      }
    });
  }

  /**
   * Fetches a content item via API. Can fetch a specific item using the
   * contentId argument or, if no contentId argument is supplied, a random item will be fetched.
   * @param {str} contentId
   */
  fetchItem(contentId) {
    serverlessFuncs.useMock = this.useMockData;

    return new Promise(async (resolve, reject) => {
      if (this.isLoading) reject(ERRORS.NO_CONCURRENT);

      this.isLoading = true;

      const { NAME, FIELDS } = TABLES.SPARK;
      const { TITLE, CONTENT, TAGS, ACTIONS } = FIELDS;

      const method = `/${NAME}`;
      const params = {
        fields: [TITLE, CONTENT, TAGS, ACTIONS],
        filterByFormula: `{rec_id}="${contentId}"`
      };

      try {
        const records = await serverlessFuncs.sendQuery(
          new Query(method, params)
        );
        resolve(records[0]);
      } catch (e) {
        reject(e);
      } finally {
        this.isLoading = false;
      }
    });
  }
}
