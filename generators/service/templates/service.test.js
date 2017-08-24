import test from 'ava'
import fetch from 'isomorphic-fetch' // NOTE: do not remove
import gql from 'graphql-tag'

import {
  getTestConfig,
  defaultScope,
  randomName,
  randomPatchedName,
  randomFutureDate,
  testCreateValid,
  testPatch,
  testCreateWithMissingProperty,
  testCreateWithInvalidStartDate,
  testFindOne,
  testFindAll,
} from '../helpers'

// declare some mutations and queries that we will want to reuse

const createTemplate = gql`
      mutation create<%= name %>($scope: ScopeInput!, $fields: <%= name %>InputFields!) {
        create<%= name %>(
          scope: $scope,
          fields: $fields
        ) {
          id
          name
          startDate
        }
      }
    `

const patchTemplate = gql`
      mutation patch<%= name %>($id: String!, $fields: <%= name %>PatchFields!) {
        patch<%= name %>(
          id: $id
          fields: $fields
        ) {
          id,
          name,
          isoCode,
        }
      }
    `

  const cloneTemplate = gql`
      mutation clone<%= pluralName %>($scope: ScopeInput!, $startDate: String!, $sources: [String]!) {
        clone<%= pluralName %>(
          scope: $scope,
          startDate: $startDate,
          sources: $sources
        ) {
          id
          startDate
        }
      }
    `

const findOneTemplate = gql`
      query <%= camelName %>($id: String!) {
        <%= camelName %>(id: $id) {
          id
        }
      }
    `

const findAllTemplate = gql`
      query all<%= pluralName %> {
        all<%= pluralName %> {
          id
          name
        }
      }
    `

const getValidInput = function () {
  return ({
    scope: defaultScope,
    fields: {
      startDate: randomFutureDate(),
      name: randomName(),
    },
  })
}

const configData = {
  modelName: '<%= name %>',
  requiredFields: ['name'],
  fieldsToPatch: { name: randomPatchedName() },
  getValidInput,
  findOneTemplate,
  findAllTemplate,
  createTemplate,
  patchTemplate,
  cloneTemplate,
}

const config = getTestConfig(configData)

test.serial.skip(`Create a valid ${config.modelName}`, t => testCreateValid(t, config))

test.serial.skip(`Clone an existing ${config.modelName} to a new date:`, t => testClone(t, config))

test.serial.skip(`Patch an existing ${config.modelName}`, t => testPatch(t, config))

// NOTE: here you pass in your own date string as a 3rd param if really need to
test.skip(`Attempt to create a ${config.modelName} with invalid startDate`, t => testCreateWithInvalidStartDate(t, config))

config.requiredFields.forEach(name => {
  test.skip(`Attempt to create a ${config.modelName} without providing a ${name}`,
   t => testCreateWithMissingProperty(t, config, name))
})

test.skip(`Get existing ${config.modelName}`, t => testFindOne(t, config))

test.skip(`Find all ${config.pluralizedName}`, t => testFindAll(t, config))






