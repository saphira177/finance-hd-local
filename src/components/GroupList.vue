<template>
  <div>
    <v-list>
      <v-list-tile
        v-for="item in allGroups"
        :key="item._id"
        @click="showActionMenu(item._id)"
      >
        <v-list-tile-content>
          <v-list-tile-title>{{item.name}}</v-list-tile-title>
        </v-list-tile-content>
        <v-list-tile-action>
          <v-list-tile-action-text>{{toCurrency(item.available)}}</v-list-tile-action-text>
        </v-list-tile-action>
      </v-list-tile>
    </v-list>

    <v-bottom-actionMenu v-model="actionMenu">
      <v-list class="pt-0" dense>
        <v-list-tile :to="`/groups/${selectedGroup}`">
          <v-list-tile-action>
            <v-icon>visibility</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Show details</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>

        <v-list-tile disabled>
          <v-list-tile-action>
            <v-icon>edit</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Edit</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>

        <v-list-tile @click="showDeleteConfirmationDialog">
          <v-list-tile-action>
            <v-icon>delete</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Delete</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-bottom-actionMenu>

    <v-dialog
      v-model="deleteConfirmDialog"
      max-width="290"
    >
      <v-card>
        <v-card-title class="headline">Delete group</v-card-title>

        <v-card-text>
          Are you sure to delete group <b>{{selectedGroupName}}</b>?
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn
            color="green darken-1"
            flat="flat"
            @click="deleteConfirmDialog = false; actionMenu = false"
          >Cancel</v-btn>

          <v-btn
            color="green darken-1"
            flat="flat"
            @click="deleteGroup"
          >Delete</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Action, Getter } from 'vuex-class';
import { ActionMethod } from 'vuex';
import { displayMoney } from '@/utils/decorators';

@Component
export default class GroupList extends Vue {
  @Getter allGroups!: Group[];
  @Getter group!: any;
  @Action removeGroup!: ActionMethod;
  actionMenu: boolean = false;
  deleteConfirmDialog: boolean = false;
  selectedGroup: string = '';

  get groupCount() {
    return this.allGroups.length;
  }

  get selectedGroupName() {
    let name = '';
    if (this.selectedGroup) {
      const foundGroup = this.group(this.selectedGroup);
      name = foundGroup ? foundGroup.name : '';
    }
    return name;
  }

  public toCurrency(money: number) {
    return displayMoney(money);
  }

  showActionMenu(group: string) {
    this.selectedGroup = group;
    this.actionMenu = true;
  }

  showDeleteConfirmationDialog() {
    this.deleteConfirmDialog = true;
  }

  deleteGroup() {
    this.removeGroup(this.selectedGroup);
    this.deleteConfirmDialog = false;
    this.actionMenu = false;
  }
}
</script>
