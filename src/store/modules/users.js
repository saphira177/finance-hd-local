/* eslint-disable no-param-reassign */
export default {
  state: {
    user: {
      _id: 'dungla4',
      name: 'Le Anh Dung',
      groups: [
        { _id: 'group1', admin: true },
        { _id: 'group2', admin: false },
      ],
    },
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
