export const DEFAULT_LOG_LEVEL = 'info';
export const DEFAULT_OUTPUT_EXTENSION = 'md';
export const DEFAULT_WATCH_MODE = false;
export const DEFAULT_GROUPED = false;
export const DEFAULT_PATTERNS = [
  '**/*.{js,jsx,ts,tsx}',
  '!**/__tests__/**',
  '!**/*.{test,spec}.{js,jsx,ts,tsx}',
  '!**/*.d.ts',
  '!**/*.stories.{js,jsx,ts,tsx}',
];

/**
 * Don't forget to add the new constant to the `BuiltinTemplate` type.
 */
export const BRACHIOSAURUS_TEMPLATE = 'brachiosaurus';
export const STEGOSAURUS_TEMPLATE = 'stegosaurus';

export const DEFAULT_TEMPLATE = BRACHIOSAURUS_TEMPLATE;

export const BUILTIN_TEMPLATES = [BRACHIOSAURUS_TEMPLATE, STEGOSAURUS_TEMPLATE];
