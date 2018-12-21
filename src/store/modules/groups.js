// @flow
/* eslint-disable no-param-reassign */
import findIndex from 'lodash/findIndex';
import find from 'lodash/find';

export const mutations = {
  add(state: State, group: Group) {
    state.groups.push(group);
  },
  update(state: State, group: Group) {
    const index = findIndex(state.groups, { _id: group._id });
    if (index > -1) {
      const updatingGroup = { ...state.groups[index], ...group };
      state.groups.splice(index, 1, updatingGroup);
    }
  },
  remove(state: State, groupId: string) {
    state.groups = state.groups.filter(g => g._id !== groupId);
  },
};

export const actions = {
  addGroup(context: Context, group: Group) {
    context.commit('add', group);
  },
  removeGroup(context: Context, groupId: string) {
    context.commit('remove', groupId);
  },
};

export const getters = {
  allGroups: (state: State) => state.groups,
  group: (state: State) => (id: string) => find(state.groups, g => g._id === id),
};

export default {
  state: {
    groups: [
      { _id: 'group1', name: 'Monthly', available: 15700 },
      { _id: 'group2', name: 'Rent', available: 12745 },
    ],
  },
  mutations,
  actions,
  getters,
};
