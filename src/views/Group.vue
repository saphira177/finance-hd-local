<template>
  <GroupDetails
    :item="group(this.$route.params.groupId)"
    :outcomes="outcomeByCategory(this.$route.params.groupId)"
  ></GroupDetails>
</template>

<script>
import { mapGetters } from 'vuex';
import GroupDetails from '@/components/GroupDetails.vue';

export default {
  components: {
    GroupDetails,
  },
  computed: {
    ...mapGetters([
      'group',
      'outcomeByCategory',
    ]),
  },
};
</script>
