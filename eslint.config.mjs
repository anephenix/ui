import react from 'eslint-plugin-react';
import jest from 'eslint-plugin-jest';
import globals from 'globals';
import babelParser from '@babel/eslint-parser';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import js from '@eslint/js';
import { FlatCompat } from '@eslint/eslintrc';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
	baseDirectory: __dirname,
	recommendedConfig: js.configs.recommended,
	allConfig: js.configs.all
});

export default [{
	ignores: ['.next', 'node_modules/**/*', 'coverage/**/*', 'out/**/*', 'dist/**/*'],
}, ...compat.extends('eslint:recommended', 'plugin:react/recommended'), {
	plugins: {
		react,
		jest,
	},

	languageOptions: {
		globals: {
			...globals.browser,
			...globals.commonjs,
			...globals.jest,
			...globals.node,
			Atomics: 'readonly',
			SharedArrayBuffer: 'readonly',
		},

		parser: babelParser,
		ecmaVersion: 6,
		sourceType: 'module',

		parserOptions: {
			ecmaFeatures: {
				ecmaVersion: 6,
				jsx: true,
			},
		},
	},

	settings: {
		react: {
			version: 'detect',
		},
	},

	rules: {
		'react/prop-types': 0,
		indent: ['error', 'tab'],
		'linebreak-style': ['error', 'unix'],
		quotes: ['error', 'single'],
		semi: ['error', 'always'],
	},
}];