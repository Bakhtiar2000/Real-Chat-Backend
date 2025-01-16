import httpStatus from 'http-status';
import { catchAsync } from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { AuthServices } from './auth.service';
import config from '../../config';

const loginUser = catchAsync(async (req, res) => {
    const result = await AuthServices.loginUser(req.body);
    const { refreshToken, accessToken } = result;

    res.cookie('refreshToken', refreshToken, {
        secure: config.node_env === 'production',
        httpOnly: true,
        sameSite: 'none',
        maxAge: 1000 * 60 * 60 * 24 * 365,
    });
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Login successful',
        data: {
            accessToken,
        },
    });
});

const register = catchAsync(async (req, res) => {
    const result = await AuthServices.registerUserIntoDB(req.body);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'User is registered successfully',
        data: result,
    });
});

const refreshToken = catchAsync(async (req, res) => {
    const { refreshToken } = req.cookies;
    const result = await AuthServices.refreshToken(refreshToken);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Access token is refreshed successfully!',
        data: result,
    });
});

const logout = catchAsync(async (req, res) => {
    res.cookie("refreshToken", "", { maxAge: 0 });
    res.cookie("accessToken", "", { maxAge: 0 });
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'User logout successful!',
        data: "",
    });
});

const checkAuth = catchAsync(async (req, res) => {
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Checking auth!',
        data: req.user,
    });
});

export const AuthControllers = {
    loginUser,
    register,
    refreshToken,
    logout,
    checkAuth
};
