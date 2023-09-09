<template>
  <v-navigation-drawer app color="primary" dark>
    <v-list>
      <v-list-item-group>
        <v-list-item to="/">
          <v-list-item-icon>
            <v-icon>mdi-home</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>Home</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item to="/equipment">
          <v-list-item-icon>
            <v-icon>mdi-server</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>Equipment</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item to="/diff">
          <v-list-item-icon>
            <v-icon>mdi-diff</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>Diff</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <!-- Add more navigation items here -->
      </v-list-item-group>
    </v-list>
  </v-navigation-drawer>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'LeftNavBar',
  // Add any component-specific logic here
});
</script>

<style scoped>
/* Add any additional styling here */
</style>
