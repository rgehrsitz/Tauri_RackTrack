<template>
  <div class="miller-columns">
    <div v-if="rootEquipment" v-for="(column, index) in displayedColumns.slice(0, 3)" :key="index" class="column">
      <div v-for="item in column" :key="item.uuid" @click="selectItem(item, index)" class="item" v-tooltip="item.name">
        {{ item.name }}
      </div>
    </div>

    <div v-if="displayedColumns.length > 6" class="column-hidden-indicator">
      ...
    </div>

    <div v-if="rootEquipment" v-for="(column, index) in displayedColumns.slice(-3)" :key="index" class="column">
      <div v-for="item in column" :key="item.uuid" class="item" v-tooltip="item.name">
        {{ item.name }}
      </div>
    </div>

    <div v-else class="empty-column">
      No file open.
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { Equipment } from "../backend/models/equipment"

const rootEquipment = ref<Equipment | null>(null)
const actualColumns = ref<Equipment[][]>([])
const columns = computed(() => rootEquipment.value ? [[rootEquipment.value]] : [])

watch(columns, (newVal) => {
  actualColumns.value = newVal
})

const displayedColumns = computed(() => {
  // Logic to determine which columns to display based on actualColumns.value
  return actualColumns.value
})

const selectItem = (item: Equipment, columnIndex: number) => {
  // Logic to handle item selection and column display
  if (item.children && item.children.length > 0) {
    actualColumns.value = actualColumns.value.slice(0, columnIndex + 1).concat([item.children])
  } else {
    actualColumns.value = actualColumns.value.slice(0, columnIndex + 1)
  }
}
</script>

<style scoped>
/* ... (existing styles) */

.item {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 200px;
}

.empty-column {
  padding: 20px;
  text-align: center;
  color: #aaa;
}
</style>
