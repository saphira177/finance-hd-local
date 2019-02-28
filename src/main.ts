import Vue from 'vue';
import VueLocalStorage from 'vue-localstorage';
import './plugins/vuetify';
import App from './App.vue';
import router from './router';
import store from './store';
import './registerServiceWorker';

Vue.config.productionTip = false;
Vue.use(VueLocalStorage);

const app = new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');

// @ts-ignore
if (window.Cypress) {
  // only available during E2E tests
  // @ts-ignore
  window.app = app;
}
