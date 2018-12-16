import Vue from 'vue';
import Vuex from 'vuex';
import VuexPersistence from 'vuex-persist';
import users from './modules/users';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    users,
  },
  plugins: [
    new VuexPersistence({ storage: window.localStorage }).plugin,
  ],
});
