<template>
  <GroupInvoice :items="invoicesByGroup(this.$route.params.groupId)"></GroupInvoice>
</template>

<script>
import { mapGetters } from 'vuex';
import GroupInvoice from '@/components/GroupInvoice.vue';

export default {
  components: {
    GroupInvoice,
  },
  computed: {
    ...mapGetters([
      'invoicesByGroup',
    ]),
  },
};
</script>
