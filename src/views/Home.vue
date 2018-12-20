<template>
  <GroupList :items="allGroups"/>
</template>

<script>
import { mapGetters } from 'vuex';
import GroupList from '../components/GroupList.vue';

export default {
  components: {
    GroupList,
  },
  computed: {
    ...mapGetters(['allGroups']),
  },
};
</script>
