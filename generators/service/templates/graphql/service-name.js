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
            all<%= camelName %>: [<%= camelName %>]
            <%= camelName %>(id: String!): <%= camelName %>
        `,
        mutations: `
        create<%= camelName %> (
        ): <%= camelName %>
        `,
        resolvers: {
            queries: {
                all<%= camelName %>(root, args, context) {
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


