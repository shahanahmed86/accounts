import { ApolloError } from 'apollo-server-errors';
import { checkDuplication, checkExistence, prisma, validation } from '../../utils';

export default async (parent, { id, ...data }, context, info) => {
	const { id: userId, userType } = context.req.user;

	const levelOne = await checkExistence({ tableRef: 'levelOne', entityKey: 'id', entityValue: id, title: 'Account' });
	levelOne.account = await prisma.levelOne.findUnique({ where: { id } }).account();

	if (userType === 'account') {
		if (data.isSuspended === true) {
			throw new ApolloError('Only admin can restore the deleted account...');
		}
		if (levelOne.account.id !== userId) throw new ApolloError('Invalid account...');
	}

	if (data.name && data.name !== levelOne.name) {
		await validation.nameSchema.validateAsync(data.name);

		await checkDuplication({
			tableRef: 'levelOne',
			entityKey: 'name',
			entityValue: data.name,
			title: data.name,
			parentKey: 'account',
			parentValue: levelOne.account.id,
			id
		});
	}

	await prisma.levelOne.update({ where: { id }, data });

	return {
		success: true,
		message: `${data.name} updated successfully...`,
		debugMessage: id
	};
};
