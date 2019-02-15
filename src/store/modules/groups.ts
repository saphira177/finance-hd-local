/* eslint-disable no-param-reassign */
import findIndex from 'lodash/findIndex';
import find from 'lodash/find';
import {
  MutationTree,
  GetterTree,
  Commit,
} from 'vuex';
import { DUPLICATED_GROUP_ID_ERROR } from '@/constants';
import delay from '@/utils/delay';

export const initState: GroupState = {
  groups: [
    { _id: 'group1', name: 'Monthly', available: 15700 },
    { _id: 'group2', name: 'Rent', available: 12745 },
  ],
};

export const mutations: MutationTree<GroupState> = {
  addGroup(state, group: Group) {
    state.groups.push(group);
  },
  updateGroup(state, group: Group) {
    const index = findIndex(state.groups, { _id: group._id });
    if (index > -1) {
      const updatingGroup = { ...state.groups[index], ...group };
      state.groups.splice(index, 1, updatingGroup);
    }
  },
  removeGroup(state, groupId: string) {
    state.groups = state.groups.filter(g => g._id !== groupId);
  },
  updateGroupByInvoice(state, invoice: Invoice) {
    const { group: groupId, number: invoiceNumber, type } = invoice;
    const group = find(state.groups, { _id: groupId });
    if (group) {
      const { available } = group;
      group.available = type === 'in' ? available + invoiceNumber : available - invoiceNumber;
    }
  },
};

export const actions = {
  addGroup(context: any, group: Group) {
    context.commit('addGroup', group);
    // commit('setGroupStatus', 'PENDING');
    // await delay(1000);
    // const index = findIndex(state.groups, { _id: group._id });
    // if (index === -1) {
    //   commit('addGroup', group);
    // } else {
    //   commit('setGroupError', { name: DUPLICATED_GROUP_ID_ERROR, code: 404 });
    // }
    // commit('setGroupStatus', 'FINISHED');
  },
  removeGroup(context: any, groupId: string) {
    context.commit('removeGroup', groupId);
  },
};

export const getters: GetterTree<GroupState, RootState> = {
  allGroups(state): Array<Group> {
    return state.groups;
  },
  group: state => (id: string) => find(state.groups, g => g._id === id),
};

export default {
  state: initState,
  mutations,
  actions,
  getters,
};
