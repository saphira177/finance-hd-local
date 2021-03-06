import { getters, mutations } from '@/store/modules/users';

const { update } = mutations;
const {
  loggedInUser,
  userName,
  listGroup,
  listAdminGroup,
  isAdminOfGroup,
} = getters;

describe('users module', () => {
  let state: UserState;
  beforeEach(() => {
    state = {
      user: {
        _id: 'user1',
        name: 'User Test',
        groups: [
          { _id: 'group1', admin: true },
          { _id: 'group2', admin: false },
        ],
      },
    };
  });

  describe('mutations', () => {
    describe('update', () => {
      it('should update name', () => {
        update(state, { name: 'new name' });
        expect(state.user).toEqual({
          _id: 'user1',
          name: 'new name',
          groups: [
            { _id: 'group1', admin: true },
            { _id: 'group2', admin: false },
          ],
        });
      });

      it('should update groups', () => {
        update(state, { groups: [] });
        expect(state.user).toEqual({
          _id: 'user1',
          name: 'User Test',
          groups: [],
        });
      });
    });
  });

  describe('getters', () => {
    describe('loggedInUser', () => {
      it('should return user in state', () => {
        // @ts-ignore
        expect(loggedInUser(state)).toEqual(state.user);
      });
    });

    describe('userName', () => {
      it('should return user name', () => {
        // @ts-ignore
        expect(userName(state)).toEqual('User Test');
      });
    });

    describe('listGroup', () => {
      it('should return list id of groups', () => {
        // @ts-ignore
        expect(listGroup(state)).toEqual(['group1', 'group2']);
      });
    });

    describe('listAdminGroup', () => {
      it('should return list id of admin groups', () => {
        // @ts-ignore
        expect(listAdminGroup(state)).toEqual(['group1']);
      });
    });

    describe('isAdminOfGroup', () => {
      it('should return true if admin', () => {
        // @ts-ignore
        expect(isAdminOfGroup(state)('group1')).toBe(true);
      });

      it('should return false if not admin', () => {
        // @ts-ignore
        expect(isAdminOfGroup(state)('group2')).toBe(false);
      });
    });
  });
});
