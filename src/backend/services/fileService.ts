// Import Tauri's fs module
import { fs } from '@tauri-apps/api';

export class FileService {
    // Create a new JSON file
    static async createNewFile (filePath: string, content: object): Promise<void> {
        try {
            await fs.writeFile({
                path: filePath,
                contents: JSON.stringify(content, null, 2)
            });
        } catch (error) {
            console.error('Error creating new file:', error);
            // Notify the user about the error
        }
    }

    // Open an existing JSON file
    static async openFile (filePath: string): Promise<object | null> {
        try {
            const fileContents = await fs.readTextFile(filePath);
            return JSON.parse(fileContents);
        } catch (error) {
            console.error('Error opening file:', error);
            // Notify the user about the error
            return null;
        }
    }

    // Save changes to JSON file
    static async saveFile (filePath: string, content: object): Promise<void> {
        try {
            await fs.writeFile({
                path: filePath,
                contents: JSON.stringify(content, null, 2)
            });
        } catch (error) {
            console.error('Error saving file:', error);
            // Notify the user about the error
        }
    }

    // Close the JSON file (optional, as Tauri manages file resources)
    static closeFile (): void {
        // Tauri automatically manages file resources, so this is optional
    }
}
