'use strict'

import { map } from 'lodash'

module.exports = {
  config: {
    camelCaseName: '<%= camelName %>',
    kebabName: '<%= kebabName %>',
    phraseName: 'um <%= camelName %>',
    referenceFields: []
  },
  services: [],
  serviceNames: function () {
    return map(this.services, o => o.camelCaseName)
  }
}
