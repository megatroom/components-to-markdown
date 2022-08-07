import { ConfigOptions, LogLevel } from '../typings/ConfigOptions';
import type { Logger } from '../typings/Logger';
import { colorCommand, colorCounter, colorLogLevel } from './_stdout';

const LogLevelNumber: Record<LogLevel, number> = {
  silent: 0,
  error: 1,
  warn: 2,
  info: 3,
  debug: 4,
  trace: 5,
};

export const buildLogger = (
  options: Pick<ConfigOptions, 'loglevel' | 'watch'>
): Logger => {
  const configLevelNumber = LogLevelNumber[options.loglevel];
  const totalOfSteps = options.watch ? 4 : 3;

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
          colorCounter(`[${step}/${totalOfSteps}]`) + ` ${emoji} ${description}`
        );
      }
    },
    logShortcutUsage: (command, description) => {
      if (configLevelNumber >= LogLevelNumber.info) {
        console.log(
          `${colorCommand(' \u203A Press ')}${command}${colorCommand(
            ` ${description}.`
          )}`
        );
      }
    },
    isTrace: () => configLevelNumber >= LogLevelNumber.trace,
  };
};
