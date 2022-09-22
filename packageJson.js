const scripts = {
  prepare: "husky install",
  build: "npx rimraf ./dist && tsc",
  test: "jest",
  dev: "ts-node-dev --respawn --transpile-only src/index.ts",
  start: "npm run build && ts-node dist/index.ts",
};
// "scripts": {
//   "prepare": "husky install",
//   "clear": "npm exec --workspaces -- npx rimraf node_modules && npx rimraf node_modules",
//   "dev": "concurrently \"yarn dev:server\" \"yarn dev:web\"",
//   "dev:server": "yarn workspace @fullstack-app/server dev",
//   "dev:web": "yarn workspace @fullstack-app/web dev"
// }

module.exports = (projectName) => ({
  name: projectName,
  version: "1.0.0",
  private: true,
  license: "MIT",
  scripts: scripts,
  workspaces: ["packages/*"],
  engines: {
    node: ">=16.0.0",
  },
  "lint-staged": {
    "*.{js,ts,tsx}": ["prettier --write", "eslint --fix"],
    "*.{json,yml}": ["prettier --write"],
  },
});
