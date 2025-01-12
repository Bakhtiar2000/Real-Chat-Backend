import httpStatus from 'http-status';
import { catchAsync } from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { messageServices } from './message.service';

const getSidebarUsers = catchAsync(async (req, res) => {
    const result = await messageServices.getSidebarUsersFromDB(req.user.email);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'User fetched successfully',
        data: result,
    });
});

const getAllMessages = catchAsync(async (req, res) => {
    const { chatUserId } = req.params;
    const result = await messageServices.getAllMessagesFromDB(chatUserId, req.user._id);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Message fetched successfully',
        data: result,
    });
});

const sendMessage = catchAsync(async (req, res) => {
    const { text, image } = req.body;
    const { receiverId } = req.params;
    console.log("user -> ", req.user)
    const result = await messageServices.sendMessage(req.body, receiverId, req.user._id);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Message sent successfully',
        data: result,
    });
});


export const messageControllers = {
    getSidebarUsers,
    getAllMessages,
    sendMessage
};
