import ServerlessFuncs from './data/ServerlessFuncs';
import { randomRangeInt } from './util/randomRange.js';

const ERRORS = {
  NO_CONCURRENT: 'API Call already in progress. Concurrent calls not supported.',
  NO_CONTENT_INDEX:`Content index not found.`,
};

const EVENTS = {
  LOAD_START: 'loadstart',
  LOAD_COMPLETE: 'loadcomplete',
}

/**
* ToDo: Gracefully cancel or queue concurrent calls.
* Currently assumes only one API call can be made at a time.
* If a new call is made while another call is in progress, it will be ignored.
*
* ToDo: Merge ServerlessFuncs class into this one
*  (or give better rationale as to why they're semi-decoupled)
*/

export default class APIConn {
  constructor({ useMock = false } = {}) {
    this._contentIndex = [];
    this._loading = false;
    this._serverlessFuncs = new ServerlessFuncs(useMock);
    this._contentIndex = await this.fetchContentIndex();
  }
  
  fetchContentIndex() {
    return new Promise(async (resolve, reject) => {
      if (this.isLoading) reject(ERRORS.NO_CONCURRENT);
      
      this._setIsLoading(true);
      try {
        return await serverlessFuncs.fetchSparkIndex();
      } catch (e) {
        reject(e)
      } finally {
        this._setIsLoading(false);
      }
    });
  }
  
  /**
   * Fetches a content item via API. Can fetch a specific item using the
   * contentId argument or, if no contentId argument is supplied, a random item will be fetched.
   * @param {str} contentId 
   */
  fetchItem (contentId=null) {
    return new Promise(async (resolve, reject) => {
      if (!this.isReady) reject(ERRORS.DISALLOW_CONCURRENT);
      try {
        contentId = contentId ? contentId : this.getRandomContentId();
        this._setIsLoading(true);
        const item = await serverlessFuncs.fetchSpark(contentId);
        return item;
      } catch (e) {
        
      } finally {
        this._setIsLoading(false);
      }
    });
  };
  
  getRandomContentId () { 
    if (!this.hasContentIndex) throw Error(ERRORS.NO_CONTENT_INDEX);
    var int = randomRangeInt(0, this._contentIndex.length-1)
    return this._contentIndex[int].id;
  }


  get isLoading () {return this._loading};
  get hasContentIndex () {return this._contentIndex.length > 0}
  get isReady () {return this.hasContentIndex && !this.isLoading ;}
  
  _setIsLoading (bool) { 
    if (this._loading != bool) {
      this._loading = bool;
      var eventType = bool ? EVENTS.LOAD_START : EVENTS.LOAD_COMPLETE;
      this.dispatchEvent(new Event(eventType));
    }
  }
  
}
