export enum LogLevel {
  Trace = 'trace',
  Debug = 'debug',
  Info = 'info',
  Warn = 'warn',
  Error = 'error',
  Fatal = 'fatal'
}

const logLevelOrder = [
  LogLevel.Trace,
  LogLevel.Debug,
  LogLevel.Info,
  LogLevel.Warn,
  LogLevel.Error,
  LogLevel.Fatal
];

export function getLogLevelIndex(level: LogLevel): number {
  return logLevelOrder.indexOf(level);
}
