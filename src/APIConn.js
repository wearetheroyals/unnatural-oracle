import { get } from 'Svelte/store';
import {
  isLoading,
  useMockData,
  contentItemIndex,
  hasContentItemIndex
} from './store.js';
import ServerlessFuncs from './data/ServerlessFuncs';
import { randomRangeInt } from './util/randomRange.js';

const ERRORS = {
  NO_CONCURRENT:
    'API Call already in progress. Concurrent calls not supported.',
  NO_CONTENT_INDEX: `Content index is empty. This is probably because you haven't called fetchContentIndex() on an instance of APIConn.`
};

const serverlessFuncs = new ServerlessFuncs();

export default class APIConn {
  fetchContentIndex() {
    serverlessFuncs.useMock = get(useMockData);
    return new Promise(async (resolve, reject) => {
      if (get(isLoading)) reject(ERRORS.NO_CONCURRENT);
      isLoading.set(true);
      try {
        contentItemIndex.set(await serverlessFuncs.fetchSparkIndex());
        resolve(true);
      } catch (e) {
        reject(e);
      } finally {
        isLoading.set(false);
      }
    });
  }

  /**
   * Fetches a content item via API. Can fetch a specific item using the
   * contentId argument or, if no contentId argument is supplied, a random item will be fetched.
   * @param {str} contentId
   */
  fetchItem(contentId = null) {
    serverlessFuncs.useMock = get(useMockData);
    return new Promise(async (resolve, reject) => {
      if (get(isLoading)) reject(ERRORS.NO_CONCURRENT);
      if (!get(hasContentItemIndex)) reject(ERRORS.NO_CONTENT_INDEX);

      try {
        contentId = contentId ? contentId : this._getRandomId();
        isLoading.set(true);
        resolve(await serverlessFuncs.fetchSpark(contentId));
      } catch (e) {
        reject(e);
      } finally {
        isLoading.set(false);
      }
    });
  }

  _getRandomId() {
    if (!get(hasContentItemIndex)) throw new Error(ERRORS.NO_CONTENT_INDEX);
    const items = get(contentItemIndex);
    var int = randomRangeInt(0, items.length - 1);
    return items[int].id;
  }
}
