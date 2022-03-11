#!/usr/bin/env node

'use strict'

const path = require('path')
const root = path.dirname(require.main.filename)

module.exports = {
  formative: {
    client: 'pg',
    connection: {
      host: '127.0.0.1',
      port: '5433',
      user: 'postgres',
      password: 'secret',
      database: 'uea_cmp',
    },
    dumpFile: {
      path: path.resolve(root, 'database', 'formative.sql'),
    },
  },
  summative: {
    client: 'pg',
    connection: {
      host: '127.0.0.1',
      port: '5433',
      user: 'postgres',
      password: 'secret',
      database: 'uea_cmp',
    },
    dumpFile: {
      path: path.resolve(root, 'database', 'summative.sql'),
    },
  },
}
