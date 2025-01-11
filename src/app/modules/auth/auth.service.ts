import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { User } from '../user/user.model';
import { TLoginUser } from './auth.interface';
import config from '../../config';
import bcrypt from 'bcrypt';
import { createToken, verifyToken } from './auth.utils';

const loginUser = async (payload: TLoginUser) => {
    const user = await User.isUserExistsByEmail(payload.email);
    console.log(user)

    // Check if user exists
    if (!user) {
        throw new AppError(httpStatus.NOT_FOUND, 'User not found!');
    }

    console.log('Plain text password:', payload?.password);
    console.log('Hashed password:', user?.password);

    const x = await bcrypt.compare(payload?.password, user?.password)
    console.log(x)
    // Check if password is correct
    if (!x) {
        throw new AppError(httpStatus.FORBIDDEN, 'Password did not match!');
    }


    //----------------Create jsonwebtoken and send to the client-----------------
    const jwtPayload = {
        email: user.email,
        name: user.name,
    };

    //++++++++++++++++   ACCESS TOKEN   ++++++++++++++++
    const accessToken = createToken(
        jwtPayload,
        config.jwt_access_secret as string,
        config.jwt_access_expires_in as string,
    );
    //++++++++++++++++   Refresh TOKEN   ++++++++++++++++
    const refreshToken = createToken(
        jwtPayload,
        config.jwt_refresh_secret as string,
        config.jwt_refresh_expires_in as string,
    );
    return {
        accessToken,
        refreshToken,
    };
};


const refreshToken = async (token: string) => {

    const decoded = verifyToken(token, config.jwt_refresh_secret as string);
    const { email, name } = decoded;

    const user = await User.isUserExistsByEmail(email);
    if (!user) {
        throw new AppError(httpStatus.NOT_FOUND, 'This user is not found !');
    }


    const jwtPayload = {
        email: user.email,
        name: user.name,
    };

    const accessToken = createToken(
        jwtPayload,
        config.jwt_access_secret as string,
        config.jwt_access_expires_in as string,
    );

    return {
        accessToken,
    };
};

export const AuthServices = {
    loginUser,
    refreshToken,
};
