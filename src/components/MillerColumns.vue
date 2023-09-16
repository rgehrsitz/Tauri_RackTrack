<template>
  <div class="miller-columns">
    <div v-for="(column, index) in columns" :key="index" class="column" v-show="!hiddenColumns.includes(index)"
      @click="handleColumnClick(index)">
      <div v-for="item in column" :key="item.uuid" @click="handleItemClick(item, index)" class="item">
        {{ item.name }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { Equipment } from '../backend/models/equipment';

const hiddenColumns = ref<number[]>([]); // Array to keep track of hidden columns

onMounted(() => {
  const columns = document.querySelectorAll('.column');
  let totalWidth = 0;
  columns.forEach((column, index) => {
    totalWidth += column.clientWidth;
    if (columns[0]?.parentElement?.clientWidth && totalWidth > columns[0].parentElement.clientWidth) {
      hiddenColumns.value.push(index);
    }
  });
});

const handleColumnClick = (index: number) => {
  if (hiddenColumns.value.includes(index)) {
    const clickedColumn = columns.value.splice(index, 1)[0];
    columns.value.push(clickedColumn);
    hiddenColumns.value = []; // Reset hidden columns and recalculate
  }
};

const props = defineProps<{
  rootEquipment: any;
}>();

const columns = ref([[props.rootEquipment]]);

const handleItemClick = (item: Equipment, columnIndex: number) => {
  if (item.children && item.children.length > 0) {
    columns.value = columns.value.slice(0, columnIndex + 1);
    columns.value.push(item.children);
  } else {
    columns.value = columns.value.slice(0, columnIndex + 1);
  }
};
</script>

<style scoped>
.miller-columns {
  display: flex;
  overflow: auto;
}

.column {
  border-right: 1px solid #ccc;
  padding: 10px;
  min-width: 75px;
  flex: 1 1 auto;
  /* Distributes the width equally among columns */
  max-width: 250px;
  /* Assuming a maximum of 5 columns without shrinking */
  overflow: hidden;
  /* Ensures content doesn't overflow the column */
}

/* Hide all columns except the last 5 */
/* Hide all columns except the last 5 */
.column:nth-last-child(n+6) {
  display: none;
}

/* Style to show that there are hidden columns */
.miller-columns::before {
  content: '...';
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
}

.item {
  padding: 5px;
  cursor: pointer;
  border: 1px solid transparent;
  transition: background-color 0.3s;
  white-space: nowrap;
  /* Prevents the text from wrapping to the next line */
  overflow: hidden;
  /* Hides the overflowing text */
  text-overflow: ellipsis;
  /* Adds an ellipsis (...) to the end of the overflowing text */
}

.item:hover {
  background-color: #f5f5f5;
  border: 1px solid #ccc;
}
</style>
