import Vue from 'vue';
import VueLocalStorage from 'vue-localstorage';
import './plugins/vuetify';
import App from './App.vue';
import router from './router';
import store from './store';
import './registerServiceWorker';

Vue.config.productionTip = false;
Vue.use(VueLocalStorage);

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
