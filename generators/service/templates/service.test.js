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

const findOneTemplate = gql`
      query <%= camelName %>($id: String!) {
        <%= camelName %>(id: $id) {
          id
        }
      }
    `

const createTemplate = gql`
      mutation create<%= name %>($scope: ScopeInput!, $startDate: String!, $fields: <%= name %>InputFields!) {
        create<%= name %>(
          scope: $scope,
          startDate: $startDate,
          fields: $fields
        ) {
          id
          name
          code
          isoCode
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
          code,
          isoCode,
        }
      }
    `

const findAllTemplate = gql`
      query all<%= pluralName %> {
        all<%= pluralName %> {
          id
          name
          code
          isoCode
        }
      }
    `

const getValidInput = function () {
  return ({
    scope: defaultScope,
    startDate: randomFutureDate(),
    fields: {
      name: randomName(),
      code: '123',
      isoCode: '123',
    },
  })
}

const configData = {
  modelName: '<%= name %>',
  requiredFields: ['name', 'code', 'isoCode'],
  fieldsToPatch: { name: randomPatchedName() },
  getValidInput,
  findOneTemplate,
  findAllTemplate,
  createTemplate,
  patchTemplate,
//  cloneTemplate,
}

const config = getTestConfig(configData)

test.serial('Create a valid <%= name %>',
 t => testCreateValid(t, config))

test.serial('Patch <%= name %>', t => testPatch(t, config))

// NOTE: here you pass in your own date string as a 3rd param if really need to
test('Attempt to create a <%= name %> with invalid startDate', t => testCreateWithInvalidStartDate(t, config))

config.requiredFields.forEach(name => {
  test(`Attempt to create a <%= name %> without providing a ${name}`,
   t => testCreateWithMissingProperty(t, config, name))
})

test('Get existing <%= name %>', t => testFindOne(t, config))

test('Find all <%= pluralName %>', t => testFindAll(t, config))

// test.skip('Clone <%= name %>', t => null)






