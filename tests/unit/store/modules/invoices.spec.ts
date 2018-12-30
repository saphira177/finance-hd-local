import { findIndex, map } from 'lodash';
import {
  getters,
  mutations,
} from '@/store/modules/invoices';

describe('invoices module', () => {
  let state: InvoiceState;

  beforeEach(() => {
    state = {
      invoices: [
        {
          _id: 'in1', name: 'Invoice 1', category: 'study', type: 'out', number: 2000, date: '2018-12-08T00:00:00.000Z', group: 'group1', user: 'dungla4',
        },
        {
          _id: 'in2', name: 'Invoice 2', category: 'study', type: 'out', number: 300, date: '2018-12-08T00:00:00.000Z', group: 'group1', user: 'dungla4',
        },
        {
          _id: 'in3', name: 'Invoice 3', category: 'market', type: 'out', number: 425, date: '2018-12-08T00:00:00.000Z', group: 'group2', user: 'dungla4',
        },
        {
          _id: 'in4', name: 'Invoice 4', category: 'electric', type: 'out', number: 1830, date: '2018-12-08T00:00:00.000Z', group: 'group2', user: 'dungla4',
        },
      ],
    };
  });

  describe('mutations', () => {
    describe('add', () => {
      it('should add new item to invoices', () => {
        mutations.add(state, { _id: 'newInvoice' });
        expect(state.invoices).toHaveLength(5);
      });
    });

    describe('update', () => {
      it('should update existing item', () => {
        mutations.update(state, { _id: 'in2', name: 'Updated invoice 2' });
        expect(state.invoices[1]).toEqual({
          _id: 'in2', name: 'Updated invoice 2', category: 'study', type: 'out', number: 300, date: '2018-12-08T00:00:00.000Z', group: 'group1', user: 'dungla4',
        });
      });

      it('should not update if non-existing item', () => {
        mutations.update(state, { _id: 'in0', name: 'Updated invoice 0' });
        expect(findIndex(state.invoices, { name: 'Updated invoice 0' })).toEqual(-1);
      });

      it('should not update if missing _id field', () => {
        mutations.update(state, { name: 'Updated invoice 0' });
        expect(findIndex(state.invoices, { name: 'Updated invoice 0' })).toEqual(-1);
      });
    });

    describe('remove', () => {
      it('should remove invoice by id', () => {
        mutations.remove(state, 'in3');
        expect(state.invoices).toHaveLength(3);
        expect(map(state.invoices, '_id')).toEqual(['in1', 'in2', 'in4']);
      });
    });
  });

  describe('getters', () => {
    describe('invoicesByGroup', () => {
      it('should list all invoices in a group', () => {
        // @ts-ignore
        expect(getters.invoicesByGroup(state)('group1')).toEqual([
          {
            _id: 'in1', name: 'Invoice 1', category: 'study', type: 'out', number: 2000, date: '2018-12-08T00:00:00.000Z', group: 'group1', user: 'dungla4',
          },
          {
            _id: 'in2', name: 'Invoice 2', category: 'study', type: 'out', number: 300, date: '2018-12-08T00:00:00.000Z', group: 'group1', user: 'dungla4',
          },
        ]);
      });
    });

    describe('totalIncome', () => {
      it('should return sum of all income in a group', () => {
        state.invoices = [
          {
            _id: 'in1', name: 'Invoice 1', category: 'study', type: 'in', number: 2000, date: '2018-12-08T00:00:00.000Z', group: 'group1', user: 'dungla4',
          },
          {
            _id: 'in2', name: 'Invoice 2', category: 'study', type: 'out', number: 1000, date: '2018-12-08T00:00:00.000Z', group: 'group1', user: 'dungla4',
          },
          {
            _id: 'in3', name: 'Invoice 3', category: 'study', type: 'in', number: 3000, date: '2018-12-08T00:00:00.000Z', group: 'group1', user: 'dungla4',
          },
        ];
        // @ts-ignore
        expect(getters.totalIncome(state)('group1')).toEqual(5000);
      });

      it('should return 0 if no group', () => {
        // @ts-ignore
        expect(getters.totalIncome(state)('not-existed-group')).toEqual(0);
      });

      it('should return 0 if no income', () => {
        // @ts-ignore
        expect(getters.totalIncome(state)('group1')).toEqual(0);
      });
    });

    describe('totalOutcome', () => {
      it('should return sum of all outcome in a group', () => {
        // @ts-ignore
        expect(getters.totalOutcome(state)('group1')).toEqual(2300);
      });

      it('should return 0 if no group', () => {
        // @ts-ignore
        expect(getters.totalOutcome(state)('not-existed-group')).toEqual(0);
      });

      it('should return 0 if no outcome', () => {
        state.invoices = [
          {
            _id: 'in1', name: 'Invoice 1', category: 'study', type: 'in', number: 2000, date: '2018-12-08T00:00:00.000Z', group: 'group1', user: 'dungla4',
          },
        ];
        // @ts-ignore
        expect(getters.totalOutcome(state)('group1')).toEqual(0);
      });
    });

    describe('outcomeByCategory', () => {
      it('should calculate outcome by categories', () => {
        const vuexGetters = {
          invoicesByGroup: jest.fn().mockReturnValue([
            {
              _id: 'in1', name: 'Invoice 1', category: 'study', type: 'out', number: 2000, date: '2018-12-08T00:00:00.000Z', group: 'group1', user: 'dungla4',
            },
            {
              _id: 'in2', name: 'Invoice 2', category: 'study', type: 'out', number: 300, date: '2018-12-08T00:00:00.000Z', group: 'group1', user: 'dungla4',
            },
            {
              _id: 'in3', name: 'Invoice 3', category: 'market', type: 'out', number: 2500, date: '2018-12-08T00:00:00.000Z', group: 'group1', user: 'dungla4',
            },
          ]),
        };
        // @ts-ignore
        expect(getters.outcomeByCategory(state, vuexGetters)('group1')).toEqual({
          study: 2300,
          market: 2500,
        });
      });
    });
  });
});
