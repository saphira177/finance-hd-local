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

<script>
/* @flow */
import { displayMoney } from '@/utils/decorators';

const t = (a: number): number => 'a';

export default {
  props: {
    item: {
      type: Object,
      default: () => ({}),
    },
    outcomes: {
      type: Object,
      defaut: () => ({}),
    },
  },
  methods: {
    toCurrency(outcome) {
      return displayMoney(outcome);
    },
  },
};
</script>
