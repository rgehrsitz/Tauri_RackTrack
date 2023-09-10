import { defineStore } from 'pinia';
import { Equipment } from '../backend/models/equipment';

export const useEquipmentStore = defineStore({
  id: 'equipment',
  state: () => ({
    rootEquipment: null as Equipment | null,
  }),
  actions: {
    setRootEquipment(equipment: Equipment) {
      this.rootEquipment = equipment;
    },
  },
});
