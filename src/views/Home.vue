<template>
  <GroupList :items="allGroups"/>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { mapGetters } from 'vuex';
import GroupList from '../components/GroupList.vue';

@Component({
  components: {
    GroupList,
  },
  computed: {
    ...mapGetters(['allGroups']),
  },
})
export default class Home extends Vue {
  public allGroups!: Group[];
}
</script>
