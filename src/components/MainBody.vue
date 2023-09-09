<template>
  <div class="main-body">
    <h2>Welcome to RackTrack</h2>
    <p>This is the main content area. Navigate using the left sidebar to access different functionalities.</p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'MainBody',
  // Add any component-specific logic here
});
</script>

<style scoped>
.main-body {
  padding: 20px;
}
</style>
