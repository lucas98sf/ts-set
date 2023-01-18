#! /usr/bin/env node

const os = require('os');
const fs = require('fs-extra');
const { stdin, stdout, exit } = require('node:process');
const { promisify } = require('util');
const rl = require('node:readline').createInterface({
  input: stdin,
  output: stdout,
  terminal: true,
});
const question = promisify(rl.question).bind(rl);
const exec = promisify(require('child_process').exec);
const chalk = require('chalk');

const log = (text, color = 'magenta', style = 'bold') =>
  console.log(chalk[color][style](text) + '\n');

const devDependencies = require('./devDependencies');
const packageJson = require('./packageJson');
const configFilesPath = require('./configFilesPath');

let projectName;
(async () => {
  try {
    const [, , ...args] = process.argv;

    log('\n🪄  welcome to ts-set!', 'bgMagenta');

    const normalizeProjectName = str => {
      const normalizedStr = str.replace(/[^\w-]+/g, '');
      if (!normalizedStr) {
        log('🛑  invalid project name', 'red');
        exit(1);
      }

      return normalizedStr;
    };

    if (args[0]) {
      projectName = normalizeProjectName(args[0]);
    } else {
      projectName = await question(
        chalk.green('📁  what will be the name of your new project? '),
      ).then(normalizeProjectName);
    }

    await fs.mkdir(projectName);
    log(`📂  created project folder at ./${projectName}`);

    await fs.copy(configFilesPath, projectName);
    await fs.writeJSON(
      `${projectName}/package.json`,
      packageJson(projectName),
      {
        spaces: 2,
        EOL: os.EOL,
      },
    );
    log('🗂️   added configuration files');

    log('📦  installing dependencies...');
    await exec(`cd ${projectName} && npm i -D ${devDependencies.join(' ')}`, {
      stdio: 'inherit',
    });

    log('🗃️   initializing git repository...');
    await exec(
      `cd ${projectName} && git init && git add . && git commit -m "Initial commit"`,
      { stdio: 'inherit' },
    );

    log(`🎉  project creation complete!`, 'yellow');
    log(`✨  run 'cd ${projectName}' to start working.  ✨`, 'cyan');

    exit(0);
  } catch (err) {
    console.error(err);

    projectName && (await fs.remove(projectName));
    log('🛑  project creation aborted', 'red');

    exit(1);
  }
})();
