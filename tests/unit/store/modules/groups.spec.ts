import { findIndex, map } from 'lodash';
import {
  actions,
  getters,
  mutations,
} from '@/store/modules/groups';
import { Commit, ActionContext } from 'vuex';

describe('groups module', () => {
  let state: GroupState;
  const rootState: RootState = { version: '1' };

  beforeEach(() => {
    state = {
      groups: [
        { _id: 'group1', name: 'Rent', available: 5000 },
        { _id: 'group2', name: 'Monthly', available: 18000 },
      ],
    };
  });

  describe('mutations', () => {
    describe('add', () => {
      it('should add new item to groups', () => {
        mutations.addGroup(state, { _id: 'newGroup' });
        expect(state.groups).toHaveLength(3);
      });
    });

    describe('update', () => {
      it('should update existing item', () => {
        mutations.updateGroup(state, { _id: 'group2', name: 'Updated group 2' });
        expect(state.groups[1]).toEqual({
          _id: 'group2', name: 'Updated group 2', available: 18000,
        });
      });

      it('should not update if non-existing item', () => {
        mutations.updateGroup(state, { _id: 'group0', name: 'Updated group 0' });
        expect(findIndex(state.groups, { name: 'Updated group 0' })).toEqual(-1);
      });

      it('should not update if missing _id field', () => {
        mutations.updateGroup(state, { name: 'Updated group 0' });
        expect(findIndex(state.groups, { name: 'Updated group 0' })).toEqual(-1);
      });
    });

    describe('remove', () => {
      it('should remove group by id', () => {
        mutations.removeGroup(state, 'group1');
        expect(state.groups).toHaveLength(1);
        expect(map(state.groups, '_id')).toEqual(['group2']);
      });
    });
  });

  describe('actions', () => {
    let commit: Commit;
    beforeEach(() => {
      commit = jest.fn();
    });

    describe('addGroup', () => {
      it('should commit add event', () => {
        actions.addGroup({ commit, state }, { _id: 'newGroup', name: 'newGroup', available: 0 });
        expect(commit).toHaveBeenCalledWith('addGroup', { _id: 'newGroup', name: 'newGroup', available: 0 });
      });
    });

    describe('removeGroup', () => {
      it('should commit add event', () => {
        actions.removeGroup({ commit }, 'groupId');
        expect(commit).toHaveBeenCalledWith('removeGroup', 'groupId');
      });
    });
  });

  describe('getters', () => {
    describe('allGroups', () => {
      it('should list all groups', () => {
        expect(getters.allGroups(state, null, rootState, null)).toEqual([
          { _id: 'group1', name: 'Rent', available: 5000 },
          { _id: 'group2', name: 'Monthly', available: 18000 },
        ]);
      });
    });

    describe('group', () => {
      it('should return group by id', () => {
        expect(getters.group(state, null, rootState, null)('group2')).toEqual(
          { _id: 'group2', name: 'Monthly', available: 18000 },
        );
      });
    });
  });
});
