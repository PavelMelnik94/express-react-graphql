import { SchemaComposer } from 'graphql-compose';


const schemaComposer = new SchemaComposer();

import { TodoQuery, TodoMutation } from './Todo';
import { ProductMutation, ProductQuery } from './Product'
import { CategoryMutation, CategoryQuery } from './Category'

schemaComposer.Query.addFields({
    ...TodoQuery,
    ...ProductQuery,
    ...CategoryQuery,
});

schemaComposer.Mutation.addFields({
    ...TodoMutation,
    ...ProductMutation,
    ...CategoryMutation,
});


export default schemaComposer.buildSchema();
