#!/usr/bin/env node

'use strict'

const logger = require('../scripts/logger')

module.exports = {
  try: (callback) => {
    try {
      return callback()
    } catch (error) {
      logger.error(error)
    }
  },
  trailingSemiColon: (string) => {
    return string.trim().slice(-1) === ';' ? string : `${string};`
  },
  decoratedLineCommentor: (commentString) => {
    return `\n------------------------------------------\n-- ${commentString}\n------------------------------------------\n\n`
  },
  decoratedMultiLineCommentor: (commentString) => {
    return `\n------------------------------------------\n/*\n${commentString}\n*/\n------------------------------------------\n\n`
  },
  lineCommentor: (commentString) => {
    return `\n-- ${commentString}\n`
  },
  multiLineCommentor: (commentString) => {
    return `\n/*\n${commentString}\n*/\n`
  },
}
