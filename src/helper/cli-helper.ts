import * as readline from 'readline';

export class CLIHelper {
    private closed = false;
    private rl;

    constructor() {
        this.rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout,
        });

        process.on('SIGINT', () => this.close());
        process.on('SIGTERM', () => this.close());
    }

    question(text: string): Promise<string> {
        return new Promise(resolve => {
            this.rl.question(text, answer => {
                resolve(answer);
            });
        });
    }

    close(): void {
        if (!this.closed) {
            this.closed = true;
            this.rl.close();
            // process.exit(); // TODO: uncomment
        }
    }
}
