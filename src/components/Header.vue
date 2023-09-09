<template>
  <v-app-bar app color="primary" dark>
    <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
    <v-toolbar-title>RackTrack</v-toolbar-title>
    <v-spacer></v-spacer>
    <!-- Add more UI elements like menus, tabs, etc. here -->
  </v-app-bar>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'Header',
  setup() {
    const drawer = ref(false);
    return { drawer };
  },
});
</script>

<style scoped>
/* Add any additional styling here */
</style>
