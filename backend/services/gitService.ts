import simpleGit, { SimpleGit, SimpleGitOptions } from 'simple-git';

export class GitService {
    private git: SimpleGit;

    constructor(directory: string) {
        const options: Partial<SimpleGitOptions> = {
            baseDir: directory,
            binary: 'git',
            maxConcurrentProcesses: 6,
        };
        this.git = simpleGit(options);
    }


    // Initialize a new Git repository
    public async initRepo (): Promise<void> {
        try {
            console.log("Initializing repo");  // Debug log
            await this.git.init();
        } catch (error) {
            console.error('Error initializing Git repository:', error);
        }
    }

    // Commit changes to the repository
    async commitChanges (message: string): Promise<void> {
        try {
            await this.git.add('./*');
            await this.git.commit(message);
        } catch (error) {
            console.error('Error committing changes:', error);
            // Notify the user about the error
        }
    }

    // Diff between two commits
    async diffCommits (commitHash1: string, commitHash2: string): Promise<string> {
        try {
            const diff = await this.git.diff([commitHash1, commitHash2]);
            return diff;
        } catch (error) {
            console.error('Error performing diff:', error);
            // Notify the user about the error
            return '';
        }
    }
}
