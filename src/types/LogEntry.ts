import { LogLevel } from "./LogLevel";

export class LogEntry {

  timestamp: Date;

  level: LogLevel;

  message: string;

  tenant?: string;

  traceId?: string;

  metadata?: Record<string, any>;

  constructor(logLevel: LogLevel, message: string) {
    this.timestamp = new Date();
    this.level = logLevel;
    this.message = message;
  }

}
