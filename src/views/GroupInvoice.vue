<template>
  <GroupInvoice :items="invoicesByGroup(this.$route.params.groupId)"></GroupInvoice>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { mapGetters } from 'vuex';
import GroupInvoice from '@/components/GroupInvoice.vue';

@Component({
  components: {
    GroupInvoice,
  },
  computed: {
    ...mapGetters([
      'invoicesByGroup',
    ]),
  },
})
export default class GroupInvoiceView extends Vue {
  public invoiceByGroup!: any;
}
</script>
