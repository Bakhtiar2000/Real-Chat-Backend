import express from 'express';
import { UserControllers } from './user.controller';
import { validateRequest } from '../../middleWear/validateRequest';

import { UserValidation } from './user.validation';

const router = express.Router();

router.post(
    '/register',
    validateRequest(UserValidation.registerUserValidationSchema),
    UserControllers.register,
);

export const UserRoutes = router;
