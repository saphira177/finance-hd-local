<template>
  <v-app>
    <v-toolbar dark color="primary" app>
      <v-toolbar-side-icon @click="toggleMenu"></v-toolbar-side-icon>
      <v-toolbar-title class="white--text">{{title}}</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-title class="white--text">FINANCE HD</v-toolbar-title>
    </v-toolbar>
    <v-navigation-drawer v-model="open" app>
      <v-list dense class="pt-3">
        <v-list-tile
          v-for="item in menu"
          :key="item.title"
          :to="item.to"
        >
          <v-list-tile-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-tile-action>

          <v-list-tile-content>
            <v-list-tile-title>{{ item.title }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>

    <v-content>
      <v-container fluid>
        <v-fade-transition mode="out-in">
          <router-view></router-view>
        </v-fade-transition>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
export default {
  name: 'App',
  components: {
  },
  data() {
    return {
      menu: [
        { title: 'Home', icon: 'home', to: '/' },
        { title: 'Group 1', icon: 'spa', to: '/groups/group1' },
        { title: 'About', icon: 'spa', to: '/about' },
      ],
      open: false,
    };
  },
  computed: {
    title() {
      const active = this.menu.filter(item => item.to === this.$route.path);
      let title = '';
      if (active.length > 0) {
        [{ title }] = active;
      }
      return title;
    },
  },
  beforeCreate() {
    // App before
  },
  methods: {
    toggleMenu() {
      this.open = !this.open;
    },
  },
};
</script>
