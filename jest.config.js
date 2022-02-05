module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testPathIgnorePatterns: ['/node_modules/', '/build/', '/coverage/'],
  coverageReporters: ['text', 'cobertura', 'html'],
  collectCoverageFrom: ['**/*.ts', '!**/node_modules/**', '!**/vendor/**', '!**/build/**']
};
