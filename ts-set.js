#! /usr/bin/env node

const fs = require('fs-extra');
const devDependencies = require('./devDependencies');
const packageJson = require('./packageJson');
const promisify = require('util').promisify;
const exec = promisify(require('child_process').exec);

const { stdin, stdout, exit } = require('node:process');
const rl = require('node:readline').createInterface(
  { input: stdin, output: stdout, terminal: true }
);
const question = promisify(rl.question).bind(rl);

(async () => {
  const projectName = await question("📂 Project name: ");
  await fs.mkdir(projectName);
  await fs.copy('./config-files', projectName);
  await fs.writeJSON(`${projectName}/package.json`, packageJson(projectName), { spaces: 2 });
  const { stderr, stdout } = await exec(`cd ${projectName} && \
   npm i ${devDependencies.join(' ')} && \
   git init && git add . && git commit -m "Initial commit"`);
  console.log(stderr || stdout);
  rl.close();
})();

rl.on('close', () => {
  console.log('\n🎉  Project created!\n');
  exit(0);
});