<template>
  <v-dialog v-model="dialog" content-class="create-group-dialog">
    <v-form ref="form" lazy-validation>
      <v-card>
        <v-card-title>
          <span class="headline">Create new group</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex xs12>
                <v-text-field
                  label="Group name"
                  v-model="name"
                  :rules="nameRules"
                  required
                ></v-text-field>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" flat @click="dialog = false">Cancel</v-btn>
          <v-btn color="blue darken-1" flat @click="createGroup">Create</v-btn>
        </v-card-actions>
      </v-card>
    </v-form>
  </v-dialog>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { Action, Getter } from 'vuex-class';
import { VForm } from '@/@types/vuetify/index.d';
import { ActionMethod } from 'vuex';
import findIndex from 'lodash/findIndex';

@Component
export default class GroupDialog extends Vue {
  @Prop() groups!: Array<Group>;
  @Action addGroup!: any;
  dialog: boolean = false;
  name: string = '';
  nameRules = [
    (v: string) => !!v || 'Name is required',
    (v: string) => findIndex(this.groups, { name: v }) === -1 || 'Name is existed',
  ];

  get form() {
    return this.$refs.form as VForm;
  }

  public createGroup() {
    if (this.form.validate()) {
      const newGroup = {
        _id: this.name.toLowerCase().replace(/ /g, '_'),
        name: this.name,
        available: 0,
      };
      this.addGroup(newGroup);
      this.dialog = false;
    }
  }

  show() {
    this.form.reset();
    this.dialog = true;
  }
}
</script>
