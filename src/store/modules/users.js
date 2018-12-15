/* eslint-disable no-param-reassign */
export default {
  state: {
    user: {},
  },
  mutations: {
    saveUser(state, user) {
      state.user = user;
    },
  },
  actions: {
    saveUser(context, user) {
      context.commit('saveUser', user);
    },
    removeUser(context) {
      context.commit('saveUser', {});
    },
  },
  getters: {
    loggedInUser: state => state.user,
    loggedInUserId: state => state.user._id,
  },
};
