const {
    GraphQLObjectType,
    GraphQLID,
    GraphQLString,
    GraphQLSchema,
    GraphQLList,
    GraphQLNonNull,
    GraphQLEnumType, GraphQLInt
} = require('graphql');

const Category = require('../models/Category');
const Product = require('../models/Product');

// Category type
const CategoryType = new GraphQLObjectType({
    name: 'Category',
    fields: () => ({
        id: { type: GraphQLID },
        name: {type: GraphQLString},
        products: {
            type: ProductType,
            resolve(parent) {
                return Product.findById(parent.clientId);
            }

        }
    })
})


//client type
const ProductType = new GraphQLObjectType({
    name: 'Product',
    fields: () => ({
        id: { type: GraphQLID },
        title: { type: GraphQLString },
        description: { type: GraphQLString },
        price: { type: GraphQLInt },
        backgroundImage: { type: GraphQLString },
        productImage: { type: GraphQLString },
        backgroundColor: { type: GraphQLString },
        category: {
            type: CategoryType,
            resolve(parent) {
                return Category.findById(parent.clientId);
            },
        }
    }),
})

// Query
const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {

        //category
        categories: {
            type: new GraphQLList(CategoryType),
            resolve() {
                return Category.find();
            }
        },
        category: {
            type: CategoryType,
            args: { id: { type: GraphQLID } },
            resolve(parent) {
                return Client.findById(parent.id);
            }
        },

        //product
        products: {
            type: new GraphQLList(ProductType),
            resolve() {
                return Product.find();
            }
        },
        product: {
            type: ProductType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                return Product.findById(args?.id)
            }
        },
    }
})


// Mutations
const mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        // add product
        addProduct: {
            type: ProductType,
            args: {
                title: { type: GraphQLNonNull(GraphQLString) },
                description: { type: GraphQLNonNull(GraphQLString) },
                price: { type: GraphQLNonNull(GraphQLInt) },
                backgroundImage: { type: GraphQLNonNull(GraphQLString) },
                productImage: { type: GraphQLNonNull(GraphQLString) },
                backgroundColor: { type: GraphQLNonNull(GraphQLString) },
                category: {type: GraphQLNonNull(GraphQLString)}
            },
            resolve(parent, args) {
                const product = new Product({
                    title: args.title,
                    description: args.description,
                    price: args.price,
                    backgroundImage: args.backgroundImage,
                    productImage: args.productImage,
                    backgroundColor: args.backgroundColor,
                    category: args.category,
                })
                return product?.save()
            }
        },

        // delete category
        deleteCategory: {
            type: CategoryType,
            args: {
                id: { type: GraphQLNonNull(GraphQLID) },
            },
            resolve(parent, args) {
                return Category.findByIdAndDelete(args.id)
            }
        },

        // add category
        addCategory: {
            type: CategoryType,
            args: {
                name: { type: GraphQLNonNull(GraphQLString) },
            },
            resolve(parent, args) {
                const category = new Category({
                    name: args.name,
                })

                return category.save();
            }
        },

        // delete a category
        // deleteCategory: {
        //     type: CategoryType,
        //     args: {
        //         id: { type: GraphQLNonNull(GraphQLID) },
        //     },
        //     resolve(parent, args) {
        //         return Category.findByIdAndDelete(args.id)
        //     }
        // },


        // update a category
        updateCategory: {
            type: CategoryType,
            args: {
                id: { type: GraphQLNonNull(GraphQLID) },
                name: { type: GraphQLString },
            },
            resolve(parent, args) {
                return Category.findByIdAndUpdate(
                    args.id,
                    {
                        $set: {
                            name: args.name,
                        },
                    },
                    { new: true }
                )
            }
        },
    }
})


module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation
})
