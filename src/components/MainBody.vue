<template>
  <div class="main-body">
    <router-view></router-view>
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
.main-content {
  margin-left: 200px; /* Same as the width of the left nav bar */
  padding: 16px;
}
</style>
