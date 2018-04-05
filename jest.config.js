module.exports = {
	verbose: true,
	collectCoverageFrom: [
		'src/js/components/**/*.{js,jsx}',
		'src/js/helpers/**/*.{js,jsx}',
	],
	collectCoverage: true,
	setupTestFrameworkScriptFile: './scripts/enzymeSetup.js',
	testPathIgnorePatterns: ['/node_modules/', '.eslintrc'],
};
