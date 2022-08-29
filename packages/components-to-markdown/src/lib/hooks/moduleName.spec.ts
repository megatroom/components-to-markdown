import moduleName from './moduleName';

it.each([
  ['packages/components-to-markdown/src/lib/hooks/moduleName.ts', 'moduleName'],
  [
    'packages/components-to-markdown/src/lib/hooks/moduleName.spec.ts',
    'moduleName.spec',
  ],
])('should parse path "%s" as %s', (filePath, name) => {
  expect(moduleName(filePath, { componentsName: [] })).toBe(name);
});
