#!/usr/bin/env node

'use strict'

const fs = require('fs')
const path = require('path')
const constants = require('./constants')
const publisher = require('./scripts/publisher')
// const logger = require("./scripts/logger");

const [, , dumpName] = process.argv

if (!Object.keys(constants).includes(dumpName)) {
  throw Error('Invalid argument passed!')
}

const filesPath = path.resolve('queries', dumpName)
const files = fs.readdirSync(filesPath)
const outputPath = constants[dumpName].dumpFile.path

const knex = require('knex')({
  client: constants[dumpName].client,
  connection: constants[dumpName].connection,
})

// sets header to dump file
require('./scripts/header')(outputPath, dumpName)

files.forEach((fileName) => {
  require(`${filesPath}/${fileName}`)(knex).forEach((entry) => {
    publisher(entry.comment, entry.queryString, {
      commentStyle: 'decoratedLineCommentor',
      outputPath,
    })
  })
})
