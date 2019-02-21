import { findIndex, map } from 'lodash';
import {
  actions,
  getters,
  mutations,
} from '@/store/modules/invoices';
import { Commit } from 'vuex';

describe('invoices module', () => {
  let state: InvoiceState;
  const rootState: RootState = { version: '1' };

  beforeEach(() => {
    state = {
      invoices: [
        {
          _id: 'in1', name: 'Invoice 1', category: 'study', number: -2000, date: '2018-12-08T00:00:00.000Z', group: 'group1', user: 'dungla4',
        },
        {
          _id: 'in2', name: 'Invoice 2', category: 'study', number: -300, date: '2018-12-08T00:00:00.000Z', group: 'group1', user: 'dungla4',
        },
        {
          _id: 'in3', name: 'Invoice 3', category: 'market', number: -425, date: '2018-12-08T00:00:00.000Z', group: 'group2', user: 'dungla4',
        },
        {
          _id: 'in4', name: 'Invoice 4', category: 'electric', number: -1830, date: '2018-12-08T00:00:00.000Z', group: 'group2', user: 'dungla4',
        },
      ],
    };
  });

  describe('mutations', () => {
    describe('addInvoice', () => {
      it('should add new item to invoices', () => {
        mutations.addInvoice(state, { _id: 'newInvoice' });
        expect(state.invoices).toHaveLength(5);
      });
    });

    describe('updateInvoice', () => {
      it('should update existing item', () => {
        mutations.updateInvoice(state, { _id: 'in2', name: 'Updated invoice 2' });
        expect(state.invoices[1]).toEqual({
          _id: 'in2', name: 'Updated invoice 2', category: 'study', number: -300, date: '2018-12-08T00:00:00.000Z', group: 'group1', user: 'dungla4',
        });
      });

      it('should not update if non-existing item', () => {
        mutations.updateInvoice(state, { _id: 'in0', name: 'Updated invoice 0' });
        expect(findIndex(state.invoices, { name: 'Updated invoice 0' })).toEqual(-1);
      });

      it('should not update if missing _id field', () => {
        mutations.updateInvoice(state, { name: 'Updated invoice 0' });
        expect(findIndex(state.invoices, { name: 'Updated invoice 0' })).toEqual(-1);
      });
    });

    describe('removeInvoice', () => {
      it('should remove invoice by id', () => {
        mutations.removeInvoice(state, 'in3');
        expect(state.invoices).toHaveLength(3);
        expect(map(state.invoices, '_id')).toEqual(['in1', 'in2', 'in4']);
      });
    });
  });

  describe('actions', () => {
    let commit: Commit;

    beforeEach(() => {
      commit = jest.fn();
    });

    describe('addInvoice', () => {
      it('should commit add event with invoice', () => {
        const invoice: Invoice = {
          name: 'New Invoice',
          category: '',
          number: 0,
          date: '',
          group: '',
          user: '',
        };
        actions.addInvoice({ commit }, invoice);
        expect(commit).toHaveBeenCalledWith(
          'addInvoice',
          expect.objectContaining({
            name: 'New Invoice',
          }),
        );
        expect(commit).toHaveBeenCalledWith(
          'updateGroupByInvoice',
          expect.objectContaining({
            name: 'New Invoice',
          }),
        );
      });
    });

    describe('updateInvoice', () => {
      it('should commit update event with invoice', () => {
        actions.updateInvoice({ commit }, { _id: 'in1', name: 'Updated Invoice ' });
        expect(commit).toHaveBeenCalledWith(
          'updateInvoice',
          { _id: 'in1', name: 'Updated Invoice ' },
        );
      });
    });

    describe('removeInvoice', () => {
      it('should commit remove event with invoice id', () => {
        actions.removeInvoice({ commit }, 'invoice1');
        expect(commit).toHaveBeenCalledWith('removeInvoice', 'invoice1');
      });
    });
  });

  describe('getters', () => {
    describe('invoicesByGroup', () => {
      it('should list all invoices in a group', () => {
        expect(getters.invoicesByGroup(state, null, rootState, null)('group1')).toEqual([
          {
            _id: 'in1', name: 'Invoice 1', category: 'study', number: -2000, date: '2018-12-08T00:00:00.000Z', group: 'group1', user: 'dungla4',
          },
          {
            _id: 'in2', name: 'Invoice 2', category: 'study', number: -300, date: '2018-12-08T00:00:00.000Z', group: 'group1', user: 'dungla4',
          },
        ]);
      });
    });

    describe('totalIncome', () => {
      it('should return sum of all income in a group', () => {
        state.invoices = [
          {
            _id: 'in1', name: 'Invoice 1', category: 'study', number: 2000, date: '2018-12-08T00:00:00.000Z', group: 'group1', user: 'dungla4',
          },
          {
            _id: 'in2', name: 'Invoice 2', category: 'study', number: -1000, date: '2018-12-08T00:00:00.000Z', group: 'group1', user: 'dungla4',
          },
          {
            _id: 'in3', name: 'Invoice 3', category: 'study', number: 3000, date: '2018-12-08T00:00:00.000Z', group: 'group1', user: 'dungla4',
          },
        ];
        expect(getters.totalIncome(state, null, rootState, null)('group1')).toEqual(5000);
      });

      it('should return 0 if no group', () => {
        expect(getters.totalIncome(state, null, rootState, null)('not-existed-group')).toEqual(0);
      });

      it('should return 0 if no income', () => {
        expect(getters.totalIncome(state, null, rootState, null)('group1')).toEqual(0);
      });
    });

    describe('totalOutcome', () => {
      it('should return sum of all outcome in a group', () => {
        expect(getters.totalOutcome(state, null, rootState, null)('group1')).toEqual(-2300);
      });

      it('should return 0 if no group', () => {
        expect(getters.totalOutcome(state, null, rootState, null)('not-existed-group')).toEqual(0);
      });

      it('should return 0 if no outcome', () => {
        state.invoices = [
          {
            _id: 'in1', name: 'Invoice 1', category: 'study', number: 2000, date: '2018-12-08T00:00:00.000Z', group: 'group1', user: 'dungla4',
          },
        ];
        expect(getters.totalOutcome(state, null, rootState, null)('group1')).toEqual(0);
      });
    });

    describe('summaryByCategories', () => {
      it('should calculate outcome by categories', () => {
        const vuexGetters = {
          invoicesByGroup: jest.fn().mockReturnValue([
            {
              _id: 'in1', name: 'Invoice 1', category: 'study', number: -2000, date: '2018-12-08T00:00:00.000Z', group: 'group1', user: 'dungla4',
            },
            {
              _id: 'in2', name: 'Invoice 2', category: 'study', number: -300, date: '2018-12-08T00:00:00.000Z', group: 'group1', user: 'dungla4',
            },
            {
              _id: 'in3', name: 'Invoice 3', category: 'market', number: -2500, date: '2018-12-08T00:00:00.000Z', group: 'group1', user: 'dungla4',
            },
            {
              _id: 'in4', name: 'Invoice 4', category: 'salary', number: 5000, date: '2018-12-08T00:00:00.000Z', group: 'group1', user: 'dungla4',
            },
          ]),
        };
        expect(getters.summaryByCategories(state, vuexGetters, rootState, null)('group1')).toEqual([
          { name: 'salary', amount: 5000 },
          { name: 'market', amount: -2500 },
          { name: 'study', amount: -2300 },
        ]);
      });
    });

    describe('categories', () => {
      beforeEach(() => {
        state.invoices = [
          {
            _id: 'in1', name: 'Invoice 1', category: 'study', number: -2000, date: '2018-12-08T00:00:00.000Z', group: 'group1', user: 'dungla4',
          },
          {
            _id: 'in2', name: 'Invoice 2', category: 'study', number: -300, date: '2018-12-08T00:00:00.000Z', group: 'group1', user: 'dungla4',
          },
          {
            _id: 'in3', name: 'Invoice 3', category: 'market', number: -425, date: '2018-12-08T00:00:00.000Z', group: 'group2', user: 'dungla4',
          },
          {
            _id: 'in4', name: 'Invoice 4', category: 'electric', number: -1830, date: '2018-12-08T00:00:00.000Z', group: 'group2', user: 'dungla4',
          },
          {
            _id: 'in5', name: 'Invoice 5', category: 'salary', number: 10000, date: '2018-12-08T00:00:00.000Z', group: 'group1', user: 'dungla4',
          },
          {
            _id: 'in6', name: 'Invoice 6', category: 'extra', number: 5000, date: '2018-12-08T00:00:00.000Z', group: 'group2', user: 'dungla4',
          },
        ];
      });

      it('should return all income categories', () => {
        expect(getters.categories(state, null, rootState, null)('group1', 'in')).toEqual(['salary']);
        expect(getters.categories(state, null, rootState, null)('group2', 'in')).toEqual(['extra']);
      });

      it('should return all outcome categories', () => {
        expect(getters.categories(state, null, rootState, null)('group1', 'out')).toEqual(['study']);
        expect(getters.categories(state, null, rootState, null)('group2', 'out')).toEqual(['market', 'electric']);
      });
    });
  });
});
