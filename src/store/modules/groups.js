/* eslint-disable no-param-reassign */
import findIndex from 'lodash/findIndex';
import find from 'lodash/find';

export const mutations = {
  add(state, group) {
    state.groups.push(group);
  },
  update(state, group) {
    const index = findIndex(state.groups, { _id: group._id });
    if (index > -1) {
      const updatingGroup = { ...state.groups[index], ...group };
      state.groups.splice(index, 1, updatingGroup);
    }
  },
  remove(state, groupId) {
    state.groups = state.groups.filter(g => g._id !== groupId);
  },
};

export const actions = {
  addGroup(context, group) {
    context.commit('add', group);
  },
  removeGroup(context, groupId) {
    context.commit('remove', groupId);
  },
};

export const getters = {
  allGroups: state => state.groups,
  group: state => id => find(state.groups, g => g._id === id),
};

export default {
  state: {
    groups: [
      { _id: 'group1', name: 'Rent', total: 5000 },
      { _id: 'group2', name: 'Monthly', total: 18000 },
    ],
  },
  mutations,
  actions,
  getters,
};
