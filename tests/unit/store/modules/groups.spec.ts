import { findIndex, map } from 'lodash';
import {
  actions,
  getters,
  mutations,
} from '@/store/modules/groups';
import { Commit, ActionContext } from 'vuex';

describe('groups module', () => {
  let state: GroupState;

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
        mutations.add(state, { _id: 'newGroup' });
        expect(state.groups).toHaveLength(3);
      });
    });

    describe('update', () => {
      it('should update existing item', () => {
        mutations.update(state, { _id: 'group2', name: 'Updated group 2' });
        expect(state.groups[1]).toEqual({
          _id: 'group2', name: 'Updated group 2', available: 18000,
        });
      });

      it('should not update if non-existing item', () => {
        mutations.update(state, { _id: 'group0', name: 'Updated group 0' });
        expect(findIndex(state.groups, { name: 'Updated group 0' })).toEqual(-1);
      });

      it('should not update if missing _id field', () => {
        mutations.update(state, { name: 'Updated group 0' });
        expect(findIndex(state.groups, { name: 'Updated group 0' })).toEqual(-1);
      });
    });

    describe('remove', () => {
      it('should remove group by id', () => {
        mutations.remove(state, 'group1');
        expect(state.groups).toHaveLength(1);
        expect(map(state.groups, '_id')).toEqual(['group2']);
      });
    });
  });

  describe('getters', () => {
    describe('allGroups', () => {
      it('should list all groups', () => {
        // @ts-ignore
        expect(getters.allGroups(state)).toEqual([
          { _id: 'group1', name: 'Rent', available: 5000 },
          { _id: 'group2', name: 'Monthly', available: 18000 },
        ]);
      });
    });

    describe('group', () => {
      it('should return group by id', () => {
        // @ts-ignore
        expect(getters.group(state)('group2')).toEqual(
          { _id: 'group2', name: 'Monthly', available: 18000 },
        );
      });
    });
  });
});
