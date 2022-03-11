#!/usr/bin/env node

/**
 *
 * @author Owusu K <adjeibohyen@hotmail.co.uk>
 *
 */

'use strict'

const winston = require('winston')

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  defaultMeta: { service: 'knex-db-queries' },
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: './logs/combined.log' }),
    new winston.transports.File({
      level: 'error',
      filename: './logs/error.log',
    }),
  ],
})

module.exports = logger
