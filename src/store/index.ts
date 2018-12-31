import Vue from 'vue';
import Vuex from 'vuex';
import VuexPersistence from 'vuex-persist';
import users from './modules/users';
import groups from './modules/groups';
import invoices from './modules/invoices';

Vue.use(Vuex);

export default new Vuex.Store<RootState>({
  state: {
    version: '0.1.0',
  },
  modules: {
    users,
    groups,
    invoices,
  },
  plugins: [
    new VuexPersistence({ storage: window.localStorage }).plugin,
  ],
});
