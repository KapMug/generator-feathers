import { createServiceExtension } from './../../util/service.util'
import serviceDefinition from './<%= kebabName %>.definition'
const schema = require('./<%= kebabName %>.graphql')

export default function getModule(app) {
  const { ext } = createServiceExtension(app, serviceDefinition)

return {

    schema: schema,
    queries: `
        all<%= pluralName %>: [<%= name %>]
        <%= camelName %>InScope(scope: ScopeInput!): [<%= name %>]
        <%= camelName %>(id: String!): <%= name %>
        `,
    mutations: `
        clone<%= pluralName %> (
            scope: Scope!
            startDate: BigInt!
            sources: [String]!
        ): [<%= name %>]

        create<%= name %> (
            scope: Scope!
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
                async all<%= pluralName %>(root, args, context) {
                    return ext.findAll(args, context)
                },
                async <%= camelName %>(root, { id }, context) {
                    return ext.get(id, context);
                },
                async all<%= pluralName %>InScope (root, { scope }, context) {
                    return new Error('Not implemented')
                }
            },
            mutations: {
                async clone<%= pluralName %> (root, { scope, startDate, sources }, context) {
                    return ext.clone(scope, startDate, sources, context)
                },
                async create<%= name %> (root, { scope, fields }, context) {
                    return ext.create(scope, fields, [], context)
                },
                async patch<%= name %> (root, { id, fields }, context) {
                    return ext.patch(id, fields, context)
                },
                async delete<%= name %> (root, { id }, context) {
                    return ext.delete(id, context)
                }
            }
        }
    }
}


