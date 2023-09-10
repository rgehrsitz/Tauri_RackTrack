<template>
    <div class="miller-columns">
      <div v-for="(column, index) in columns" :key="index" class="column">
        <div
          v-for="item in column"
          :key="item.uuid"
          @click="selectItem(item, index)"
          class="item"
        >
          {{ item.name }}
        </div>
      </div>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent, ref } from "vue";
  import { Equipment } from "../backend/models/equipment";
  
  export default defineComponent({
    props: {
      rootEquipment: {
        type: Object as () => Equipment,
        required: true,
      },
    },
    setup(props) {
      const columns = ref<Equipment[][]>([[props.rootEquipment]]);
  
      const selectItem = (item: Equipment, columnIndex: number) => {
        // Remove columns after the selected one
        columns.value = columns.value.slice(0, columnIndex + 1);
  
        // Add a new column if the selected item has children
        if (item.children.length > 0) {
          columns.value.push(item.children);
        }
      };
  
      return {
        columns,
        selectItem,
      };
    },
  });
  </script>
  
  <style scoped>
  .miller-columns {
    display: flex;
    overflow-x: auto;
  }
  .column {
    min-width: 200px;
    border-right: 1px solid #ccc;
  }
  .item {
    padding: 10px;
    cursor: pointer;
    &:hover {
      background-color: #f0f0f0;
    }
  }
  </style>
  