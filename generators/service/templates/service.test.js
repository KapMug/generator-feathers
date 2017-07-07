'use strict'

import test from 'ava'
import ApolloClient, { createNetworkInterface } from 'apollo-client'
import fetch from 'isomorphic-fetch'
import gql from 'graphql-tag'
import { isMatch, some } from 'lodash'

import { url, invalidStartDateError, defaultScope } from '../helpers'

const getRandomName = () => '<%= name %> from test [' + Math.round(Math.random() * 1000) + ']'

const client = new ApolloClient({
  networkInterface: createNetworkInterface({
    uri: url,
  }),
})

// declare some mutations and queries that we will want to reuse

const createMutationTemplate = gql`
      mutation create<%= name %>($scope: ScopeInput!, $startDate: String!, $fields: NameInput!) {
        create<%= name %>(
          scope: $scope,
          startDate: $startDate,
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
    
let created<%= name %>

// tests starts here

test.serial('Create a valid <%= name %>', t => {
  const validInput = {
    scope: defaultScope,
    startDate: '2010-01-25',
    fields: {
      name: getRandomName(),
    },
  }

  return client.mutate({
    mutation: createMutationTemplate,
    variables: validInput,
  })
  .then(data => {
    created<%= name %> = data.data.create<%= name %>
    return t.true(isMatch(created<%= name %>, validInput.fields))
  })
  .catch(error => t.fail(error))
})

test('Attempt to create a <%= name %> with missing params', t => {
  const inputWithMissingParams = {
    scope: defaultScope,
    startDate: '2017-11-24',
    fields: {},
  }

  return client.mutate({
    mutation: createMutationTemplate,
    variables: inputWithMissingParams,
  })
  .then(() => t.fail('Shouldn\'`t have passed with missing param.'))
  .catch(error => t.regex(error.message, new RegExp('.*In field "name": Expected "String!", found null.*$')))
})

test('Attempt to create a <%= name %> with invalid startDate', t => {
  const inputWithInvalidDate = {
    scope: defaultScope,
    startDate: '1995-13-24',
    fields: {
      name: 'CDI',
    },
  }

  return client.mutate({
    mutation: createMutationTemplate,
    variables: inputWithInvalidDate,
  })
  .then(() => t.fail('Shouldn\'`t have passed with invalid startDate.'))
  .catch(error => t.deepEqual(error.graphQLErrors[0], invalidStartDateError))
})

test('Get existing <%= name %>', t => {
  return client.query({
    query: gql`
      query <%= camelName %>($id: String!) {
        <%= camelName %>(id: $id) {
          id
        }
      }
    `,
    variables: { id: created<%= name %>.id },
  })
  .then(data => {
    t.is(data.data.<%= camelName %>.id, created<%= name %>.id)
  })
  .catch(error => t.fail(error))
})

test('Find all <%= pluralName %>', t => {
  return client.query({
    query: findAllTemplate,
  })
  .then(data => t.true(some(data.data.all<%= pluralName %>, created<%= name %>)))
  .catch(error => t.fail(error))
})

test('Clone <%= name %>', t => {
  return client.query({
    query: findAllTemplate,
  })
  .then(data => t.true(Array.isArray(data.data.all<%= pluralName %>)))
  .catch(error => t.fail(error))
})

test('Patch <%= name %>', t => {
  let fields = { name: 'Patched Name' }

  return client.mutate({
    mutation: gql`
      mutation patch<%= name %>($id: String!, $fields: NameInput!) {
        patch<%= name %>(
          id: $id
          fields: $fields
        ) {
          id,
          name,
          startDate
        }
      }
    `,
    variables: {
      id: created<%= name %>.id,
      fields,
    },
  })
  .then(data => {
    Object.assign(created<%= name %>, fields)
    t.deepEqual(created<%= name %>, data.data.patch<%= name %>)
  })
  .catch(error => t.fail(error))
})
