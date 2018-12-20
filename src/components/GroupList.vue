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

<script>
import { displayMoney } from '@/utils/decorators';

export default {
  props: ['items'],
  methods: {
    toCurrency(number) {
      return displayMoney(number);
    },
  },
};
</script>
