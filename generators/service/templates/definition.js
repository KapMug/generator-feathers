
const patchSchema = {
  properties: {
    name: {
      type: 'string',
    },
    startDate: {
      type: 'integer',
      format: 'timestamp',
    },
  },
}

const createSchema = Object.assign({ required: ['name', 'startDate'] }, patchSchema)

module.exports = {
  config: {
    phraseName: 'um ?',
    referenceFields: [],
    schemas: {
      create: createSchema,
      patch: patchSchema,
    },
  },
}
