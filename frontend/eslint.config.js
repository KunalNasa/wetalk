import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  { ignores: ['dist'] },
  {
    extends: [
      js.configs.recommended, 
      ...tseslint.configs.recommended, 
      'next'
    ],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
      'react/no-unescaped-entities': 'off', // Disable rule for unescaped entities in React
      '@next/next/no-page-custom-font': 'off', // Disable rule for custom fonts
      'react-hooks/exhaustive-deps': 'warn', // Warn about missing dependencies in useEffect/useCallback
      '@typescript-eslint/no-explicit-any': 'off', // Allow usage of 'any' type
    },
  },
);
