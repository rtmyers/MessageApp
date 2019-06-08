import { GraphQLSchema, GraphQLObjectType } from 'graphql';
import { makeExecutableSchema } from 'graphql-tools';

import typeDefs from './types/user';
import resolvers from './mutations';

console.log('user here --- ', typeDefs);

const exSchema = makeExecutableSchema({ typeDefs, resolvers });

module.exports = [exSchema];
