const { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLSchema, GraphQLList, GraphQLNonNull} = require('graphql');

const Project = require('../models/Project');
const Client = require('../models/Client');

//project type
const ProjectType = new GraphQLObjectType({
    name: 'Project',
    fields: () => ({
        id: {type: GraphQLID},
        description: {type: GraphQLString},
        status: {type: GraphQLString},
        client: {
            type: ClientType,
            resolve(parent) {
                return Client.findById(parent.id);
            }

        }
    })
})

//client type
const ClientType = new GraphQLObjectType({
    name: 'Client',
    fields: () => ({
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        email: {type: GraphQLString},
        phone: {type: GraphQLString},
    })
})

// Query
const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {

        //client
        clients: {
            type: new GraphQLList(ClientType),
            resolve() {
                return Client.find();
            }
        },
        client: {
            type: ClientType,
            args: { id: {type: GraphQLID} },
            resolve(parent) {
                return Client.findById(parent.id);
            }
        },

        //project
        projects: {
            type: new GraphQLList(ProjectType),
            resolve() {
                return Project.find();
            }
        },
        project: {
            type: ProjectType,
            args: { id: {type: GraphQLID} },
            resolve(parent, args) {
                return Project.findById(args?.id)
            }
        },
    }
})


// Mutations
const mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {

        // add client
        addClient: {
            type: ClientType,
            args: {
                name: {type: GraphQLNonNull(GraphQLString)},
                email: {type: GraphQLNonNull(GraphQLString)},
                phone: {type: GraphQLNonNull(GraphQLString)},
            },
            resolve(parent, args) {
                const client = new Client({
                    name: args.name,
                    email: args.email,
                    phone: args.phone,
                })
                return client?.save()
            }
        },

        // delete client
        deleteClient: {
            type: ClientType,
            args: {
                id: {type: GraphQLNonNull(GraphQLID)},
            },
            resolve(parent, args) {
               return  Client.findByIdAndDelete(args.id)
            }
        }
    }
})


module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation
})
