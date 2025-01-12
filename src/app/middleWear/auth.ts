import { NextFunction, Request, Response } from "express";
import { User } from "../modules/user/user.model";
import config from "../config";
import httpStatus from 'http-status';
import AppError from "../errors/AppError";
import { verifyToken } from "../modules/auth/auth.utils";

const auth = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.headers.authorization;
        if (!token) {
            throw new AppError(
                httpStatus.UNAUTHORIZED,
                'Token not found: Unauthorized User!',
            );
        }
        const decoded = verifyToken(token, config.jwt_access_secret as string);

        if (!decoded) {
            throw new AppError(
                httpStatus.UNAUTHORIZED,
                'Invalid Token: Unauthorized user',
            );
        }

        const user = await User.isUserExistsByEmail(decoded.email);

        if (!user) {
            throw new AppError(httpStatus.NOT_FOUND, 'User not found!');
        }

        req.user = user;

        next();
    } catch (error: any) {
        console.log("Error in auth guard: ", error.message);
        // throw new AppError(500, 'Internal server error');
    }
};

export default auth