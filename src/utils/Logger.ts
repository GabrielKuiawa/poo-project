import * as fs from 'fs';
import path = require('path');

export default class Logger {
    private logFileName: string;
    private logDirectory: string;
    private logFilePath: string;
  
    constructor(logFileName: string) {
      this.logFileName = logFileName;
      this.logDirectory = path.join(__dirname, '..', '..', 'logs');
      this.logFilePath = path.join(this.logDirectory, this.logFileName);
    }
  
    public logError(message: string, status: number): void {
      const logMessage = `Status: ${status}\nMessage: ${message}\nTime: ${new Date().toISOString()}\n\n`;
      fs.mkdirSync(this.logDirectory, { recursive: true });
      fs.appendFileSync(this.logFilePath, logMessage);
    }
  }
  