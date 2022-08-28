import { Logger } from '../typings/Logger';

const fakeLogger: Logger = {
  logError: jest.fn(),
  logWarning: jest.fn(),
  logInfo: jest.fn(),
  logDebug: jest.fn(),
  logTrace: jest.fn(),
  logStep: jest.fn(),
  logShortcutUsage: jest.fn(),
  isTrace: jest.fn(),
};

export default fakeLogger;
