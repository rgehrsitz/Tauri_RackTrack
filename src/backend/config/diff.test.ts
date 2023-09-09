import { Equipment } from '../models/equipment';
import { textualDiff, graphicalDiff } from './diff';

jest.mock('uuidv4', () => ({
    uuid: jest.fn(() => 'fixed-uuid'),
}));

jest.spyOn(Date, 'now').mockImplementation(() => 1631294163057);


describe('Diff Module', () => {
    let equipment1: Equipment;
    let equipment2: Equipment;

    beforeEach(() => {
        jest.spyOn(Date, 'now').mockImplementation(() => 1631294163057);

        equipment1 = new Equipment('Server1', 'Server');
        equipment2 = new Equipment('Server1', 'Server');
    });

    // Textual Diff Tests
    describe('textualDiff', () => {
        it('should return an empty string when both Equipment objects are identical', () => {
            const diff = textualDiff(equipment1, equipment2);
            expect(diff).toBe('');
        });

        it('should return a non-empty string when Equipment objects are different', () => {
            equipment2.updateDetails('Server2');
            const diff = textualDiff(equipment1, equipment2);
            expect(diff).not.toBe('');
        });
    });

    // Graphical Diff Tests
    describe('graphicalDiff', () => {
        it('should return an empty object when both Equipment objects are identical', () => {
            const diff = graphicalDiff(equipment1, equipment2);
            expect(diff).toEqual({});
        });

        it('should return a non-empty object when Equipment objects are different', () => {
            equipment2.updateDetails('Server2');
            const diff = graphicalDiff(equipment1, equipment2);
            expect(diff).not.toEqual({});
        });

        it('should correctly identify removed properties', () => {
            equipment1.updateDetails(undefined, undefined, undefined, { oldProp: 'oldValue' });
            const diff = graphicalDiff(equipment1, equipment2);
            expect(diff.userDefinedProperties.oldProp.status).toBe('removed');
        });

        it('should correctly identify added properties', () => {
            equipment2.updateDetails(undefined, undefined, undefined, { newProp: 'newValue' });
            const diff = graphicalDiff(equipment1, equipment2);
            if (diff && diff.userDefinedProperties && diff.userDefinedProperties['newProp__added']) {
                expect(diff.userDefinedProperties['newProp__added'].status).toBe('added');
            } else {
                fail('Diff did not detect added property');
            }
        });

        it('should correctly identify modified properties', () => {
            // Update a property in equipment1
            equipment1.updateDetails(undefined, 'New Description');

            // Generate the diff
            const diff = graphicalDiff(equipment1, equipment2);

            // Check if the status of the modified property is set to 'modified'
            expect(diff.description.status).toBe('modified');
        });

    });

    it('should correctly identify differences in nested properties', () => {

        // Add nested properties
        equipment1.userDefinedProperties = {
            serverDetails: {
                memory: '16GB',
                cpu: '2.4GHz'
            }
        };

        // Change a nested property
        equipment2.userDefinedProperties = {
            serverDetails: {
                memory: '32GB',
                cpu: '2.4GHz'
            }
        };

        // Generate diff
        const diff = graphicalDiff(equipment1, equipment2);

        // Check if nested property status is 'modified'
        expect(diff.userDefinedProperties.serverDetails.memory.status).toBe('modified');

    });



    afterEach(() => {
        jest.spyOn(Date, 'now').mockRestore();
    });
});
