<template>
  <nav class="left-nav-bar">
    <ul>
      <li><router-link to="/equipment">Equipment</router-link></li>
      <li><router-link to="/diff">Diff</router-link></li>
      <li><router-link to="/git">Git Functions</router-link></li>
      <li><router-link to="/file">File Operations</router-link></li>
      <li><router-link to="/settings">Settings</router-link></li>
      <li><router-link to="/search">Search</router-link></li>
      <li><router-link to="/library">Component Library</router-link></li>
      <li><router-link to="/reports">Reports</router-link></li>
    </ul>
  </nav>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'LeftNavBar',
  methods: {
    navigateTo(section: string) {
      // Implement navigation logic here
      console.log(`Navigating to ${section}`);
    },
  },
});
</script>

<style scoped>
.left-nav-bar {
  width: 200px;
  background-color: #f1f1f1;
  position: fixed;
  height: 100%;
}

.left-nav-bar ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
}

.left-nav-bar ul li {
  text-align: center;
  padding: 8px;
  text-decoration: none;
}

.left-nav-bar ul li a {
  display: block;
  color: #000;
  padding: 8px 16px;
  text-decoration: none;
}

/* Change the link color on hover */
.left-nav-bar ul li a:hover {
  background-color: #575757;
  color: white;
}
</style>
