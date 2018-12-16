/* eslint-disable no-param-reassign */
export default {
  state: {
    groups: [
      { _id: 'group1', name: 'Rent', total: 5 },
      { _id: 'group2', name: 'Monthly', total: 18 },
    ],
  },
  mutations: {
    add(state, group) {
      state.groups.push(group);
    },
    remove(state, groupId) {
      state.groups = state.groups.filter(g => g._id !== groupId);
    },
  },
  actions: {
    addGroup(context, group) {
      context.commit('add', group);
    },
    removeGroup(context, groupId) {
      context.commit('remove', groupId);
    },
  },
  getters: {
    allGroups: state => state.groups,
  },
};
