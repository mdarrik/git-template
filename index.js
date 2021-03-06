#!/usr/bin/env node
'use strict'
const { spawnSync } = require('child_process')
const path = require('path')
const fs = require('fs')
const os = require('os')
const mv = require('mv')

const dir = path.join(os.homedir(), '.git-template')
if (fs.existsSync(dir)) {
  console.error('Template already exists. Run "rm -rf ~/.git-template" and re-run to upgrade.')
  return process.exit(1)
}

// sets up default branch to be main instead of 'master
const prefix = path.join(os.tmpdir(), 'git-template-')
const tmp = fs.mkdtempSync(prefix);

spawnSync('git', ['init'], {
  cwd: tmp
})

fs.writeFileSync(path.join(tmp, '.git', 'HEAD'), 'ref: refs/heads/main')
// writes to the exclude hook
const excludeFile = fs.readFileSync('./exclude');
if(!fs.existsSync(path.join(tmp,'.git', 'info'))) {
fs.mkdirSync(path.join(tmp,'.git', 'info'));
}
fs.writeFileSync(path.join(tmp, '.git', 'info', 'exclude'), excludeFile);
mv(path.join(tmp, '.git'), dir, err => {
  if (err) {
    throw err
  }

  spawnSync('git', ['config', '--global', '--unset-all', 'init.templateDir'])
  spawnSync('git', ['config', '--global', '--add', 'init.templateDir', dir])
})

