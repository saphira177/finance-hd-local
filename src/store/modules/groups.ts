/* eslint-disable no-param-reassign */
import findIndex from 'lodash/findIndex';
import find from 'lodash/find';
import {
  ActionTree,
  MutationTree,
  GetterTree,
  Action,
} from 'vuex';

export const initState: GroupState = {
  groups: [
    { _id: 'group1', name: 'Monthly', available: 15700 },
    { _id: 'group2', name: 'Rent', available: 12745 },
  ],
};

export const mutations: MutationTree<GroupState> = {
  add(state, group: Group) {
    state.groups.push(group);
  },
  update(state, group: Group) {
    const index = findIndex(state.groups, { _id: group._id });
    if (index > -1) {
      const updatingGroup = { ...state.groups[index], ...group };
      state.groups.splice(index, 1, updatingGroup);
    }
  },
  remove(state, groupId: string) {
    state.groups = state.groups.filter(g => g._id !== groupId);
  },
};

export const actions: ActionTree<GroupState, RootState> = {
  addGroup(context, group: Group): any {
    context.commit('add', group);
  },
  removeGroup(context, groupId: string) {
    context.commit('remove', groupId);
  },
};

export const getters: GetterTree<GroupState, RootState> = {
  allGroups: state => state.groups,
  group: state => (id: string) => find(state.groups, g => g._id === id),
};

export default {
  state: initState,
  mutations,
  actions,
  getters,
};
