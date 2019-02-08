<template>
  <v-dialog
    v-model="dialog"
  >
    <v-card>
      <v-card-title
        class="headline grey lighten-2"
        primary-title
      >
        Create new Invoice
      </v-card-title>

      <v-stepper v-model="e1" non-linear>
        <v-stepper-header>
          <v-stepper-step
            :complete="isSelectGroupComplete"
            editable
            step="1"
          >Choose group</v-stepper-step>
          <v-divider></v-divider>

          <v-stepper-step
            :complete="isNameComplete"
            :editable="isSelectGroupComplete"
            step="2"
          >Name</v-stepper-step>
          <v-divider></v-divider>

          <v-stepper-step
            :complete="isAmountComplete"
            :editable="isSelectGroupComplete"
            step="3"
          >Amount</v-stepper-step>
          <v-divider></v-divider>

          <v-stepper-step
            :complete="isCategoryComplete"
            :editable="isSelectGroupComplete"
            step="4"
          >Category</v-stepper-step>
          <v-divider></v-divider>

          <v-stepper-step
            :complete="isCategoryComplete"
            :editable="isSelectGroupComplete"
            step="5"
          >Date</v-stepper-step>
          <v-divider></v-divider>

          <v-stepper-step step="6">All information</v-stepper-step>
        </v-stepper-header>

        <v-stepper-items>
          <v-stepper-content step="1">
            <v-select
              v-model="selectedGroup"
              :items="allGroups"
              item-text="name"
              item-value="_id"
              label="Choose a group"
            ></v-select>

            <v-btn
              color="primary"
              :disabled="!selectedGroup"
              @click="e1 = 2"
            >Continue</v-btn>
          </v-stepper-content>

          <v-stepper-content step="2">
            <v-text-field
              name="Name"
              label="Name"
              v-model="invoiceName"
              :rules="[v => !!v || 'Name is required']"
            ></v-text-field>
            <v-btn
              color="primary"
              :disabled="!isNameComplete"
              @click="e1 = 3"
            >Continue</v-btn>
          </v-stepper-content>

          <v-stepper-content step="3">
            <v-card>
              <v-container grid-list-md>
                <v-layout wrap>
                  <v-flex xs12>
                    <v-text-field
                      ref="invoiceAmount"
                      label="Amount*"
                      v-model="invoiceAmount"
                      suffix="đ"
                      readonly
                      clearable
                      required
                    ></v-text-field>
                  </v-flex>
                  <v-layout justify-center wrap>
                    <v-flex xs6>
                      <v-layout wrap>
                        <v-flex v-for="i in 9" :key="i" shrink xs4>
                          <v-btn fab small @click="inputAmount(i)">{{i}}</v-btn>
                        </v-flex>
                        <v-flex shrink xs4 offset-xs4>
                          <v-btn fab small @click="inputAmount(0)">0</v-btn>
                        </v-flex>
                        <v-flex shrink xs4>
                          <v-btn fab small @click="deleteAmount">
                            <v-icon>close</v-icon>
                          </v-btn>
                        </v-flex>
                      </v-layout>
                    </v-flex>
                    <v-flex xs12>
                      <v-btn
                        :disabled="!isAmountComplete"
                        color="primary"
                        @click="e1 = 4"
                      >Continue</v-btn>
                    </v-flex>
                  </v-layout>
                </v-layout>
              </v-container>
            </v-card>
          </v-stepper-content>

          <v-stepper-content step="4">
            <v-card>
              <v-container grid-list-xs>
                <v-layout row wrap>
                  <v-flex xs12>
                    <v-switch
                      :label="`Type: ${type ? 'out' : 'in'}`"
                      v-model="type"
                    ></v-switch>
                  </v-flex>
                  <v-flex xs12>
                    <v-select
                      v-model="selectedCategory"
                      :items="listCategories"
                      label="Choose a category"
                    ></v-select>
                  </v-flex>
                  <v-flex xs12>
                    <v-btn
                      :disabled="!isCategoryComplete"
                      color="primary"
                      @click="e1 = 5"
                    >Continue</v-btn>
                  </v-flex>
                </v-layout>
              </v-container>
            </v-card>
          </v-stepper-content>

          <v-stepper-content step="5">
            <v-card>
              <v-container grid-list-xs>
                <v-layout justify-center wrap>
                  <v-flex xs12 sm6 md4>
                    <v-dialog
                      ref="dateDialog"
                      v-model="modal"
                      :return-value.sync="date"
                      persistent
                      lazy
                      full-width
                      width="290px"
                    >
                      <v-text-field
                        slot="activator"
                        v-model="date"
                        label="Select date"
                        prepend-icon="event"
                        readonly
                      ></v-text-field>
                      <v-date-picker v-model="date" scrollable>
                        <v-spacer></v-spacer>
                        <v-btn flat color="primary" @click="modal = false">Cancel</v-btn>
                        <v-btn flat color="primary" @click="$refs.dateDialog.save(date)">OK</v-btn>
                      </v-date-picker>
                    </v-dialog>
                  </v-flex>
                  <v-spacer></v-spacer>
                  <v-flex xs11 sm5>
                    <v-dialog
                      ref="timeDialog"
                      v-model="modal2"
                      :return-value.sync="time"
                      persistent
                      lazy
                      full-width
                      width="290px"
                    >
                      <v-text-field
                        slot="activator"
                        v-model="time"
                        label="Select time"
                        prepend-icon="access_time"
                        readonly
                      ></v-text-field>
                      <v-time-picker
                        v-if="modal2"
                        v-model="time"
                        format="24hr"
                        full-width
                      >
                        <v-spacer></v-spacer>
                        <v-btn flat color="primary" @click="modal2 = false">Cancel</v-btn>
                        <v-btn flat color="primary" @click="$refs.timeDialog.save(time)">OK</v-btn>
                      </v-time-picker>
                    </v-dialog>
                  </v-flex>
                  <v-flex xs12>
                    <v-btn
                      :disabled="!isAllInformationComplete"
                      color="primary"
                      @click="e1 = 6"
                    >Continue</v-btn>
                  </v-flex>
                </v-layout>
              </v-container>
            </v-card>
          </v-stepper-content>

          <v-stepper-content step="6">
            <v-card>
              <v-container grid-list-sm>
                <v-layout justify-center wrap>
                  <v-flex xs4>
                    <p>Group: {{selectedGroup}}</p>
                    <p>Amount: {{invoiceAmount}}</p>
                    <p>Category: {{selectedCategory}}</p>
                    <p>Date: {{invoiceDateTime}}</p>
                  </v-flex>
                  <v-flex xs4>
                    <v-btn
                      :disabled="!isAllInformationComplete"
                      color="primary"
                      @click="addInvoice"
                    >Complete</v-btn>
                  </v-flex>
                </v-layout>
              </v-container>
            </v-card>
          </v-stepper-content>
        </v-stepper-items>
      </v-stepper>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import {
  Component,
  Prop,
  Vue,
  Watch,
} from 'vue-property-decorator';
import { Action, Getter } from 'vuex-class';
import { VForm } from '@/@types/vuetify/index.d';
import { ActionMethod } from 'vuex';
import findIndex from 'lodash/findIndex';
import {
  formatView,
  getFromView,
  addDigit,
  deleteDigit,
} from '@/utils/numberFormat';

