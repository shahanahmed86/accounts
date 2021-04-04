import { checkData, prisma } from '../../utils';

export default async (parent, { id }, context, info) => {
	const { id: userId, userType } = context.req.user;

	const levelTwo = await checkData({
		tableRef: 'levelTwo',
		key: 'id',
		value: id,
		title: 'Account',
		pKey: userType,
		pValue: userId
	});

	if (levelTwo.isSuspended) {
		return {
			success: true,
			message: `${levelTwo.name} has already been deleted...`
		};
	}
	await prisma.levelTwo.update({ where: { id }, data: { isSuspended: true } });

	return {
		success: true,
		message: `${levelTwo.name} deleted successfully...`,
		debugMessage: id
	};
};