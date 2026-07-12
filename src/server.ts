import 'dotenv/config';
import App from './App';
import ServerErrorException from './exception/ServerErrorException';

const PORT = process.env.PORT || 3000;

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

        const server = application.getApp().listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });

        server.on('error', handleStartupError);
    } catch (error) {
        handleStartupError(error);
    }
}

void startServer();
