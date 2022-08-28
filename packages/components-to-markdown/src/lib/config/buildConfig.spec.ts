import buildConfig from './buildConfig';
import * as defaultValues from './constants';

it('should build config with default values', () => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //@ts-ignore
  expect(buildConfig({})).toEqual({
    loglevel: defaultValues.DEFAULT_LOG_LEVEL,
    template: defaultValues.DEFAULT_TEMPLATE,
    watch: defaultValues.DEFAULT_WATCH_MODE,
    patterns: defaultValues.DEFAULT_PATTERNS,
    outputExtension: defaultValues.DEFAULT_OUTPUT_EXTENSION,
    helpers: [],
    hooks: {
      outputFileName: expect.any(Function),
    },
  });
});
