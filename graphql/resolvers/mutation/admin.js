import { adminController } from '../../../controller';

export default {
	loginAdmin: (...args) => adminController.loginAdmin(...args),
	adminSignOut: (...args) => adminController.adminSignOut(...args)
};
