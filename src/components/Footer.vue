<template>
  <v-footer app color="secondary" dark>
    <v-container>
      <v-row>
        <v-col cols="12">
          <div class="text-center">
            © RackTrack - {{ new Date().getFullYear() }}
          </div>
        </v-col>
      </v-row>
    </v-container>
  </v-footer>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Footer',
  // Add any component-specific logic here
});
</script>

<style scoped>
/* Add any additional styling here */
</style>
