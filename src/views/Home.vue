<template>
  <GroupList :items="allGroups"/>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { Getter } from 'vuex-class';
import { mapGetters } from 'vuex';
import GroupList from '../components/GroupList.vue';

const namespace = 'groups';

@Component({
  components: {
    GroupList,
  },
})
export default class Home extends Vue {
  @Getter('allGroups') allGroups!: Array<Group>;
}
</script>
