import { defineConfig } from 'eslint'
import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import { ESLint } from '@typescript-eslint/parser'

export default defineConfig({
    ignores: ['dist'],
    extends: [
        js.configs.recommended,
        '@typescript-eslint/eslint-recommended',
        '@typescript-eslint/recommended', // TypeScript ESLint 기본 설정 추가
        'plugin:react/recommended', // React 관련 ESLint 플러그인 설정
        'plugin:react-hooks/recommended', // React Hooks 관련 설정
    ],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
        ecmaVersion: 2020,
        globals: globals.browser,
    },
    plugins: {
        'react-hooks': reactHooks,
        'react-refresh': reactRefresh,
        '@typescript-eslint': ESLint, // @typescript-eslint 설정 추가
    },
    rules: {
        'react-refresh/only-export-components': [
            'warn',
            { allowConstantExport: true },
        ],
        // 필요한 TypeScript 및 React 룰 추가
        '@typescript-eslint/explicit-module-boundary-types': 'off', // 필요 시 끄기
        '@typescript-eslint/no-explicit-any': 'warn', // any 사용 시 경고
    },
})
