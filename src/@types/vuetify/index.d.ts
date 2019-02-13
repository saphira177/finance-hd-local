import Vue from 'vue';

export declare interface VForm extends Vue {
  validate: () => boolean,
  reset: () => void,
}
