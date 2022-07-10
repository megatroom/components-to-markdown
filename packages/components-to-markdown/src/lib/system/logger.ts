import { ConfigOptions, LogLevel } from '../typings/ConfigOptions';
import type { Logger } from '../typings/Logger';

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
    logError: (message, ...optionalParams) => {
      if (configLevelNumber >= LogLevelNumber.error) {
        console.error(message, ...optionalParams);
      }
    },
    logWarning: (message, ...optionalParams) => {
      if (configLevelNumber >= LogLevelNumber.warn) {
        console.log(message, ...optionalParams);
      }
    },
    logInfo: (message, ...optionalParams) => {
      if (configLevelNumber >= LogLevelNumber.info) {
        console.log(message, ...optionalParams);
      }
    },
    logDebug: (message, ...optionalParams) => {
      if (configLevelNumber >= LogLevelNumber.debug) {
        console.log(message, ...optionalParams);
      }
    },
    logTrace: (message, ...optionalParams) => {
      if (configLevelNumber >= LogLevelNumber.trace) {
        console.log(message, ...optionalParams);
      }
    },
    isTrace: () => configLevelNumber >= LogLevelNumber.trace,
  };
};
