import { Equipment } from './equipment';

describe('Equipment', () => {
    let equipment: Equipment;

    beforeEach(() => {
        equipment = new Equipment('Server1', 'Server');
    });

    it('should create a new Equipment instance', () => {
        expect(equipment).toBeInstanceOf(Equipment);
        expect(equipment.name).toBe('Server1');
        expect(equipment.type).toBe('Server');
    });

    it('should update equipment details', () => {
        equipment.updateDetails('Server2', 'New Server', 'Custom', { location: 'Room1' });
        expect(equipment.name).toBe('Server2');
        expect(equipment.description).toBe('New Server');
        expect(equipment.type).toBe('Custom');
        expect(equipment.userDefinedProperties).toEqual({ location: 'Room1' });
    });

    it('should add child equipment', () => {
        const childEquipment = new Equipment('NetworkCard1', 'NetworkCard');
        equipment.addChild(childEquipment);
        expect(equipment.children.length).toBe(1);
        expect(equipment.children[0]).toBe(childEquipment);
    });

    it('should remove child equipment by UUID', () => {
        const childEquipment = new Equipment('NetworkCard1', 'NetworkCard');
        equipment.addChild(childEquipment);
        equipment.removeChild(childEquipment.uuid);
        expect(equipment.children.length).toBe(0);
    });

    it('should serialize and deserialize to and from JSON', () => {
        const json = equipment.toJSON();
        const deserializedEquipment = Equipment.fromJSON(json);
        expect(deserializedEquipment).toBeInstanceOf(Equipment);
        expect(deserializedEquipment.uuid).toBe(equipment.uuid);
    });
});
