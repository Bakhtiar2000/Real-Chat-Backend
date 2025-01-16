import express from 'express';
import { validateRequest } from '../../middleWear/validateRequest';
import { AuthValidation } from './auth.validation';
import { AuthControllers } from './auth.controller';
import auth from '../../middleWear/auth';

const router = express.Router();

router.post(
    '/login',
    validateRequest(AuthValidation.loginValidationSchema),
    AuthControllers.loginUser,
);

router.post(
    '/register',
    validateRequest(AuthValidation.registerValidationSchema),
    AuthControllers.register,
);

router.post(
    '/refresh-token',
    validateRequest(AuthValidation.refreshTokenValidationSchema),
    AuthControllers.refreshToken,
);

router.post("/logout", AuthControllers.logout);

router.get("/check", auth, AuthControllers.checkAuth);

export const AuthRoutes = router;
