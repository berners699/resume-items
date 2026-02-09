export default {
	extends: ['stylelint-config-standard-scss', 'stylelint-config-recommended-vue'],
	overrides: [
		{
			files: ['**/*.vue'],
			customSyntax: 'postcss-html'
		}
	]
};
