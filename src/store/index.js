import Vue from 'vue';
import Vuex from 'vuex';
import VuexPersistence from 'vuex-persist';
import users from './modules/users';
import groups from './modules/groups';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    users,
    groups,
  },
  plugins: [
    new VuexPersistence({ storage: window.localStorage }).plugin,
  ],
});
