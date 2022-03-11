import { makeObservable, observable, action } from 'mobx';

const VIEW_STRUCT = {};

class StoreManager {
  view = VIEW_STRUCT;

  constructor() {
    makeObservable(this, {
      view: observable,
      setView: action.bound,
    });
  }

  setView(payload) {
    this.view = {
      ...this.view,
      ...payload,
    };
  }

  getView(key) {
    return this.view[key];
  }
}

export default new StoreManager();
