import 'dotenv/config';
import App from './App';
import ServerErrorException from './exception/ServerErrorException';
import { config } from './config';


function handleStartupError(error: unknown): never {
    const message = error instanceof Error ? error.message : String(error);

    console.error('Failed to start application:', error);
    new ServerErrorException(message).logErrorToFile();

    process.exit(1);
}

async function startServer(): Promise<void> {
    try {
        const application = new App();
        await application.initialize();

        const server = application.getApp().listen(config.port, () => {
            console.log(`Server running on port ${config.port}`);
        });

        server.on('error', handleStartupError);
    } catch (error) {
        handleStartupError(error);
    }
}

void startServer();
