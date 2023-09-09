<template>
  <div>
    <h1>File Operations</h1>
    <button @click="createNewFile">Create New File</button>
    <button @click="openFile">Open File</button>
    <button @click="saveFile">Save File</button>
    <pre>{{ fileContent }}</pre>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { FileService } from '../backend/services/fileService';

export default defineComponent({
  name: 'FileFunctions',
  setup() {
    const fileContent = ref<string | null>(null);
    const filePath = 'C:/Users/rober/Documents/racktrack/test_equipment.json'; // Replace with the actual file path

    const createNewFile = async () => {
      const content = { message: 'Hello, world!' };
      await FileService.createNewFile(filePath, content);
      fileContent.value = JSON.stringify(content, null, 2);
    };

    const openFile = async () => {
      const content = await FileService.openFile(filePath);
      if (content) {
        fileContent.value = JSON.stringify(content, null, 2);
      }
    };

    const saveFile = async () => {
      if (fileContent.value) {
        const content = JSON.parse(fileContent.value);
        await FileService.saveFile(filePath, content);
      }
    };

    return {
      fileContent,
      createNewFile,
      openFile,
      saveFile
    };
  }
});
</script>

<style scoped>
/* Add your styles here */
</style>
