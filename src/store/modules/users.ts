/* eslint-disable no-param-reassign */
import _, { find, map } from 'lodash';
import {
  ActionTree,
  MutationTree,
  GetterTree,
} from 'vuex';

export const initState: UserState = {
  user: {
    _id: 'dungla4',
    name: 'Le Anh Dung',
    groups: [
      { _id: 'group1', admin: true },
      { _id: 'group2', admin: false },
    ],
  },
};

export const mutations: MutationTree<UserState> = {
  update(state, user: User) {
    state.user = { ...state.user, ...user };
  },
};

export const getters: GetterTree<UserState, RootState> = {
  loggedInUser: state => state.user,
  userName: state => state.user.name,
  listGroup: state => map(state.user.groups, '_id'),
  listAdminGroup: state => _.chain(state.user.groups)
    .filter({ admin: true })
    .map('_id')
    .value(),
  isAdminOfGroup: state => (groupId: string) => (
    find(state.user.groups, { _id: groupId, admin: true }) !== undefined
  ),
};

export const actions: ActionTree<UserState, RootState> = {
  saveUser(context, user: User) {
    context.commit('saveUser', user);
  },
  removeUser(context) {
    context.commit('saveUser', {});
  },
};

export default {
  state: initState,
  mutations,
  actions,
  getters,
};
