<template>
  <GroupDetails
    :item="group(this.$route.params.groupId)"
    :outcomes="outcomeByCategory(this.$route.params.groupId)"
  ></GroupDetails>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { mapGetters } from 'vuex';
import GroupDetails from '@/components/GroupDetails.vue';

@Component({
  components: {
    GroupDetails,
  },
  computed: {
    ...mapGetters(['group', 'outcomeByCategory']),
  },
})
export default class Group extends Vue {
  public group!: Group;
  public outcomeByCategory: any;
}
</script>
