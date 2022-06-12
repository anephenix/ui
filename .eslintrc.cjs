module.exports = {
	env: {
		browser: true,
		commonjs: true,
		es6: true,
		jest: true,
		node: true,
	},
	extends: ['eslint:recommended', 'plugin:react/recommended'],
	parser: '@babel/eslint-parser',
	globals: {
		Atomics: 'readonly',
		SharedArrayBuffer: 'readonly',
	},
	parserOptions: {
		ecmaFeatures: {
			ecmaVersion: 6,
			jsx: true,
		},
		sourceType: 'module',
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
	plugins: ['react', 'jest'],
};
