<template>
  <div class="group-details">
    <p class="title">{{group.name}} <span
      :class="['headline', group.available >= 0 ? 'blue--text' : 'red--text']"
    >{{toCurrency(group.available)}}</span></p>
    <v-list>
      <v-list-tile
        v-for="category in categoriesAmount"
        :key="category.name"
      >
        <v-list-tile-content>
          <v-list-tile-title>{{category.name}}</v-list-tile-title>
        </v-list-tile-content>
        <v-list-tile-action>
          <v-list-tile-action-text
             :class="[category.amount >= 0 ? 'blue--text' : 'red--text']"
          >{{toCurrency(category.amount)}}</v-list-tile-action-text>
        </v-list-tile-action>
      </v-list-tile>
    </v-list>
    <p class="headline mt-5">List invoices</p>
    <invoice-table :invoices="invoicesByGroup(group._id)" />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { Getter } from 'vuex-class';
import { displayMoney } from '@/utils/decorators';
import InvoiceTable from './InvoiceTable.vue';

@Component({
  components: {
    InvoiceTable,
  },
})
export default class GroupDetails extends Vue {
  @Prop({
    default: () => ({ _id: '', name: '', available: -1 }),
  }) public group!: Group;
  @Prop() public categoriesAmount!: Array<CategoryAmount>;
  @Getter invoicesByGroup!: any;

  public toCurrency(amount: number): string {
    return displayMoney(amount);
  }
}
</script>
