/* eslint-disable no-param-reassign */
import uuidv1 from 'uuid/v1';
import _, { findIndex } from 'lodash';
import {
  ActionTree,
  MutationTree,
  GetterTree,
  Module,
} from 'vuex';

export const initState: InvoiceState = {
  invoices: [
    {
      _id: 'in1', name: 'Invoice 1', category: 'study', type: 'out', number: 2000, date: '2018-12-01T09:00:00+07:00', group: 'group1', user: 'anonymous',
    },
    {
      _id: 'in2', name: 'Invoice 2', category: 'study', type: 'out', number: 300, date: '2018-12-02T09:00:00+07:00', group: 'group1', user: 'anonymous',
    },
    {
      _id: 'in3', name: 'Invoice 3', category: 'market', type: 'out', number: 425, date: '2018-12-11T09:00:00+07:00', group: 'group2', user: 'anonymous',
    },
    {
      _id: 'in4', name: 'Invoice 4', category: 'electric', type: 'out', number: 1830, date: '2018-12-17T09:00:00+07:00', group: 'group2', user: 'anonymous',
    },
    {
      _id: 'in5', name: 'Invoice 5', category: 'salary', type: 'in', number: 18000, date: '2018-12-01T08:00:00+07:00', group: 'group1', user: 'anonymous',
    },
    {
      _id: 'in6', name: 'Invoice 6', category: 'rent', type: 'in', number: 15000, date: '2018-12-04T09:00:00+07:00', group: 'group2', user: 'anonymous',
    },
    {
      _id: 'in7', name: 'Invoice 7', category: 'market', type: 'out', number: 1500, date: '2018-12-04T10:00:00+07:00', group: 'group1', user: 'anonymous',
    },
  ],
};

export const mutations: MutationTree<InvoiceState> = {
  add(state, invoice: Invoice) {
    state.invoices.push(invoice);
  },
  update(state, invoice: Invoice) {
    const index = findIndex(state.invoices, { _id: invoice._id });
    if (index > -1) {
      const updatingInvoice = { ...state.invoices[index], ...invoice };
      state.invoices.splice(index, 1, updatingInvoice);
    }
  },
  remove(state, invoiceId: string) {
    state.invoices = state.invoices.filter(i => i._id !== invoiceId);
  },
};

export const actions = {
  addInvoice(context: any, invoice: Invoice) {
    const invoiceWithId = { ...invoice, _id: uuidv1() };
    context.commit('add', invoiceWithId);
  },
  updateInvoice(context: any, invoice: any) {
    context.commit('update', invoice);
  },
  removeInvoice(context: any, invoiceId: string) {
    context.commit('remove', invoiceId);
  },
};

const calculate = (
  invoices: Invoice[],
  group: string,
  type: IType,
  category?: string,
) => _.chain(invoices)
  .filter(category ? { group, type, category } : { group, type })
  .map('number')
  .reduce((sum, i) => sum + i)
  .value()
  || 0;

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
      .filter({ type: 'out' })
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
      .filter({ group, type })
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
