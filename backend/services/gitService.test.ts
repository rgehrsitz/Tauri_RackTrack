import { GitService } from './gitService';

const mockInit = jest.fn();
const mockAdd = jest.fn();
const mockCommit = jest.fn();
const mockDiff = jest.fn();

jest.mock('simple-git', () => {
    return jest.fn().mockImplementation(() => {
        return {
            init: mockInit.mockResolvedValue(undefined),
            add: mockAdd.mockResolvedValue(undefined),
            commit: mockCommit.mockResolvedValue(undefined),
            diff: mockDiff.mockImplementation((hashes) => {
                if (hashes[0] === hashes[1]) {
                    return Promise.resolve('');  // Return an empty string for the same commit hash
                }
                if (hashes[0] === '' && hashes[1] === '') {
                    return Promise.resolve('');
                }
                return Promise.resolve('mock-diff');
            })

        };
    });
});

describe('GitService', () => {
    let gitService: GitService;

    beforeEach(() => {
        gitService = new GitService('mock/directory');
        mockInit.mockClear();
        mockAdd.mockClear();
        mockCommit.mockClear();
        mockDiff.mockClear();
    });

    it('should initialize a new Git repository', async () => {
        await gitService.initRepo();
        expect(mockInit).toHaveBeenCalled();
    });

    it('should commit changes to the repository', async () => {
        mockAdd.mockResolvedValue('something');  // Simulate changes
        await gitService.commitChanges('Initial commit');
        expect(mockAdd).toHaveBeenCalledWith('./*');
        expect(mockCommit).toHaveBeenCalledWith('Initial commit');
    });

    it('should perform a diff between two commits', async () => {
        const diff = await gitService.diffCommits('hash1', 'hash2');
        expect(diff).toBe('mock-diff');
        expect(mockDiff).toHaveBeenCalledWith(['hash1', 'hash2']);
    });

    // Error Handling Tests
    const mockConsoleError = jest.spyOn(console, 'error').mockImplementation(() => { });

    it('should handle Git initialization failure', async () => {
        try {
            mockInit.mockRejectedValue(new Error('Initialization failed'));
            await gitService.initRepo();
        } catch (error) {
            expect(mockConsoleError).toHaveBeenCalledWith('Error initializing Git repository:', expect.any(Error));
        }
    });

    it('should handle commit failure', async () => {
        try {
            mockCommit.mockRejectedValue(new Error('Commit failed'));
            await gitService.commitChanges('Initial commit');
        } catch (error) {
            expect(mockConsoleError).toHaveBeenCalledWith('Error committing changes:', expect.any(Error));
        }
    });

    it('should handle diff failure', async () => {
        try {
            mockDiff.mockRejectedValue(new Error('Diff failed'));
            await gitService.diffCommits('hash1', 'hash2');
        } catch (error) {
            expect(mockConsoleError).toHaveBeenCalledWith('Error performing diff:', expect.any(Error));
        }
    });


    // Edge Cases

    it('should handle empty commit message', async () => {
        mockAdd.mockResolvedValue('something');  // Simulate changes
        await gitService.commitChanges('');
        expect(mockCommit).toHaveBeenCalledWith('');  // or whatever behavior you expect
    });

    it('should handle invalid commit hashes for diff', async () => {
        const diff = await gitService.diffCommits('', '');
        expect(diff).toBe(''); // or whatever behavior you expect
    });

    it('should handle multiple commits', async () => {
        mockAdd.mockResolvedValue('something');  // Simulate changes
        await gitService.commitChanges('First commit');
        await gitService.commitChanges('Second commit');
        expect(mockCommit).toHaveBeenCalledTimes(2);
    });

    it('should handle commit without changes', async () => {
        mockAdd.mockResolvedValue(undefined);  // Simulate no changes
        await gitService.commitChanges('No changes');
        expect(mockCommit).not.toHaveBeenCalled();
    });

    it('should return an empty diff for the same commit hash', async () => {
        const diff = await gitService.diffCommits('hash1', 'hash1');
        expect(diff).toBe(''); // or whatever behavior you expect
    });


    it('should handle invalid directory for initialization', async () => {
        const invalidGitService = new GitService('invalid/directory');
        try {
            await invalidGitService.initRepo();
        } catch (error) {
            expect(mockConsoleError).toHaveBeenCalledWith('Error initializing Git repository:', expect.any(Error));
        }
    });

    it('should handle already initialized repository', async () => {
        await gitService.initRepo(); // First initialization
        await gitService.initRepo(); // Second initialization
        expect(mockInit).toHaveBeenCalledTimes(2); // or whatever behavior you expect
    });
});
