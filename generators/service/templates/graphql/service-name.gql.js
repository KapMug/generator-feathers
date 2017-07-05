'use_strict'

import { createServiceExtension } from './../../util/service.util'
import serviceDefinition from './<%= kebabName %>.definition'
const schema = require('./<%= kebabName %>.graphql')

export function getModule (app) {
  const { ext } = createServiceExtension(app, serviceDefinition)

return {

    schema: schema,
    queries: `
        all<%= pluralName %>: [<%= name %>]
        <%= pluralName %>InScope(scope: ScopeInput!): [<%= name %>]
        <%= camelName %>(id: String!): <%= name %>
        `,
    mutations: `
        clone<%= pluralName %> (
            scope: Scope!
            startDate: String!
            sources: [String]!
        ): [<%= name %>]

        create<%= name %> (
            scope: Scope!
            startDate: String!
            fields: NameInput!
        ): <%= name %>

        patch<%= name %> (
            id: String!
            fields: NameInput!
        ): <%= name %>

        delete<%= name %>(id: String!): SingleDeleteResult

        `,
    resolvers: {
            queries: {
                all<%= pluralName %>(root, args, context) {
                    return ext.findAll()
                },
                <%= camelName %>(root, { id }, context) {
                    return ext.get(id, context);
                },
                 async all<%= pluralName %>InScope (root, { scope }, context) {
                    return new Error('Not implemented')
                }
            },
            mutations: {
                async clone<%= pluralName %> (root, { scope, startDate, sources }, context) {
                    return ext.clone(scope, startDate, sources)
                },
                async create<%= name %> (root, { scope, startDate, fields }, context) {
                    return ext.createIfUnique(scope, startDate, fields, [], context)
                },
                async patch<%= name %> (root, { id, fields }, context) {
                    return ext.patch(id, fields, context)
                },
                async delete<%= name %> (root, { id }, context) {
                    return ext.delete(id)
                }
            }
        }
    }
}


