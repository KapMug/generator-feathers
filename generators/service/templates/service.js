'use strict'

import { createService } from './../../util/service.util'
import serviceDefinition from './<%= kebabName %>.definition'

// Initializes the `<%= camelName %>` service on path `/<%= kebabName %>`
const hooks = require('./<%= kebabName %>.hooks')
const filters = require('./<%= kebabName %>.filters')

module.exports = function () {
  createService(serviceDefinition, this, hooks, filters)
}
