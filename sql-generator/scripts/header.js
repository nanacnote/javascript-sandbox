#!/usr/bin/env node

/**
 *
 * @author Owusu K <adjeibohyen@hotmail.co.uk>
 *
 */

'use strict'

const fs = require('fs')
const utils = require('../utils')

const headerString = utils.decoratedMultiLineCommentor(
  `Postgres dump.

author: 
    Owusu K. <adjeibohyen@hotmail.com>`
)

module.exports = (outputPath, dumpName) => {
  fs.writeFileSync(outputPath, headerString)
}
