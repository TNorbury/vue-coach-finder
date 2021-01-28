import { createStore } from 'vuex';
import CoachesStore from './modules/coaches_store.js';
import RequestsStore from './modules/requests_store.js';
import AuthStore from './modules/auth_store.js';

const store = createStore({
  modules: [CoachesStore, RequestsStore, AuthStore],
  state() {
    return {
      userId: 'c3'
    };
  },
  getters: {}
});

export default store;
