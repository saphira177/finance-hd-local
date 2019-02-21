<template>
  <GroupDetails
    :item="group(this.$route.params.groupId)"
    :categoriesAmount="summaryByCategories(this.$route.params.groupId)"
  ></GroupDetails>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { Getter } from 'vuex-class';
import { mapGetters } from 'vuex';
import GroupDetails from '@/components/GroupDetails.vue';

@Component({
  components: {
    GroupDetails,
  },
})
export default class Group extends Vue {
  @Getter('group') group!: Function;
  @Getter('summaryByCategories') summaryByCategories!: Function;
}
</script>
