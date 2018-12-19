<template>
  <div>
    <p>{{item.name}} - Remains: {{outcomeCurrency(item.available)}}</p>
    <v-list>
      <v-list-tile
        v-for="(outcome, category) in outcomes"
        :key="category"
      >
        <v-list-tile-content>
          <v-list-tile-title>{{category}}</v-list-tile-title>
        </v-list-tile-content>
        <v-list-tile-action>
          <v-list-tile-action-text>{{outcomeCurrency(outcome)}}</v-list-tile-action-text>
        </v-list-tile-action>
      </v-list-tile>
    </v-list>
  </div>
</template>

<script>
import { displayMoney } from '@/utils/decorators';

export default {
  props: ['item', 'outcomes'],
  methods: {
    outcomeCurrency(outcome) {
      return displayMoney(outcome);
    },
  },
};
</script>
