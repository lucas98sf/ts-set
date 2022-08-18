#! /usr/bin/env node

import 'zx/globals'
import { devDependencies } from './devDependencies.mjs'
import { packageJson } from './packageJson.mjs'
const CONFIG_FILES_PATH = require('./configFilesPath.js')

const projectName = await question("📂 Project name: ")
await $`mkdir ${projectName}`

await $`cp -r ${CONFIG_FILES_PATH}/. ${projectName}`
await fs.writeJSON(`${projectName}/package.json`, packageJson(projectName), { spaces: 2 })

cd(projectName)

await $`npm i ${devDependencies}`

await $`git init && git add . && git commit -m "Initial commit"`