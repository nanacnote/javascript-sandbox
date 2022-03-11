#!/usr/bin/env node

/**
 *
 * @author Owusu K <adjeibohyen@hotmail.co.uk>
 *
 */

'use strict'

const fs = require('fs')
const { format } = require('sql-formatter')

const utils = require('../utils')

function formatString(queryString) {
  const queryStringWithSemiColon = utils.trailingSemiColon(queryString)
  return format(queryStringWithSemiColon, {
    language: 'postgresql',
    uppercase: true,
  })
}

function appendToFile(outputPath, formattedQueryString) {
  utils.try(() => {
    fs.appendFileSync(outputPath, formattedQueryString)
  })
}

module.exports = (commentString, queryString, options) => {
  const { commentStyle, outputPath } = options

  const parsedComment = commentString
    ? utils.try(() => utils[commentStyle](commentString))
    : '\n'
  const formattedQueryString = formatString(queryString)

  const commentedFormattedQueryString = `${parsedComment}${formattedQueryString}\n`
  appendToFile(outputPath, commentedFormattedQueryString)
}
