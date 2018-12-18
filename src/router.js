import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import Groups from './views/Groups.vue';
import GroupInvoice from './views/GroupInvoice.vue';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/groups',
      name: 'group',
      component: Groups,
    },
    {
      path: '/groups/:groupId',
      name: 'groupInvoice',
      component: GroupInvoice,
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue'),
    },
  ],
});
