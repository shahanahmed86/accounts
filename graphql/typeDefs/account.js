import { gql } from 'apollo-server-express';

export default gql`
	type Account {
		id: String!
		username: String!
		password: String
		name: String!
		avatar: String!
		levelOnes: [LevelOne!]
		levelTwos: [LevelTwo!]
		levelThrees: [LevelThree!]
		levelFours: [LevelFour!]
		transactions: [Transaction!]
		isSuspended: Boolean!
		createdAt: Date!
		updatedAt: Date!
	}

	type AuthAccountPayload {
		token: String!
		user: Account!
	}

	extend type Query {
		accounts: [Account!] @auth(shouldAdmin: true)
		account(id: String!): Account! @auth(shouldAdmin: true)
		loggedInAccount: Account! @auth(shouldAccount: true)
	}

	extend type Mutation {
		createAccount(username: String!, password: String!, name: String!, avatar: Upload!): Status! @auth(shouldAdmin: true)
		updateAccount(id: String!, username: String, password: String, name: String, avatar: Upload, isSuspended: Boolean): Status! @auth(shouldAdmin: true)
		deleteAccount(id: String!): Status! @auth(shouldAdmin: true)
		loginAccount(username: String!, password: String!): AuthAccountPayload! @guest
	}
`;
