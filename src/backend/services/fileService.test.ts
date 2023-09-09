import { FileService } from './fileService';
import { fs } from '@tauri-apps/api'; // Mock this import


// Mock Tauri's fs module
jest.mock('@tauri-apps/api', () => ({
    fs: {
        writeFile: jest.fn(),
        readTextFile: jest.fn(),
    },
}));

describe('FileService', () => {
    const mockFilePath = 'mock/path/to/file.json';
    const mockContent = { key: 'value' };

    it('should create a new JSON file', async () => {
        await FileService.createNewFile(mockFilePath, mockContent);
        expect(fs.writeFile).toHaveBeenCalledWith({
            path: mockFilePath,
            contents: JSON.stringify(mockContent, null, 2),
        });
    });

    it('should open an existing JSON file', async () => {
        (fs.readTextFile as jest.Mock).mockResolvedValue(JSON.stringify(mockContent));
        const content = await FileService.openFile(mockFilePath);
        expect(content).toEqual(mockContent);
    });

    it('should save changes to a JSON file', async () => {
        await FileService.saveFile(mockFilePath, mockContent);
        expect(fs.writeFile).toHaveBeenCalledWith({
            path: mockFilePath,
            contents: JSON.stringify(mockContent, null, 2),
        });
    });

    // Additional tests can be added here
});
