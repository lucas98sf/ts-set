const scripts = {
  "build": "npx rimraf ./dist && tsc",
  "test": "jest",
  "dev": "ts-node-dev --respawn --transpile-only src/index.ts",
  "start": "npm run build && ts-node dist/index.ts",
  "prepare": "husky install"
}

module.exports = (projectName) => ({
  "name": projectName,
  "version": "0.0.1",
  "description": "",
  "main": "index.js",
  "scripts": scripts,
  "author": "",
  "license": "ISC",
  "lint-staged": {
    "*.ts": "eslint --cache --fix"
  }
})
