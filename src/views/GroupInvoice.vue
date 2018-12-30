<template>
  <GroupInvoice :items="invoicesByGroup(this.$route.params.groupId)"></GroupInvoice>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { Getter } from 'vuex-class';
import { mapGetters } from 'vuex';
import GroupInvoice from '@/components/GroupInvoice.vue';

@Component({
  components: {
    GroupInvoice,
  },
})
export default class GroupInvoiceView extends Vue {
  @Getter('invoicesByGroup') invoicesByGroup!: Function;
}
</script>
