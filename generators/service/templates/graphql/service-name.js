const fs = require('fs') // import doesnt seem to work
import { merge } from 'lodash'

require.extensions['.graphql'] = function (module, filename) {
    module.exports = fs.readFileSync(filename, 'utf8');
};

var schema = require("./<%= camelName %>.graphql");

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
                
            }
        }
    }
}


