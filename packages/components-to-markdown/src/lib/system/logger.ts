import { ConfigOptions, LogLevel } from '../typings/ConfigOptions';

interface Logger {
  logError: (message: string) => void;
  logWarning: (message: string) => void;
  logInfo: (message: string) => void;
  logDebug: (message: string) => void;
  logTrace: (message: string) => void;
}

const LogLevelNumber: Record<LogLevel, number> = {
  silent: 0,
  error: 1,
  warn: 2,
  info: 3,
  debug: 4,
  trace: 5,
};

export const buildLogger = (
  options: Pick<ConfigOptions, 'loglevel'>
): Logger => {
  const configLevelNumber = LogLevelNumber[options.loglevel];

  return {
    logError: (message: string) => {
      if (configLevelNumber >= LogLevelNumber.error) {
        console.error(message);
      }
    },
    logWarning: (message: string) => {
      if (configLevelNumber >= LogLevelNumber.warn) {
        console.log(message);
      }
    },
    logInfo: (message: string) => {
      if (configLevelNumber >= LogLevelNumber.info) {
        console.log(message);
      }
    },
    logDebug: (message: string) => {
      if (configLevelNumber >= LogLevelNumber.debug) {
        console.log(message);
      }
    },
    logTrace: (message: string) => {
      if (configLevelNumber >= LogLevelNumber.trace) {
        console.log(message);
      }
    },
  };
};
