import { z } from 'zod';

const loginValidationSchema = z.object({
    body: z.object({
        email: z.string({ required_error: 'Email is required.' }),
        password: z.string({ required_error: 'Password is required' }),
    }),
});

const registerValidationSchema = z.object({
    body: z.object({
        fullName: z.string(),
        email: z.string().email('Invalid email format'),
        password: z.string().max(20, { message: 'Password cannot be more than 20 characters' })
    }),
});

const refreshTokenValidationSchema = z.object({
    cookies: z.object({
        refreshToken: z.string({
            required_error: 'Refresh token is required!',
        }),
    }),
});

export const AuthValidation = {
    loginValidationSchema,
    registerValidationSchema,
    refreshTokenValidationSchema
};
