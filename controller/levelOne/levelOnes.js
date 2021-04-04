import { ApolloError } from 'apollo-server-express';
import { prisma } from '../../utils';

export default (parent, args, context, info) => {
	const { id: userId, userType } = context.req.user;
	switch (userType) {
		case 'admin': {
			return prisma.levelOne.findMany();
		}
		case 'account': {
			return prisma.levelOne.findMany({ where: { account: { id: userId }, isSuspended: false } });
		}
		default: {
			throw new ApolloError("You aren't allow to view such information...");
		}
	}
};
