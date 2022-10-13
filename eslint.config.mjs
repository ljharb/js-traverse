import ljharb from '@ljharb/eslint-config/flat/node/0.4';

export default [
	...ljharb,
	{
		rules: {
			'array-bracket-newline': 'off',
			'array-callback-return': 'off',
			'array-element-newline': 'off',
			complexity: 'off',
			'func-style': ['error', 'declaration'],
			'global-require': 'warn',
			'max-lines-per-function': 'off',
			'max-statements-per-line': 'warn',
			'multiline-comment-style': 'off',
			'no-invalid-this': 'off',
			'no-proto': 'off',
			'no-sparse-arrays': 'warn',
			'no-underscore-dangle': 'off',
			'object-curly-newline': 'off',
			'sort-keys': 'off',
		},
	},
	{
		files: ['examples/**'],
		rules: {
			'no-console': 'off',
			'no-plusplus': 'off',
		},
	},
	{
		files: ['index.js'],
		rules: {
			strict: 'off',
		},
	},
];
