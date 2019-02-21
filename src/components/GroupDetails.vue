<template>
  <div class="group-details">
    <p class="title">{{item.name}} <span
      :class="['headline', item.available >= 0 ? 'blue--text' : 'red--text']"
    >{{toCurrency(item.available)}}</span></p>
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
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { displayMoney } from '@/utils/decorators';

@Component
export default class GroupDetails extends Vue {
  @Prop({
    default: () => ({ _id: '', name: '', available: -1 }),
  }) public item!: Group;
  @Prop() public categoriesAmount!: Array<CategoryAmount>;

  public toCurrency(amount: number): string {
    return displayMoney(amount);
  }
}
</script>
