import {
	GraphQLObjectType,
	GraphQLNonNull,
	GraphQLID,
	GraphQLString
} from 'graphql';

import { ApolloServer, gql } from 'apollo-server-express';

// User Type
/*
const userType = new GraphQLObjectType({
	name: 'User',
	fields: () => ({
		id: {
			type: new GraphQLNonNull(GraphQLID)
		},
		name: {
			type: GraphQLString
		}
	})
});

const typeDefs = { userType };
*/

const typeDefs = 'type User {'
    + 'id: Int!'
    + 'name: String'
  + '}'
	+ 'type logInUser {'
	+ 'id: Int!'
	+ 'name: String!'
	+ 'login(id: Int): User } '
  // this schema allows the following mutation: +
  + 'type Mutation {'
    + 'updateUser ('
      + 'id: Int!'
    + '): User }';

export default typeDefs;