@Component
export default class InvoiceDialog extends Vue {
  @Prop({
    default: () => [],
  }) public allGroups!: Array<Group>;
  @Getter categories!: any;
  @Getter loading!: boolean;
  @Getter status!: IStatus;
  @Action addGroup!: ActionMethod;

  dialog: boolean = false;
  e1: string = '1';
  type: boolean = true;
  category: string = '';
  selectedGroup: string = '';
  selectedCategory: string = '';
  newGroup: string = '';
  invoiceValid: boolean = true;
  invoiceName: string = '';
  invoiceAmount: string = '';
  date = null;
  time = null;
  menu2: boolean = false;
  modal: boolean = false;
  modal2: boolean = false;

  @Watch('type')
  onTypeChanged(value: boolean, oldValue: boolean) {
    this.selectedCategory = '';
  }

  @Watch('selectedGroup')
  onGroupChanged(value: string, oldValue: string) {
    if (value !== oldValue) {
      this.selectedCategory = '';
    }
  }

  get listCategories() {
    return this.categories(this.selectedGroup, this.type ? 'out' : 'in');
  }

  get groupsCombobox() {
    return this.allGroups.map(g => ({
      text: g.name,
      value: g._id,
    }));
  }

  get invoiceForm() {
    return this.$refs.invoiceForm as VForm;
  }

  get groupBtnText() {
    let text = '';
    if (this.status === 'FINISHED' || this.status === '') {
      text = 'Continue';
    } else {
      text = 'Create';
    }
    return text;
  }

  get isSelectGroupComplete() {
    return !!this.selectedGroup;
  }

  get isNameComplete() {
    return !!this.invoiceName;
  }

  get isAmountComplete() {
    return !!this.invoiceAmount;
  }

  get isCategoryComplete() {
    return !!this.selectedCategory;
  }

  get invoiceDateTime() {
    return (this.date && this.time) ? `${this.date} ${this.time}` : '';
  }

  get isDateComplete() {
    return !!this.invoiceDateTime;
  }

  get isAllInformationComplete() {
    return this.isSelectGroupComplete
      && this.isNameComplete
      && this.isAmountComplete
      && this.isCategoryComplete
      && this.isDateComplete;
  }

  isExistedGroup(id: string) {
    return findIndex(this.allGroups, { _id: id }) > -1;
  }

  selectGroup(groupId: string) {
    this.selectedGroup = groupId;
    this.e1 = '2';
  }

  createGroup() {
    this.addGroup({
      _id: this.newGroup.toLowerCase().replace(/ /g, '_'),
      name: this.newGroup,
      available: 0,
    });
  }

  inputAmount(val: number) {
    const amount = getFromView(this.invoiceAmount);
    const newAmount = addDigit(amount, val);
    this.invoiceAmount = formatView(newAmount);
  }

  deleteAmount() {
    const amount = getFromView(this.invoiceAmount);
    const newAmount = deleteDigit(amount);
    this.invoiceAmount = formatView(newAmount);
  }

  complete() {
    this.dialog = false;
  }

  cancel() {
    this.dialog = false;
  }

  next() {
    if (this.invoiceForm.validate()) {
      console.log('OK');
      console.log(`name: ${this.invoiceName}`);
      this.e1 = '3';
    }
  }

  show() {
    this.e1 = '1';
    this.type = true;
    this.category = '';
    this.selectedGroup = '';
    this.dialog = true;
    // this.invoiceForm.reset();
  }
}
</script>
