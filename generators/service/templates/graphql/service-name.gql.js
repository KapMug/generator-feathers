const fs = require('fs') // import doesn't seem to work with this module
const inspect = require('util').inspect
const shortid = require('shortid32')
const saveToHistory = require('./../../util/service.util').saveToHistory
const schema = require("./<%= kebabName %>.graphql")

export default function getModule(app) {

    const service = app.service('<%= camelName %>');

    return {

        schema: schema,
        queries: `
            all<%= pluralName %>: [<%= name %>]
            <%= camelName %>(id: String!): <%= name %>
        `,
        mutations: `
        create<%= name %> (
        ): <%= name %>

        patch<%= name %> (
            id: String
            data: <%= name %>Input
        ): <%= name %>
        `,
        resolvers: {
            queries: {
                all<%= pluralName %>(root, args, context) {
                    return service.find({query: {}})
                    .then(d => {
                        return d.toArray()
                    })
                },
                <%= camelName %>(root, { id }, context) {
                    return service.get(id);
                }
            },
            mutations: {
                create<%= name %>(root, data, context) {
                    data.id = shortid.generate()
                    return <%= name %>Service.create(data, context)
                    
                    .catch(err => {
                        console.log(err.message ? err.message : err.errors)
                        return err
                    });
                },
                async patch<%= name %>(root, data, context) {

                    try {

                        // Uncomment if there are nodes that need to be versioned
                        // saveToHistory(<%= name %>Service, app, currentDoc, data.data, [])

                        const patchedDoc = await <%= name %>Service.patch(data.id, data.data)
                        return patchedDoc

                    }catch(err) {
                        console.log(err.message)
                        const msg = err.errors ? Object.values(err.errors)[0] : err.message
                        return new Error(msg)
                    }
                }
            }
        }
    }
}


