<template>
  <div>
    <h2>Equipment List</h2>
    <MillerColumns v-if="rootEquipment" :rootEquipment="rootEquipment" />
    <div v-else>No Data Available</div>
    <v-btn @click="addEquipment">Add Equipment</v-btn>
    <v-btn @click="editEquipment">Edit Selected Equipment</v-btn>
    <v-btn @click="deleteEquipment">Delete Selected Equipment</v-btn>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import MillerColumns from './MillerColumns.vue';
import { useEquipmentStore } from '../stores/equipmentStore';

export default defineComponent({
  name: 'EquipmentList',
  components: {
    MillerColumns
  },
  setup () {
    const equipmentStore = useEquipmentStore();

    const addEquipment = () => {
      // Implement the logic to add new equipment
    };

    const editEquipment = () => {
      // Implement the logic to edit selected equipment
    };

    const deleteEquipment = () => {
      // Implement the logic to delete selected equipment
    };

    return {
      rootEquipment: equipmentStore.rootEquipment,
      addEquipment,
      editEquipment,
      deleteEquipment
    };
  }
});
</script>

<style scoped>
div {
  max-width: 100%;
  /* Ensures the EquipmentList doesn't exceed its parent's width */
  overflow-x: auto;
  /* Adds a horizontal scrollbar if the content overflows */
}
</style>
