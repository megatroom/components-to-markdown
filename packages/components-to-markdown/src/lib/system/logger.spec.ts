/* eslint-disable @typescript-eslint/ban-ts-comment */
import { LogLevel } from '../typings/ConfigOptions';
import { buildLogger } from './logger';

const errorSpy = jest.spyOn(console, 'error').mockImplementation(jest.fn());
const logSpy = jest.spyOn(console, 'log').mockImplementation(jest.fn());

const defaultProps = {
  watch: false,
};

afterEach(() => {
  jest.clearAllMocks();
});

describe('When config level is "silent"', () => {
  it.each([['Error'], ['Warning'], ['Info'], ['Debug'], ['Trace']])(
    'should log on log%s',
    (name) => {
      const logger = buildLogger({
        ...defaultProps,
        loglevel: 'silent',
      });

      // @ts-ignore
      logger[`log${name}`]('test message');

      expect(errorSpy).not.toHaveBeenCalled();
      expect(logSpy).not.toHaveBeenCalled();
    }
  );
});

describe.each([
  ['error', [['Error']], [['Warning'], ['Info'], ['Debug'], ['Trace']]],
  ['warn', [['Error'], ['Warning']], [['Info'], ['Debug'], ['Trace']]],
  ['info', [['Error'], ['Warning'], ['Info']], [['Debug'], ['Trace']]],
  ['debug', [['Error'], ['Warning'], ['Info'], ['Debug']], [['Trace']]],
])('When config level is "%s"', (loglevel, shouldLogOn, shouldNotLogOn) => {
  it.each(shouldLogOn)('should log on log%s', (name) => {
    const logger = buildLogger({
      ...defaultProps,
      loglevel: loglevel as LogLevel,
    });

    // @ts-ignore
    logger[`log${name}`]('test message');

    if (name === 'Error') {
      expect(errorSpy).toHaveBeenCalledWith('test message');
      expect(logSpy).not.toHaveBeenCalled();
    } else {
      expect(errorSpy).not.toHaveBeenCalled();
      expect(logSpy).toHaveBeenCalledTimes(1);
    }
  });

  it.each(shouldNotLogOn)('should not log on log%s', (name) => {
    const logger = buildLogger({
      ...defaultProps,
      loglevel: loglevel as LogLevel,
    });

    // @ts-ignore
    logger[`log${name}`]('test message');

    expect(errorSpy).not.toHaveBeenCalled();
    expect(logSpy).not.toHaveBeenCalled();
  });
});

describe('When config level is "trace"', () => {
  it.each([['Error'], ['Warning'], ['Info'], ['Debug'], ['Trace']])(
    'should log on log%s',
    (name) => {
      const logger = buildLogger({
        ...defaultProps,
        loglevel: 'trace',
      });

      // @ts-ignore
      logger[`log${name}`]('test message');

      if (name === 'Error') {
        expect(errorSpy).toHaveBeenCalledWith('test message');
        expect(logSpy).not.toHaveBeenCalled();
      } else {
        expect(errorSpy).not.toHaveBeenCalled();
        expect(logSpy).toHaveBeenCalledTimes(1);
      }
    }
  );
});

describe.each([
  ['error', false],
  ['warn', false],
  ['info', false],
  ['debug', false],
  ['trace', true],
])('When level is "%s"', (level, isEqualValue) => {
  it(`isTrace() should be ${isEqualValue}`, () => {
    const logger = buildLogger({
      ...defaultProps,
      loglevel: level as LogLevel,
    });

    expect(logger.isTrace()).toBe(isEqualValue);
  });
});
