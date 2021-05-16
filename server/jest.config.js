module.exports = {
	clearMocks: true,
	coverageDirectory: 'coverage',
	coverageProvider: 'v8',
	coverageReporters: ["text"],
	preset: 'ts-jest',
	testEnvironment: 'node',
	testMatch: ['**/__tests__/**/*.spec.[jt]s?(x)'],
	testPathIgnorePatterns: ['/node_modules/', '/dist/', '/build/']
};
