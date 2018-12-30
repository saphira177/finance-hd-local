<template>
  <div>
    <p>{{item.name}} - {{toCurrency(item.available)}}</p>
    <v-list>
      <v-list-tile
        v-for="(outcome, category) in outcomes"
        :key="category"
      >
        <v-list-tile-content>
          <v-list-tile-title>{{category}}</v-list-tile-title>
        </v-list-tile-content>
        <v-list-tile-action>
          <v-list-tile-action-text>{{toCurrency(outcome)}}</v-list-tile-action-text>
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
  @Prop() public item!: Group;
  @Prop() public outcomes!: OutcomeCategories;

  public toCurrency(outcome: number): string {
    return displayMoney(outcome);
  }
}
</script>
