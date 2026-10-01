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
			'max-lines': 'warn',
			'max-lines-per-function': 'off',
			'max-statements-per-line': ['warn', { max: 2 }],
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
			'no-magic-numbers': 'off',
			'no-plusplus': 'off',
		},
	},
	{
		files: [
			'test/typed-array.js',
			'test/mutability.js',
		],
		languageOptions: {
			globals: {
				Uint8Array: false,
			},
		},
	},
	{
		files: ['eslint.config.mjs'],
		languageOptions: {
			ecmaVersion: 'latest',
		},
	},
];
