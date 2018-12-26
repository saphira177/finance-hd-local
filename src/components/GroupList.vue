<template>
  <v-list>
    <v-list-tile
      v-for="item in items"
      :key="item._id"
      :to="`/groups/${item._id}`"
    >
      <v-list-tile-content>
        <v-list-tile-title>{{item.name}}</v-list-tile-title>
      </v-list-tile-content>
      <v-list-tile-action>
        <v-list-tile-action-text>{{toCurrency(item.available)}}</v-list-tile-action-text>
      </v-list-tile-action>
    </v-list-tile>
  </v-list>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { displayMoney } from '@/utils/decorators';

@Component
export default class GroupList extends Vue {
  @Prop() public items: Group[] = [];

  public toCurrency(money: number) {
    return displayMoney(money);
  }
};
</script>
