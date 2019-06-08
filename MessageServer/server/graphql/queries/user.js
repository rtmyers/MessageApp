import { GraphQLObjectType, GraphQLList, GraphQLSchema } from 'graphql';
import userType from '../types/user';

const UserModel = require('./../../models/User');

const fields = require('./../mutations');

// User Query
const usersQuery = new GraphQLObjectType({
	name: 'Query',
	fields: () => ({
		users: {
			type: new GraphQLList(userType),
			resolve: () => {
				const users = UserModel.find().exec();
				if (!users) throw new Error('Error');
				return users;
			}
		}
	})
});

const usersMutate = () => GraphQLSchema({
	name: 'Mutation',
	mutation: new GraphQLObjectType({
		fields
	})
});

module.exports = [
	usersQuery,
	usersMutate
];
