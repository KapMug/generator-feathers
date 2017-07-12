import test from 'ava'
import ApolloClient, { createNetworkInterface } from 'apollo-client'
import fetch from 'isomorphic-fetch' // NOTE: do not remove
import gql from 'graphql-tag'

import { url,
  defaultScope,
  randomName,
  validDateStr,
  testCreateValid,
  testCreateWithMissingProperty,
  testCreateWithInvalidStartDate,
  testGetExisting,
  testPatch,
  testFindAll,
  } from '../helpers'



const client = new ApolloClient({
  networkInterface: createNetworkInterface({
    uri: url,
  }),
})

// declare some mutations and queries that we will want to reuse

const getQueryTemplate = gql`
      query <%= name %> ($id: String!) {
        <%= name %>(id: $id) {
          id
        }
      }
    `

const creationTemplate = gql`
      mutation create<%= name %> ($scope: ScopeInput!, $startDate: String!, $fields: <%= name %>CreateFields!) {
        create<%= name %> (
          scope: $scope,
          startDate: $startDate,
          fields: $fields
        ) {
          id
          name
          startDate
        }
      }
    `

const patchTemplate = gql`
      mutation patch<%= name %> ($id: String!, $fields: <%= name %>PatchFields!) {
        patch<%= name %>(
          id: $id
          fields: $fields
        ) {
          id,
          name,
          startDate
        }
      }
    `

const findAllTemplate = gql`
      query all<%= pluralName %> {
        all<%= pluralName %> {
          id
          name
          startDate
        }
      }
    `
const validInput = {
  scope: defaultScope,
  startDate: validDateStr,
  fields: {
    name: randomName(),
  },
}

const creationResult = {
  instance: null, // creation operation will save its result to this property
}

test.serial('Create a valid <%= name %>',
 t => testCreateValid(t, client, creationTemplate, validInput, creationResult))

test('Attempt to create a <%= name %> without providing a name',
t => testCreateWithMissingProperty(t, client, creationTemplate, validInput, 'name', 'fields.name'))

test('Attempt to create a <%= name %> with invalid startDate',
t => testCreateWithInvalidStartDate(t, client, creationTemplate, validInput))

test('Get existing <%= name %>',
t => testGetExisting(t, client, getQueryTemplate, creationResult.instance.id, '<%= name %>'))

test('Find all <%= pluralName %>',
t => testFindAll(t, client, findAllTemplate, creationResult.instance, 'all<%= pluralName %>'))

test.skip('Clone <%= name %>', t => null)

test('Patch <%= name %>', t => {
  const fields = { name: 'Patched <%= name %> Name' }
  return testPatch(t, client, patchTemplate, fields, creationResult.instance, 'patch<%= name %>')
})
