import { ConfigOptions, LogLevel } from '../typings/ConfigOptions';
import type { Logger } from '../typings/Logger';
import { colorCounter, colorLogLevel } from './_stdout';

const LogLevelNumber: Record<LogLevel, number> = {
  silent: 0,
  error: 1,
  warn: 2,
  info: 3,
  debug: 4,
  trace: 5,
};

const TOTAL_OF_STEPS = 3;

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
        console.log(`${colorLogLevel('debug')} ${message}`, ...optionalParams);
      }
    },
    logTrace: (message, ...optionalParams) => {
      if (configLevelNumber >= LogLevelNumber.trace) {
        console.log(`${colorLogLevel('trace')} ${message}`, ...optionalParams);
      }
    },
    logStep: (step, emoji, description) => {
      if (configLevelNumber >= LogLevelNumber.info) {
        console.log(
          colorCounter(`[${step}/${TOTAL_OF_STEPS}]`) +
            ` ${emoji} ${description}`
        );
      }
    },
    isTrace: () => configLevelNumber >= LogLevelNumber.trace,
  };
};
