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
  groupError: { name: '', code: -1 },
  loading: false,
  status: '',
};

export const mutations: MutationTree<GroupState> = {
  setGroupError(state, error: IError) {
    state.groupError = { ...error };
  },
  clearGroupError(state) {
    state.groupError = { name: '', code: -1 };
  },
  setGroupLoading(state, isLoading: boolean) {
    state.loading = isLoading;
  },
  setGroupStatus(state, status: IStatus) {
    if (status === 'PENDING') {
      state.status = status;
      state.loading = true;
    } else if (status === 'FINISHED') {
      state.status = status;
      state.loading = false;
    }
  },
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
};

export const actions = {
  clearGroupError(context: any) {
    context.commit('clearError');
  },
  async addGroup({ commit, state }: { commit: Commit, state: GroupState }, group: Group) {
    commit('setStatus', 'PENDING');
    await delay(1000);
    const index = findIndex(state.groups, { _id: group._id });
    if (index === -1) {
      commit('addGroup', group);
    } else {
      commit('setError', { name: DUPLICATED_GROUP_ID_ERROR, code: 404 });
    }
    commit('setStatus', 'FINISHED');
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
  loading: (state): boolean => state.loading,
  status: (state): IStatus => state.status,
};

export default {
  state: initState,
  mutations,
  actions,
  getters,
};
