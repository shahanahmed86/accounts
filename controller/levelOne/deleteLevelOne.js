import { checkExistence, prisma } from '../../utils';

export default async (parent, { id }, context, info) => {
	const { id: userId } = context.req.user;

	const levelOne = await checkExistence({
		tableRef: 'levelOne',
		entityKey: 'id',
		entityValue: id,
		title: 'Account',
		parentKey: 'account',
		parentValue: userId
	});

	if (levelOne.isSuspended) {
		return {
			success: true,
			message: 'Account is already been deleted...'
		};
	}
	await prisma.levelOne.update({ where: { id }, data: { isSuspended: true } });

	return {
		success: true,
		message: `${data.name} updated successfully...`
	};
};
