import { defineConfig } from 'eslint/config';
import eslintPluginReact from 'eslint-plugin-react';
import tseslint from '@electron-toolkit/eslint-config-ts';
import eslintPluginReactHooks from 'eslint-plugin-react-hooks';
import eslintPluginReactRefresh from 'eslint-plugin-react-refresh';
// import eslintConfigPrettier from '@electron-toolkit/eslint-config-prettier';

export default defineConfig(
  { ignores: ['**/node_modules', '**/dist', '**/out'] },
  tseslint.configs.recommended,
  eslintPluginReact.configs.flat.recommended,
  eslintPluginReact.configs.flat['jsx-runtime'],
  {
    settings: {
      react: {
        version: 'detect',
      },
    },
  },
  {
    files: ['**/*.{ts,tsx}'],
    plugins: {
      'react-hooks': eslintPluginReactHooks,
      'react-refresh': eslintPluginReactRefresh,
    },
    rules: {
      ...eslintPluginReactHooks.configs.recommended.rules,
      ...eslintPluginReactRefresh.configs.vite.rules,
      '@typescript-eslint/explicit-function-return-type': 'off',
    },
  },
  // eslintConfigPrettier,  // 关闭eslint中关于prettier的检查
);
