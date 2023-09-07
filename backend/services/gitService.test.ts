import { GitService } from './gitService';
import simpleGit, { SimpleGit } from 'simple-git';

// Mock simple-git module
jest.mock('simple-git', () => {
    return jest.fn().mockImplementation(() => {
        return {
            init: jest.fn(),
            add: jest.fn(),
            commit: jest.fn(),
            diff: jest.fn().mockResolvedValue('mock-diff'),
        };
    });
});


describe('GitService', () => {
    let gitService: GitService;
    let mockSimpleGit: jest.Mocked<SimpleGit>;

    beforeEach(() => {
        mockSimpleGit = simpleGit() as jest.Mocked<SimpleGit>;
        console.log("Mock SimpleGit:", mockSimpleGit);  // Debug log
        gitService = new GitService('mock/directory');
    });


    it('should initialize a new Git repository', async () => {
        await gitService.initRepo();
        expect(mockSimpleGit.init).toHaveBeenCalled();
    });

    it('should commit changes to the repository', async () => {
        await gitService.commitChanges('Initial commit');
        expect(mockSimpleGit.add).toHaveBeenCalledWith('./*');
        expect(mockSimpleGit.commit).toHaveBeenCalledWith('Initial commit');
    });

    it('should perform a diff between two commits', async () => {
        mockSimpleGit.diff.mockResolvedValue('mock-diff');
        const diff = await gitService.diffCommits('hash1', 'hash2');
        expect(diff).toBe('mock-diff');
        expect(mockSimpleGit.diff).toHaveBeenCalledWith(['hash1', 'hash2']);
    });

    // Additional tests can be added here
});
