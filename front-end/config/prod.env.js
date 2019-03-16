'use strict'
const merge = require('webpack-merge')
const auth0Config = require('../app-config/global.conf.js')

module.exports = merge(auth0Config, {
  NODE_ENV: '"production"'
})
