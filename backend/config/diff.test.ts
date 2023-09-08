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
                expect(true).toBe(false); // Indicate that the test has failed
            }
        });

    });

    afterEach(() => {
        jest.spyOn(Date, 'now').mockRestore();
    });
});
