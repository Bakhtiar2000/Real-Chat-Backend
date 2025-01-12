import { z } from 'zod';

const registerUserValidationSchema = z.object({
    body: z.object({
        fullName: z.string(),
        email: z.string().email('Invalid email format'),
        password: z.string().max(20, { message: 'Password cannot be more than 20 characters' })
    }),
});

export const UserValidation = {
    registerUserValidationSchema
};
