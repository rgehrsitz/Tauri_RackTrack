<template>
  <div>
    <h1>File Operations</h1>
    <button @click="createNewFile">Create New File</button>
    <button @click="openFile">Open File</button>
    <button @click="saveFile">Save File</button>
    <button @click="saveAs">Save As</button>
    <button @click="saveCopyAs">Save a Copy As</button>
    <pre>{{ fileContent }}</pre>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { dialog } from '@tauri-apps/api';
import { useEquipmentStore } from '../stores/equipmentStore';
import { Equipment } from '../backend/models/equipment';
import { FileService } from '../backend/services/fileService';

const fileContent = ref<string | null>(null);
const equipmentStore = useEquipmentStore();

const createNewFile = () => {
  // Open a modal or form to get the necessary information from the user
  // For simplicity, we'll just set a default content here
  fileContent.value = JSON.stringify({ message: 'Hello, world!' }, null, 2);
};

async function openDialog (): Promise<string | null> {
  try {
    const result = await dialog.open({
      defaultPath: '.', // This can be any default directory you want
      filters: [
        { name: 'JSON Files', extensions: ['json'] },
        { name: 'All Files', extensions: ['*'] }
      ],
      multiple: false,
      directory: false
    });

    if (result && (Array.isArray(result) ? result.length > 0 : result.length !== 0)) {
      return Array.isArray(result) ? result[0] : result;
    }

  } catch (error) {
    console.error('Error opening file dialog:', error);
  }
  return null;
}


const openFile = async () => {
  const selectedFilePath = await openDialog();
  if (selectedFilePath) {
    console.log('Selected file path:', selectedFilePath);
    const normalizedFilePath = normalizeFilePath(selectedFilePath);
    console.log('Normalized file path:', normalizedFilePath);
    const content = await FileService.openFile(normalizedFilePath);
    if (content) {
      fileContent.value = JSON.stringify(content, null, 2);
      const rootEquipment = Equipment.fromJSON(fileContent.value);
      equipmentStore.setRootEquipment(rootEquipment);
    }
  }


};

const saveFile = async () => {
  if (fileContent.value) {
    const filePath = await dialog.save();
    if (filePath) {
      const content = JSON.parse(fileContent.value);
      await FileService.saveFile(filePath, content);
      const rootEquipment = Equipment.fromJSON(fileContent.value);
      equipmentStore.setRootEquipment(rootEquipment);
    }
  }
};

const saveAs = async () => {
  const filePath = await dialog.save();
  if (filePath && fileContent.value) {
    const content = JSON.parse(fileContent.value);
    await FileService.saveFile(filePath, content);
  }
};

const saveCopyAs = async () => {
  const filePath = await dialog.save();
  if (filePath && fileContent.value) {
    const content = JSON.parse(fileContent.value);
    await FileService.saveFile(filePath, content);
  }
};

function normalizeFilePath (filePath: string): string {
  return filePath.replace(/\\\\/g, '/');
}

</script>

<style scoped>
/* Add your styles here */
</style>
