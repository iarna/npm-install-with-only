#!/usr/bin/env node
'use strict'
const fs = require('fs')
const execSync = require('child_process').execSync
const findPrefix = require('find-npm-prefix')
const qw = require('qw')
const allowedDeps = process.argv.slice(2)

if (allowedDeps.length === 0) {
  console.error('Form: npm-install-with-only dep1 dep2 … depn')
  console.error('Take a list of dependencies install from your package.json.')
  console.error('Versions are determined in the usual way, per your package.json.')
  process.exit(1)
}
findPrefix(process.cwd()).then(prefix => {
  const pjson = prefix + '/package.json'
  const pkgsrc = fs.readFileSync(pjson)
  const filtered = JSON.parse(pkgsrc)
  for (let type of qw`dependencies devDependencies optionalDependencies`) {
    if (!filtered[type]) continue
    filtered[type] = Object.keys(filtered[type])
          .filter(dep => allowedDeps.indexOf(dep) !== -1)
  }
  try {
    fs.writeFileSync(pjson, JSON.stringify(filtered))
    execSync('npm i', {stdio: 'inherit'})
  } finally {
    fs.writeFileSync(pjson, pkgsrc)
  }
})
