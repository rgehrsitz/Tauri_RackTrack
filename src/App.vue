<template>
  <v-app>
    <Header />
    <v-main>
      <v-container fluid>
        <v-row>
          <v-col cols="3">
            <LeftNavBar />
          </v-col>
          <v-col cols="9">
            <router-view />
          </v-col>
        </v-row>
      </v-container>
    </v-main>
    <Footer />
  </v-app>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Header from './components/Header.vue';
import Footer from './components/Footer.vue';
import LeftNavBar from './components/LeftNavBar.vue';

export default defineComponent({
  name: 'App',
  components: {
    Header,
    Footer,
    LeftNavBar,
  },
});
</script>

<style scoped>
/* Add any additional styling here */
</style>
