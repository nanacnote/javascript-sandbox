#!/usr/bin/env node

/**
 *
 * @author Owusu K <adjeibohyen@hotmail.co.uk>
 *
 */

const fs = require('fs')
const fse = require('fs-extra')
const path = require('path')
const yaml = require('js-yaml')

const [, , dumpName, override] = process.argv

const configPath = path.resolve(__dirname, '..')
const sqlDumpPath = path.resolve(__dirname, '..', 'database')
const queriesPath = path.resolve(__dirname, '..', 'queries')

if (!dumpName) {
  throw Error('No argument passed!')
}

if (override !== 'force') {
  if (fs.readdirSync(`${queriesPath}`).includes(dumpName)) {
    throw Error('Directory already exist!')
  }
}

const [sql, queries] = yaml.load(
  fs.readFileSync(`${configPath}/.config`, 'utf8')
)['add_dump']
const queryFiles = ['01_functions', '02_tables', '03_triggers', '04_entries']

function writeFile(filePath, str) {
  try {
    return fse.outputFileSync(filePath, str)
  } catch (err) {
    console.error(err)
  }
}

function updateQueries() {
  const [queriesString] = Object.values(queries)
  queryFiles.forEach((fileName) => {
    writeFile(`${queriesPath}/${dumpName}/${fileName}.js`, queriesString)
  })
}

function updateSql() {
  const [sqlString] = Object.values(sql)
  writeFile(`${sqlDumpPath}/${dumpName}.sql`, sqlString)
}

function run() {
  updateSql()
  updateQueries()
}

module.exports = run()
