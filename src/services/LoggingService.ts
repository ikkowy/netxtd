import { LogEntry } from "../types/LogEntry";
import { getLogLevelIndex, LogLevel } from "../types/LogLevel";

export type LogCallback = () => LogEntry;

export class LoggingService {

  private logLevel: LogLevel = LogLevel.Info;

  setLogLevel(level: LogLevel): void {
    this.logLevel = level;
  }

  log(param: LogEntry | LogCallback): void {
    const logEntry = typeof param === "function" ? param() : param;

    if (getLogLevelIndex(this.logLevel) <= getLogLevelIndex(logEntry.level)) {
      console.log(logEntry);
    }
  }

}
