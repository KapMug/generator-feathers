
import { cloneAndSetAllRequiredToEmptyArray } from '../../util/clone-schema-util'

const schema = {
  properties: {
    name: {
      type: 'string',
    },
    startDate: {
      type: 'integer',
      format: 'timestamp',
    },
  },
  required: [],
}

module.exports = {
  config: {
    phraseName: 'um ?',
    referenceFields: [],
    schemas: {
      create: schema,
      patch: cloneAndSetAllRequiredToEmptyArray(schema),
    },
  },
}
