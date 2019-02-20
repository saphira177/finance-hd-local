/* eslint-disable no-param-reassign */
import uuidv1 from 'uuid/v1';
import _, { findIndex, map } from 'lodash';
import {
  ActionTree,
  MutationTree,
  GetterTree,
  Module,
} from 'vuex';

const calculate = (
  invoices: Invoice[],
  group: string,
  type: IType,
  category?: string,
) => _.chain(invoices)
  .filter((invoice: Invoice) => {
    const checkNumber = type === 'in' ? invoice.number > 0 : invoice.number <= 0;
    const checkCategory = category ? invoice.category === category : true;
    return invoice.group === group && checkNumber && checkCategory;
  })
  .map('number')
  .reduce((sum, i) => sum + i)
  .value()
  || 0;

export const initState: InvoiceState = {
  invoices: [
    {
      _id: 'in1', name: 'Invoice 1', category: 'study', number: -2000, date: '2018-12-01T09:00:00+07:00', group: 'group1', user: 'anonymous',
    },
    {
      _id: 'in2', name: 'Invoice 2', category: 'study', number: -300, date: '2018-12-02T09:00:00+07:00', group: 'group1', user: 'anonymous',
    },
    {
      _id: 'in3', name: 'Invoice 3', category: 'market', number: -425, date: '2018-12-11T09:00:00+07:00', group: 'group2', user: 'anonymous',
    },
    {
      _id: 'in4', name: 'Invoice 4', category: 'electric', number: -1830, date: '2018-12-17T09:00:00+07:00', group: 'group2', user: 'anonymous',
    },
    {
      _id: 'in5', name: 'Invoice 5', category: 'salary', number: 18000, date: '2018-12-01T08:00:00+07:00', group: 'group1', user: 'anonymous',
    },
    {
      _id: 'in6', name: 'Invoice 6', category: 'rent', number: 15000, date: '2018-12-04T09:00:00+07:00', group: 'group2', user: 'anonymous',
    },
    {
      _id: 'in7', name: 'Invoice 7', category: 'market', number: -1500, date: '2018-12-04T10:00:00+07:00', group: 'group1', user: 'anonymous',
    },
  ],
};

export const mutations: MutationTree<InvoiceState> = {
  addInvoice(state, invoice: Invoice) {
    state.invoices.push(invoice);
  },
  updateInvoice(state, invoice: Invoice) {
    const index = findIndex(state.invoices, { _id: invoice._id });
    if (index > -1) {
      const updatingInvoice = { ...state.invoices[index], ...invoice };
      state.invoices.splice(index, 1, updatingInvoice);
    }
  },
  removeInvoice(state, invoiceId: string) {
    state.invoices = state.invoices.filter(i => i._id !== invoiceId);
  },
};

export const actions = {
  addInvoice(context: any, invoice: Invoice) {
    const invoiceWithId = { ...invoice, _id: uuidv1(), user: 'anonymous' };
    context.commit('addInvoice', invoiceWithId);
    context.commit('updateGroupByInvoice', invoiceWithId);
  },
  updateInvoice(context: any, invoice: any) {
    context.commit('updateInvoice', invoice);
  },
  removeInvoice(context: any, invoiceId: string) {
    context.commit('removeInvoice', invoiceId);
  },
  recalculateGroupAmount(context: any) {
    const { groups: { groups } } = context.rootState;
    const groupIds = map(groups, '_id');
    const { invoices } = context.state;
    groupIds.forEach((g) => {
      const income = calculate(invoices, g, 'in');
      const outcome = calculate(invoices, g, 'out');
      context.commit('updateGroup', {
        _id: g,
        available: income - outcome,
      });
    });
  },
};

export const getters: GetterTree<InvoiceState, RootState> = {
  invoicesByGroup: state => (group: string) => (
    state.invoices.filter(i => i.group === group)
  ),
  totalIncome: state => (group: string) => calculate(state.invoices, group, 'in'),
  totalOutcome: state => (group: string) => calculate(state.invoices, group, 'out'),
  outcomeByCategory: (state, vuexGetters: any) => (group: string) => {
    const outcomes = {};
    const invoices = vuexGetters.invoicesByGroup(group);
    const categories = _.chain(invoices)
      .map('category')
      .uniq()
      .value();
    categories.forEach((category) => {
      const outcome = _.chain(invoices)
        .filter({ category })
        .map('number')
        .reduce((sum, i) => sum + i)
        .value();
      _.set(outcomes, category, outcome);
    });
    return outcomes;
  },
  categories: state => (group: string, type: IType) => (
    _.chain(state.invoices)
      .filter((i: Invoice) => {
        const checkType = type === 'in' ? i.number > 0 : i.number <= 0;
        return i.group === group && checkType;
      })
      .map('category')
      .uniq()
      .value()
  ),
};

export default <Module<InvoiceState, RootState>> {
  state: initState,
  mutations,
  actions,
  getters,
};
