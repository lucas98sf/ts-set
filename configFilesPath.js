const appDirectory = fs.realpathSync(process.cwd());

exports.CONFIG_FILES_PATH = path.resolve(
  appDirectory,
  'config-files',
)