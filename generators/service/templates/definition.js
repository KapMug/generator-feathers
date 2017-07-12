import { validateJsonSchema } from '../../util/validators.js'

const <%= camelName %>Schema = {
  properties: {
    _id: {
      type: 'string'
    },
    name: {
      type: 'string'
    },
    startDate: {
      date: 'ISOString'
    }
  },
  required: ['_id', 'name', 'startDate']
}


module.exports = {
  config: {
    phraseName: 'um ?',
    referenceFields: [],
    schemas: {
      productType: <%= camelName %>Schema
    }
  },
  hooks: {
    before: {
      create: [validateJsonSchema(<%= camelName %>Schema)]
    }
  }
}
