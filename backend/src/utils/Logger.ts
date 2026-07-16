type LogLevel = "info" | "warn" | "error";
type LogMetadata = Record<string, unknown>;

export default class Logger {
  public info(message: string, metadata: LogMetadata = {}): void {
    this.write("info", message, metadata);
  }

  public warn(message: string, metadata: LogMetadata = {}): void {
    this.write("warn", message, metadata);
  }

  public error(message: string, metadata: LogMetadata = {}): void {
    this.write("error", message, metadata);
  }

  private write(
    level: LogLevel,
    message: string,
    metadata: LogMetadata,
  ): void {
    const entry = JSON.stringify({
      ...metadata,
      timestamp: new Date().toISOString(),
      level,
      message,
    });
    const stream = level === "info" ? process.stdout : process.stderr;

    try {
      stream.write(`${entry}\n`);
    } catch {
      // Logging must never interrupt request or startup error handling.
    }
  }
}

export const logger = new Logger();
