declare module 'vue-localstorage' {
  import _Vue, { PluginFunction } from 'vue';

  export function install(Vue: typeof _Vue): void;
}
