import { Equipment } from '../models/equipment';
import { textualDiff, graphicalDiff } from './diff';
import { uuid } from 'uuidv4';
jest.mock('uuidv4');


jest.mock('uuidv4', () => ({
    uuid: jest.fn(() => 'fixed-uuid'),
}));

Date.now = jest.fn(() => 1631294163057); // fixed date


describe('Diff Module', () => {
    let equipment1: Equipment;
    let equipment2: Equipment;

    beforeEach(() => {
        equipment1 = new Equipment('Server1', 'Server');
        equipment2 = new Equipment('Server1', 'Server');
    });

    // Textual Diff Tests
    describe('textualDiff', () => {
        it('should return an empty string when both Equipment objects are identical', () => {
            const diff = textualDiff(equipment1, equipment2);
            expect(diff).toBe('');
        });

        // Add more tests here
    });

    describe('Diff Module', () => {
        describe('graphicalDiff', () => {
            it('should return an empty object when both Equipment objects are identical', () => {
                // Mock Date and uuid
                jest.spyOn(Date, 'now').mockImplementationOnce(() => new Date('2023-09-07T23:10:28.556Z').valueOf());
                (uuid as jest.Mock).mockReturnValueOnce('fixed-uuid');

                // Create equipment1
                const equipment1 = new Equipment('Server1', 'Server');

                // Create a JSON string from equipment1
                const jsonString = JSON.stringify(equipment1);

                // Create equipment2 from the JSON string
                const equipment2 = Equipment.fromJSON(jsonString);

                // Log both objects to debug
                console.log(JSON.stringify(equipment1, null, 2));
                console.log(JSON.stringify(equipment2, null, 2));

                // Perform the diff
                const diff = graphicalDiff(equipment1, equipment2);

                // Expect the diff to be an empty object
                expect(diff).toEqual({});
            });

            // Add more tests here
        });
    });
});
