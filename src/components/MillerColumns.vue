<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { Equipment } from '../backend/models/equipment';
//import { useEquipmentStore } from '../stores/equipmentStore';

const props = defineProps<{
  equipment: Equipment
}>();

//const store = useEquipmentStore();

interface Column {
  id: string;
  name: string;
  width: number;
  truncated: boolean;
}

interface BreakColumn {
  break: boolean;
}

type Columns = Column | BreakColumn;

const columns = ref<Columns[]>([]);

const truncatedText = ref('');
const hoveredColumn = ref<Column | null>(null);

const maxColumns = 10;
const columnWidth = 150;

onMounted(() => {
  calculateColumns();
});

const calculateColumns = () => {

  columns.value = [];

  const addColumn = (equipment: Equipment) => {

    const col: Column = {
      id: equipment.uuid,
      name: equipment.name,
      width: columnWidth,
      truncated: false
    };

    columns.value.push(col);

    equipment.children.forEach(addColumn);

    if (columns.value.length >= maxColumns) {
      columns.value.push({
        break: true
      });
    }

  };

  addColumn(props.equipment);

};

const handleMouseover = (column: Column) => {
  truncatedText.value = column.name;
  hoveredColumn.value = column;
}

const handleMouseleave = () => {
  truncatedText.value = '';
  hoveredColumn.value = null;
}

function isBreakColumn (column: Columns): column is BreakColumn {
  return (column as BreakColumn).break !== undefined;
}

</script>

<template>
  <v-container fluid>

    <v-row no-gutters>

      <v-col v-for="(column, index) in columns" :key="index">

        <template v-if="isBreakColumn(column)">
          <v-sheet class="text-center py-6">
            ...
          </v-sheet>
        </template>

        <template v-else>

          <div :style="{ width: column.width + 'px' }" @mouseover="handleMouseover(column)"
            @mouseleave="handleMouseleave">

            <div class="text-truncate" :title="truncatedText">
              {{ column.name }}
            </div>

            <!-- tooltip -->

          </div>

        </template>

      </v-col>

    </v-row>

  </v-container>
</template>

<style>
/* Styles */
</style>