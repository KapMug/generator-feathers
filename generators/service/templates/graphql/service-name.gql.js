'use_strict'

const ServiceExtension = require('./../../util/service-extension')

const schema = require("./<%= kebabName %>.graphql")

export default function getModule(app) {

  const service = app.service('<%= kebabName %>')
  const ext = new ServiceExtension(service, '<%= camelName %>', {
    phraseName: 'um <%= camelName %>',
    referenceFields: null
  })

    return {

        schema: schema,
        queries: `
            all<%= pluralName %>: [<%= name %>]
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
        `,
        resolvers: {
            queries: {
                all<%= pluralName %>(root, args, context) {
                    return ext.findAll()
                },
                <%= camelName %>(root, { id }, context) {
                    return ext.get(id, context);
                },
                 async indicesInScope (root, { scope }, context) {
                return new Error('Not implemented')
                }
            },
            mutations: {
                async clone<%= pluralName %> (root, { scope, startDate, sources }, context) {
                    return ext.clone(scope, startDate, sources)
                },
                async create<%= name %> (root, {scope, startDate, fields}, context) {
                    return ext.createIfUnique(scope, startDate, fields, [], context)
                },
                async patch<%= name %> (root, {id, fields}, context) {
                    return ext.patch(id, fields, context)
                }
            }
        }
    }
}


