<template>
  <header class="app-header">
    <div class="container">
      <h1>RackTrack</h1>
      <!-- Add more UI elements like menus, tabs, etc. here -->
    </div>
  </header>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Header',
  // Add any component-specific logic here
});
</script>

<style scoped>
.app-header {
  background-color: #333;
  color: white;
  padding: 1rem;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
}
</style>
