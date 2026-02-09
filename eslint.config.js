import js from '@eslint/js';
import vue from 'eslint-plugin-vue';
import tseslint from 'typescript-eslint';

export default [
	js.configs.recommended,

	...tseslint.configs.recommended,

	...vue.configs['flat/recommended'],

	{
		ignores: [
			'node_modules',
			'dist',
			'*.md',
			'.idea',
			'/docs',
			'.husky',
			'.local',
			'/bin',
			'/public',
			'*.config.js'
		]
	}
];
