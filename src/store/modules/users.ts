import _, { find, map } from 'lodash';

export const mutations = {
  update(state: State, user: User) {
    state.user = { ...state.user, ...user };
  },
};

export const getters = {
  loggedInUser: (state: State) => state.user,
  userName: (state: State) => state.user.name,
  listGroup: (state: State) => map(state.user.groups, '_id'),
  listAdminGroup: (state: State) => _.chain(state.user.groups)
    .filter({ admin: true })
    .map('_id')
    .value(),
  isAdminOfGroup: (state: State) => (groupId: string) => (
    find(state.user.groups, { _id: groupId, admin: true }) !== undefined
  ),
};

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
  mutations,
  actions: {
    saveUser(context: Context, user: User) {
      context.commit('saveUser', user);
    },
    removeUser(context: Context) {
      context.commit('saveUser', {});
    },
  },
  getters,
};
