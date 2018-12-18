/* eslint-disable no-param-reassign */
import uuidv1 from 'uuid/v1';
import _, { findIndex } from 'lodash';

export const mutations = {
  add(state, invoice) {
    state.invoices.push(invoice);
  },
  update(state, invoice) {
    const index = findIndex(state.invoices, { _id: invoice._id });
    if (index > -1) {
      const updatingInvoice = { ...state.invoices[index], ...invoice };
      state.invoices.splice(index, 1, updatingInvoice);
    }
  },
  remove(state, invoiceId) {
    state.invoices = state.invoices.filter(i => i._id !== invoiceId);
  },
};

export const actions = {
  addInvoice(context, invoice) {
    const invoiceWithId = { ...invoice, _id: uuidv1() };
    context.commit('add', invoiceWithId);
  },
  updateInvoice(context, invoice) {
    context.commit('update', invoice);
  },
  removeInvoice(context, invoiceId) {
    context.commit('remove', invoiceId);
  },
};

const calculate = (invoices, groupId, type) => _.chain(invoices)
  .filter({ group: groupId, type })
  .map('number')
  .reduce((sum, i) => sum + i)
  .value()
  || 0;

export const getters = {
  invoicesByGroup: state => groupId => state.invoices.filter(i => i.group === groupId),
  totalIncome: state => groupId => calculate(state.invoices, groupId, 'in'),
  totalOutcome: state => groupId => calculate(state.invoices, groupId, 'out'),
};

export default {
  state: {
    invoices: [
      {
        _id: 'in1', name: 'Invoice 1', category: 'study', type: 'out', number: 2000, date: '2018-12-01T09:00:00+07:00', group: 'group1', user: 'dungla4',
      },
      {
        _id: 'in2', name: 'Invoice 2', category: 'study', type: 'out', number: 300, date: '2018-12-02T09:00:00+07:00', group: 'group1', user: 'dungla4',
      },
      {
        _id: 'in3', name: 'Invoice 3', category: 'market', type: 'out', number: 425, date: '2018-12-11T09:00:00+07:00', group: 'group2', user: 'dungla4',
      },
      {
        _id: 'in4', name: 'Invoice 4', category: 'electric', type: 'out', number: 1830, date: '2018-12-17T09:00:00+07:00', group: 'group2', user: 'dungla4',
      },
      {
        _id: 'in5', name: 'Invoice 5', category: 'salary', type: 'in', number: 18000, date: '2018-12-01T08:00:00+07:00', group: 'group1', user: 'dungla4',
      },
      {
        _id: 'in6', name: 'Invoice 6', category: 'rent', type: 'in', number: 15000, date: '2018-12-04T09:00:00+07:00', group: 'group2', user: 'dungla4',
      },
    ],
  },
  mutations,
  actions,
  getters,
};
