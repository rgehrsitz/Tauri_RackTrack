import { Equipment } from '../models/equipment';
import { textualDiff, graphicalDiff } from './diff';
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
                // Mock Date
                jest.spyOn(Date, 'now').mockImplementationOnce(() => new Date('2023-09-08T19:00:13.958Z').valueOf());

                // Create two identical Equipment objects
                const equipment1 = new Equipment('Server1', 'Server', '', {}, []);
                const equipment2 = new Equipment('Server1', 'Server', '', {}, []);

                // Log the objects for debugging
                console.log('equipment1:', JSON.stringify(equipment1, null, 2));
                console.log('equipment2:', JSON.stringify(equipment2, null, 2));

                // Perform the diff
                const diff = graphicalDiff(equipment1, equipment2);

                // Log the diff for debugging
                console.log('diff:', JSON.stringify(diff, null, 2));

                // Expect the diff to be an empty object
                expect(diff).toEqual({});
            });

            // Add more tests here
        });
    });


    afterAll(() => {
        jest.restoreAllMocks();
    });
});
