import { gql } from 'apollo-server-express';

export default gql`
	type LevelOne {
		id: String!
		nature: Nature!
		name: String!
		levelTwos: [LevelTwo!] @auth(shouldAccount: true, shouldAdmin: true)
		account: Account! @auth(shouldAccount: true, shouldAdmin: true)
		isSuspended: Boolean!
		createdAt: Date!
		updatedAt: Date!
	}

	extend type Query {
		levelOnes: [LevelOne!] @auth(shouldAccount: true, shouldAdmin: true)
		levelOne(id: String!): LevelOne! @auth(shouldAccount: true, shouldAdmin: true)
	}

	extend type Mutation {
		createLevelOne(nature: Nature!, name: String!): Status! @auth(shouldAccount: true)
		updateLevelOne(id: String!, name: String, isSuspended: Boolean): Status!
			@auth(shouldAccount: true, shouldAdmin: true)
		deleteLevelOne(id: String!): Status! @auth(shouldAccount: true)
	}
`;
