<template>
  <v-app>
    <v-toolbar dark color="primary" app>
      <v-toolbar-side-icon @click="toggleMenu"></v-toolbar-side-icon>
      <v-spacer></v-spacer>
      <v-toolbar-title class="white--text">FINANCE HD</v-toolbar-title>
    </v-toolbar>
    <v-navigation-drawer v-model="open" app>
      <v-list dense class="pt-3">
        <v-list-tile to="/">
          <v-list-tile-action>
            <v-icon>home</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Home</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>

        <v-list-group
          prepend-icon="event"
          no-action
        >
          <v-list-tile slot="activator">
            <v-list-tile-content>
              <v-list-tile-title>All groups</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>

          <v-list-tile
            v-for="subItem in allGroups"
            :key="subItem.name"
            :to="`/groups/${subItem._id}`"
          >
            <v-list-tile-content>
              <v-list-tile-title>{{ subItem.name }}</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list-group>

        <v-list-tile to="/about">
          <v-list-tile-action>
            <v-icon>spa</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>About</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>

    <v-speed-dial app
      fixed
      v-model="fab"
      bottom right
      direction="left"
      transition="scale-transition"
    >
      <v-btn
        slot="activator"
        v-model="fab"
        color="blue darken-2"
        dark
        fab
      >
        <v-icon>add</v-icon>
        <v-icon>close</v-icon>
      </v-btn>
      <v-btn
        fab
        dark
        small
        color="indigo"
        @click="showCreateInvoiceDialog"
      >
        <v-icon>add</v-icon>
      </v-btn>
      <v-btn
        fab
        dark
        small
        color="green"
        @click="showCreateGroupDialog"
      >
        <v-icon>event</v-icon>
      </v-btn>
    </v-speed-dial>

    <v-content>
      <v-container fluid>
        <v-fade-transition mode="out-in">
          <router-view></router-view>
        </v-fade-transition>
      </v-container>
    </v-content>
    <invoice-dialog ref="invoiceDialog"></invoice-dialog>
    <group-dialog ref="groupDialog" :groups="allGroups"></group-dialog>
  </v-app>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { Action, Getter } from 'vuex-class';
import { ActionMethod, mapGetters } from 'vuex';
import InvoiceDialog from '@/components/InvoiceDialog.vue';
import GroupDialog from '@/components/GroupDialog.vue';

@Component({
  components: {
    InvoiceDialog,
    GroupDialog,
  },
})
export default class App extends Vue {
  @Getter allGroups!: Array<Group>;
  @Action recalculateGroupAmount!: ActionMethod;
  open: boolean = false;
  fab: boolean = false;

  mounted() {
    // NOTE: Uncomment this line if want to re-calculate amount of all groups
    // this.recalculateGroupAmount();
  }

  toggleMenu() {
    this.open = !this.open;
  }

  showCreateInvoiceDialog() {
    // @ts-ignore
    this.$refs.invoiceDialog.show();
  }

  showCreateGroupDialog() {
    // @ts-ignore
    this.$refs.groupDialog.show();
  }
}
</script>

<style scoped>
</style>
