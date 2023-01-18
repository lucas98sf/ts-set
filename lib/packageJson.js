const scripts = {
  build: 'npx rimraf ./dist && tsc',
  test: 'jest',
  dev: 'tsx watch src/index.ts',
  start: 'node dist/index.js',
  prepare: 'husky install',
};

module.exports = projectName => ({
  name: projectName,
  version: '0.0.1',
  scripts,
  private: true,
  'lint-staged': {
    '*.{ts,tsx}': ['prettier --write', 'eslint --fix'],
    '*.{md,json,yml}': ['prettier --write'],
  },
  engines: {
    node: '>=16.0.0',
  },
  license: 'ISC',
});
