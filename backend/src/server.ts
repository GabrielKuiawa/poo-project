import "dotenv/config";
import App from "./App";
import { config } from "./config";
import { logger } from "./utils/Logger";

function handleStartupError(error: unknown): never {
  const message = error instanceof Error ? error.message : String(error);

  logger.error("Failed to start application", {
    errorName: error instanceof Error ? error.name : typeof error,
    errorMessage: message,
    stack: error instanceof Error ? error.stack : undefined,
  });

  process.exit(1);
}

async function startServer(): Promise<void> {
  try {
    const application = new App();
    await application.initialize();

    const server = application.getApp().listen(config.port, () => {
      logger.info("Server started", { port: config.port });
    });

    server.on("error", handleStartupError);
  } catch (error) {
    handleStartupError(error);
  }
}

void startServer();
