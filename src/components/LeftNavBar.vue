<template>
  <v-navigation-drawer app>
    <v-list>
      <v-list-item v-for="route in routes" :key="route.name" :to="route.path">
        <template v-slot:prepend>
          <v-icon>{{ route.icon }}</v-icon>
        </template>
        <v-list-item-title>{{ route.name }}</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'LeftNavBar',
  setup() {
    const routes = ref([
      { path: '/', name: 'MainContent', icon: 'mdi-home' },
      { path: '/equipment', name: 'EquipmentList', icon: 'mdi-server' },
      { path: '/diff', name: 'DiffView', icon: 'mdi-diff' },
      { path: '/git', name: 'GitFunctions', icon: 'mdi-git' },
      { path: '/file', name: 'FileFunctions', icon: 'mdi-file' },
      { path: '/settings', name: 'Settings', icon: 'mdi-cog' },
    ]);

    return {
      routes,
    };
  },
});
</script>

<style scoped>
/* Add your styles here */
</style>
