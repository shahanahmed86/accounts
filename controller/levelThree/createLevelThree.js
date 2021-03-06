import { checkData, prisma, validation } from '../../utils';

export default async (parent, { levelTwoId, ...data }, context, info) => {
	try {
		await validation.nameSchema.validateAsync(data.name);

		const { id: userId, role } = context.req.user;

		await checkData({
			tableRef: 'levelTwo',
			key: 'id',
			value: levelTwoId,
			title: 'Account',
			pKey: role,
			pValue: userId,
			checkSuspension: true
		});

		data.levelTwo = {
			connect: { id: levelTwoId }
		};

		await checkData({
			tableRef: 'levelThree',
			key: 'name',
			value: data.name,
			title: data.name,
			pKey: 'levelTwo',
			pValue: levelTwoId,
			checkDuplication: true
		});

		data.account = {
			connect: { id: userId }
		};

		const createdLevel = await prisma.levelThree.create({ data });

		return {
			success: true,
			message: `${data.name} created successfully...`,
			debugMessage: createdLevel.id
		};
	} catch (error) {
		console.error(error);
		return {
			success: true,
			message: `${data.name} not created...`,
			debugMessage: error.message
		};
	}
};
