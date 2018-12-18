<template>
  <v-timeline dense>
    <v-timeline-item
      v-for="item in items"
      :key="item._id"
      color="red lighten-2"
      small
    >
      <span slot="opposite">{{item.date}}</span>
      <v-card class="elevation-2">
        <v-card-title class="headline">Lorem ipsum</v-card-title>
        <v-card-text>
          Lorem ipsum dolor sit amet, no nam oblique veritus. Commune scaevola imperdiet nec ut.
        </v-card-text>
      </v-card>
    </v-timeline-item>
  </v-timeline>
</template>

<script>
// import { displayMoney } from '@/utils/decorators';

export default {
  props: ['items'],
  data() {
    return {

    };
  },
  // computed: {
  //   available() {
  //     return displayMoney(this.item.available);
  //   },
  // },
};
</script>
