<template>
  <v-data-table
    class="invoice-table"
    :headers="headers"
    :items="invoicesView"
    :expand="expand"
    :custom-sort="customSort"
    item-key="name"
  >
    <template slot="items" slot-scope="props">
      <tr @click="props.expanded = !props.expanded">
        <td>{{ props.item.name }}</td>
        <td class="text-xs-right">{{ props.item.amountView }}</td>
        <td>{{ props.item.datetimeView }}</td>
        <td>{{ props.item.category }}</td>
      </tr>
    </template>
    <template slot="expand" slot-scope="props">
      <v-card flat>
        <v-card-text>{{props.item.name}}</v-card-text>
      </v-card>
    </template>
  </v-data-table>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import moment from 'moment-timezone';
import { displayMoney } from '@/utils/decorators';

@Component
export default class InvoiceTable extends Vue {
  @Prop() public invoices!: Array<Invoice>;
  expand: boolean = false;
  headers: Array<object> = [
    { text: 'Name', value: 'name' },
    { text: 'Amount', value: 'amount' },
    { text: 'Date', value: 'date' },
    { text: 'Category', value: 'category' },
  ];

  get invoicesView() {
    return this.invoices.map(invoice => ({
      ...invoice,
      amountView: this.toCurrency(invoice.number),
      datetimeView: this.toDatetimeView(invoice.date),
    }));
  }

  public toDatetimeView(date: string): string {
    return moment(date).format('DD-MM-YYYY HH:mm');
  }

  public toCurrency(amount: number): string {
    return displayMoney(amount);
  }

  customSort(items: any, index: string, isDesc: boolean) {
    items.sort((a: any, b: any) => {
      if (index === 'amount') {
        return isDesc ? b.number - a.number : a.number - b.number;
      }
      if (index === 'date') {
        if (isDesc) {
          return a.date < b.date ? 1 : -1;
        }
        return a.date < b.date ? -1 : 1;
      }
      if (isDesc) {
        return a[index] < b[index] ? 1 : -1;
      }
      return a[index] < b[index] ? -1 : 1;
    });
    return items;
  }
}
</script>
